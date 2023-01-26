let nyan = document.getElementById('nyan');
let nyanBtn = document.getElementById('nyan-btn');
let audiobtn=document.querySelector(".audiobtn");
console.log(nyanBtn);
// nyan.load();
audiobtn.onclick=function(){
   if (nyan.paused && nyan.currentTime >= 0 && !nyan.ended) {
    nyanBtn.innerHTML=" <i class='fas fa-volume-up'></i>"; 
    console.log(nyanBtn);
    nyan.play();
     
   } else {
    nyanBtn.innerHTML=" <i class='fas fa-volume-off'></i>";
    nyan.pause();
     
   }
}
