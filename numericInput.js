
  const numericInput0 = document.getElementById('numericInput0');
  const numericInput1 = document.getElementById('numericInput1');
  const numericInput2 = document.getElementById('numericInput2');
  const numericInput3 = document.getElementById('numericInput3');
  const numericInput4 = document.getElementById('numericInput4');
  const numericInput5 = document.getElementById('numericInput5');
  const numericInput6 = document.getElementById('numericInput6');
  const numericInput7 = document.getElementById('numericInput7');
  const numericInput8 = document.getElementById('numericInput8');
  const numericInput9 = document.getElementById('numericInput9');
  const numericInputDot = document.getElementById('numericInputDot');
  const numericInputBPS = document.getElementById('numericInputBSP');
  
  
  numericInput0.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "0"
    
});

numericInput1.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "1"
    
});

numericInput2.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "2"
});

numericInput3.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "3"
});

numericInput4.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "4"
});

numericInput5.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "5"
});

numericInput6.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "6"
});

numericInput7.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "7"
});

numericInput8.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "8"
});

numericInput9.addEventListener('click', function(event){
    lastTouchedInput.value = lastTouchedInput.value + "9"
});
  
numericInputDot.addEventListener('click', function(event){

    if(!lastTouchedInput.value.includes(".")){

    lastTouchedInput.value = lastTouchedInput.value + "."
    }
});

numericInputBSP.addEventListener('click', function(event){
    lastTouchedInput.value = removeLastChar(lastTouchedInput.value)
});

function removeLastChar(str) {
    return str.substring(0, str.length - 1);
}


const testme1 = document.getElementById('testme1');
const testme2 = document.getElementById('testme2');

testme1.addEventListener('click', function(event){
   lastTouchedInput = testme1;
});

testme2.addEventListener('click', function(event){
    lastTouchedInput = testme2;
});