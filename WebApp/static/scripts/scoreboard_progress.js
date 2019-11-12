var btm = document.getElementById("m");
  
btm.onclick = function() {

if (btm.innerHTML == "Activate Progress bar") {
    btm.innerHTML = "Deactivate Progress bar";
  } else {
    btm.innerHTML = "Activate Progress bar";
  }

var x = document.getElementById("myBar");

if(x.style.width == '100%') {
      x.style.width='0%';
      x.style.transition='1s';
      }
else {
	x.style.width='100%';
    x.style.transition='1s';
}

var x = document.getElementById("myBar2");

if(x.style.width == '60%') {
      x.style.width='0%';
      x.style.transition='1s';
      x.style.transitionDelay='.5s';
      }
else {
	x.style.width='60%';
    x.style.transition='1s';
    x.style.transitionDelay='.5s';
    
}

var x = document.getElementById("myBar3");

if(x.style.width == '30%') {
      x.style.width='0%';
      x.style.transition='1s';
      x.style.transitionDelay='1s';
      }
else {
	x.style.width='30%';
    x.style.transition='1s';
    x.style.transitionDelay='1s';

}

}