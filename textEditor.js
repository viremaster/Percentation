//We defined the variable 
let buttons = document.getElementById("textToolbar");
let text = document.getElementById('titleTemplate');
let fonts = document.getElementById("fontSelect");
let changeFontButton = document.getElementById("fontName");
let changeSizeInput = document.getElementById("changeSizeInput");

fonts.onchange = function () {
    changeFontButton.value = fonts.value;
    changeFontButton.click();
}

changeSizeInput.oninput = function () {
    let fontSize=changeSizeInput.value+"%";
    let selection=window.getSelection().anchorNode.parentElement;
    selection.style.fontSize=fontSize;
}

buttons.onclick = function (evt) {
    
    if (evt.target.id != "fontSelect" && evt.target.id != "changeSizeInput") {
        console.log(evt.target.id);
        console.log(evt.target.style.textAlign);
        if (evt.target != evt.currentTarget) {
            if (evt.target.value != "") {
                value = evt.target.value;
            } else {
                value = null;
            }
            document.execCommand(evt.target.id, null, value);
        }
    }
}