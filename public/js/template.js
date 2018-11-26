let authenticatedUser = localStorage.getItem("authenticatedUser");
        let token = localStorage.getItem("token")

        let createUserTemplate = get("createUserTemplate"),
            welcomeTemplate = get("welcomeTemplate");

        (function () {
            if (token === 'undefined' || token === null) {
                //Display the login template
                displayLoginForm();
            } else {
                //Display the welcome template
                displayWelcomeTemplate();
            }
        })()

        function displayLoginForm() {
            let loginElement = createElementFromTemplate("loginUserTemplate");
            addElement(loginElement);

            let goToCreateUserButton = get("goToCreateUserButton");
            goToCreateUserButton.onclick = function () {
                clearScreen();
                displayCreateUserForm();
            }
            let loginUserForm = get("loginUserForm");
            loginUserForm.onsubmit = function (e) {
                e.preventDefault();
                let loginEmail = get("loginEmail").value,
                    loginPassword = get("loginPassword").value;
                fetch(`/app/user`, {
                    method: "GET",
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(loginEmail + ':' + loginPassword),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(data => {
                    if (data.status === 200) {
                        console.log(data);
                        return data.json();
                    } else {
                        alert("Wrong email or password")
                    }
                }).then(json => {
                    if (json) {
                        authenticatedUser = json.authenticatedUser;
                        token = json.token;
                        localStorage.setItem("token", token);
                        localStorage.setItem("authenticatedUser", authenticatedUser.username);
                        clearScreen();
                        displayWelcomeTemplate();
                    }
                })
            }
        }

        function displayCreateUserForm() {
            let createUserElement = createElementFromTemplate("createUserTemplate");
            addElement(createUserElement);

            let goToLoginUserButton = get("goToLoginUserButton");

            goToLoginUserButton.onclick = function () {
                clearScreen();
                displayLoginForm();
            }

            let createUserForm = get("createUserForm");
            createUserForm.onsubmit = function (e) {
                e.preventDefault();
                let createEmail = document.getElementById('createEmail').value,
                    createName = document.getElementById('createName').value,
                    createPassword = document.getElementById('createPassword').value;
                fetch('/app/user', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + btoa(createEmail + ':' + createName + ":" +
                            createPassword),
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (res) {
                    if (res.status == 200) {
                        clearScreen();
                        displayLoginForm();
                        return res.json();
                    } else {
                        alert("This email or username already exists")
                        return new PromiseRejectionEvent();
                    }
                }).then(function (data) {
                    console.log(data);
                })
            }
        }

        function displayWelcomeTemplate() {
            let welcomeElement = createElementFromTemplate("welcomeTemplate");

            let welcome = document.createElement("p");
            welcome.innerHTML = "Welcome : " + localStorage.getItem("authenticatedUser");

            addElement(welcome);
            addElement(welcomeElement);

            let btnDeleteAccount = get("btnDeleteAccount");
            let disconnectButton = get("disconnectButton");
            let updateUserForm = get("updateUserForm");
            let newPresentationButton = get("newPresentationButton");
            let showPublicButton = get("showPublicButton");
            let ShowFriendButton=get("ShowFriendButton");

            (function () {
                fetch("app/presentations", {
                    method: "GET",
                    headers: new Headers({
                        'x-access-token': btoa(localStorage.getItem("token"))
                    })
                }).then(data => {
                    if (data.status == 200)
                        return data.json();
                    
                }).then(data => {
                    displayMyPresentations(data);
                })
            })()

            ShowFriendButton.onclick=function(){
                fetch("app/presentations/friends",{
                    method:"GET",
                    headers: new Headers({
                        'x-access-token': btoa(localStorage.getItem("token"))
                    })
                }).then(data => {
                    if (data.status===200)
                        return data.json();
                }).then(data => {
                    displayFriendsPresentations(data);
                })
            }

            showPublicButton.onclick = function () {
                fetch("/app/presentations/public", {
                    method: "GET",
                    headers: new Headers({
                        'x-access-token': btoa(localStorage.getItem("token"))
                    })
                }).then(data => {
                    if (data.status === 200) {
                        return data.json();
                    }
                }).then(data => {
                    displayPublicPresentations(data);
                })
            }

            function displayFriendsPresentations(data){
                let FriendPresentationMiniatures=get("FriendPresentationMiniatures");
                FriendPresentationMiniatures.innerHTML="";
                for(presentation in data){
                    let presentationBtn = document.createElement("h3");
                    presentationBtn.id =data[presentation].presentationid;
                    let numberPresentation=presentation*1+1;
                    presentationBtn.innerHTML="friend's presentation "+numberPresentation;
                    FriendPresentationMiniatures.appendChild(presentationBtn);
                    presentationBtn.addEventListener("click",function(){
                        fetch("app/presentation/friends/"+this.id,{
                            method:"GET",
                            headers: new Headers({
                                'x-access-token': btoa(localStorage.getItem("token"))
                            })
                        }).then(data => {
                            if (data.status === 200) {
                                return data.json();
                            } else {
                                alert("an error occured");
                            }
                        }).then(json => {
                            if (json) {
                                localStorage.setItem("presentation", json.data);
                                localStorage.setItem("presentationid", this.id);
                                window.location.href = "/application";
                            }
                        })
                    })
                }
            }

            function displayPublicPresentations(data) {
                let publicPresentationsMiniatures = get("publicPresentationsMiniatures");
                publicPresentationsMiniatures.innerHTML="";
                for (presentation in data) {
                    let presentationBtn = document.createElement("h3");
                    presentationBtn.id =data[presentation].presentationid;
                    let numberPresentation=presentation*1+1;
                    presentationBtn.innerHTML="Public presentation "+numberPresentation;
                    publicPresentationsMiniatures.appendChild(presentationBtn);
                    presentationBtn.addEventListener("click",function(){
                        fetch("/app/presentation/public/" + this.id, {
                            method: "GET",
                            headers: new Headers({
                                'x-access-token': btoa(localStorage.getItem("token"))
                            })
                        }).then(data => {
                            if (data.status === 200) {
                                return data.json();
                            } else {
                                alert("an error occured");
                            }
                        }).then(json => {
                            if (json) {
                                localStorage.setItem("presentation", json.data);
                                localStorage.setItem("presentationid", this.id);
                                window.location.href = "/application";
                            }
                        })
                    })
                }
            }

            function displayMyPresentations(data) {
                let presentationsMiniatures = get("presentationsMiniatures");
                for (presentation in data) {
                    let prensentationDiv = document.createElement("div");

                    let deletePresentationButton = document.createElement("button");
                    deletePresentationButton.innerHTML = "🞮";

                    let presentationBtn = document.createElement("h3");

                    presentationBtn.id = data[presentation].presentationid;
                    let numberPresentation = presentation * 1 + 1;

                    presentationBtn.innerHTML = "Presentation " + numberPresentation;
                    prensentationDiv.appendChild(presentationBtn);
                    prensentationDiv.appendChild(deletePresentationButton);
                    presentationsMiniatures.appendChild(prensentationDiv);
                    presentationBtn.addEventListener("click", function () {
                        fetch("/app/presentation/" + this.id, {
                            method: "GET",
                            headers: new Headers({
                                'x-access-token': btoa(localStorage.getItem("token"))
                            })
                        }).then(data => {
                            if (data.status === 200) {
                                return data.json();
                            } else {
                                alert("an error occured");
                            }
                        }).then(json => {
                            if (json) {
                                localStorage.setItem("presentation", json.data);
                                localStorage.setItem("presentationid", this.id);
                                window.location.href = "/application";
                            }
                        })
                    })

                    deletePresentationButton.addEventListener("click", function () {
                        fetch("/app/presentation/" + presentationBtn.id, {
                            method: "DELETE",
                            headers: new Headers({
                                'x-access-token': btoa(localStorage.getItem("token"))
                            })
                        }).then(data => {
                            if (data.status == 200) {
                                alert("Deleted");
                                this.parentElement.remove();
                            }
                        })
                    })
                }
            }

            updateUserForm.onsubmit = function (e) {
                e.preventDefault();
                fetch("/app/user", {
                    method: 'PUT',
                    headers: new Headers({
                        'x-access-token': btoa(localStorage.getItem("token")),
                        'Authorization': 'Basic ' + btoa(get("oldPasswordInput").value + ':' + get(
                            "newPasswordInput").value),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(data => {
                    if (data.status == 200) {
                        alert("Your password has been changed !");
                        return data.json();
                    } else {
                        alert("Wrong old password");
                        return new PromiseRejectionEvent();
                    }
                }).then(json => {
                    console.log(json);
                })
            }

            newPresentationButton.addEventListener("click", function () {
                localStorage.removeItem("presentation");
                localStorage.removeItem("presentationid");
                window.location.href = "/application";
            })

            disconnectButton.onclick = function () {
                localStorage.removeItem("authenticatedUser");
                localStorage.removeItem("token");
                clearScreen();
                displayLoginForm();
            }

            btnDeleteAccount.onclick = function (e) {
                fetch("/app/user", {
                    method: "DELETE",
                    headers: new Headers({
                        'x-access-token': btoa(localStorage.getItem("token")),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(data => {
                    if (data.status === 200) {
                        localStorage.removeItem("authenticatedUser");
                        localStorage.removeItem("token");
                        clearScreen()
                        displayLoginForm()
                        return data.json();
                    } else {
                        alert("wrong email or password")
                        return new PromiseRejectionEvent();
                    }
                }).then(json => {
                    console.log(json);
                })
            }
        }