//const randomDelayMin = 100;
//const randomDelayMax = 300;
//const loadingDelay = 3000;
//const setupUserDelay = 1000;
//const hideLockscreenDelay = 300;
let devMode = true;
if (devMode) {
  var randomDelayMin = 10,
    randomDelayMax = 30,
    loadingDelay = 300,
    setupUserDelay = 100,
    hideLockscreenDelay = 300; //
} else {
  var randomDelayMin = 100,
    randomDelayMax = 300,
    loadingDelay = 3000,
    setupUserDelay = 1000,
    hideLockscreenDelay = 300; //
}

function getMachine(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let machineCount = getMachine(1, 7);

let loadingTerminalText = [
  `<p># Initializing system startup...</p>`,

  `<p class='terminal-success'># ${machineCount} machine detected</p>`,

  `<p># Checking hardware configuration...</p>`,

  `<p class='terminal-success'># CPU: Intel Core i7 detected</p>`,

  `<p class='terminal-success'># RAM: 16GB DDR4 detected</p>`,

  `<p class='terminal-warning'># Disk: 512GB SSD detected (WARNING: SMART status critical)</p>`,

  `<p># Verifying system integrity...</p>`,

  `<p class='terminal-warning'># Secure Boot: Disabled (WARNING: Security risk detected)</p>`,

  `<p class='terminal-success'># TPM 2.0: Enabled</p>`,
  `<p># Checking for bootable media...</p>`,

  `<p class='terminal-success'># Disk 0: Windows Boot Loader found</p>`,
  `<p># Reading boot configuration data...</p>`,
  `<p class='terminal-error'># Boot configuration: ERROR (Corrupted BCD file)</p>`,
  `<p># Attempting automatic repair...</p>`,

  `<p class='terminal-error'># Automatic repair: FAILED</p>`,

  `<p class='terminal-warning'># Continuing boot with default configuration (UNSAFE)</p>`,

  `<p># Loading Windows Kernel...</p>`,
  `<p># Initializing drivers...</p>`,
  `<p># USB Controllers: OK</p>`,
  `<p class='terminal-error'># Network Interface: ERROR (Driver not found)</p>`,
  `<p class='terminal-warning'># GPU: NVIDIA RTX 3060 detected</p>`,
  `<p># GPU: WARNING (Display driver outdated)</p>`,
  `<p># Audio Devices: OK</p>`,
  `<p class = 'terminal-success'># Starting system services...</p>`,
  `<p class='terminal-error'># System service error: Windows Update failed to initialize</p>`,
  `<p># Checking operating system integrity...</p>`,
  `<p class = 'terminal-success'># Windows 11 Pro detected (Build 22000.1)</p>`,
  `<p># Verifying license key...</p>`,
  `<p class='terminal-warning'># License: Invalid (Copy Version)</p>`,
  `<p class='terminal-warning'># System Boot: CONTINUE (UNSAFE MODE)</p>`,
  `<p># Finalizing boot process...</p>`,
  `<p class='terminal-warning'># Warning: Critical updates pending, please resolve immediately</p>`,
  `<p class='terminal-error'># Error: Failed to load some system components</p>`,
  `<p class = 'terminal-success'>Windows 11 Starting...</p>`,
];

if (localStorage.getItem("windowsUser")) {
  var UserName = localStorage.getItem("windowsUser");
} else {
  UserName = "User";
}

const desktopShortCuts = [
  {
    title: UserName,
    icon: "./asset/This_PC.png",
    id: "username",
    name: "user",
  },
  {
    title: "Recycle Bin",
    icon: "./asset/recycle-bin.png",
    id: "bin",
    name: "bin",
  },
];

setDesktopShortCuts = () => {
  desktopShortCuts.forEach((item) => {
    homeIconParent.insertAdjacentHTML(
      "beforeend",
      `<span class='deskicon' name='${item.name}'><img src='${item.icon}'><label>${item.title}</label></span>`
    );
  });
};

let startupTerminal = document.querySelector("#startupTerminal");
let windowsLoader = document.querySelector("#win-loader");

let setUserWindow = document.querySelector(".set-user");
let lockScreen = document.querySelector(".lock-screen");
let scrollLevel = document.querySelector("#scrollLevel");

let homeScreen = document.querySelector(".home");
let taskBar = document.querySelector(".task-bar-icon-parent");
let startBar = document.querySelector(".startBar");
let homeIconParent = document.querySelector(".home-icon-parent");
let errorComponent = document.querySelector(".error");
let audio = document.querySelector("audio");
let realModeBtn = document.querySelector("#realMode");

let funModeBtn = document.querySelector("#funMode");

let startbarBg = document.querySelector("#startBbarBg");

let userNameInput = document.querySelector("#uname");
let userPwdInput = document.querySelector("#pwd");

let app = document.querySelector(".application");
let appCloseBtn = document.querySelector("#closeApp");
let actionCenter = document.querySelector(".action-center");

let index = 0;
let funMode = false;
let isDragging = false, offsetX = 0, offsetY = 0;

setDesktopShortCuts();

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addText() {
  if (index < loadingTerminalText.length) {
    startupTerminal.innerHTML += loadingTerminalText[index];
    startupTerminal.scrollTop = startupTerminal.scrollHeight; // Auto-scroll to the latest line
    index++;

    let randomDelay = getRandomDelay(randomDelayMin, randomDelayMax);
    setTimeout(addText, randomDelay);
  } else {
    startupTerminal.remove();
    windowsLoader.classList.remove("hidden");
    setTimeout(() => {
      windowsLoader.classList.add("hidden");
      let userName = localStorage.getItem("windowsUser");

      if (userName != null) {
        lockScreen.classList.remove("hidden");
      } else {
        setUserWindow.classList.remove("hidden");
      }

      // document.body.requestFullscreen();
    }, loadingDelay);
  }
}

funModeBtn.onclick = () => {
  funMode = true;
  addText();
  startupAud();
};
realModeBtn.onclick = () => {
  addText();
  audio.remove();
};
//addText(); // Start the process

setupUser = () => {
  setTimeout(() => {
    if (userNameInput.value.trim() !== "") {
      localStorage.setItem("windowsUser", userNameInput.value.trim());
      setUserWindow.remove();
      lockScreen.classList.remove("hidden");

      audio.src = "./asset/audios/creditos-finales.mp3";
      audio.play();
    } else {
      noUserName();
      //alert('User name required');
    }
  }, setupUserDelay);
};

scrollLevel.oninput = () => {
  //lockScreen.style.bottom=`${scrollLevel.value*10}%`
  //lockScreen.style.transform=`translateY(-${scrollLevel.value*10}%)`
  if (scrollLevel.value > 5) {
    lockScreen.classList.add("unlock");
    homeScreen.classList.remove("hidden");
    unlockSoundPlay();
    toggleWidgetPanel();
    setTimeout(() => {
      lockScreen.classList.add("hidden");
    }, hideLockscreenDelay);
  }
};

let taskbarIcons = [
  {
    title: "Store",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Microsoft_Store.svg/1024px-Microsoft_Store.svg.png",
    id: "store",
    name: "available",
  },
  {
    title: "",
    icon: "https://rpcs3.net/img/icons/list/os-windows-11.png",
    id: "windowsBtn",
    name: "available",
  },
];

taskbarIcons.forEach((icon) => {
  taskBar.innerHTML += `<div class='taskIcon' id='${icon.id}' name='${name}'><img src='${icon.icon}'></div>`;
});

let Fplay = true;
showStartBar = () => {
  startBar.classList.remove("hidden");
  startBar.classList.toggle("showStartBar");
  if (!actionCenter.classList.contains('action-ctrl-hide')) {
    actioncenterToggle()
}

  if (funMode) {
    if (Fplay) {
      audio.src = "./asset/audios/spiderman-meme-song.mp3";
      audio.play();
      Fplay = false;
    } else {
      startBarPlay();
    }
  }
};
//userInfo=[...uMap]
//npath = ../icon/SHELL.dil

document.querySelector("#windowsBtn").addEventListener("click", showStartBar);
startbarBg.addEventListener("click", () => {
  showStartBar();
})

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const errorHTML = `
        <div class="nav">
            <p>System 32 error</p>
        </div>
        <div class="box">
            <div class="detail">
                <span>⚠️</span>
                <p>Unable to find ms_app.dill!</p>
            </div>
            <div class="btn-wrap">
                <div class="btn">Close</div>
            </div>
        </div>`;
let errorCount = 0;
showError = () => {
  console.log("g");
  // Create a new error box when clicking the home parent
  let error = document.createElement("div");
  error.innerHTML = errorHTML;
  error.classList.add("error");
  let topPosition = getRandomNum(105, 300).toString();
  let leftPosition = getRandomNum(40, 60).toString();
  //error.style.transform=`translateX(${position}px)`
  error.style.top = `${topPosition}px`;
  error.style.left = `${leftPosition}%`;

  // Append the error box to the home screen after 1 second delay
  if (errorCount >= 10) {
    audio.src = "./asset/audios/fast-whoosh.mp3";
    audio.play();
  }
  setTimeout(() => {
    if (errorCount < 10) {
      audio.src = "./asset/audios/erro.mp3";
      audio.play();
      errorCount++;
    }

    document.getElementById("homeScreen").appendChild(error);

    error.querySelector(".nav").onmousedown = function(e) {
      isDragging = true;
      // Calculate the offset from the window's current position
      offsetX = e.clientX - error.offsetLeft;
      offsetY = e.clientY - error.offsetTop;
      
      // Add mouse move event listener
      document.onmousemove = onMouseMove;
    };
  
  
    // When mouse is released
  document.onmouseup = function() {
    isDragging = false;
    document.onmousemove = null;
  };
  
  // Function to handle the dragging
  function onMouseMove(e) {
    if (isDragging) {
      // Calculate new position
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
  
      // Update the window's position
      error.style.left = `${newX}px`;
      error.style.top = `${newY}px`;
    }
  }

    error.querySelector(".btn").onclick = () => {
      error.remove();
      errorCount--;
    };
  }, 500);
};

// funnySection

const starttupAudioPath = "./asset/audios/wake-up-to-reality.mp3";
const noUserNameAudPath = "./asset/audios/piche-dekho-little-boy.mp3";
const unlockScrernPath = "./asset/audios/fast-whoosh.mp3";
const windowsBtnAudPath = "./asset/audios/whoosh-sfx.mp3";

// aud repeat controller
let startup = true;
//let noUname = true;

startupAud = () => {
  if (startup) {
    audio.src = starttupAudioPath;
    audio.play();
    startup = false;
  }
};

noUserName = () => {
  audio.src = noUserNameAudPath;
  audio.play();
  userNameInput.classList.add("errorInput");
};

unlockSoundPlay = () => {
  if (funMode) {
    audio.src = windowsBtnAudPath;
    audio.play();
  }
};

startBarPlay = () => {
  audio.src = windowsBtnAudPath;
  if (funMode) {
    audio.play();
  }
};

let storeData = {
  icon: `<img src="${taskbarIcons[0].icon}" class='appIcon'/>`,
};
let explorerData = {
  icon: `<img src="${desktopShortCuts[0].icon}" class='appIcon'/>`,
};
let binData = {
  icon: `<img src="${desktopShortCuts[1].icon}" class='appIcon'/>`,
};

document.addEventListener("click", (e) => {
  var ParentTargetId = e.target.parentElement.id;
  var ParentTargetName = e.target.parentElement.getAttribute("name");
  var targetId = e.target.getAttribute("Id");
  var targetClass = e.target.classList;

  if (ParentTargetId == "store") {
    // app.classList.remove('hidden')
    // app.style.cssText=`
    // top: ${getRandomNum(15,20)}%;
    // left:${getRandomNum(15,20)}%;
    // right:${getRandomNum(15,20)}%;
    // `

    let appData = {
      appIcon: storeData.icon,
      appName: "Store",
    };
    createApp(appData);
  }
  if (targetId == "closeApp") {
    //app.classList.add('hidden')
  }
  if (ParentTargetName == "user") {
    let appData = {
      appIcon: explorerData.icon,
      appName: "Explorer",
    };
    createApp(appData);
  }
  if (ParentTargetName == "bin") {
    let appData = {
      appIcon: binData.icon,
      appName: "Trash",
    };
    createApp(appData);
  }
});

createAppLayout = (appData) => {
  return (appLayout = `
  <div class="nav">
        <span class="appIcon">${appData.appIcon} <p class='appName'>${appData.appName}</p></span>
        <span class="appController">
        
        
        <span class="snap-controls">
    <button id='snapLeft' class='snap-btn'></button>
    <button id='snapRight' class='snap-btn'></button>
</span>



          
          <span class="material-symbols-outlined" id='minimize'>minimize</span>
          <span class="material-symbols-outlined" id='maximize'>maximize</span>
          <span class="material-symbols-outlined" id="closeApp">close</span>
        </span>
      </div>
  `);
};
createApp = (appData) => {
  //createAppLayout(appData)
  let newApp = document.createElement("div");
  newApp.classList.add("application");
  newApp.innerHTML = createAppLayout(appData);
  homeScreen.appendChild(newApp);

  newApp.style.cssText = `
       top: ${getRandomNum(15, 20)}%;
       left:${getRandomNum(10, 20)}%;
       right:${getRandomNum(10, 20)}%;
       `;

  newApp.querySelector("#closeApp").onclick = () => {
    newApp.remove();
  };
  newApp.querySelector("#maximize").onclick = () => {
    newApp.style.width = "100%";
    newApp.style.height = "100%";
    newApp.style.left = "0";
    newApp.style.top = "0";
  };
  newApp.querySelector("#minimize").onclick = () => {
    newApp.style.width = "300px";
    newApp.style.height = "100px";
    newApp.style.top = `${getRandomNum(10, 70)}%`
  };

  newApp.querySelector("#snapLeft").onclick = () =>{
    newApp.style.width = "50%";
    newApp.style.height = "100%";
    newApp.style.left = "0";
    newApp.style.top = "0";
  }
  newApp.querySelector("#snapRight").onclick = () =>{
    newApp.style.width = "50%";
    newApp.style.height = "100%";
    newApp.style.left = "50%";
    newApp.style.top = "0";
  }
  
  
  newApp.querySelector('.nav').addEventListener('touchstart', function(e) {
  const touch = e.touches[0];
  offsetX = touch.clientX - newApp.offsetLeft;
  offsetY = touch.clientY - newApp.offsetTop;
  isDragging = true;
});

newApp.querySelector('.nav').addEventListener('touchmove', function(e) {
  if (isDragging) {
    const touch = e.touches[0];
    newApp.style.left = `${touch.clientX - offsetX}px`;
    newApp.style.top = `${touch.clientY - offsetY}px`;
  }
})

newApp.querySelector('.nav').addEventListener('touchend', function() {
  isDragging = false;
});

  newApp.querySelector(".nav").onmousedown = function(e) {
    isDragging = true;
    // Calculate the offset from the window's current position
    offsetX = e.clientX - newApp.offsetLeft;
    offsetY = e.clientY - newApp.offsetTop;
    
    // Add mouse move event listener
    document.onmousemove = onMouseMove;
  };


  // When mouse is released
document.onmouseup = function() {
  isDragging = false;
  document.onmousemove = null;
};

// Function to handle the dragging
function onMouseMove(e) {
  if (isDragging) {
    // Calculate new position
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    // Update the window's position
    newApp.style.left = `${newX}px`;
    newApp.style.top = `${newY}px`;
  }
}

};

startBar.onclick = (e) => {
  if (e.target.classList == "icon") {
    showError();
  }
};

//document.body.classList.add('dark-mode')



function toggleWidgetPanel() {
  const widgetPanel = document.querySelector(".widget-panel");
  //  widgetPanel.classList.toggle('visible');
  widgetPanel.classList.toggle("hidden");
}

const searchInput = document.querySelector(".search-bar input");
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".pinned-apps .app").forEach((app) => {
    const appName = app.textContent.toLowerCase();
    app.style.display = appName.includes(query) ? "block" : "none";
  });
});

function updateWallpaper() {
  const hour = new Date().getHours();
  const home = document.querySelector(".home");
  if (hour >= 6 && hour < 18) {
    home.style.backgroundImage = 'url("./asset/wallpaper-light.webp")';
    document.body.classList.remove('dark-mode');
  } else {
    home.style.backgroundImage = 'url("https://us-tuna-sounds-images.voicemod.net/26e013a6-98f4-47f8-aab4-739fb5aed16a-1660711033463.jpg")';
    document.body.classList.add('dark-mode')
  }
}
updateWallpaper();
setInterval(updateWallpaper, 3600000); // Update every hour

function toggleWidgetPanel() {
  const widgetPanel = document.querySelector(".widget-panel");
  // widgetPanel.classList.toggle('visible');
  //widgetPanel.classList.toggle("hidden");
}

actioncenterToggle = () => {
  actionCenter.classList.toggle("action-ctrl-hide");
  
  if (startBar.classList.contains('showStartBar')) {
    showStartBar()
  }
};

//////




