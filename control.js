let slides = document.getElementsByClassName("slide");
let Presentation = document.getElementById("slideContainer");
let actualSlideIndex = 0;
let actualSlide = slides[actualSlideIndex];

//Simplified version of slide.length to troubleshoot functionality in frontEnd.js
let totalSlides = 0;


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
    displayCurrentNotes();
    displaySlidePreview();
}

function previousSlide() {

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block" && i != 0) {
            slides[i].style.display = "none";
            slides[i - 1].style.display = "block";
            actualSlide = slides[i - 1];
            actualSlideIndex -= 1
            break
        }

    }
    displayCurrentNotes();
    displaySlidePreview();
}

function jumpToSlide() {

    //Index takes the number from the id of the previewSlide and removes the string, leaving only the number.
    let index = parseInt(this.id.slice(12));
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

   

    displaySlidePreview();


}

function removeSlide() {
    console.log("This function fired because you clicked the delete button in the preview. We have to use the 'deleteSlide' function instead once it has been configured to take things into account.");
}

function deleteSlide() {
    slides = document.getElementsByClassName("slide");
    if (slides.length > 0) {
        if (slides.length == 1) {
            Presentation.removeChild(Presentation.children[actualSlideIndex]);
            actualSlideIndex = 0;
        } else if (actualSlideIndex == slides.length - 1) {
            Presentation.removeChild(Presentation.children[actualSlideIndex]);
            slides[actualSlideIndex - 1].style.display = "block"
            actualSlideIndex -= 1;
        } else {
            Presentation.removeChild(Presentation.children[actualSlideIndex]);
            slides[actualSlideIndex].style.display = "block";
        }
    }
}
