function createmediabox(content, x , y, id){
  div = document.createElement("div");
  div.id = `mediabox${id}`;
  div.className = "mediabox";
  div.style.left = x;
  div.style.top = y;
  div.onmousedown = divclick;
  div.onmousemove = mousehandler;
  div.appendChild(content);
  div2 = document.createElement("div");
  div2.className = "textboxMenu";

  img = document.createElement("img");
  img.src = "Icons/Cross.png";
  img.classList.add("deleteimg");
  img.onclick = deleteDiv;
  img.onmousemove = mousehandler;
  img.title = "Delete element";

  img2 = document.createElement("img");
  img2.src = "Icons/Bring_Forward.png";
  img2.title = "Bring forward";
  img2.onclick = sendForward;

  img3 = document.createElement("img");
  img3.src = "Icons/Send_Backward.png";
  img3.title = "Send backward";
  img3.onclick = sendBackward;

  div2.appendChild(img);
  div2.appendChild(img2);
  div2.appendChild(img3);
  div.appendChild(div2);
  slides[actualSlideIndex].appendChild(div);
  center(content, div);
}

function createmediabox2(content, x , y, id){
  div = document.createElement("div");
  div.id = `mediabox${id}`;
  div.className = "mediabox";
  div.style.left = x;
  div.style.top = y;
  div.onmousedown = divclick;
  div.onmousemove = mousehandler;
  div.insertAdjacentHTML("afterbegin", content);
  div2 = document.createElement("div");
  div2.className = "textboxMenu";

  img = document.createElement("img");
  img.src = "Icons/Cross.png";
  img.classList.add("deleteimg");
  img.onclick = deleteDiv;
  img.onmousemove = mousehandler;
  img.title = "Delete element";

  img2 = document.createElement("img");
  img2.src = "Icons/Bring_Forward.png";
  img2.title = "Bring forward";
  img2.onclick = sendForward;

  img3 = document.createElement("img");
  img3.src = "Icons/Send_Backward.png";
  img3.title = "Send backward";
  img3.onclick = sendBackward;

  div2.appendChild(img);
  div2.appendChild(img2);
  div2.appendChild(img3);
  div.appendChild(div2);
  slides[actualSlideIndex].appendChild(div);
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
  div2 = document.createElement("div");
  div2.className = "textboxMenu";

  img = document.createElement("img");
  img.src = "Icons/Cross.png";
  img.classList.add("deleteimg");
  img.onclick = deleteDiv;
  img.onmousemove = mousehandler;
  img.title = "Delete element";

  img2 = document.createElement("img");
  img2.src = "Icons/Bring_Forward.png";
  img2.title = "Bring forward";
  img2.onclick = sendForward;

  img3 = document.createElement("img");
  img3.src = "Icons/Send_Backward.png";
  img3.title = "Send backward";
  img3.onclick = sendBackward;

  div2.appendChild(img);
  div2.appendChild(img2);
  div2.appendChild(img3);
  div.appendChild(div2);
  slides[actualSlideIndex].appendChild(div);
}
