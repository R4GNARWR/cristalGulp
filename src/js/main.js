const navigation = document.querySelector('.navigation');
const menuBtn = document.querySelector('.header-menu__lines');
const documentsList = document.querySelector('.documents-list');
const progressList = document.querySelector('.progress-list');
const paralaxPatterns = document.querySelectorAll('.pattern-paralax');
const flatVisualContainers = document.querySelectorAll('.flats-visual');
const flatVisualChangeButtons = document.querySelectorAll('.flats-filter__visual-type');

new WOW({
    mobile:false,
}).init();

Fancybox.defaults.closeButton = false;
Fancybox.bind("[data-fancybox]", {});

$('[data-range]').ionRangeSlider();

function addClass(element, className) {
    if(!element.classList.contains(className))
    {
        element.classList.add(className);
    }
    
}
function removeClass(element, className) {
    if(element.classList.contains(className))
    {
        element.classList.remove(className);
    }
}
function toggleClass(element, className) {
    if(element.classList.contains(className))
    {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

function setListMaxHeight(list, maxItems) {
    if (list && maxItems) 
    {
        let children = list.children[0];
        let childrenHeight = children.offsetHeight;
        list.style.maxHeight = childrenHeight * maxItems + "px";
    }
}

if (documentsList) {
    setListMaxHeight(documentsList,7);
}

window.addEventListener('resize', () => {
    if (documentsList) {
        setListMaxHeight(documentsList,7)
    }
    
});


if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        toggleClass(menuBtn, 'active');
        toggleClass(navigation, 'active');
    })
}

if(progressList) {
    if(progressList.childElementCount < 2) {
        document.querySelector('.progress__pattern-2').classList.add('d-none')
        document.querySelector('.progress__pattern-3').classList.add('d-none')
    } else if (progressList.offsetHeight < 3) {
        document.querySelector('.progress__pattern-3').classList.add('d-none')
    }
}

function changeFlatsVisual(pressedButton, visual)
{
    if(flatVisualContainers && visual)
    {
        flatVisualContainers.forEach((container) => {
            if(container === visual)
            {
                removeClass(container, 'd-none')
            }
            else
            {
                addClass(container, 'd-none')
            }
        })
    }
    if(flatVisualChangeButtons && pressedButton)
    {
        flatVisualChangeButtons.forEach((iteratedButton)=> {
            if(iteratedButton === pressedButton)
            {
                addClass(iteratedButton, 'active');
            } else {
                removeClass(iteratedButton, 'active');
            }
        })

    }

}

function getBlockPosition(block) {
    let blockStart = block.offsetTop
    let blockEnd = block.offsetTop + block.offsetHeight;
    return([blockStart, blockEnd])
}

function observeParalaxBlock(element, block) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setParalax(element);
        } else {
            element.style.removeProperty('top');
        }
      });
    });
    observer.observe(block);
  }

function calculateParalax(element, direction) {
    if (direction === 'bottom') {
        element.style.top = element.offsetTop + 3 + 'px';
    } else {
        element.style.top = element.offsetTop - 3 + 'px';
    }
}

let lastScroll = 0;

function setParalax(element) {
    if(lastScroll < window.pageYOffset) {
        console.log(element)
        calculateParalax(element, 'bottom')
    } else if(lastScroll > window.pageYOffset) {
        calculateParalax(element, 'top')
    }
    lastScroll = window.pageYOffset;
}

window.addEventListener('scroll', function() {
    if(paralaxPatterns) {
        paralaxPatterns.forEach(pattern => {
            observeParalaxBlock(pattern, pattern.parentNode)
        });
    }
})


function isTouchDevice() {
    return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

function accessWebVr(curScene, curTime){
    unloadPlayer();
    eventUnloadPlugins();
    loadPlayer(true, curScene, curTime);
}
function accessStdVr(curScene, curTime){
    unloadPlayer();
    resetValuesForPlugins();
    loadPlayer(false, curScene, curTime);
}
function loadPlayer(isWebVr, curScene, curTime) {
    embedpano({
        id:"krpanoSWFObject"
        ,xml:"indexdata/index.xml"
        ,target:"panoDIV"
        ,passQueryParameters:true
        ,bgcolor:"#000000"
        ,html5:"auto"
        ,vars:{startscene:curScene,starttime:curTime}
        ,webglsettings:{preserveDrawingBuffer:false, depth:true, stencil:true}
    });
}
function unloadPlayer(){
    if(jQuery('#krpanoSWFObject')){
        //stop all sounds playing before the removepano
        if (getCurrentTourPlayer() != null) {
            getCurrentTourPlayer().call("stopTourSounds();");
        }
        currentPanotourPlayer = null;
        removepano('krpanoSWFObject');
    }
    
}
var currentPanotourPlayer = null;

function getCurrentTourPlayer() {
    if (currentPanotourPlayer == null) {
        currentPanotourPlayer = document.getElementById('krpanoSWFObject');
    }
    return currentPanotourPlayer;
}
function isVRModeRequested() {
    var querystr = window.location.search.substring(1);
    var params = querystr.split('&');
    for (var i=0; i<params.length; i++){
        if (params[i].toLowerCase() == "vr"){
            return true;
        }
    }
    return false;
}