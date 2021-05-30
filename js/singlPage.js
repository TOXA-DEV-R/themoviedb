"use strict";

$(function () {
  $(".chart").easyPieChart({
    barColor: "#4cca77",
    trackColor: "#4cca774a",
    lineWidth: 3,
    rotate: 0,
    scaleLength: false,
  });
});

const navbarLinks = document.querySelectorAll("header .navbar__link");
const navbarLinksInit = document.querySelectorAll(
  "header .navbar__menu li .menu-init"
);
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
