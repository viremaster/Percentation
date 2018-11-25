let btnSharePrivate = document.getElementById("btnSharePrivate"),
    btnSharePublic = document.getElementById("btnSharePublic"),
    btnSharePerson = document.getElementById("btnSharePerson");

btnSharePerson.addEventListener("click", function () {
    let presentationid = verifPresSave();
    if (presentationid) {

    }
})

function changeVisibility(visibility) {
    console.log("change to " + visibility);
    let presentationid = verifPresSave();
    if (presentationid) {
        fetch("app/presentation/" + visibility + "/" + presentationid, {
            method: "PUT",
            headers: new Headers({
                'x-access-token': btoa(localStorage.getItem("token"))
            })
        }).then(data => {
            if (data.status===200){
                alert("Presentation shared to "+visibility);
            }else{
                alert("A problem occured");
            }
        })
    }else{
        alert("You have to save the presentation to the cloud first");
    }
}

btnSharePublic.addEventListener("click",function () {
    changeVisibility("public");
});

btnSharePrivate.addEventListener("click",function () {
    changeVisibility("private");
});

function verifPresSave() {
    if (!(presentationid = localStorage.getItem("presentationid")))
        return false;
    else
        return presentationid;
}