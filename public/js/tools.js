function createElementFromTemplate(templateID) {
    let template = document.querySelector(templateID);
    let clone = document.importNode(template.content, true);
    return clone;
}

function get(id) {
    return document.getElementById(id);
}

function createElementFromTemplate(templateID) {
    let template = get(templateID);
    let clone = document.importNode(template.content, true);
    return clone;
}

function addElement(element) {
    let content = get("content");
    if (content) {
        if (element) {
            content.appendChild(element);
        } else {
            console.error(new Error(`The element is empty`))
        }
    } else {
        console.error(new Error(`There is no content element in the document`))
    }
}

function clearScreen() {
    get("content").innerHTML = "";
}