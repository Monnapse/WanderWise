export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
  parentElement.insertAdjacentHTML("afterbegin", template);
  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  // Header
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  // Footer
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function formatDate(date, format) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const dateFormat = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day, year] = dateFormat.split("/");
  const formatSplit = format.split("/");
  const formatedDate = "";
  const formattedDate = formatSplit.map((part) => {
    if (part === "dd") return day;
    if (part === "mm") return month;
    if (part === "yyyy") return year;
    return part;
  });

  const formattedDateString = String(formattedDate);

  return formattedDateString.replaceAll(",", "/");
}

export function loadDates() {
  // Get dates attribute from tags ex: <span date="year">
  const dateElements = document.querySelectorAll("[date]");

  dateElements.forEach((element) => {
    const date = new Date();
    const dateFormat = element.getAttribute("date") || "dd/mm/yyyy";
    element.classList.add("date");

    element.innerText = formatDate(date, dateFormat);
  });
}

export function updateRecommendedCard(name, temp, fact, img) {
  const imgElem = document.querySelector("#recommended-card-img");
  imgElem.src = img;
  imgElem.alt = name;

  const nameElem = document.querySelector("#recommended-card-name");
  nameElem.innerText = name;

  const tempElem = document.querySelector("#recommended-card-temp");
  tempElem.innerText = temp;

  const factElem = document.querySelector("#recommended-card-fact");
  factElem.innerText = fact;
}

export function createCard(name, temp, img) {
  /*
    <div class="destination-card">
      <div class="img">
        <img src="/images/eiffel_tower.jpg" alt="Eiffel Tower" class="destination-image" />
        <div class="img-info-shadow"></div>
        <div class="img-info">
          <p>72°F Sunny</p>
          <button id="fav-btn">FAV</button>
        </div>
      </div>
      <p>Paris, France</p>
    </div>
  */
  const card = document.createElement("div");
  card.classList.add("destination-card");

  // TODO: Check if place is favorited and add functionality to the favorite button
  card.innerHTML = `
    <div class="img">
      <img src="${img}" alt="${name}" class="destination-image" />
      <div class="img-info-shadow"></div>
      <div class="img-info">
        <p>${temp}</p>
        <button id="fav-btn">FAV</button>
      </div>
    </div>
    <p>${name}</p>
  `

  return card;
}

export function replaceCards(places, container) {
  // Clear the container before adding new cards
  const cardsContainer = document.querySelector(container);
  cardsContainer.innerHTML = "";

  places.forEach((place) => {
    const card = createCard(place.name, place.temp, place.img);

    cardsContainer.insertAdjacentHTML("beforeend", card.outerHTML);
  });
}

