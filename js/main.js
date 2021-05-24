"use strict";
function tabsFunction(tabs) {
  document.querySelector(`.${tabs}`).addEventListener("click", function (e) {
    if (
      e.target.parentElement.classList.contains("tab-link") &&
      !e.target.parentElement.classList.contains("active")
    ) {
      e.target.parentElement.parentElement
        .querySelector(".active")
        .classList.remove("active");
      e.target.parentElement.classList.add("active");
      const tabContentName = e.target.parentElement.dataset.content;

      document
        .querySelector(`.${tabs}-content-item.active`)
        .classList.remove("active");
      const tabContent = document.getElementById(tabContentName);

      tabContent.classList.add("active");
    }
  });
}

tabsFunction("tabs");
tabsFunction("newTabs");
tabsFunction("trailers-tabs");
tabsFunction("trending-tabs");

$(function () {
  $(".chart").easyPieChart({
    barColor: "#4cca77",
    trackColor: "#4cca774a",
    lineWidth: 3,
    rotate: 0,
    scaleLength: false,
  });
});

const btnplays = document.querySelectorAll(".card__img .btn-play");
const trailersModal = document.querySelector(".section-trailers-modal");
const btnTimes = document.querySelector(".section-trailers-modal .btn-times");

btnplays.forEach((item) => {
  item.addEventListener("click", function () {
    trailersModal.classList.add("active");
  });
});

btnTimes.addEventListener("click", function () {
  trailersModal.classList.remove("active");
});

const navbarLinks = document.querySelectorAll("header .navbar__link");
const navbarLinksInit = document.querySelectorAll(
  "header .navbar__menu li .menu-init"
);

// modal player
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("modal-youtube", {
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady() {
  const playIframe = document.querySelector(
    "main .section-trailers-modal iframe"
  );

  btnTimes.addEventListener("click", function () {
    player.stopVideo();
  });
  if (!trailersModal.classList.contains("active")) {
    player.stopVideo();
  }
}
// modal player /

navbarLinks.forEach((item, index) => {
  let setBoolean = true;
  item.addEventListener("mousedown", function () {
    navbarLinksInit.forEach((itemInit, indexInit) => {
      if (index === indexInit) {
        itemInit.style.display = "block";
        setBoolean = !setBoolean;
      }
    });
  });

  item.addEventListener("mouseover", function () {
    navbarLinksInit.forEach((itemInit, indexInit) => {
      if (index === indexInit) {
        itemInit.style.display = "block";
      }
    });
  });

  item.addEventListener("mouseout", function () {
    navbarLinksInit.forEach((itemInit, indexInit) => {
      if (index === indexInit && setBoolean) {
        itemInit.style.display = "none";
        setBoolean = true;
      }
    });
  });
});
