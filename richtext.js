var slideX = {
    min: 8,
    max: 508
};
var slideY = {
    min: 63,
    max: 563
};
var mouse = {
    x: 0,
    y: 0
};
let boxcounter = 0;
let item;
let dragging, resizing, justclicked, onitem, outside;
let offsetX = 0,
    offsetY = 0;
let presenting = false;
let maketext = false;
let texttype = "";
let slide = slideContainer;

document.addEventListener('mousemove', function (e) {
    if (e.pageX != 0) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
    if (mouse.x < slideX.min || mouse.x > slideX.max || mouse.y < slideY.min || mouse.y > slideY.max) {
        outside = true;
        onitem = false;
    } else if (e.target.nodeName == "DIV") {
        outside = false;
        onitem = false;
    } else {
        onitem = true;
    }
    draghandler(e);
}, false);

document.addEventListener('mouseup', function (event) {
    if (!onitem && !dragging && !outside && !resizing && !justclicked && maketext) {
        boxcounter++;
        createtextbox(texttype, pxtopercentx(mouse.x), pxtopercenty(mouse.y), boxcounter);
        item = div;
        move();
        document.body.style.cursor = "default";
    } else if (dragging || resizing || justclicked) {
        document.body.style.cursor = "default";
        end();
    }
    for (element of document.getElementById("textBoxCreatorMenu").children) {
        element.style.color = "lightslategray";
    }
    texttype = "";
    maketext = false;
}, false);

function selectTextType(e) {
      document.body.style.cursor = "cell";
    for (element of e.currentTarget.parentElement.children) {
        element.style.color = "lightslategray";
    }
    if (texttype == e.currentTarget.id) {
        texttype = "";
        maketext = false;
        e.currentTarget.style.color = "lightslategray";
    } else if (e.currentTarget.id != "choosebuttons") {
        texttype = e.currentTarget.id;
        e.currentTarget.style.color = "white";
        maketext = true;
    }
}


function mousehandler(e) {
    let type = e.currentTarget.nodeName;
    if (presenting) {
        e.currentTarget.style.cursor = 'auto';
    } else if (type == "TEXT" || type == "H1" || type == "H2") {
        e.currentTarget.style.cursor = 'text';
    } else if (type == "IMG") {
        e.currentTarget.style.cursor = 'pointer';
    } else if (type == "DIV" && incorner(e.currentTarget)) {
        e.currentTarget.style.cursor = 'se-resize';
    } else if (type == "DIV") {
        e.currentTarget.style.cursor = 'move';
    }
}

function divclick(e) {
    if (presenting) {} else if (!dragging && (e.target.nodeName == "DIV" || e.target.nodeName == "IMG")) {
        if (e.target.nodeName == "IMG") {
            item = e.target.parentElement;
        } else {
            item = e.target;
        }
        if (incorner(item)) {
            offsetX = e.pageX - parseInt(percenttopxx(item.style.left));
            offsetY = e.pageY - parseInt(percenttopxy(item.style.top));
            resizing = true;
        } else {
            offsetX = e.pageX - parseInt(percenttopxx(item.style.left));
            offsetY = e.pageY - parseInt(percenttopxy(item.style.top));
            item.style.opacity = 0.1;
            dragging = true;
        }
    } else if (e.target.nodeName != "DIV") {
        justclicked = true;
        e.target.parentElement.style.visibility = 'visible';
         displaySlidePreview();
    }
}

function end() {
    offsetX = 0;
    offsetY = 0;
    if (dragging) {
        item.style.opacity = 1;
        dragging = false;
    }
    resizing = false;
    justclicked = false;
     displaySlidePreview();
}

function draghandler(e) {
    if (dragging) {
        e.preventDefault();
        item.style.cursor = 'move';
        move();
    } else if (resizing) {
        e.preventDefault();
        item.style.cursor = 'se-resize';
        posX = Math.min(mouse.x, slideX.max - 3) - (parseInt(percenttopxx(item.style.left)));
        posY = Math.min(mouse.y, slideY.max - 4) - (parseInt(percenttopxy(item.style.top)));
        item.style.width = pxtopercentx(posX);
        item.style.height = pxtopercenty(posY);
        for (element of item.getElementsByTagName("TEXT")) {
            center(element, item);
        }
        for (element of item.getElementsByTagName("H1")) {
            center(element, item);
        }
        for (element of item.getElementsByTagName("H2")) {
            center(element, item);
        }
    }
}

function incorner(element) {
    cornerX = parseInt(percenttopxx(element.style.left)) + parseInt(element.offsetWidth) + 5;
    incornerX = mouse.x <= cornerX && mouse.x > cornerX - 15;
    cornerY = parseInt(percenttopxy(element.style.top)) + parseInt(element.offsetHeight) + 5;
    incornerY = mouse.y <= cornerY && mouse.y > cornerY - 15;
    return (incornerX && incornerY);
}

function recenter(e) {
    element = e.target;
    box = e.target.parentElement;
    center(element, box);

}

function center(element, item) {
    pixelsLeft = Math.max(0, (parseInt(item.offsetWidth) - parseInt(element.offsetWidth)) / 2);
    element.style.left = `${(pixelsLeft/item.offsetWidth)*100}%`
    pixelsTop = Math.max(0, (parseInt(item.offsetHeight) - parseInt(element.offsetHeight)) / 2);
    element.style.top = `${(pixelsTop/item.offsetHeight)*100}%`

}

function move() {
    posX = Math.max(0, Math.min(mouse.x - offsetX - slideX.min, slideX.max - slideX.min - item.offsetWidth));
    posY = Math.max(0, Math.min(mouse.y - offsetY - slideY.min, slideY.max - slideY.min - item.offsetHeight));
    item.style.left = pxtopercentx(posX);
    item.style.top = pxtopercenty(posY);
    displaySlidePreview();
}

function deleteDiv(e) {
    e.currentTarget.parentElement.parentElement.remove();
    console.log(e.currentTarget.parentElement);
}

function sendForward(e) {
    e.currentTarget.parentElement.parentElement.style.zIndex = e.currentTarget.parentElement.parentElement.style.zIndex * 1 + 1;
}

function sendBackward(e) {
    if (e.currentTarget.parentElement.parentElement.style.zIndex > 0) {
        e.currentTarget.parentElement.parentElement.style.zIndex = e.currentTarget.parentElement.parentElement.style.zIndex * 1 - 1;
    }
}

function startpresenting() {
    if (presenting) {
        presenting = false;
        for (slide of slides) {
            slide.classList.remove("whilepresenting");
        }
        for (i of slides[actualSlideIndex].children) {
          if(i.querySelector("h1, h2, text")){
            i.querySelector("h1, h2, text").contentEditable = true;
          }
        }
    } else {
        presenting = true;
        for (slide of slides) {
            slide.classList.add("whilepresenting");
        }
        for (i of slides[actualSlideIndex].children) {
            if(i.querySelector("h1, h2, text")){
              i.querySelector("h1, h2, text").contentEditable = false;
            }
        }
    }
}

function createtextbox(type, x, y, id) {
    div = document.createElement("div");

    div.id = `box${id}`;
    div.className = "textbox";
    div.style.left = x;
    div.style.top = y;
    div.onmousedown = divclick;
    div.onmousemove = mousehandler;

    div2 = document.createElement("div");
    div2.className = "textboxMenu";

    text = document.createElement(type);
    text.id = `text${id}`;
    text.contentEditable = true;
    text.innerHTML = "click to edit";
    text.oninput = recenter;
    text.oninput = displaySlidePreview;
    text.onmousemove = mousehandler;
    text.draggable = false;
    div.appendChild(text);

    img = document.createElement("img");
    img.src = "Icons/Cross.png";
    img.classList.add("deleteimg");
    img.onclick = deleteDiv;
    img.onmousemove = mousehandler;
    img.title = "Delete element";

    img2 = document.createElement("img");
    img2.src = "Icons/Bring_Forward.png";
    img2.title = "Bring forward";
    img2.onclick = sendForward;

    img3 = document.createElement("img");
    img3.src = "Icons/Send_Backward.png";
    img3.title = "Send backward";
    img3.onclick = sendBackward;

    div2.appendChild(img);
    div2.appendChild(img2);
    div2.appendChild(img3);
    div.appendChild(div2);
    slides[actualSlideIndex].appendChild(div);
    center(text, div);



}

function pxtopercentx(pixels) {
    pixels = parseInt(pixels);
    return `${(pixels/slides[actualSlideIndex].offsetWidth)*100}%`
}

function pxtopercenty(pixels) {
    pixels = parseInt(pixels);
    return `${(pixels/slides[actualSlideIndex].offsetHeight)*100}%`
}

function percenttopxx(percent) {
    percent = parseInt(percent);
    return `${(percent/100)*slides[actualSlideIndex].offsetWidth + slideX.min}px`
}

function percenttopxy(percent) {
    percent = parseInt(percent);
    return `${(percent/100)*slides[actualSlideIndex].offsetHeight + slideY.min}px`
}

function listItemPress(evt) {
    listItem = evt.target;
    if (evt.key == "Enter") {
        evt.preventDefault;
        ul = listItem.parentElement;
        newListItem = document.createElement("li");
        newListItem.contentEditable = true;
        newListItem.onkeyup = listItemPress;

        ul.appendChild(newListItem);
        newListItem.focus();
    } else if (evt.key == "Backspace" || evt.key == "Delete") {
        evt.preventDefault;
        if (listItem.innerHTML == "" || listItem.innerHTML == "<br>") {
            parent = listItem.parentNode;
            listItem.remove();
            if (parent.innerHTML == "") {
                parent.parentNode.remove();
            }
        }
    }
}

function recalculatesize() {
    rect = slideContainer.getBoundingClientRect();
    slideX.min = rect.left;
    slideX.max = rect.right;
    slideY.min = rect.top;
    slideY.max = rect.bottom;
}
