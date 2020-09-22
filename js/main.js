window.onload=function() {

    // get tab container
    var container = document.getElementById("tabContainer");
    var tabcon = document.getElementById("tabscontent");
    // set current tab
    var navitem = document.getElementById("tabHeader_1");

    //store which tab we are on
    var ident = navitem.id.split("_")[1];
    //alert(ident);
    navitem.parentNode.setAttribute("data-current",ident);
    //set current tab with class of activetabheader
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


$(document).ready(function () {
    videoPlayer();    
});


let videoPlayer = function () {    
    let video = document.getElementById('video');
    let playButton = document.getElementById('play-pause');
    let playButtonBig = document.querySelector('.button-play-video');
    let controlsContainer = document.querySelector('.action-block-controls');
    let muteButton = document.getElementById('mute');
    let seekBar = document.getElementById('seek-bar');
    let range = document.querySelector('.active-range');

    let flipIcon = function (icon) {
        if (icon.classList.contains('flipped')) {
            icon.classList.remove('flipped');
            return;
        }
        icon.classList.add('flipped');
    };

    playButtonBig.addEventListener('click', function () {
        if (video.paused == true) {
            video.classList.remove('blur-video');
            video.play();
            playButtonBig.classList.add('hide-btn');
            controlsContainer.classList.add('show-container');
            flipIcon(playButton);
        } 
    });

    // Event listener for the play/pause button
    playButton.addEventListener('click', function () {
        if (video.paused == true) {
            playButtonBig.classList.add('hide-btn');
            video.classList.remove('blur-video');           
            video.play();
            flipIcon(this);
        } else {
            controlsContainer.classList.remove('show-container');
            playButtonBig.classList.remove('hide-btn');
            video.classList.add('blur-video');
            video.pause();
            flipIcon(this);
        }
    });

    video.addEventListener('webkitendfullscreen', function(){
        playButtonBig.classList.remove('hide-btn');
        video.classList.add('blur-video');
        video.pause();
    });

    muteButton.addEventListener('click', function () {
        if (video.muted == false) {
            video.muted = true;
            flipIcon(this);
        } else {
            video.muted = false;
            flipIcon(this);
        }
    });

    seekBar.addEventListener('change', function () {
        let time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    video.addEventListener('timeupdate', function () {
        let value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
        range.style.width = value + '%';
    });

    seekBar.addEventListener('mousedown', function () {
        video.pause();
    });

    seekBar.addEventListener('mouseup', function () {
        if (playButton.classList.contains('flipped')) {
            video.pause();
        } else {
            video.play();
        }
    });    
}

