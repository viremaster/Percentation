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
    displaySlideCounter()
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
    displaySlideCounter()
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
    newSlide.innerHTML = `
    <div class="titleTemplate">
    <h1 contenteditable="true"> Insert title here:</h1>
    <h3 contenteditable="true"> this is a new slide</h3>
    </div>
    `;
    displaySlideCounter();
    displaySlidePreview();
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
