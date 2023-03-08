
let message= document.querySelector(".error");


if(message.innerHTML!="-"){
    let  myObject = {
        City : document.querySelector(".name").innerHTML,
        Temp : document.querySelector(".temp").innerHTML,
        Time : document.querySelector(".Time").innerHTML,
        Date : document.querySelector(".Date").innerHTML,
        Back : document.querySelector(".flex").style.backgroundImage,
        Desc : document.querySelector(".con").innerHTML,
        Btn  : document.querySelector(".submit").style.backgroundColor,
        icon : document.querySelector(".desc img").getAttribute("src"),
        loc  : document.querySelector(".loc").innerHTML,
        ETemp: document.querySelector(".ETemp").innerHTML,
        FLTemp: document.querySelector(".FLTemp").innerHTML,
        MinTemp: document.querySelector(".MinTemp").innerHTML,
        MaxTemp: document.querySelector(".MaxTemp").innerHTML,
        Hum  : document.querySelector(".Hum").innerHTML,
        Ws   : document.querySelector(".Ws").innerHTML
    }
    console.log(myObject);
    window.localStorage.setItem("myObject", JSON.stringify(myObject));
    // console.log("Ram Ram");
}
else{

    // console.log("Radhe Shyam");
    let newObject = JSON.parse(window.localStorage.getItem("myObject"));
    console.log(newObject);
    document.querySelector(".name").innerHTML= newObject.City;
    document.querySelector(".temp").innerHTML= newObject.Temp;
    document.querySelector(".Time").innerHTML= newObject.Time;
    document.querySelector(".Date").innerHTML= newObject.Date;
    document.querySelector(".flex").style.backgroundImage = newObject.Back;
    document.querySelector(".con").innerHTML= newObject.Desc;
    document.querySelector(".submit").style.backgroundColor= newObject.Btn;
    document.querySelector(".desc img").setAttribute("src", newObject.icon);
    document.querySelector(".loc").innerHTML= newObject.loc;
    document.querySelector(".ETemp").innerHTML= newObject.ETemp;
    document.querySelector(".FLTemp").innerHTML= newObject.FLTemp;
    document.querySelector(".MinTemp").innerHTML= newObject.MinTemp;
    document.querySelector(".MaxTemp").innerHTML= newObject.MaxTemp;
    document.querySelector(".Hum").innerHTML= newObject.Hum;
    document.querySelector(".Ws").innerHTML= newObject.Ws;
}