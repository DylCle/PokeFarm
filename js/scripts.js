function myFunction(){
    let element = document.getElementById("myTopnav");
    if(element.className === "topnav"){
        element.className += " responsive";
    }else{
        element.className = "topnav";
    }
  
}