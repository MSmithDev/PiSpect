function AdeptUtils(adeptMonitor) {
  this.mon = adeptMonitor;

  //state variables
  this.ipAddress = "0.0.0.0";

  this.posJ = {
    J1: -1,
    J2: -1,
    J3: -1,
    J4: -1
  };

  this.posXYZ = {
    Y: -1,
    X: -1,
    Z: -1
  };

  this.posPYR = {
    P: -1,
    Y: -1,
    R: -1
  }

  this.posBaseTransform = {
    X: 0,
    Y: 0,
    Z: 0,
    R: 0
  };

  this.posToolTransform = {
    X: 0,
    Y: 0,
    Z: 0,
    R: 0
  };

  this.status = {
    isHighPowerEnabled: false,
    isCalibrated: false,
    isExecuting: false,
    isNfsConnected: false
  };
}

// Get Status msg
AdeptUtils.prototype.updateStatus= function() {
  this.mon.write("STATUS\n\r");
  return this.mon.read();
};

// parse Status msg
AdeptUtils.prototype.parseStatusMsg = function(statusMsg) {};


// Calibrate robot
AdeptUtils.prototype.calibrate = function() {
this.mon.writeLn("CALIBRATE");
};

AdeptUtils.prototype.updatePos = function(poses) {
typeof(poses.J1) !== "undefined" ? this.posJ.J1 = poses.J1 : console.warn("updatePos missing J1")
typeof(poses.J2) !== "undefined" ? this.posJ.J2 = poses.J2 : console.warn("updatePos missing J2")
typeof(poses.J3) !== "undefined" ? this.posJ.J3 = poses.J3 : console.warn("updatePos missing J3")
typeof(poses.J4) !== "undefined" ? this.posJ.J4 = poses.J4 : console.warn("updatePos missing J4")

typeof(poses.X) !== "undefined" ? this.posXYZ.X = poses.X : console.warn("updatePos missing X")
typeof(poses.Y) !== "undefined" ? this.posXYZ.Y = poses.Y : console.warn("updatePos missing Y")
typeof(poses.Z) !== "undefined" ? this.posXYZ.Z = poses.Z : console.warn("updatePos missing Z")

typeof(poses.Pitch) !== "undefined" ? this.posPYR.P = poses.Pitch : console.warn("updatePos missing Pitch")
typeof(poses.Yaw) !== "undefined" ? this.posPYR.Y = poses.Yaw : console.warn("updatePos missing Yaw")
typeof(poses.Roll) !== "undefined" ? this.posPYR.R = poses.Roll : console.warn("updatePos missing Roll")

};







