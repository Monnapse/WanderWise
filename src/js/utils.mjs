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
  console.log(dateElements)

  dateElements.forEach((element) => {
    const date = new Date();
    const dateFormat = element.getAttribute("date") || "dd/mm/yyyy";
    element.classList.add("date");
    console.log(date);
    element.innerText = formatDate(date, dateFormat);
  });
}