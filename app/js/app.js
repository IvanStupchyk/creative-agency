/*fix header*/
let header = document.querySelector('.header');
if(header) {
  window.onscroll = function(){
    if(document.documentElement.scrollTop > 590){
      header.classList.add("header-fixed");
    }
    else{
      header.classList.remove("header-fixed");
    }
  }
}

$("#menu-desktop").on("click","a", function (event) {
  event.preventDefault();
    let id  = $(this).attr('href'),
        top = $(id).offset().top - 100 + 'px';
    $('body,html').animate({scrollTop: top}, 900);
});


$("#menu-mob").on("click", "a", function (event) {
  event.preventDefault();
  let id  = $(this).attr('href'),
      top = $(id).offset().top + 1 + 'px';
  $('body,html').animate({scrollTop: top}, 900);
});

/*mobile menu*/
let menuBtn = document.querySelector('.menu-btn');
let menuLines = document.querySelector('.menu-btn-lines');
let menuMobBox = document.querySelector('.menu-box');
let menuItem = document.querySelectorAll('.menu-item');

if(menuBtn) {
  menuBtn.addEventListener('click', function() {
    menuLines.classList.toggle("menu-btn-active");
    menuMobBox.classList.toggle("menu-show");
  });
}

menuItem.forEach(function(btn) {
  btn.addEventListener('click', function() {
    menuLines.classList.remove("menu-btn-active");
    menuMobBox.classList.remove("menu-show");
  });
});


// get tab container
var container = document.getElementById("tabContainer");
var tabcon = document.getElementById("tabscontent");
var navitem = document.getElementById("tabHeader_1");
var ident = navitem.id.split("_")[1];
navitem.parentNode.setAttribute("data-current",ident);
navitem.setAttribute("class","tabActiveHeader");

//hide two tab contents we don't need

var pages = tabcon.getElementsByClassName("tabpage");
    for (var i = 0; i < pages.length; i++) {
        var comp=i+1;
        if(ident!=comp) {
            pages.item(i).style.display = "none";
        }
};

//this adds click event to tabs
var tabs = container.getElementsByTagName("li");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick=displayPage;
}

// on click of one of tabs
function displayPage() {
    var current = this.parentNode.getAttribute("data-current");
    //remove class of activetabheader and hide old contents
    document.getElementById("tabHeader_" + current).removeAttribute("class");
    document.getElementById("tabpage_" + current).style.display="none";

    var ident = this.id.split("_")[1];

    //add class of activetabheader to new active tab and show contents
    this.setAttribute("class","tabActiveHeader");
    document.getElementById("tabpage_" + ident).style.display="block";
    this.parentNode.setAttribute("data-current",ident);
}

// video
let video = document.getElementById('video');
let buttonPlayMain = document.querySelector('.btn-play-main');
let btnPlayPause = document.getElementById('play-pause');
let stopBtn = document.getElementById('stop');
let muteBtn = document.getElementById('mute');
let progress = document.getElementById('progress');
let controlsContainer = document.querySelector('.controls');

if(buttonPlayMain) {
  buttonPlayMain.addEventListener('click', function () {
    if(video.paused) {
      video.play();
      buttonPlayMain.classList.add('button-main-hidden');
      btnPlayPause.classList.add('pause');
      controlsContainer.classList.add('show-container');
    }
  });
}

if(btnPlayPause) {
  btnPlayPause.addEventListener('click', function() {
    if(video.paused) {
      btnPlayPause.classList.remove('play');
      btnPlayPause.classList.add('pause');
      buttonPlayMain.classList.add('button-main-hidden');
      video.play();
    } else {
      btnPlayPause.classList.remove('pause');
      btnPlayPause.classList.add('play');
      buttonPlayMain.classList.remove('button-main-hidden');
      video.pause();
    }
  });
}

if(stopBtn) {
  stopBtn.addEventListener('click', function() {
    video.pause();
    video.currentTime = 0;
    buttonPlayMain.classList.remove('button-main-hidden');
    btnPlayPause.classList.remove('pause');
  });
}

if(muteBtn) {
  muteBtn.addEventListener('click', function () {
    if (video.muted == false) {
        muteBtn.classList.remove('mute-on');
        muteBtn.classList.add('mute-off');
        video.muted = true;
    } else {
      muteBtn.classList.remove('mute-off');
      muteBtn.classList.add('mute-on');
      video.muted = false;
    }
  });
}

if(video) {
  video.ontimeupdate = progressUpdate;
}

if(progress) {
  progress.onclick = videoRewind;
}

function progressUpdate() {
  console.log(video.duration);
  console.log(video.currentTime);
  let d = video.duration;
  let c = video.currentTime;
  progress.value = c / d * 100;
}

function videoRewind() {
  let w = this.offsetWidth;
  let o = event.offsetX;
  console.log(w);
  console.log(o);
  this.value = o / w * 100;
  video.pause();
  video.currentTime = video.duration * (o / w);
  video.play();
}

//sorting-image
let previewContainer = document.querySelector('.btn-container');

previewContainer.addEventListener('click', function (e){
   if(!e.target.closest('button')) return;
  let eventBtn = e.target;
  if (eventBtn.classList.contains('active')) return;
  let btns = this.querySelectorAll('button');

  removeClass(btns, 'active');

  eventBtn.classList.add('active');
  let btnId = eventBtn.id;

  let ItemsSort = document.querySelectorAll('.sorting-pictures-column');
  removeClass(ItemsSort, 'hide');

  if (btnId === 'all') return;

  for (let i = 0; i < ItemsSort.length; i++) {
    const item = ItemsSort[i];
    const dataValue = item.dataset.sort;
    (dataValue !== btnId) ? item.classList.add('hide') :'';
  }
})

let removeClass = function(area, className) {
  for (let i = 0; i < area.length; i++) {
    const btn = area[i];
     if (btn.classList.contains(className)) {
      btn.classList.remove(className)
     }
  }
}