//----------------------Sets the title of all image elements to match the alt text to show tooltips on hover------------------------
function setImageTitle() {
    let allImages = document.getElementsByTagName("img");
    for (i = 0; i < allImages.length; i++) {
        allImages[i].title = allImages[i].alt;
   
    }
}

function disableDraggable() {
    let allImages = document.getElementsByTagName("img");
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
    let appcontainer = document.getElementById("appContainer");
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

//------------------Fullscreen------------------

        const slideContainer = document.getElementById("slideContainer");
        let presentationMode = false;


function fullscreenPresentation() {

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
let currentTheme = "Themes/Blank.jpg";

function changeTheme(event) {
    //!!! If the amount of themes reach double digits this needs to change
    var i = event.target.id.slice(-1);
    if (isNaN(i)) {
        //If you click outside the box, nothing happens
    } else {
        slideContainer.style.backgroundImage = themes[i].img;
        slideContainer.style.color = themes[i].color;
        slideContainer.style.fontFamily = themes[i].font;
        slideContainer.style.textShadow = "-1.5px -1.5px 0" + themes[i].stroke + ",1.5px -1.5px 0" + themes[i].stroke + ",-1.5px 1.5px 0" + themes[i].stroke + ",1.5px 1.5px 0" + themes[i].stroke;
        currentTheme = themes[i].img2;
        displaySlidePreview();
        // console.log(i,themes[i].img);
    }
    if (themes[i].stroke == "none") {
        slideContainer.style.textShadow = "none";

    }

}
slides = document.getElementsByClassName("slide");

function displaySlideCounter() {

    let slideCounter = document.getElementById("slideNumber");

    //!!! does not work. Create new variable that shows what slide the user is currently viewing.
    slideCounter.innerHTML = "Slide " + (actualSlideIndex + 1) + " / " + slides.length;
 //!!! Show which slide is selected by giving the preview a border.

}
let slidePreview = document.getElementById("slidePreview");
let newSlideDiv = document.getElementById("newSlide")

function displaySlidePreview() {

    let elements = document.getElementsByClassName("miniSlide");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    for (let i = 0; i < slides.length; i++) {
        let div = document.createElement("div");
        let slideNumber = document.createElement("p");
        let background = document.createElement("img");
        div.className = "miniSlide";

        slideNumber.innerHTML = "Slide " +(i + 1);
        slideNumber.className = "slideNumber";

        background.className = "miniSlideBackground";
        background.src = currentTheme;
        
        //!!! This works, but the scale is wrong. (All elements should be 15,82% the scale of the div)
        //div.innerHTML = slideContainer.children[i].innerHTML;
   
        
        //!!! Add onclick for jumping to that slide
        //!!! Add delete button visible on hover
         div.appendChild(slideNumber);
        div.appendChild(background);
      

        slidePreview.appendChild(div);
    
    }
disableDraggable();
}


function loadScripts() {
    addFontMenu();
    resizeSlideText();
    setImageTitle();
    displaySlidePreview();
    disableDraggable();
}
