//We defined the variable 
let buttons = document.getElementById("textToolbar");
let text = document.getElementById('titleTemplate');
let fonts = document.getElementById("fontSelect");
let changeFontButton = document.getElementById("fontName");
let changeSizeInput = document.getElementById("changeSizeInput");
let changeColor = document.getElementById("color");
let foreColorButton = document.getElementById("foreColor");
<<<<<<< HEAD
let textColorIcon=document.getElementById("textColorIcon");

textColorIcon.onclick=function(){
=======
let textColorIcon = document.getElementById("textColorIcon");

textColorIcon.onclick = function () {
>>>>>>> Alpha
    changeColor.click();
}

fonts.onchange = function () {
    changeFontButton.value = fonts.value;
    changeFontButton.click();
}


changeColor.onchange = function () {
    foreColorButton.value = changeColor.value;
    foreColorButton.click();
}

changeSizeInput.oninput = function () {
    let fontSize = changeSizeInput.value + "%";
    let windowsSelection = window.getSelection();
    let selection = windowsSelection.anchorNode.parentElement;
    while (selection != null) {
        if (selection.contentEditable == "true") {
            selection.style.fontSize = fontSize;
<<<<<<< HEAD
=======
            center(selection, selection.parentElement);
>>>>>>> Alpha
            break;
        }
        selection = selection.parentElement;
    }
}

buttons.onclick = function (evt) {
<<<<<<< HEAD
    
=======

>>>>>>> Alpha
    if (evt.target.id != "fontSelect" && evt.target.id != "changeSizeInput") {
        if (evt.target != evt.currentTarget) {
            if (evt.target.id.startsWith("justify")) {
                let direction = evt.target.id.split("y")[1];

                let windowsSelection = window.getSelection();

                let selection = windowsSelection.anchorNode.parentElement;

                while (selection != null) {
                    if (selection.contentEditable == "true") {
                        selection.style.textAlign = direction;
                        break;
                    }
                    selection = selection.parentElement;
                }
            } else {
                if (evt.target.value) {
                    value = evt.target.value;
                } else {
                    value = null;
                }
                document.execCommand(evt.target.id, false, value);
            }
        }
        value = null;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> Alpha
