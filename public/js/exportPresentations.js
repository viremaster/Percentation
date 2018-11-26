let exportButton = get("exportIcon")

exportButton.onclick = function () {
    let data = document.getElementById("slideContainer").outerHTML;
    let newElement = createElementFromHTML(data);

    newElement.style.fontSize = "100vw";

    let picturesrc = newElement.style.backgroundImage.split('"')[1]
    let img = document.createElement("img");
    img.src = picturesrc;

    let imgBase64 = getBase64Img(img);
    //newElement.style.backgroundImage="url("+imgBase64+")";7

    let page=`<html>

    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Montez|Lobster|Josefin+Sans|Shadows+Into+Light|Pacifico|Amatic+SC:700|Orbitron:400,900|Rokkitt|Righteous|Dancing+Script:700|Bangers|Chewy|Sigmar+One|Architects+Daughter|Abril+Fatface|Covered+By+Your+Grace|Kaushan+Script|Gloria+Hallelujah|Satisfy|Lobster+Two:700|Comfortaa:700|Cinzel|Courgette'
            rel='stylesheet' type='text/css'>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
    </head>
    
    <body>

    `+newElement.outerHTML+`
        
    
        <style>
            *{
                background-size: 100% 100%;
    
            }
            
            #slideContainer {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
            }
    
            .slide {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
            }
    
            .titleTemplate {
                font-size: inherit;
                position: absolute;
                height: 100%;
                width: 100%;
            }
    
    
            .titleTemplate h1 {
                /*  border: 1px dotted gray;*/
                position: absolute;
                font-size: 12%;
                top: 25%;
                width: 100%;
                padding: 1% 0 1% 0;
                margin: 0;
            }
    
            .titleTemplate h3 {
                position: absolute;
                top: 60%;
                width: 100%;
                /*  border: 1px dotted gray;*/
                font-size: 8%;
                padding: 1% 0 1% 0;
                margin: 0;
    
            }
        </style>
        <script>
            function nextSlide() {
                slides = document.getElementsByClassName("slide");
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
    
            window.onkeydown = function (e) {
                if (e.keyCode == 112 || e.keyCode == 37) {
                    previousSlide();
                } else if (e.keyCode == 110 || e.keyCode == 32 || e.keyCode == 39) {
                    nextSlide();
                }
            }
        </script>
    </body>
    
    </html>`

    download(page);
}

function createElementFromHTML(string) {
    let div = document.createElement("div");
    div.innerHTML = string.trim();
    return div.firstChild;
}

function getBase64Img(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

function download(data) {
    let fileName = "Filename";
    let newFile = document.createElement('a');
    newFile.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(data));
    newFile.setAttribute('download',fileName);
    console.log(newFile);
    document.body.appendChild(newFile);
    newFile.click();
    document.body.removeChild(newFile);
}