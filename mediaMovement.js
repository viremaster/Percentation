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
function createmediabox2(content, x , y, id){
  div = document.createElement("div");
  div.id = `mediabox${id}`;
  div.className = "textbox";
  div.style.left = x;
  div.style.top = y;
  div.onmousedown = divclick;
  div.onmousemove = mousehandler;
  div.insertAdjacentHTML("afterbegin", content);
    img = document.createElement("img");
    img.src = "Icons/Cross.png";
    img.classList.add("deleteimg");
    img.onclick = deleteDiv;
    img.onmousemove = mousehandler;
  div.appendChild(img);
  actualSlide.appendChild(div);
  //center(div);
  console.log(div+"made it here");
}

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
