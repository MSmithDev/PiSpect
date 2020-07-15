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
  port.write('PRE-0.250\r');
});

const presetP2 = document.getElementById("presetP2");
presetP2.addEventListener("click", function(event) {
  port.write('PRE-0.500\r');
});

const presetP3 = document.getElementById("presetP3");
presetP3.addEventListener("click", function(event) {
  port.write('PRE-1.000\r');
});

const presetP4 = document.getElementById("presetP4");
presetP4.addEventListener("click", function(event) {
  port.write('PRE-1.250\r');
});

const presetP5 = document.getElementById("presetP5");
presetP5.addEventListener("click", function(event) {
  port.write('PRE-1.437\r');
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

//////////////
var numpad = {
  /* [INIT - DRAW THE ON-SCREEN NUMPAD] */
  selector : null, // will hold the entire on-screen numpad
  display : null, // will hold the numpad display
  zero : null, // will hold the zero button
  dot : null, // will hold the dot button
  init : function () {
    // CREATE THE NUMPAD
    numpad.selector = document.createElement("div");
    numpad.selector.id = "numpad-back";
    var wrap = document.createElement("div");
    wrap.id = "numpad-wrap";
    numpad.selector.appendChild(wrap);

    // ATTACH THE NUMBER DISPLAY
    numpad.display = document.createElement("input");
    numpad.display.id = "numpad-display";
    numpad.display.type = "text";
    numpad.display.readOnly = true;
    wrap.appendChild(numpad.display);

    // ATTACH BUTTONS
    var buttons = document.createElement("div"),
        button = null,
        append = function (txt, fn, css) {
          button = document.createElement("div");
          button.innerHTML = txt;
          button.classList.add("numpad-btn");
          if (css) {
            button.classList.add(css);
          }
          button.addEventListener("click", fn);
          buttons.appendChild(button);
        };
    buttons.id = "numpad-btns";
    // First row - 7 to 9, delete.
    for (var i=7; i<=9; i++) {
      append(i, numpad.digit);
    }
    append("&#10502;", numpad.delete, "ng");
    // Second row - 4 to 6, clear.
    for (var i=4; i<=6; i++) {
      append(i, numpad.digit);
    }
    append("C", numpad.reset, "ng");
    // Third row - 1 to 3, cancel.
    for (var i=1; i<=3; i++) {
      append(i, numpad.digit);
    }
    append("&#10006;", numpad.hide, "cx");
    // Last row - 0, dot, ok
    append(0, numpad.digit, "zero");
    numpad.zero = button;
    append(".", numpad.dot);
    numpad.dot = button;
    append("&#10004;", numpad.select, "ok");
    // Add all buttons to wrapper
    wrap.appendChild(buttons);
    document.body.appendChild(numpad.selector);
  },

  /* [ATTACH TO INPUT] */
  attach : function (opt) {
  // attach() : attach numpad to target input field

    var target = document.getElementById(opt.id);
    if (target!=null) {
      // APPEND DEFAULT OPTIONS
      if (opt.readonly==undefined || typeof opt.readonly!="boolean") { opt.readonly = true; }
      if (opt.decimal==undefined || typeof opt.decimal!="boolean") { opt.decimal = true; }
      if (opt.max==undefined || typeof opt.max!="number") { opt.max = 16; }

      // SET READONLY ATTRIBUTE ON TARGET FIELD
      if (opt.readonly) { target.readOnly = true; }

      // ALLOW DECIMALS?
      target.dataset.decimal = opt.decimal ? 1 : 0;

      // MAXIMUM ALLOWED CHARACTERS
      target.dataset.max = opt.max;

      // SHOW NUMPAD ON CLICK
      target.addEventListener("click", numpad.show);
    } else {
      console.log(opt.id + " NOT FOUND!");
    }
  },

  target : null, // contains the current selected field
  dec : true, // allow decimals?
  max : 16, // max allowed characters
  show : function (evt) {
  // show() : show the number pad

    // Set current target field
    numpad.target = evt.target;

    // Show or hide the decimal button
    numpad.dec = numpad.target.dataset.decimal==1;
    if (numpad.dec) {
      numpad.zero.classList.remove("zeroN");
      numpad.dot.classList.remove("ninja");
    } else {
      numpad.zero.classList.add("zeroN");
      numpad.dot.classList.add("ninja");
    }

    // Max allowed characters
    numpad.max = parseInt(numpad.target.dataset.max);

    // Set display value
    var dv = evt.target.value;
    if (!isNaN(parseFloat(dv)) && isFinite(dv)) {
      numpad.display.value = dv;
    } else {
      numpad.display.value = "";
    }

    // Show numpad
    numpad.selector.classList.add("show");
  },

  hide : function () {
  // hide() : hide the number pad

    numpad.selector.classList.remove("show");
  },

  /* [BUTTON ONCLICK ACTIONS] */
  delete : function () {
  // delete() : delete last digit on the number pad

    var length = numpad.display.value.length;
    if (length > 0) {
      numpad.display.value = numpad.display.value.substring(0, length-1);
    }
  },

  reset : function () {
  // reset() : reset the number pad

    numpad.display.value = "";
  },

  digit : function (evt) {
  // digit() : append a digit

    var current = numpad.display.value,
        append = evt.target.innerHTML;

    if (current.length < numpad.max) {
      if (current=="0") {
        numpad.display.value = append;
      } else {
        numpad.display.value += append;
      }
    }
  },

  dot : function () {
  // dot() : add the decimal point (only if not already appended)

    if (numpad.display.value.indexOf(".") == -1) {
      if (numpad.display.value=="") {
        numpad.display.value = "0.";
      } else {
        numpad.display.value += ".";
      }
    }
  },

  select : function () {
  // select() : select the current number

    var value = numpad.display.value;

    // No decimals allowed - strip decimal
    if (!numpad.dec && value%1!=0) {
      value = parseInt(value);
    }

    // Put selected value to target field + close numpad
    numpad.target.value = value;
    numpad.hide();
  }
};

/* [INIT] */
window.addEventListener("load", numpad.init);

const demonumpad = document.getElementById("demo-numpad-1");
const setPresetToVal = document.getElementById("setPresetToVal");
setPresetToVal.addEventListener("click", function(event) {
  
  port.write('PRE-'+demonumpad.value+'\r');
});