classes = ["template1", "template2", "template3", "template4"]
let lastTemplate=0;
function clickTemplate1(){
  for(i in classes){
    slides[actualSlideIndex].classList.remove(classes[i]);
    previews[actualSlideIndex].classList.remove(classes[i]);
  }
  slides[actualSlideIndex].classList.add("template1");
  previews[actualSlideIndex].classList.add("template1");
  lastTemplate='template1';
  displaySlidePreview();
  createIfNotPresent(slides[actualSlideIndex], "H1", 15, 35);
}

function clickTemplate2(){
  for(i in classes){
    slides[actualSlideIndex].classList.remove(classes[i]);
    previews[actualSlideIndex].classList.remove(classes[i]);
  }
  slides[actualSlideIndex].classList.add("template2");
  previews[actualSlideIndex].classList.add("template2");
  lastTemplate='template2';
  displaySlidePreview();
  createIfNotPresent(slides[actualSlideIndex], "H1", 15, 18);
  createIfNotPresent(slides[actualSlideIndex], "TEXT", 15, 50);
}

function clickTemplate3(){
  for(i in classes){
    slides[actualSlideIndex].classList.remove(classes[i]);
    previews[actualSlideIndex].classList.remove(classes[i]);
  }
  slides[actualSlideIndex].classList.add("template3");
  previews[actualSlideIndex].classList.add("template3");
  lastTemplate='template3';
  displaySlidePreview();
  createIfNotPresent(slides[actualSlideIndex], "H1", 5, 5);
  createIfNotPresent(slides[actualSlideIndex], "TEXT", 5 , 26);
}

function createIfNotPresent(container, elementType, x, y, fontsize){
  let contains = false;
  for(element of container.children){
    for(subelement of element.children){
      if(subelement.tagName == elementType){
        contains = true;
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        center(element.firstElementChild, element);
        break;
      }
    }
    if(contains){
      break;
    }
  }
  if(!contains){
    let newelement = createtextbox(elementType, `${x}%` , `${y}%`, boxcounter);
    center(newelement.firstElementChild, newelement);
  }
}
