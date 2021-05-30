"use strict";

function apiFunction(tabsItemsName, name, element) {
  const apiKey = "2dd08287b759101888b5a20c23399375";
  const IMGURL = "https://image.tmdb.org/t/p/w500/";
  let data = fetch(
    // `https://api.themoviedb.org/3/movie/popular?api_key=2dd08287b759101888b5a20c23399375&language=en-US&page=1`
    //   `https://api.themoviedb.org/3/tv/popular?api_key=2dd08287b759101888b5a20c23399375&language=en-US&page=1`
    `https://api.themoviedb.org/3/${tabsItemsName}/${name}?api_key=${apiKey}&language=en-US&page=1`
  )
    .then((data) => data.json())
    .then((movies) => {
      if (tabsItemsName === "movie") {
        let { results } = movies;
        let streaming = document.querySelector(element);

        let dataTabs = "";
        results.forEach((item) => {
          const { poster_path, title, release_date } = item;
          dataTabs += `<div class="card">
          <a href="#" class="card__img">
            <img src="${IMGURL + poster_path}" alt="${title}">
            <div class="chart-block">
              <div class="chart" data-percent="89"><span>89<sup>%</sup></span><canvas height="37" width="37"></canvas></div>
            </div>
          </a>
          <div class="card__body">
            <h3 class="card__title">
              <a href="/">${title}</a>
            </h3>
            <span class="card__date">${release_date}</span>
          </div>
        </div>`;
        });
        streaming.innerHTML = dataTabs;
      }

      if (tabsItemsName === "tv") {
        let { results } = movies;
        let streaming = document.querySelector(element);

        console.log(results);
        let dataTabs = "";
        results.forEach((item) => {
          const { poster_path, name, first_air_date } = item;
          console.log(name);
          dataTabs += `<div class="card">
            <a href="#" class="card__img">
              <img src="${IMGURL + poster_path}" alt="${name}">
              <div class="chart-block">
                <div class="chart" data-percent="89"><span>89<sup>%</sup></span><canvas height="37" width="37"></canvas></div>
              </div>
            </a>
            <div class="card__body">
              <h3 class="card__title">
                <a href="/">${name}</a>
              </h3>
              <span class="card__date">${first_air_date}</span>
            </div>
          </div>`;
        });
        streaming.innerHTML = dataTabs;
      }
    })
    .catch((error) => console.log(error));
}
apiFunction("movie", "popular", "#streaming");
apiFunction("tv", "popular", "#on-tv");

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
