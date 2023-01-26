
    let  startBtn=document.querySelector(".startgamebtn");
    startBtn.onclick=function(){
        let userNameIndex=document.querySelector("#username").value;
        sessionStorage.setItem('UserNameIndexPage',userNameIndex);
        // userNameIndex.clear();
        console.log("us",userNameIndex);
              
    }
 