/* ============================================================
   scene.js — Three.js WebGL Background Scene
   SahBitCode Portfolio
   ============================================================

   Architecture:
   - One persistent THREE.WebGLRenderer on #bg-canvas
   - Two object groups:  webDevGroup  + hardwareGroup
   - Mouse parallax via raycaster + mouse tracking
   - Scroll-driven camera Z movement (consumed by animations.js)
   - Self-contained animate loop

   Objects:
   WebDev  → JS logo cube, CSS donut, Firebase node sphere cluster,
              Three.js wireframe icosahedron, Cannon.js physics sphere
   Hardware→ CPU chip (flat box + grid lines), reballing stencil (torus grid),
              motherboard trace (custom line geometry), microchip ICs
============================================================ */

'use strict';

const Scene = (() => {

  // ---- State ----
  let renderer, scene, camera;
  let webDevGroup, hardwareGroup, allObjects = [];
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = 0;
  let raycaster, mouseVec;
  let hoveredObj = null;
  let clock;
  let cameraBaseZ = 18;
  let initialized = false;

  // ---- Palette ----
  const COL = {
    accent:   0xf5a623,
    accentDim:0x8a5a0a,
    border:   0x2a2a32,
    wire:     0x3a3a48,
    green:    0x4ade80,
    blue:     0x60a5fa,
    white:    0xf0ede8,
  };

  // ---- Init ----
  function init() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || !window.THREE) return;

    clock = new THREE.Clock();

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0d0f, 0.045);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, cameraBaseZ);

    // Raycaster
    raycaster = new THREE.Raycaster();
    mouseVec = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const accentLight = new THREE.PointLight(COL.accent, 3, 30);
    accentLight.position.set(5, 8, 10);
    scene.add(accentLight);

    const blueLight = new THREE.PointLight(COL.blue, 1.5, 25);
    blueLight.position.set(-8, -4, 8);
    scene.add(blueLight);

    // Object groups
    webDevGroup = new THREE.Group();
    hardwareGroup = new THREE.Group();
    scene.add(webDevGroup);
    scene.add(hardwareGroup);

    buildWebDevObjects();
    buildHardwareObjects();
    buildParticleField();

    // Events
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('scroll', onScroll, { passive: true });

    animate();
    initialized = true;
  }

  // ---- Build Web Dev Objects ----
  function buildWebDevObjects() {
    // 1. JS Logo Cube (golden, wireframe outline)
    const jsCube = createLabelledBox(1.2, 1.2, 1.2, COL.accent, 'JS');
    jsCube.position.set(-7, 3, -2);
    jsCube._basePos = jsCube.position.clone();
    jsCube._rotSpeed = { x: 0.003, y: 0.007 };
    jsCube._floatAmp = 0.4;
    jsCube._floatOffset = 0;
    webDevGroup.add(jsCube);
    allObjects.push(jsCube);

    // 2. CSS Torus (ring/donut)
    const cssGeo = new THREE.TorusGeometry(0.7, 0.22, 16, 48);
    const cssMat = new THREE.MeshStandardMaterial({
      color: COL.blue, metalness: 0.4, roughness: 0.3,
    });
    const cssTorus = new THREE.Mesh(cssGeo, cssMat);
    cssTorus.position.set(-4.5, -2, 1);
    cssTorus._basePos = cssTorus.position.clone();
    cssTorus._rotSpeed = { x: 0.008, y: 0.003, z: 0.005 };
    cssTorus._floatAmp = 0.35;
    cssTorus._floatOffset = Math.PI * 0.7;
    webDevGroup.add(cssTorus);
    allObjects.push(cssTorus);

    // 3. Firebase sphere cluster (node graph)
    const fbGroup = buildNodeCluster(0xf5a623, 5);
    fbGroup.position.set(6, 2, -1);
    fbGroup._basePos = fbGroup.position.clone();
    fbGroup._rotSpeed = { x: 0.002, y: 0.006 };
    fbGroup._floatAmp = 0.5;
    fbGroup._floatOffset = Math.PI * 1.3;
    webDevGroup.add(fbGroup);
    allObjects.push(fbGroup);

    // 4. Three.js Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: COL.green, wireframe: true, opacity: 0.8, transparent: true,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3, -3.5, 0.5);
    ico._basePos = ico.position.clone();
    ico._rotSpeed = { x: 0.005, y: 0.008 };
    ico._floatAmp = 0.3;
    ico._floatOffset = Math.PI * 0.3;
    webDevGroup.add(ico);
    allObjects.push(ico);

    // 5. Cannon.js Sphere (physics ball aesthetic)
    const cannonGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const cannonMat = new THREE.MeshStandardMaterial({
      color: COL.white, metalness: 0.8, roughness: 0.15,
    });
    const cannon = new THREE.Mesh(cannonGeo, cannonMat);
    cannon.position.set(-6, -4.5, 1);
    cannon._basePos = cannon.position.clone();
    cannon._rotSpeed = { x: 0.006, y: 0.004 };
    cannon._floatAmp = 0.45;
    cannon._floatOffset = Math.PI * 1.8;
    webDevGroup.add(cannon);
    allObjects.push(cannon);
  }

  // ---- Build Hardware Objects ----
  function buildHardwareObjects() {
    // 1. CPU Chip — flat box + line grid overlay
    const cpuGrp = buildCPUChip();
    cpuGrp.position.set(7, 4, -3);
    cpuGrp._basePos = cpuGrp.position.clone();
    cpuGrp._rotSpeed = { x: 0.001, y: 0.004 };
    cpuGrp._floatAmp = 0.25;
    cpuGrp._floatOffset = Math.PI * 0.5;
    hardwareGroup.add(cpuGrp);
    allObjects.push(cpuGrp);

    // 2. Reballing Stencil — torus knot aesthetic
    const stencilGeo = new THREE.TorusKnotGeometry(0.7, 0.2, 80, 12, 2, 3);
    const stencilMat = new THREE.MeshStandardMaterial({
      color: COL.accentDim, metalness: 0.9, roughness: 0.1,
      wireframe: false,
    });
    const stencil = new THREE.Mesh(stencilGeo, stencilMat);
    stencil.position.set(-8, 5, -2);
    stencil._basePos = stencil.position.clone();
    stencil._rotSpeed = { x: 0.004, y: 0.007 };
    stencil._floatAmp = 0.4;
    stencil._floatOffset = Math.PI * 2.1;
    hardwareGroup.add(stencil);
    allObjects.push(stencil);

    // 3. Motherboard Trace PCB — custom flat geometry with line traces
    const mbGrp = buildMotherboardTrace();
    mbGrp.position.set(5, -5, -1);
    mbGrp._basePos = mbGrp.position.clone();
    mbGrp._rotSpeed = { x: 0.002, y: 0.003 };
    mbGrp._floatAmp = 0.3;
    mbGrp._floatOffset = Math.PI * 0.9;
    hardwareGroup.add(mbGrp);
    allObjects.push(mbGrp);

    // 4. Microchip IC (small flat rectangle with legs)
    for (let i = 0; i < 3; i++) {
      const icGrp = buildMicrochip();
      icGrp.position.set(
        -9 + i * 3.5,
        -1 + (i % 2) * 2,
        -4 + i * 0.5
      );
      icGrp._basePos = icGrp.position.clone();
      icGrp._rotSpeed = { x: 0.002 + i*0.001, y: 0.003 + i*0.002 };
      icGrp._floatAmp = 0.2 + i * 0.1;
      icGrp._floatOffset = Math.PI * i * 0.8;
      hardwareGroup.add(icGrp);
      allObjects.push(icGrp);
    }
  }

  // ---- Helper: Labelled Box ----
  function createLabelledBox(w, h, d, color, label) {
    const grp = new THREE.Group();
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    grp.add(mesh);
    // wireframe edge
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.25, transparent: true });
    grp.add(new THREE.LineSegments(edges, lineMat));
    return grp;
  }

  // ---- Helper: Node Cluster (Firebase) ----
  function buildNodeCluster(color, count) {
    const grp = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const nodeMat = new THREE.MeshStandardMaterial({ color, metalness: 0.5, roughness: 0.3 });
    const positions = [];
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      const theta = (i / count) * Math.PI * 2;
      const r = 0.8;
      m.position.set(Math.cos(theta)*r, Math.sin(theta)*r*0.5, (Math.random()-0.5)*0.5);
      positions.push(m.position.clone());
      grp.add(m);
    }
    // Lines between nodes
    const lineMat = new THREE.LineBasicMaterial({ color: color, opacity: 0.35, transparent: true });
    for (let i = 0; i < positions.length; i++) {
      const pts = [positions[i], positions[(i+1) % positions.length]];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      grp.add(new THREE.Line(lineGeo, lineMat));
    }
    return grp;
  }

  // ---- Helper: CPU Chip ----
  function buildCPUChip() {
    const grp = new THREE.Group();
    // body
    const bodyGeo = new THREE.BoxGeometry(1.8, 1.8, 0.15);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a28, metalness: 0.7, roughness: 0.3 });
    grp.add(new THREE.Mesh(bodyGeo, bodyMat));
    // die in center
    const dieGeo = new THREE.BoxGeometry(0.9, 0.9, 0.18);
    const dieMat = new THREE.MeshStandardMaterial({ color: COL.accentDim, metalness: 0.9, roughness: 0.1 });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.z = 0.02;
    grp.add(die);
    // pins along each side
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 1, roughness: 0.1 });
    for (let i = 0; i < 8; i++) {
      const t = (i / 7) * 1.4 - 0.7;
      ['x','y'].forEach(axis => {
        [-1,1].forEach(sign => {
          const pinGeo = new THREE.BoxGeometry(0.04, 0.04, 0.22);
          const pin = new THREE.Mesh(pinGeo, pinMat);
          if (axis === 'x') { pin.position.set(t, sign * 1.05, 0); pin.rotation.x = Math.PI/2; }
          else               { pin.position.set(sign * 1.05, t, 0); pin.rotation.y = Math.PI/2; }
          grp.add(pin);
        });
      });
    }
    // grid lines on body
    const lineMat = new THREE.LineBasicMaterial({ color: COL.accent, opacity: 0.2, transparent: true });
    for (let i = 0; i < 5; i++) {
      const v = -0.8 + i * 0.4;
      const pts = [new THREE.Vector3(-0.85, v, 0.1), new THREE.Vector3(0.85, v, 0.1)];
      grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      const pts2 = [new THREE.Vector3(v, -0.85, 0.1), new THREE.Vector3(v, 0.85, 0.1)];
      grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), lineMat));
    }
    return grp;
  }

  // ---- Helper: Motherboard Trace ----
  function buildMotherboardTrace() {
    const grp = new THREE.Group();
    // board base
    const boardGeo = new THREE.BoxGeometry(3, 2, 0.08);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x0a2510, metalness: 0.3, roughness: 0.7 });
    grp.add(new THREE.Mesh(boardGeo, boardMat));
    // trace lines
    const traceMat = new THREE.LineBasicMaterial({ color: COL.accent, opacity: 0.6, transparent: true });
    const tracePattern = [
      [[-1.4,0.8],[-0.8,0.8],[-0.8,0.2],[-0.2,0.2]],
      [[0.2,-0.2],[0.8,-0.2],[0.8,0.6],[1.4,0.6]],
      [[-1.4,-0.6],[0,-0.6],[0,0.4],[1.4,0.4]],
    ];
    tracePattern.forEach(path => {
      const pts = path.map(([x,y]) => new THREE.Vector3(x, y, 0.06));
      grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), traceMat));
    });
    // solder pads
    const padGeo = new THREE.CircleGeometry(0.06, 8);
    const padMat = new THREE.MeshStandardMaterial({ color: 0xf5a623, metalness: 1, roughness: 0.05 });
    [[-0.2,0.2],[0.2,-0.2],[-0.8,0.8],[0.8,-0.2],[0,0.4],[-0.8,-0.6]].forEach(([x,y]) => {
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.set(x, y, 0.07);
      grp.add(pad);
    });
    return grp;
  }

  // ---- Helper: Microchip IC ----
  function buildMicrochip() {
    const grp = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(0.6, 0.9, 0.1);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.5, roughness: 0.5 });
    grp.add(new THREE.Mesh(bodyGeo, bodyMat));
    // notch
    const notchGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const notch = new THREE.Mesh(notchGeo, new THREE.MeshStandardMaterial({ color: 0x333340 }));
    notch.position.set(-0.2, 0.38, 0.06);
    grp.add(notch);
    // legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0xb0b0b8, metalness: 0.9, roughness: 0.1 });
    for (let i = 0; i < 4; i++) {
      const y = -0.3 + i * 0.2;
      [-1,1].forEach(sign => {
        const legGeo = new THREE.BoxGeometry(0.25, 0.03, 0.02);
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(sign * 0.425, y, 0);
        grp.add(leg);
      });
    }
    return grp;
  }

  // ---- Particle Field ----
  function buildParticleField() {
    const count = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: COL.accent, size: 0.04, transparent: true, opacity: 0.35,
    });
    scene.add(new THREE.Points(geo, mat));
  }

  // ---- Animate ----
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Camera parallax from mouse
    camera.position.x = mouse.x * 1.5;
    camera.position.y = mouse.y * 1.0;

    // Scroll camera Z
    const targetZ = cameraBaseZ - scrollY * 0.008;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);

    // Animate all objects
    allObjects.forEach(obj => {
      if (!obj._basePos) return;
      // Float
      const amp = obj._floatAmp || 0.3;
      const off = obj._floatOffset || 0;
      obj.position.y = obj._basePos.y + Math.sin(t * 0.7 + off) * amp;
      obj.position.x = obj._basePos.x + Math.cos(t * 0.4 + off) * amp * 0.4;

      // Rotate
      if (obj._rotSpeed) {
        obj.rotation.x += obj._rotSpeed.x || 0;
        obj.rotation.y += obj._rotSpeed.y || 0;
        obj.rotation.z += obj._rotSpeed.z || 0;
      }

      // Hover scale
      if (obj._hovered) {
        obj.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
      } else {
        obj.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
      }
    });

    // Group parallax (slower layer)
    webDevGroup.rotation.y = mouse.x * 0.08;
    webDevGroup.rotation.x = mouse.y * 0.04;
    hardwareGroup.rotation.y = -mouse.x * 0.06;
    hardwareGroup.rotation.x = -mouse.y * 0.03;

    // Scroll-based group separation
    const scrollFactor = Math.min(scrollY / window.innerHeight, 1);
    webDevGroup.position.x = -scrollFactor * 3;
    hardwareGroup.position.x = scrollFactor * 3;

    renderer.render(scene, camera);
  }

  // ---- Events ----
  function onMouseMove(e) {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;

    // Raycasting for hover
    mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVec, camera);

    // Collect meshes from groups
    const meshes = [];
    allObjects.forEach(obj => {
      obj.traverse(child => { if (child.isMesh) meshes.push(child); });
    });

    const intersects = raycaster.intersectObjects(meshes);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      // Find parent in allObjects
      let topParent = hit;
      while (topParent.parent && !allObjects.includes(topParent)) {
        topParent = topParent.parent;
      }
      if (hoveredObj && hoveredObj !== topParent) hoveredObj._hovered = false;
      topParent._hovered = true;
      hoveredObj = topParent;
      document.body.style.cursor = 'none';
    } else {
      if (hoveredObj) hoveredObj._hovered = false;
      hoveredObj = null;
    }
  }

  function onScroll() {
    scrollY = window.scrollY;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // ---- Public API ----
  return { init };
})();

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Scene.init);
} else {
  Scene.init();
}
