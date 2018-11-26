let myTime;

function setTimer() {
    let time = document.getElementById("timedSlide").value;
    console.log(time);
    let xTime = time * 1000;
    console.log(xTime);
    let checkBox = document.getElementById("toggleTime");

//Should happen in the fullscreen function.

    if (checkBox.checked) {
        console.log("checkbox is checked");
        myTime = setInterval(nextSlide, xTime);
        // replace nextSlide with whatever function we use to go to next slide in fullscreenmode.

    } else {
        console.log("checkbox is not checked");
        stopTimer();
    }
}

function stopTimer() {
    clearInterval(myTime);
    console.log("time disabled");
}
