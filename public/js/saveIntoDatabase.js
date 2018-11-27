//Function that takes in the filename and the text
let uploadButton = document.getElementById("saveIcon");
uploadButton.onclick = function () {

    let data = escape(document.getElementById("slideContainer").outerHTML);
    let notes = escape(document.getElementById("speakerNotesToolbar").innerHTML);
    let titleNewPresentation=escape(localStorage.getItem("title"));
    console.log(titleNewPresentation);

    let url;
    let cfg;

    if (localStorage.getItem("presentationid") != null) {
        url = "/app/presentation/" + localStorage.getItem("presentationid");
        cfg = {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                'x-access-token': btoa(localStorage.getItem("token"))
            }),
            body: JSON.stringify({
                data: data,
                notes:notes,
            })
        }
    } else {
        url = "app/presentation"
        cfg = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                'x-access-token': btoa(localStorage.getItem("token"))
            }),
            body: JSON.stringify({
                data: data,
                notes:notes,
                title:titleNewPresentation
            })
        }
    }
    fetch(url, cfg)
        .then(data => {
            if (data.status === 200) {
                return data.json();
            } else {
                alert("an error occured");
            }
        }).then(json => {
            if (json) {
                console.log(json);
                localStorage.setItem("presentationid", json.presentationid)
                alert("Saved")
            }
        })
}