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

$(function () {
  $(".chart").easyPieChart({
    barColor: "#4cca77",
    trackColor: "#4cca774a",
    lineWidth: 3,
    rotate: 0,
    scaleLength: false,
  });
});
