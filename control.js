let slides = document.getElementsByClassName("slide");
let Presentation = document.getElementById("slideContainer");
let actualSlideIndex = 0;
let actualSlide = slides[actualSlideIndex];

window.onkeydown = function (e) {
    if (e.keyCode == 112 || e.keyCode == 37) {
        console.log("previous")
        previousSlide();
    } else if (e.keyCode == 110 || e.keyCode == 32 || e.keyCode == 39) {
        console.log("next")
        nextSlide();
    }

}

function nextSlide() {
    slides = document.getElementsByClassName("slide");
    console.log(slides)
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block" && i != slides.length - 1) {
            slides[i].style.display = "none";
            slides[i + 1].style.display = "block";
            actualSlide = slides[i + 1];
            actualSlideIndex += 1;
            break
        }
    }
    displaySlidePreview();
    displaySlideCounter();
}

function previousSlide() {
    slides = document.getElementsByClassName("slide");
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
    displaySlideCounter();
}

function jumpToSlide() {
    //Index takes the number from the id of the previewSlide and removes the string, leaving only the number.
    let index = this.id.slice(12);
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display == "block") {
            slides[i].style.display = "none";
            break
        }
    }
    slides[index].style.display = "block";
    actualSlide = slides[index];

    displaySlidePreview();
    displaySlideCounter();
}


function addSlide() {
    let newSlide = document.createElement("div");
    newSlide.className = "slide";
    newSlide.style.display = "none";
    if (Presentation.children.length > 0) {
        Presentation.insertBefore(newSlide, Presentation.children[actualSlideIndex + 1]);
        nextSlide();
    } else {
        Presentation.appendChild(newSlide);
        newSlide.style.display = "block"
    }
    // <h1 contenteditable="true"> Insert title here:</h1>
    // <h3 contenteditable="true"> this is a new slide</h3>
    newSlide.innerHTML = `
    <div class="titleTemplate">
    </div>
    `;
    displaySlideCounter();
    displaySlidePreview();
    displaySlideCounter();
}

function removeSlide() {
    console.log("This function fired because you clicked the little button in the preview. We have to use the 'deleteSlide' function instead once it has been configured to take things into account.");
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
