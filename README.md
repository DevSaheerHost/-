# SahBitCode Portfolio — Setup & Architecture Guide

## File Structure

```
sahbitcode-portfolio/
├── index.html          ← Main HTML (all sections)
├── css/
│   ├── style.css       ← Core styles, layout, components, responsive
│   └── animations.css  ← GSAP-driven class states + CSS micro-animations
└── js/
    ├── scene.js        ← Three.js WebGL 3D background scene
    ├── animations.js   ← GSAP + ScrollTrigger scroll animations
    └── main.js         ← UI: cursor, nav, form, interactions
```

## How to Run

### Option A — Live Server (recommended)
```bash
# Install Live Server globally
npm install -g live-server

# Navigate to folder and start
cd sahbitcode-portfolio
live-server
```

### Option B — Python HTTP Server
```bash
cd sahbitcode-portfolio
python -m http.server 8080
# Visit: http://localhost:8080
```

### Option C — VS Code
Install the **Live Server** extension, right-click `index.html` → "Open with Live Server".

> ⚠️ You MUST use a local server. Opening `index.html` directly as a `file://` URL
> will block CDN scripts (CORS policy) and Three.js won't load.

---

## CDN Dependencies (loaded in index.html)

| Library | Version | Purpose |
|---------|---------|---------|
| Three.js | r134 | 3D WebGL scene |
| GSAP | 3.12.5 | Scroll animations |
| ScrollTrigger | 3.12.5 | GSAP scroll plugin |
| Firebase | 8.10.0 | Contact form DB |
| Google Fonts | — | Syne + DM Mono + DM Sans |

No npm install required for the core portfolio.

---

## 3D Scene Architecture (`js/scene.js`)

### Object Groups
```
webDevGroup      ← JS cube, CSS torus, Firebase node cluster,
                   Three.js wireframe icosahedron, Cannon.js sphere

hardwareGroup    ← CPU chip (body + pins + die + grid),
                   Reballing stencil (TorusKnot),
                   Motherboard PCB trace (custom LineGeometry),
                   3× Microchip ICs
```

### Parallax System
- `mouse.targetX/Y` captured on `mousemove`
- Lerped to `mouse.x/y` at 5% per frame (smooth lag)
- `camera.position.x/y` follows mouse × 1.5/1.0 multiplier
- Each group also rotates slightly: webDev follows mouse, hardware opposes it

### Scroll → Camera
```js
// In animate() loop:
const targetZ = cameraBaseZ - scrollY * 0.008;
camera.position.z += (targetZ - camera.position.z) * 0.06;
```
As you scroll down, camera slowly moves forward (Z decreases),
making objects appear to rush past — immersive depth effect.

### Hover Detection
A THREE.Raycaster fires each frame against all mesh children.
When a mesh is hit, its top-level parent in `allObjects` gets
`_hovered = true`, which causes it to lerp scale to `1.15`.

---

## Animation Architecture (`js/animations.js`)

### Hero Entrance (on load)
```
delay 0.3s → eyebrow → name lines (stagger 0.12s) → sub → desc → CTA → badge → scroll indicator
```

### Scroll Reveals
Every `[data-reveal]` element uses ScrollTrigger:
- `start: 'top 88%'` (element enters 88% from top of viewport)
- Animates: `opacity 0→1`, `y 24px→0`
- `.revealed` class added for CSS-driven child staggering

### Skill Groups
Each `.skill-group` triggers its own ScrollTrigger.
When `.revealed` is added, CSS `transition-delay` cascades
through `.skill-list li` children (0.05s increments).

---

## Adding Your Real Avatar Image

Replace the `hero-badge` section content or add an `<img>` to `.hero-content`:
```html
<div class="hero-avatar">
  <img src="./avatar.png" alt="Saheer Babu" />
</div>
```
Add CSS:
```css
.hero-avatar img {
  width: 220px;
  border-radius: 50%;
  border: 2px solid var(--accent);
}
```

---

## Customizing 3D Objects

To change colors, open `js/scene.js` and edit the `COL` object:
```js
const COL = {
  accent:   0xf5a623,  // ← amber
  green:    0x4ade80,  // ← Three.js object
  blue:     0x60a5fa,  // ← CSS object
  ...
};
```

To add a new floating object:
```js
// Inside buildWebDevObjects() or buildHardwareObjects():
const myGeo = new THREE.DodecahedronGeometry(0.8, 0);
const myMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const myMesh = new THREE.Mesh(myGeo, myMat);
myMesh.position.set(x, y, z);
myMesh._basePos = myMesh.position.clone();
myMesh._rotSpeed = { x: 0.004, y: 0.006 };
myMesh._floatAmp = 0.4;
myMesh._floatOffset = Math.PI;
webDevGroup.add(myMesh);
allObjects.push(myMesh);     // ← Required for hover + animation
```

---

## Firebase Contact Form

The form uses your existing Firebase project `codersaheer`.
Data is written to `portfolio/contacts/{pushId}` with:
```json
{
  "name": "...",
  "email": "...",
  "message": "...",
  "timestamp": 1234567890
}
```
Add this Firebase Security Rule to allow public writes:
```json
{
  "rules": {
    "portfolio": {
      "contacts": {
        ".write": true,
        ".read": false
      }
    }
  }
}
```

---

## Performance Notes

- Three.js pixel ratio is capped at 2× (`Math.min(devicePixelRatio, 2)`)
- Particle count: 200 (increase to 500 for denser field on desktop)
- All ScrollTrigger animations use `once: true` to avoid re-triggering
- Fog is applied to the scene (`FogExp2`) to fade distant objects naturally
- `pointer-events: none` on canvas ensures no interference with page scroll

---

## Deployment (GitHub Pages)

```bash
git init
git add .
git commit -m "Portfolio v4 — Three.js + GSAP"
git remote add origin https://github.com/devsaheerhost/-.git
git push -u origin main
```
Enable GitHub Pages: Settings → Pages → Branch: `main` / root `/`

Your live URL: `https://devsaheerhost.github.io/-/`
