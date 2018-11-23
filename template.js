
function clickTemplate1(){
  createIfNotPresent(actualSlide, "H1", 50, 10 );
  createIfNotPresent(actualSlide, "TEXT", 50, 30);
}

function clickTemplate2(){
  createIfNotPresent(actualSlide, "H1", 20, 50);
}

function clickTemplate3(){
  createIfNotPresent(actualSlide, "TEXT", 50, 20);
}

function createIfNotPresent(container, elementType, x, y){
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
