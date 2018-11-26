//----------------------Sets the title of all image elements to match the alt text to show tooltips on hover------------------------
let previews;
let allImages = document.getElementsByTagName("img");
let currentTheme = "Themes/Blank.jpg";
const slideContainer = document.getElementById("slideContainer");
let presentationMode = false;
let slidePreview = document.getElementById("slidePreview");
let notesToolbar = document.getElementById("speakerNotesToolbar");
let exportBtn = document.getElementById("exportSpeakerNotes");
let appcontainer = document.getElementById("appContainer");

let myTime;

let themes = [{
        name: "blank",
        font: "sans-serif",
        color: "lightslategray",
        img: "none",
        img2: "Themes/Blank.jpg",
        stroke: "none"
            },
    {
        name: "pastel",
        font: "serif",
        color: "White",
        img: "url('Themes/PastellGeometric.jpg')",
        img2: 'Themes/PastellGeometric.jpg',
        stroke: "#4a5243"
            },
    {
        name: "blueprint",
        font: "sans-serif",
        color: "White",
        img: "url('Themes/Blueprint.jpg')",
        img2: 'Themes/Blueprint.jpg',
        stroke: "#1d7cc0"
            },
    {
        name: "industrial",
        font: "Helvetica",
        color: "#2d373a",
        img: "url('Themes/ColdIndustrial.jpg')",
        img2: 'Themes/ColdIndustrial.jpg',
        stroke: "#FFFFFF"
            },
    {
        name: "gentle",
        font: "Book Antiqua",
        color: "#1e2622",
        img: "url('Themes/GentleMorning.jpg')",
        img2: 'Themes/GentleMorning.jpg',
        stroke: "none"
            },
    {
        name: "geometric",
        font: "serif",
        color: "White",
        img: "url('Themes/Geometric.jpg')",
        img2: 'Themes/Geometric.jpg',
        stroke: "#463212"
            }
        ]



function setImageTitle() {

    for (i = 0; i < allImages.length; i++) {
        allImages[i].title = allImages[i].alt;

    }
}

function disableDraggable() {
    for (i = 0; i < allImages.length; i++) {
        allImages[i].setAttribute("draggable", "false");
    }
}
//-------------------Simplified document.getElementById-------------------------
function get(id) {
    return document.getElementById(id);
}


//----------Changes the toolbar and styling to match what menu you want ----------------
function toolbarChange(event) {
    let textToolbar = document.getElementById("textToolbar");
    let speakerNotesToolbar = document.getElementById("speakerNotesToolbar");
    let imagesToolbar = document.getElementById("imagesToolbar");
    let templatesToolbar = document.getElementById("templatesToolbar");
    let slideSettingsToolbar = document.getElementById("slideSettingsToolbar");
    let stylesToolbar = document.getElementById("stylesToolbar");
    //-------hiding all Toolbars
    textToolbar.style.display = "none";
    speakerNotesToolbar.style.display = "none";
    imagesToolbar.style.display = "none";
    templatesToolbar.style.display = "none";
    slideSettingsToolbar.style.display = "none";
    stylesToolbar.style.display = "none";

    //------Resetting the size of the toolbar
    appContainer.style.gridTemplateColumns = "6% 15% 1fr";

    //---Resetting the white overlay on the icons
    get("textEditorIcon").style.filter = "";
    get("imageIcon").style.filter = "";
    get("templatesIcon").style.filter = "";
    get("stylesIcon").style.filter = "";
    get("speakerNotesIcon").style.filter = "";
    get("slideSettingsIcon").style.filter = "";

    get(event).style.filter = "brightness(3)";
    if (event == "textEditorIcon") {

        textToolbar.style.display = "block";

    } else if (event == "imageIcon") {
        imagesToolbar.style.display = "block";
        appContainer.style.gridTemplateColumns = "6% 20% 1fr";

    } else if (event == "templatesIcon") {
        templatesToolbar.style.display = "block";
        appContainer.style.gridTemplateColumns = "6% 18% 1fr";

    } else if (event == "stylesIcon") {
        stylesToolbar.style.display = "block";
        appContainer.style.gridTemplateColumns = "6% 21% 1fr";

    } else if (event == "speakerNotesIcon") {
        speakerNotesToolbar.style.display = "block";
        appContainer.style.gridTemplateColumns = "6% 25% 1fr";

    } else if (event == "slideSettingsIcon") {
        slideSettingsToolbar.style.display = "block";
        appContainer.style.gridTemplateColumns = "6% 16% 1fr";


    } else {

    }
    resizeSlideText();
}


//-------------Resizes text in the canvas based on the width of the element. Activates onload, on menuchange and on resize.------------
function resizeSlideText() {
    divWidht = get("slideContainer").offsetWidth;
    get("slideContainer").style.fontSize = divWidht + "px";

    //!!! New fontsize that scales fonts based on size of the miniDivs in the preview.
    miniDivWidht = get("newSlide").offsetWidth;
    get("slidePreview").style.fontSize = (miniDivWidht * 0.95) + "px";
    recalculatesize();

}


//-----------------------------Add fonts to the select menu!---------------------------------
function addFontMenu() {
    let fonts = ["Arial", "Helvetica", "Times New Roman", "Times", "Courier", "Courier New", "Verdana", "Georgia", "Garamond", "Bookman", "Palatino", "Comic Sans MS", "Trebuchet MS", "Arial Black", "Impact", "Montez", "Lobster", "Josefin Sans", "Shadows Into Light", "Pacifico", "Amatic SC", "Orbitron", "Rokkitt", "Righteous", "Dancing Script", "Bangers", "Chewy", "Sigmar One", "Architects Daughter", "Abril Fatface", "Covered By Your Grace", "Kaushan Script", "Gloria Hallelujah", "Satisfy", "Lobster Two", "Comfortaa", "Cinzel", "Courgette"];
    let fontSelect = document.getElementById("fontSelect");
    for (let i = 0; i < fonts.length; i++) {
        var fontOption = document.createElement('option');
        fontOption.value = fontOption.innerHTML = fonts[i];
        fontOption.style.fontFamily = fonts[i];
        fontSelect.add(fontOption);
    }
}

let time = "";
let xTime = "";
let checkBox = "";

function fullscreenPresentation() {
    time = document.getElementById("timedSlide").value;
    xTime = time * 1000;
    checkBox = document.getElementById("toggleTime");


    if (checkBox.checked) {
        myTime = setInterval(nextSlide, xTime);
    }

    if (slideContainer.requestFullscreen) {
        slideContainer.requestFullscreen();

    } else if (slideContainer.mozRequestFullScreen) {
        slideContainer.mozRequestFullScreen();

    } else if (slideContainer.webkitRequestFullscreen) {
        slideContainer.webkitRequestFullscreen();

    } else if (slideContainer.msRequestFullscreen) {
        slideContainer.msRequestFullscreen();

    }

}
//Separate fullscreen for the presenter mode 
function fullscreenPresentation2() {
    time = window.opener.document.getElementById("timedSlide").value;
    xTime = time * 1000;
    checkBox = window.opener.document.getElementById("toggleTime");
    if (checkBox.checked) {
        myTime = setInterval(window.opener.nextSlide, xTime);
    }
    
    if (slideContainer.requestFullscreen) {
        slideContainer.requestFullscreen();

    } else if (slideContainer.mozRequestFullScreen) {
        slideContainer.mozRequestFullScreen();

    } else if (slideContainer.webkitRequestFullscreen) {
        slideContainer.webkitRequestFullscreen();

    } else if (slideContainer.msRequestFullscreen) {
        slideContainer.msRequestFullscreen();

    }

}


function changeTheme(event) {

    //!!! If the amount of themes reach double digits this needs to change
    let i = event.target.id.slice(-1);
    if (isNaN(i)) {
        //If you click outside the box, nothing happens
    } else {
        slideContainer.style.backgroundImage = themes[i].img;
        slideContainer.style.color = themes[i].color;
        slideContainer.style.fontFamily = themes[i].font;
        slideContainer.style.textShadow = "-0.05vw -0.05vw 0" + themes[i].stroke + ",0.05vw -0.05vw 0" + themes[i].stroke + ",0.05vw 0.05vw 0" + themes[i].stroke + ",0.05vw 0.05vw 0" + themes[i].stroke;
        currentTheme = themes[i].img2;



        displaySlidePreview();

    }
    if (themes[i].stroke == "none") {
        slideContainer.style.textShadow = "none";

    }

}
slides = document.getElementsByClassName("slide");



function displaySlidePreview() {
    let elements = document.getElementsByClassName("miniSlide");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    for (let i = 0; i < slides.length; i++) {

        let div = document.createElement("div");
        let slideNumber = document.createElement("p");
        let background = document.createElement("img");
        let deleteBtn = document.createElement("img");
        let notes = div.id = "slidePreview" + i;

        div.classList.add("whilepresenting");
        div.classList.add("miniSlide");

        slideNumber.innerHTML = "Slide " + (i + 1);
        slideNumber.className = "slideNumber";

        background.className = "miniSlideBackground";
        background.src = currentTheme;

        deleteBtn.src = "Icons/Delete.png";
        deleteBtn.alt = "Delete slide";
        deleteBtn.className = "deleteSlide";
        deleteBtn.id = "delete" + i;
        deleteBtn.onclick = deleteSlide;


        div.innerHTML = slideContainer.children[i].innerHTML;
        div.onclick = jumpToSlide;
        div.appendChild(slideNumber);
        div.appendChild(background);
        div.appendChild(deleteBtn);
        slidePreview.appendChild(div);
    }
    //---- Match style of preview to style of slide. -----
    previews = document.querySelectorAll(".miniSlide");

    for (let p = 0; p < previews.length; p++) {
        previews[p].style.color = slideContainer.style.color;
        previews[p].style.fontFamily = slideContainer.style.fontFamily;
        previews[p].style.textShadow = slideContainer.style.textShadow;
        previews[p].classList.add(slides[p].classList[1]);

    }

    //---- Disable contentEditable on previews -------------

    let allText = slidePreview.querySelectorAll("h1, h2, text")
    for (let i = 0; i < allText.length; i++) {
        allText[i].setAttribute("contenteditable", "false");
    }
    displaySlideCounter();
    disableDraggable();
}



//------Creating slide-specific speaker notes -----

function createSlideNotes() {

    let notesContainer = document.createElement("div");
    let notes = slideNumber = document.createElement("TEXT");

    notes.innerHTML = "Slide " + (totalSlides + 1) + " notes:";
    notes.setAttribute("contentEditable", "true");

    notesContainer.id = "slideNotes" + totalSlides;
    notesContainer.className = "textBox";
    notesContainer.appendChild(notes);
    notesToolbar.insertBefore(notesContainer, exportBtn);


}

function displayCurrentNotes() {
    let allNotes = document.querySelectorAll(".textBox");
    for (let i = 0; i < allNotes.length; i++) {
        allNotes[i].style.display = "none";
    }
    allNotes[actualSlideIndex].style.display = "block";
}



function displaySlideCounter() {

    let slideCounter = document.getElementById("slideNumber");
    slideCounter.innerHTML = "Slide " + (Number(actualSlideIndex) + 1) + " / " + (totalSlides + 1);

    let previewID = document.getElementById("slidePreview" + actualSlideIndex);
    previewID.style.border = "2px solid black";
    previewID.style.boxShadow = "5px 7px 50px 1px rgba(0, 0, 0, 0.4)";

}

let noteString = "";

function gatherPresenterNotes() {
    noteString = "";
    let allNoteData = document.querySelectorAll(".textBox");

    for (let i = 0; i < allNoteData.length; i++) {
        noteString += "\r\n \r\n" + allNoteData[i].firstChild.innerHTML;

    }
}

function exportPresenterNotes() {

    gatherPresenterNotes();
    let fileName = "PlaceholderFilename";
    let newFile = document.createElement('a');
    //Replaces all unwanted divs and replaces with a linebreak
    noteString = noteString.replace(/<div>/g, '\r\n');
    //Replaces all other html-specific characters.
    noteString = noteString.replace(/<[^>]*>/g, '');
    //Removes nonebreakingspace notation in the string.
    noteString = noteString.replace(/&nbsp;/g, '');
    //Removes the first two linebreaks.
    noteString = noteString.slice(4);

    newFile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(noteString));
    newFile.setAttribute('download', fileName);
    document.body.appendChild(newFile);
    newFile.click();
    document.body.removeChild(newFile);

    for (let i = 0; i < allNoteData.length; i++) {
        noteString += "\r\n \r\n" + allNoteData[i].firstChild.innerHTML;

    }
}
//Function to (Hopefully) remove the stuttering icons issue.
function disableContentEditable() {
    let allText = document.querySelectorAll("h1, h2, text")
    for (let i = 0; i < allText.length; i++) {
        allText[i].setAttribute("contenteditable", "false");
    }
}
if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', startpresenting, false);
    document.addEventListener('mozfullscreenchange', startpresenting, false);
    document.addEventListener('fullscreenchange', startpresenting, false);
    document.addEventListener('MSFullscreenChange', startpresenting, false);
}
//various values to start presentermode
var presenterModeRun = false;
var newWindow = "";
//Initializing the presentermode when you click on the presentermode icon.
function startPresenterMode() {
    let container = slideContainer.outerHTML;
    newWindow = window.open("", "", "width=200,height=100");
    let doc = newWindow.document;
    presenterModeRun = true;
    runInitPresenterMode(doc, container);
    toolbarChange("speakerNotesIcon");

    newWindow.onbeforeunload = function () {
        presenterModeRun = false;
        newWindow = "";
    }

    newWindow.onload = function () {
        newWindow.disableContentEditable();
        //console.log(window.opener);
    }
}


function runInitPresenterMode(doc, container) {
    doc.open();
    doc.write('<html><head><title>Presenter mode</title><link rel="stylesheet" type="text/css" href="Application.css"><link rel="stylesheet" type="text/css" href="presentermode.css"><link rel="stylesheet" type="text/css" href="template.css"></head><body>');
    doc.write(container);
    doc.write('<img src="Icons/Fit_to_Width.png" alt="Fullscreen presentation" id="fullscreenIcon" onclick="fullscreenPresentation2()">');
    doc.write('<script src="control.js"></script><script src="richtext.js"></script><script src="frontEnd.js"></script><script src="template.js"></script><script src="template.js"></script>');
    doc.write('</body></html>');
    doc.close();
    toolbarChange("speakerNotesIcon");

}

function loadScripts() {
    get("textEditorIcon").style.filter = "brightness(3)";
    addFontMenu();
    resizeSlideText();
    setImageTitle();
    displaySlidePreview();
    disableDraggable();
    createSlideNotes();
    displayCurrentNotes();
    clickTemplate2();
}
