let exportButton = get("exportIcon")

exportButton.onclick = function () {
    let data = document.getElementById("slideContainer").outerHTML;
    download(data);
}

function download(data) {
    let fileName = "Filename";
    let newFile = document.createElement('a');
    newFile.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(data));
    newFile.setAttribute('download',fileName);
    document.body.appendChild(newFile);
    newFile.click();
    document.body.removeChild(newFile);
}