import museums, {
  moma,
  louvre,
  guggenheim,
  metropolitan,
  nationalGallery,
  picassoBarcelona,
  picassoMalaga,
} from "./museums.js";
import { Locations } from "./Locations.js";
import Calendar from "./Calendar.js";
let url = "https://en.wikipedia.org/";
const carouselSlide = document.querySelector("#carousel-slide");
const dropDownPicasso = document.querySelector("#about-picasso");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const planAnEncounter = document.querySelectorAll(".planAnEncounter");
const elementsWithEarlyId = document.querySelectorAll('[id*="early"]');
const dropDownCareer = document.querySelectorAll('[id*="career"]');
const dropDownDeath = document.querySelectorAll('[id*="death"]');
const dropDownLegacy = document.querySelectorAll('[id*="artistic-legacy"]');
const eventMenu = document.querySelectorAll('[id*="event"]');
const calendar = document.querySelector("#calendar");

const home = document.querySelector("#home");
const searchResult = document.querySelector("#searchResult");
const videoContainer = document.querySelector("#videoContainer");
const loading = document.getElementById("spinner");
const topScroll = document.getElementById("btn-back-to-top");
const stickyNav = document.querySelector(".sticky-nav");
const funFacts = document.querySelector(".funFacts");
const funFactsLinks = document.querySelectorAll(".funFactsLink");
const slidesDisplay = document.querySelectorAll(".slidesDisplay");
const visitContainer = document.querySelector("#visitContainer");
const content = document.querySelector("#content");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

const earlyContent = document.querySelector(".early-modal");
const careerContent = document.querySelector(".career-modal");
const deathContent = document.querySelector(".death-modal");
const legacyContent = document.querySelector(".legacy-modal");
const modals = document.querySelectorAll(".openModal");

const blue = document.querySelector("#blue");
const rose = document.querySelector("#rose");
const african = document.querySelector("#african");
const cubism = document.querySelector("#cubism");
const surrealism = document.querySelectorAll("#surrealism");
const depression = document.querySelectorAll("#depression");
const ww = document.querySelectorAll("#ww");
const later = document.querySelectorAll("#later");

const picassoBlueTitle = "Picasso's_Blue_Period";
const picassoRoseTitle = "Picasso%27s_Rose_Period";
const picassoAfricanTitle = "Picasso%27s_African_Period";
const picassoTitle = "Pablo_Picasso";

const picassoCubismTitle = "Picasso_and_the_Ballets_Russes";

let imageContainers = [];
let totalItems = 0;
let currentIndex = 0;

let carouselList = [];
let listBlue = [];
let listRose = [];
let listAfrican = [];
let listCubism = [];
let listSurrealism = [];
let listDepression = [];
let listWw = [];
let listLater = [];
let searchList = [];

async function loadPage() {
  funFacts.style.display = "none";
  footer.style.display = "none";
  header.style.display = "none";
  content.style.display = "none";
  loading.style.display = "block";

  await builContent();
  loading.style.display = "none";
  content.style.display = "block";
  footer.style.display = "block";
  header.style.display = "block";
}
loadPage();

async function builContent() {
  const resp = await getImages(picassoAfricanTitle, buildCarousel);

  const blueResp = await getImages(picassoBlueTitle);
  const roseResp = await getImages(picassoRoseTitle);
  const africanResp = await getImages(picassoAfricanTitle);
  const cubismResp = await getImages(picassoCubismTitle);

  getSlides(blueResp, blue, 2300860, listBlue);
  getSlides(roseResp, rose, 2291620, listRose);
  getSlides(africanResp, african, 2491636, listAfrican);
  getSlides(cubismResp, cubism, 20731162, listCubism);

  dropDownMenu();
  eventMenu.forEach((eventLink) => {
    const calendarFunctionality = new Calendar();
    eventLink.addEventListener("click", async function (event) {
      content.style.display = "none";
      event.preventDefault();
      calendar.style.display = "block";
      searchResult.style.display = "none";
      visitContainer.style.display = "none";
      funFacts.style.display = "none";
      if (calendar.innerHTML == "") {
        await calendarFunctionality.renderCalendar();
      }
    });
  });
  slidesDisplay.forEach((element) => {
    element.addEventListener("click", function () {
      searchResult.innerHTML = "";
      content.style.display = "block";
      visitContainer.style.display = "none";
      calendar.style.display="none"
    });
  });

  funFactsLinks.forEach((funFactsLink) => {
    funFactsLink.addEventListener("click", function (event) {
      event.preventDefault();
      calendar.style.display = "none";
      content.style.display = "none";
      searchResult.style.display = "none";
      visitContainer.style.display = "none";
      funFacts.style.display = "";
    });
  });
  planAnEncounter.forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      calendar.style.display = "none";
      content.style.display = "none";
      searchResult.style.display = "none";
      funFacts.style.display = "none";
      getLocation();
    });
  });
}

async function getImages(titles, callback) {
  try {
    const response = await fetch(
      `${url}w/api.php?&origin=*&action=query&titles=${titles}&format=json&prop=images`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resp = await response.json();
    console.log(resp);

    if (callback) {
      callback(resp);
    }
    return resp;
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

async function buildCarousel(resp) {
  const promises = resp.query.pages[2491636].images.map((element) => {
    let title = element.title;
    if (title) {
      return getImageSrc(title);
    } else {
      return Promise.resolve();
    }
  });
  await Promise.all(promises);
  getCarousel(carouselList);
}

async function getImageSrc(title) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=query&titles=${title}&format=json&prop=imageinfo&iiprop=url`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === "-1") {
      throw new Error("Image not found");
    }
    const imageUrl = pages[pageId].imageinfo[0]?.url;
    if (imageUrl) {
      carouselList.push(imageUrl);
      return imageUrl;
    } else {
      console.warn(`Image URL not found for title: ${title}`);
    }
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}
async function getCarousel(carouselList) {
  carouselList.forEach((element, index) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("carouselItem");
    if (index === 0) {
      imageContainer.classList.add("active");
    }
    const image = document.createElement("img");
    image.src = element;
    image.classList.add("image");

    imageContainer.appendChild(image);
    carouselSlide.appendChild(imageContainer);
  });
}

function dropDownMenu() {
  dropDownPicasso.addEventListener("click", function () {
    elementsWithEarlyId.forEach((element) => {
      element.addEventListener("click", function () {
        closeModals();
        earlyContent.style.display = "";
        closeButton(earlyContent);
      });
    });

    dropDownCareer.forEach((element) => {
      element.addEventListener("click", function () {
        closeModals();
        careerContent.style.display = "";
        closeButton(careerContent);
      });
    });

    dropDownDeath.forEach((element) => {
      element.addEventListener("click", function () {
        closeModals();
        deathContent.style.display = "";
        closeButton(deathContent);
      });
    });

    dropDownLegacy.forEach((element) => {
      element.addEventListener("click", function () {
        closeModals();
        legacyContent.style.display = "";
        closeButton(legacyContent);
      });
    });
  });
}

function closeModals() {
  modals.forEach((element) => {
    element.style.display = "none";
  });
}
function closeButton(element) {
  let closeButton = document.createElement("i");
  closeButton.classList.add("fa-regular", "fa-circle-xmark", "close-icon");
  element.appendChild(closeButton);
  closeButton.addEventListener("click", function () {
    closeModals();
  });
}

async function getSlides(resp, elementToBeAdded, id, list) {
  const promises = resp.query.pages[id].images.map(async (element) => {
    let title = element.title;
    const smallTitle = extractSmallTitle(title);
    let imageUrl;
    if (title) {
      imageUrl = await getImageSrc(title);
    }
    let id = generateUniqueId();
    let picture = { id, title: smallTitle, url: imageUrl };
    return picture;
  });

  const pictures = await Promise.all(promises);

  pictures.forEach((picture) => {
    if (!list.some((existing) => existing.url === picture.url)) {
      list.push(picture);
    }
  });
  pictures.forEach((picture) => {
    if (!searchList.some((existing) => existing.url === picture.url)) {
      searchList.push(picture);
    }
  });

  pictures.forEach((picture) => {
    if (picture.title && picture.url) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add("card");

      const tiledescription = document.createElement("div");
      tiledescription.classList.add("title");
      tiledescription.classList.add("card-title");

      tiledescription.innerText = picture.title;

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = picture.url;

      tile.appendChild(img);
      tile.appendChild(tiledescription);
      elementToBeAdded.appendChild(tile);
    }
  });
}
function extractSmallTitle(title) {
  const smallTitleSufix = title.substring(title.indexOf(":") + 1);
  const dotIndex = smallTitleSufix.indexOf(".");
  return dotIndex !== -1
    ? smallTitleSufix.substring(0, dotIndex)
    : smallTitleSufix;
}

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const searchInputValue = searchInput.value;
  if (!searchInputValue.trim()) {
    console.error("Please enter a search term");
    return;
  }

  searchAndOpenModal(searchInputValue);
});

async function searchAndOpenModal(searchTerm) {
  const searchResults = await searchImagesAndTitles(searchTerm);

  if (!searchResults || searchResults.length === 0) {
    searchResult.innerHTML = "";
    calendar.style.display = "none";
    content.style.display = "none";
    visitContainer.style.display = "none";
    await displayNoResultsCard();
    return;
  } else {
    content.style.display = "none";
    funFacts.style.display = "none";
    calendar.style.display = "none";
    visitContainer.style.display = "none";
    searchResult.innerHTML = "";
    searchResults.forEach((element) => {
      displayModal(element.title, element.url);
    });
  }
}

function displayModal(title, imageUrl) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.classList.add("card");

  const tiledescription = document.createElement("div");
  tiledescription.classList.add("title");
  tiledescription.classList.add("card-title");

  tiledescription.innerText = title;

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = imageUrl;
  tile.appendChild(img);
  tile.appendChild(tiledescription);
  searchResult.appendChild(tile);
  searchResult.style.display = "";
}

async function searchImagesAndTitles(searchTerm) {
  const results = [];
  for (const item of searchList) {
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(item);
    }
  }
  return results;
}

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 5);
  return timestamp + randomString;
}

function displayNoResultsCard() {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("tile");
  cardContainer.classList.add("card");

  const title = document.createElement("div");
  title.classList.add("card-title");
  title.classList.add("noResults");
  title.innerHTML = "Sorry, no results were found.";

  const image = document.createElement("img");
  image.src = "./resources/no results.gif";
  image.classList.add("card-img-top");

  cardContainer.appendChild(title);
  cardContainer.appendChild(image);

  searchResult.appendChild(cardContainer);
}

topScroll.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    topScroll.style.display = "block";
  } else {
    topScroll.style.display = "none";
  }
});

content.addEventListener("click", function (event) {
  const clickedImage = event.target.closest("img");
  if (clickedImage) {
    openModalWithBigImage(clickedImage, content);
  }
});

searchResult.addEventListener("click", function (event) {
  const clickedImage = event.target.closest("img");
  if (clickedImage) {
    openModalWithBigImage(clickedImage, searchResult);
  }
});

function openModalWithBigImage(image, element) {
  const openedModals = document.querySelectorAll(".bigImageContent");
  if (openedModals.length > 0) {
    openedModals.forEach((modal) => {
      modal.parentNode.removeChild(modal);
    });
  }
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("openModal");
  modalContainer.classList.add("bigImageContent");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const bigImage = document.createElement("img");
  bigImage.src = image.src;
  bigImage.classList.add("big-image");
  let closeButton = document.createElement("i");
  closeButton.classList.add("fa-regular", "fa-circle-xmark", "close-icon");
  modalContainer.appendChild(closeButton);
  closeButton.addEventListener("click", function () {
    closeButton.parentNode.parentNode.removeChild(modalContainer);
  });
  modalContent.appendChild(bigImage);
  modalContainer.appendChild(modalContent);

  element.appendChild(modalContainer);
}

const locations = new Locations();

async function getLocation() {
  content.style.display = "none";
  searchResult.style.display = "none";
  funFacts.style.display = "none";
  if (visitContainer && visitContainer.innerHTML.trim() !== "") {
    visitContainer.style.display = "block";
  } else {
    visitContainer.style.display = "block";
    const visitTitle = document.createElement("div");
    visitTitle.innerHTML =
      "Plan an encounter with Picasso's Art at one of the following museums";
    visitTitle.classList.add("encounterTitle");
    visitContainer.appendChild(visitTitle);
    await locations.getLocations(museums.moma);
    await locations.getLocations(museums.guggenheim);
    await locations.getLocations(museums.metropolitan);
    await locations.getLocations(museums.louvre);
    await locations.getLocations(museums.picassoMalaga);
    await locations.getLocations(museums.picassoBarcelona);
    await locations.getLocations(museums.nationalGallery);
  }
}
