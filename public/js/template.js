classes = ["template1", "template2", "template3"]

function clickTemplate1(){
  for(i in classes){
    slides[actualSlideIndex].classList.remove(classes[i]);
    document.getElementById(`slidePreview${actualSlideIndex}`).classList.remove(classes[i]);
  }
  slides[actualSlideIndex].classList.add("template1");
  document.getElementById(`slidePreview${actualSlideIndex}`).classList.add("template1");
  createIfNotPresent(slides[actualSlideIndex], "H1", 15, 35);
  displaySlidePreview();
}

function clickTemplate2(){
  for(i in classes){
    slides[actualSlideIndex].classList.remove(classes[i]);
    document.getElementById(`slidePreview${actualSlideIndex}`).classList.remove(classes[i]);
  }
  slides[actualSlideIndex].classList.add("template2");
  document.getElementById(`slidePreview${actualSlideIndex}`).classList.add("template2");
  createIfNotPresent(slides[actualSlideIndex], "H1", 15, 18);
  createIfNotPresent(slides[actualSlideIndex], "TEXT", 15, 50);
  displaySlidePreview();
}

function clickTemplate3(){
  for(i in classes){
    slides[actualSlideIndex].classList.remove(classes[i]);
    document.getElementById(`slidePreview${actualSlideIndex}`).classList.remove(classes[i]);
  }
  slides[actualSlideIndex].classList.add("template3");
  document.getElementById(`slidePreview${actualSlideIndex}`).classList.add("template3");
  createIfNotPresent(slides[actualSlideIndex], "H1", 5, 5);
  createIfNotPresent(slides[actualSlideIndex], "TEXT", 5 , 26);
  displaySlidePreview();
}

function createIfNotPresent(container, elementType, x, y, fontsize){
  let contains = false;
  for(element of container.children){
    for(subelement of element.children){
      if(subelement.tagName == elementType){
        contains = true;
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        break;
      }
    }
    if(contains){
      break;
    }
  }
  if(!contains){
    let newelement = createtextbox(elementType, `${x}%` , `${y}%`, boxcounter);
  }
}
