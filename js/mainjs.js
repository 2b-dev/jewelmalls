function window_onload() {
  window.addEventListener("scroll", navbar_reset_top, false);
  window.addEventListener("resize", navbar_reset_top, false);
  document
    .querySelector("#sm-nav>li")
    .addEventListener("click", dropMenu, false);
}

function navbar_reset_top() {
  var navbar_top = document.getElementById("main-head").offsetHeight;
  var navMain = document.getElementById("navmain");
  var navHeight = document.getElementById("navmain").offsetHeight;
  var topDiv = document.getElementById("top");
  var navLogo = document.getElementById("nav-logo");
  var smNav = document.getElementById("sm-nav");
  var navWidth = navMain.offsetWidth;
  var menu = document.querySelector("#sm-nav>li");
  var menuWidth = menu.offsetWidth;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var moveFactor = scrollTop / navbar_top;

  if (moveFactor <= 1) {
    navLogo.style.opacity = moveFactor;
    navLogo.style.top = -40 + 40 * moveFactor + "px";
    menu.style.marginLeft = (navWidth - menuWidth) * moveFactor + "px";
  } else {
    navLogo.style.opacity = 1;
    navLogo.style.top = 0;
    menu.style.marginLeft = navWidth - menuWidth;
  }
  if (scrollTop > navbar_top && navmain.className === "nav-abs") {
    navMain.className = "nav-fixed";
    topDiv.style.marginTop = navHeight + "px";
  } else if (scrollTop < navbar_top && navmain.className === "nav-fixed") {
    navMain.className = "nav-abs";
    topDiv.style.marginTop = "0px";
  }
}

function dropMenu() {
  var dropMenu = document.querySelector("#drop-menu");

  if (dropMenu.style.display == "none") {
    dropMenu.style.display = "block";
  } else {
    dropMenu.style.display = "none";
  }
}

$(".nav-menu-mobile").on("click", function() {
  $(".animated-icon1").toggleClass("open");
  $("body").toggleClass("open-menu");
  $(".menu-mobile").toggleClass("open-menu-left");
});
function openFullscreen(video_selected) {
  
  var elem = video_selected;  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
$(".btn-sound").on("click", function() {
  var video_selected = $(this)
    .parent()
    .parent()
    .find("video");
  if (video_selected.prop("muted") == false) {
    video_selected.prop("muted", true);
  } else {
    video_selected.prop("muted", false);
  }
});
$(".btn-screen").on("click", function() {
  var video_selected = $(this)
    .parent()
    .parent()
    .find("video");
    openFullscreen(video_selected);
});
