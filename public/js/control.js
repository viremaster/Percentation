let slides = document.getElementsByClassName("slide");
let Presentation = document.getElementById("slideContainer");
let actualSlideIndex = 0;
let actualSlide = slides[actualSlideIndex];

//Simplified version of slide.length to troubleshoot functionality in frontEnd.js
let totalSlides = 1;

let backButton=document.getElementById("BackIcon");

backButton.addEventListener("click",function(){
    window.location.href="/";
})

window.onkeydown = function (e) {
    if (document.activeElement.hasAttribute("contenteditable") == false) {
        if (e.keyCode == 112 || e.keyCode == 37) {
            //      console.log("previous")
            previousSlide();
        } else if (e.keyCode == 110 || e.keyCode == 32 || e.keyCode == 39) {
            // console.log("next")
            nextSlide();

        }
    }

}



function nextSlide() {
    if (newWindow) {
        newWindow.nextPresenterSlide();
}

    for (let i = 0; i < slides.length; i++) {
        if (slides.length - 1){

        }
        if (slides[i].style.display == "block" && i != slides.length - 1) {
            slides[i].style.display = "none";
            slides[i + 1].style.display = "block";
            actualSlide = slides[i + 1];
            actualSlideIndex = actualSlideIndex + 1;
            break
        }
        // console.log("actual= " + actualSlideIndex + "currentSlide =" + currentSlide);
    }

    displaySlidePreview();
    displayCurrentNotes();

}

function previousSlide() {
 if (newWindow) {
        newWindow.previousPresenterSlide();

}

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block" && i != 0) {
            slides[i].style.display = "none";
            slides[i - 1].style.display = "block";
            actualSlide = slides[i - 1];
            actualSlideIndex -= 1
            break
        }

    }
    displaySlidePreview();
    displayCurrentNotes();
}

function jumpToSlide() {

    //Index takes the number from the id of the previewSlide and removes the string, leaving only the number.
    let index = parseInt(this.id.slice(12));

    if (newWindow) {

        container = slideContainer.outerHTML;
        newWindow.jumpToPresenterSlide(index);

}
    else{
        console.log("presenterModeNotRunning");
    }
    if (index>slide.length){
    }
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block") {
            slides[i].style.display = "none";
            break
        }
    }


    slides[index].style.display = "block";
    actualSlideIndex = index;
    currentSlide = index;


    displaySlidePreview();
    displayCurrentNotes();

}


function addSlide() {
    totalSlides += 1;
    currentSlide = totalSlides;
    let newSlide = document.createElement("div");
    newSlide.className = "slide";
    newSlide.style.display = "none";
    Presentation.insertBefore(newSlide, Presentation.children[actualSlideIndex + 1]);

    createSlideNotes();
    nextSlide();
    clickTemplate3();
    displaySlidePreview();

}


function deleteSlide() {
    let target = this.id.slice(6);
    console.log(target);

    if (slides.length > 0) {
        if (slides.length == 1) {

        } else if (actualSlideIndex == slides.length - 1) {
            Presentation.removeChild(Presentation.children[target]);
            slides[actualSlideIndex - 1].style.display = "block"
            actualSlideIndex -= 1;
             totalSlides-=1;
        } else {
            Presentation.removeChild(Presentation.children[target]);
            slides[actualSlideIndex].style.display = "block";
             totalSlides-=1;
        }
    }
    displaySlidePreview();
    displayCurrentNotes();
    displaySlideCounter();
}


function nextPresenterSlide() {

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block" && i != slides.length - 1) {
            slides[i].style.display = "none";
            slides[i + 1].style.display = "block";
            actualSlide = slides[i + 1];
            actualSlideIndex = actualSlideIndex + 1;
            break
        }
        // console.log("actual= " + actualSlideIndex + "currentSlide =" + currentSlide);
    }

}

function previousPresenterSlide() {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block" && i != 0) {
            slides[i].style.display = "none";
            slides[i - 1].style.display = "block";
            actualSlide = slides[i - 1];
            actualSlideIndex -= 1
            break
        }

    }
}

function jumpToPresenterSlide(index) {
    //Index takes the number from the id of the previewSlide and removes the string, leaving only the number.

    if (index>slide.length){
    }
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block") {
            slides[i].style.display = "none";
            break
        }
    }

    slides[index].style.display = "block";
    actualSlideIndex = index;
    currentSlide = index;
}
