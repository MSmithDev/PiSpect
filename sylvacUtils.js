function sylvacUtils(SerialPort) {
   this.port = SerialPort
}


sylvacSerial.prototype.write = function(string) {
    this.port.write(string + '\r');
  };

sylvacUtils.prototype.getMode = function(){
    this.port.write('MOD?\r');
}



