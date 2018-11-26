
var dataInput = 0;
var iFWidth = "100%";
var iFHeight = "100%";
var iMWidth = "100%";
var iMHeight = "100%";

// Tests if the link is a youtube link (that it contains the value of https://www.youtube.com/embed), if it doesn't contain embed it will check if it contains /watch or .be instead, in which case it will change the link to a youtube embed link.
function testYoutube() {
    let testYoutube = document.getElementById("createVideo").value.indexOf("https://www.youtube.com/embed");
    let testYoutubeW = document.getElementById("createVideo").value.indexOf("https://www.youtube.com/watch");
    let testYoutubeBE = document.getElementById("createVideo").value.indexOf("youtu.be/");
    if (testYoutube == -1 && testYoutubeW == -1 && testYoutubeBE == -1) {
        console.log("Not a valid youtube link!");
    }
    else if(testYoutubeW != -1 && testYoutube == -1) {
        
        dataInput = document.getElementById("createVideo").value;
        dataInputConvert = dataInput.substr(32);
        dataInput = "https://www.youtube.com/embed/"+dataInputConvert;
        
        prepareFrame();        
}
else if(testYoutubeBE != -1 && testYoutube == -1) {
    dataInput = document.getElementById("createVideo").value;
    dataInputConvert = dataInput.substr(16);
    dataInput = "https://www.youtube.com/embed/"+dataInputConvert+"?ecver=2";
    prepareFrame();        
}
    else {
        dataInput = document.getElementById("createVideo").value;
        prepareFrame();
    }
}
//Testing Soundcloud if it is a valid soundcloud embed link.
function testEitherSou() {
    let testEmbedSound = document.getElementById("createSound").value.indexOf('src="https://w.soundcloud.com/player/'); //the import in this one is a full embed link with a bunch of modifiers already in place.
    if (testEmbedSound == -1) {
        console.log("Not a valid soundcloud embed link!");
    }
    else {
        let soundCloudIn = document.getElementById("createSound").value;
        let soundCloudInSlice = soundCloudIn.slice(32);
        let soundCloudInput = '<iframe width="100%" height="100%"'+soundCloudInSlice;
        let ID = function () {return '_' + Math.random().toString(36).substr(2, 9);};
        setID = ID();
        id = setID;
        createmediabox2(soundCloudInput, "0%" , "0%", id+"1");

    }
}
    
// This function just tests if there is anything written in the image and video fields
//just so you don't run parts of the code unnecessarily.
function testEitherImg() {
    if (document.getElementById("createImage").value.length != 0)
        {
            dataInput = document.getElementById("createImage").value;
            prepareImg();
        } 
}

function testEitherVid() {
    if (document.getElementById("createVideo").value.length != 0)
        {
            testYoutube();
            
}}
   
// This function creates a youtube video, probably want to change the thing it appends to for real integration but for now its ok.
function prepareFrame() {
        
        let ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", dataInput);
        let ID = function () {return '_' + Math.random().toString(36).substr(2, 9);};
        setID = ID();
        id = setID;
        ifrm.setAttribute("id", id);
        ifrm.setAttribute("allowfullscreen", "allowfullscreen");
        ifrm.style.width = iFWidth;
        ifrm.style.height = iFHeight;
        //initialPlacement.appendChild(ifrm); //Videos are placed.
        createmediabox(ifrm, "0%" , "0%", id+"1");     
}

//This function makes an image element with imgur elements, probably want to change the thing it appends to for real integration but for now its ok.
function prepareImg() {
        let imgFr = document.createElement("img");
        console.log(dataInput);
        imgFr.setAttribute("src", dataInput);
        console.log(dataInput);
        imgFr.style.width = iMWidth;
        imgFr.style.height = iMHeight;
        //initialPlacement.appendChild(imgFr);//where the images are placed
        let ID = function () {return '_' + Math.random().toString(36).substr(2, 9);};
        setID = ID();
        id = setID;
        console.log(id);
        imgFr.setAttribute("id", id);
        console.log(imgFr);
        createpicturebox(imgFr, "0%", "0%", id+"1");
}

//Initialize Starting State
function initState() {
    let imgForm = document.createElement("form");
    imgForm.setAttribute("id", "imgUploadForm");
    let vidForm = document.createElement("form");
    vidForm.setAttribute("id", "vidUploadForm");
    let souForm = document.createElement("form");
    souForm.setAttribute("id", "souUploadForm");

    let createInput1 = document.createElement("INPUT");
    createInput1.setAttribute("type", "text");
    createInput1.setAttribute("id", "createImage");
    createInput1.setAttribute("placeholder", "Insert Image Link");
    imgForm.appendChild(createInput1);
    

    let createBtn1 = document.createElement("Button");
    createBtn1.setAttribute("type", "Button");
    createBtn1.setAttribute("id", "imgEvent");
    createBtn1.appendChild(document.createTextNode("Import Image"));
    imgForm.appendChild(createBtn1);
    createBtn1.onclick = function() {testEitherImg()};
   

    let createInput2 = document.createElement("INPUT");
    createInput2.setAttribute("type", "text");
    createInput2.setAttribute("id", "createVideo");
    createInput2.setAttribute("placeholder", "Insert youtube link");
    vidForm.appendChild(createInput2);
    
 

    let createBtn2 = document.createElement("Button");
    createBtn2.setAttribute("type", "Button");
    createBtn2.setAttribute("id", "vidEvent");
    createBtn2.appendChild(document.createTextNode("Import Video"));
    vidForm.appendChild(createBtn2);
    createBtn2.onclick = function() {testEitherVid()};
    
    let createInput3 = document.createElement("INPUT");
    createInput3.setAttribute("type", "text");
    createInput3.setAttribute("id", "createSound");
    createInput3.setAttribute("placeholder", "Embed soundcloud Link");
    souForm.appendChild(createInput3);
    
   

    let createBtn3 = document.createElement("Button");
    createBtn3.setAttribute("type", "Button");
    createBtn3.setAttribute("id", "souEvent");
    createBtn3.appendChild(document.createTextNode("Import Sound"));
    souForm.appendChild(createBtn3);
    createBtn3.onclick = function() {testEitherSou()};


    document.getElementById("imagesToolbar").appendChild(imgForm);
    document.getElementById("imagesToolbar").appendChild(vidForm);
    document.getElementById("imagesToolbar").appendChild(souForm);
}

initState();
