function createmediabox(content, x , y, id){
  div = document.createElement("div");
  div.id = `mediabox${id}`;
  div.className = "textbox";
  div.style.left = x;
  div.style.top = y;
  div.onmousedown = divclick;
  div.onmousemove = mousehandler;
  div.appendChild(content);
    img = document.createElement("img");
    img.src = "Icons/Cross.png";
    img.classList.add("deleteimg");
    img.onclick = deleteDiv;
    img.onmousemove = mousehandler;
  div.appendChild(img);
  actualSlide.appendChild(div);
  center(content, div);
}

img = document.createElement("img");
img.src = "Icons/Bold.png";
createpicturebox(img, "20%", "20%", 1);

function createpicturebox(picture, x, y, id){
  div = document.createElement("div");
  div.id = `picturebox${id}`;
  div.className = "picturebox";
  div.style.left = x;
  div.style.top = y;
  div.onmousedown = divclick;
  div.onmousemove = mousehandler;
    picture.classList.add("bigimg")
  div.appendChild(picture);
    img = document.createElement("img");
    img.src = "Icons/Cross.png";
    img.classList.add("deleteimg");
    img.onclick = deleteDiv;
    img.onmousemove = mousehandler;
  div.appendChild(img);
  actualSlide.appendChild(div);
}
