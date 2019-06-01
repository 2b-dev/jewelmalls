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
$(".for-bag").on("click", function() {
  $(".bag-side").toggleClass("bag-side-open");
  $("body").toggleClass("open-bag-side");
});
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
/*$(".btn-screen").on("click", function() {
  var elem = $(this)
    .parent()
    .parent()
    .find("video");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
});*/

function openFullscreen(el) {
  /*var elem = $(el)
    .parent()
    .parent()
    .find("video");*/
  var elem = document.getElementById("index-video");
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

$(".owl-new-product").owlCarousel({
  loop: true,
  margin: 15,
  autoplay: true,
  autoplayTimeout: 1500,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2,
      nav: false
    },
    600: {
      items: 3,
      nav: true
    },
    1000: {
      items: 4,
      nav: true
    }
  }
});

$(".icon-fav-card-product").on("click", function() {
  $(this).toggleClass("get_fav");
});
$(document).mouseup(function(e) {
  if (
    !$(".bag-side").is(e.target) &&
    $(".bag-side").has(e.target).length === 0
  ) {
    $(".bag-side").removeClass("bag-side-open");
    $("body").removeClass("open-bag-side");
  }
});

/*function pricerange() {
  var pricemin = parseInt($(".valrange1").val());
  var pricemax = parseInt($(".valrange2").val());
  var tmp;
  if (pricemin > pricemax) {
    tmp = pricemax;
    pricemax = pricemin;
    pricemin = tmp;
  }
  $(".minprice").text(pricemin + " ฿");
  $(".maxprice").text(pricemax + " ฿");
}*/
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".input-range-container");
  const rangeLower = document.querySelector('input[name="range-lower"]');
  const rangeUpper = document.querySelector('input[name="range-upper"]');
  const trackerBetween = document.querySelector(".input-range-tracker-between");
  const minValue = 0;
  const maxValue = Number(rangeUpper.getAttribute("max"));

  let containerHoverOnPercent = 0;

  const updateTrackerBetween = () => {
    const lowerValue = Number(rangeLower.value);
    const upperValue = Number(rangeUpper.value);
    trackerBetween.style.width = `${((upperValue - lowerValue) / maxValue) *
      100}%`;
    trackerBetween.style.left = `${(lowerValue / maxValue) * 100}%`;
  };
  updateTrackerBetween();

  const moveAppropriateThumbToUpper = () => {
    const lowerValue = Number(rangeLower.value);
    const upperValue = Number(rangeUpper.value);
    const closeValue = maxValue / 10;

    if (upperValue - lowerValue < closeValue && upperValue > maxValue * 0.9) {
      rangeLower.classList.add("display-upper");
      rangeUpper.classList.remove("display-upper");
    } else if (
      upperValue - lowerValue < closeValue &&
      lowerValue < maxValue * 0.1
    ) {
      rangeLower.classList.remove("display-upper");
      rangeUpper.classList.add("display-upper");
    } else {
      const middleValue = lowerValue + (upperValue - lowerValue) / 2;
      if (containerHoverOnPercent < middleValue / maxValue) {
        rangeLower.classList.add("display-upper");
        rangeUpper.classList.remove("display-upper");
      } else {
        rangeLower.classList.remove("display-upper");
        rangeUpper.classList.add("display-upper");
      }
    }
  };

  ["mouseenter", "mousemove", "touchstart", "touchmove"].forEach(eventName => {
    container.addEventListener(
      eventName,
      event => {
        containerHoverOnPercent = event.offsetX / event.target.clientWidth;
        moveAppropriateThumbToUpper();
      },
      false
    );
  });

  rangeLower.addEventListener(
    "input",
    event => {
      const lowerValue = Number(event.target.value);
      const upperValue = Number(rangeUpper.value);
      if (lowerValue < minValue) {
        event.target.value = minValue;
      } else if (lowerValue > upperValue) {
        event.target.value = upperValue;
      }

      moveAppropriateThumbToUpper();
      updateTrackerBetween();
    },
    false
  );

  rangeUpper.addEventListener(
    "input",
    event => {
      const lowerValue = Number(rangeLower.value);
      const upperValue = Number(event.target.value);
      if (upperValue > maxValue) {
        event.target.value = maxValue;
      } else if (upperValue < lowerValue) {
        event.target.value = lowerValue;
      }

      moveAppropriateThumbToUpper();
      updateTrackerBetween();
    },
    false
  );
});
$( "input#range-lower" ).change(function() {
  var price_low = $("input#range-lower").val()
  $('.set-price-lower').text(`฿ `+ price_low);
  var pos_low = (price_low*100)/25000;
  const lowerpos = document.querySelector(".set-price-lower");
  lowerpos.style.left = `calc(`+(pos_low)+`% - 25px)`;
});
$( "input#range-upper" ).change(function() {
  var price_low = $("input#range-upper").val()
  $('.set-price-upper').text(`฿ `+ price_low);
  var pos_low = (price_low*100)/25000;
  const lowerpos = document.querySelector(".set-price-upper");
  lowerpos.style.left = `calc(`+(pos_low)+`% - 40px)`;
});


