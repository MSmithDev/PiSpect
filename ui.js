const { ipcRenderer } = require("electron");
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
//Tabs
openTab("mainTab");
const mainTab = document.getElementById("mainTabButton");
mainTab.className += " active";
const moveTab = document.getElementById("moveTabButton");
const monitorTab = document.getElementById("monitorTabButton");
const visionTab = document.getElementById("visionTabButton");
const gcodeTab = document.getElementById("gcodeTabButton");
const optionsTab = document.getElementById("optionsTabButton");
const exitTab = document.getElementById("exitTabButton");

mainTab.addEventListener("click", function(event) {
  openTab("mainTab");
  mainTab.className += " active";
});
moveTab.addEventListener("click", function(event) {
  openTab("moveTab");
  moveTab.className += " active";
});
monitorTab.addEventListener("click", function(event) {
  openTab("monitorTab");
  monitorTab.className += " active";
});
visionTab.addEventListener("click", function(event) {
  openTab("visionTab");
  visionTab.className += " active";
});
gcodeTab.addEventListener("click", function(event) {
  openTab("gcodeTab");
  gcodeTab.className += " active";
});
optionsTab.addEventListener("click", function(event) {
  openTab("optionsTab");
  optionsTab.className += " active";
});
exitTab.addEventListener("click", function(event) {
  openTab("exitTab");
  exitTab.className += " active";
});

function openTab(tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "flex";
}

//Exit Tab

const exitApp = document.getElementById("exitApp");
exitApp.addEventListener("click", function(event) {
  console.log("Quit");
  console.log(ipcRenderer.send("exit-app", "ping"));
});

const topBarIco1svg = document.getElementById("topBarIco1svg");
const topBarIco2svg = document.getElementById("topBarIco2svg");
const topBarIco1svgCss = document.getElementsByClassName("icon-power");

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

console.log("CLASSNAME SVG 1 : " + topBarIco1svg.className);
const highPowerStatusWatch = async () => {
  while (true) {
    await sleep(900);
    console.log("hi hi");

    if (topBarIco1svg.classList.contains("icon-power-red")){
    topBarIco1svg.classList.remove("icon-power-red");
    topBarIco1svg.classList.add("icon-power-yellow");
  }else {
    topBarIco1svg.classList.add("icon-power-red");
    topBarIco1svg.classList.remove("icon-power-yellow");
  }
  }
}

highPowerStatusWatch();

const monitorStatusWatch = async () => {
  while (true) {
    await sleep(1000);
    topBarIco2svg.style.display == "none"
      ? (topBarIco2svg.style.display = "block")
      : (topBarIco2svg.style.display = "none");
  }
};

monitorStatusWatch();

const dataConnectionStatusWatch = async () => {
  while (true) {
    await sleep(1100);
    topBarIco2svg.style.color == "red"
      ? (topBarIco3svg.style.display = "yellow")
      : (topBarIco3svg.style.display = "red");
    
  }
};

dataConnectionStatusWatch();





////////////////////////


function calibrateOverlayOn() {
  document.getElementById("overlay-calibration").style.display = "block";
}

function calibrateOverlayOff() {
  document.getElementById("overlay-calibration").style.display = "none";
}
//calibrateOverlayOn();



mds = document.getElementById('mdss')

cats = 1
const calibrateOverlay = async () => {
  while (true) {
    await sleep(0);
    
    //mds.setAttribute('style','transform:rotate(180deg)');
    cats > 360 ? cats = 0 : cats = cats + 1
   
    mds.style.transform = "rotate("+cats+"deg)"


  }
};

//calibrateOverlay();

currentMeasurement = 'n/a';
LastMeasurement = 'n/a';
const port = new SerialPort('/dev/ttyUSB0', { 
  baudRate: 4800,
  dataBits: 7,
  stopBits: 1,
  parity: 'even'
})

//setInterval(function(){ port.write('?'); }, 800);
setInterval(function(){ port.write('MOD?\r'); }, 1000);

const curPos = document.getElementById("curPos");
const lastPos = document.getElementById("lastPos");
const curMode = document.getElementById("curMode");
const diffPos = document.getElementById("diffPos");
// Read data that is available but keep the stream in "paused mode"
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', function(data){
  parseReply(data);
  // curPos.innerHTML = data;
})

function parseReply(msg) 
{

  switch(msg){
    case "NOR":
      updateMode("Normal");
      break;
    case "DIA":
      updateMode("Diameter");
      break;
    case "MIN":
      updateMode("Minimum");
      break;
    case "MAX":
      updateMode("Maximum");
      break;
    case "DEL":
      updateMode("Delta");
      break;
    case "AXI":
      updateMode("AXI");
      break;
      

    default:
      console.log("unknown: " + msg);
      //assume measurement
      LastMeasurement = currentMeasurement;
      currentMeasurement = msg;
      curPos.innerHTML = currentMeasurement;
      lastPos.innerHTML = LastMeasurement;
      if(lastPos != '') {
        diffPos.innerHTML = (parseFloat(currentMeasurement) - parseFloat(LastMeasurement)).toFixed(5) + '"';
      }

  }


}



function updateMode(mode){
  curMode.innerHTML = mode;
}

const setModeNormal = document.getElementById("setModeNormal");
setModeNormal.addEventListener("click", function(event) {
  port.write('NOR\r');
});

const setModeMin = document.getElementById("setModeMin");
setModeMin.addEventListener("click", function(event) {
  port.write('MIN\r');
});

const setModeMax = document.getElementById("setModeMax");
setModeMax.addEventListener("click", function(event) {
  port.write('Max\r');
});

const setModeDelta = document.getElementById("setModeDelta");
setModeDelta.addEventListener("click", function(event) {
  port.write('DEL\r');
});

const setModeDiameter = document.getElementById("setModeDiameter");
setModeDiameter.addEventListener("click", function(event) {
  port.write('DIA\r');
});




//Preset Heights
const reference = document.getElementById("reference");
reference.addEventListener("click", function(event) {
  port.write('PRE+0.000\r');
  
  
});

const presetP1 = document.getElementById("presetP1");
presetP1.addEventListener("click", function(event) {
  port.write('PRE+0.250\r');
});

const presetP2 = document.getElementById("presetP2");
presetP2.addEventListener("click", function(event) {
  port.write('PRE+0.500\r');
});

const presetP3 = document.getElementById("presetP3");
presetP3.addEventListener("click", function(event) {
  port.write('PRE+1.000\r');
});

const presetP4 = document.getElementById("presetP4");
presetP4.addEventListener("click", function(event) {
  port.write('PRE+1.250\r');
});

const presetP5 = document.getElementById("presetP5");
presetP5.addEventListener("click", function(event) {
  port.write('PRE+1.437\r');
});





//Auto Heights
const moveHeightZero = document.getElementById("moveHeightZero");
moveHeightZero.addEventListener("click", function(event) {
  port.write('POS+0.000\r');
});

const moveHeight1 = document.getElementById("moveHeight1");
moveHeight1.addEventListener("click", function(event) {
  port.write('POS+1.000\r');
});

const moveHeight2 = document.getElementById("moveHeight2");
moveHeight2.addEventListener("click", function(event) {
  port.write('POS+2.000\r');
});

const moveHeight3 = document.getElementById("moveHeight3");
moveHeight3.addEventListener("click", function(event) {
  port.write('POS+3.000\r');
});

const moveHeight4 = document.getElementById("moveHeight4");
moveHeight4.addEventListener("click", function(event) {
  port.write('POS+4.000\r');
});




// adeptUtils = new AdeptUtils(adeptMonitor);
// console.log("util X pos: " + adeptUtils.posXYZ.X)
// adeptUtils.updatePos(adeptMonitor.getCurrentPosition());
// console.log("util X pos: " + adeptUtils.posXYZ.X)