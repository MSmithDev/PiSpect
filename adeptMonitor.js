function AdeptMonitor(port, baud) {
  this.serialPort = new SerialPort(port, {
    baudRate: baud
  });
}

//Prints a single line with return chars
AdeptMonitor.prototype.write = function(string) {
  this.serialPort.write(string);
};

//Prints a single line with return chars
AdeptMonitor.prototype.writeLn = function(string) {
  this.serialPort.write(string + "\n\r");
};


///////// Prototypes for all adept monitor commands /////////

//Base ()


// Get Base 
AdeptMonitor.prototype.writeLn = function(string) {
    this.serialPort.write(string + "\n\r");
  };

  // updateCurrentPos: Get current robot position xyz and joint
AdeptMonitor.prototype.getCurrentPosition = function() {
  //this.serialPort.write("WHERE\n\r");
  //resp =  this.serialPort.read();
  //Temp string for testing
  resp = "Robot 1: X mm Y mm Z mm y p r Hand 200.000 175.000 390.000 0.000 180.000 0.000 1.00 0 J1 J2 J3 J4 J5 J6 -19.491 141.839 4.000 -57.653 ."
  resp2 = resp.split(':').join('').split(" ");
  
  console.log(resp2)
  resp3 = {
    Robot: resp2[1],
    X: Number(resp2[12]),
    Y: Number(resp2[13]),
    Z: Number(resp2[14]),
    Yaw: Number(resp2[15]),
    Pitch: Number(resp2[16]),
    Roll: Number(resp2[17]),
    Hand: Number(resp2[18]),
    J1: Number(resp2[26]),
    J2: Number(resp2[27]),
    J3: Number(resp2[28]),
    J4: Number(resp2[29])
  }
  return resp3
};


AdeptMonitor.prototype.getCalibrationStatus = function() {

  temp = "NOT.CALIBRATED       1"
  resp = temp.replace(/\s+/g,' ').trim(); //Working method of formatting string
  resp2 = resp.split(':').join('').split(" ");
  console.log("cal Status db: " + resp)
  console.log("cal Status db: " + resp2[1])
  if(resp2[1] == 0){
    return true;
  }
  else {
    return false;
  }
};





