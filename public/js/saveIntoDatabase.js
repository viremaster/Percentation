//Function that takes in the filename and the text
let uploadButton = document.getElementById("saveIcon");
uploadButton.onclick = function () {
    let data =document.getElementById("slideContainer").innerHTML;
    fetch('/app/presentation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': btoa(localStorage.getItem("token"))
        },
        body:JSON.stringify({
            data:data
        })
    }).then(data => {
        if (data.status === 200) {
            return data.json();
        } else {
            alert("an error occured");
            return "An error occured";
        }
    }).then(json => {
        console.log(json);
    })
}