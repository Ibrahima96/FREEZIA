const url = "https://api.jikan.moe/v4/top/anime?limit=24";
let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 8;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allData = data.data;
    filteredData = allData;
    renderPage();
    setupSearch();
    setupPagination();
  });

function renderPage() {
  const index = document.querySelector("#premiun");
  index.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  filteredData.slice(start, end).forEach(fullImage);
}

function fullImage(data) {
  let allImages = data.images.jpg.image_url;
  let container = document.createElement("article");
  container.innerHTML = `<div class=" transition-transform hover:scale-110">
        <img class="h-auto max-w-full rounded-lg hover:rotate-x-15 hover:-rotate-y-30" src="${allImages}" alt="">
       </div>`;
  document.querySelector("#premiun").appendChild(container);
}

function setupSearch() {
  document.getElementById("search").addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase();
    filteredData = allData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    currentPage = 1;
    renderPage();
    setupPagination();
  });
}

function setupPagination() {
  let pagination = document.getElementById("pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.className = "flex justify-center gap-2 my-4";
    document.querySelector("#premiun").after(pagination);
  }
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className =
      "px-3 py-1 rounded " +
      (i === currentPage ? "bg-orange-700 text-white" : "bg-gray-200");
    btn.onclick = () => {
      currentPage = i;
      renderPage();
      setupPagination();
    };
    pagination.appendChild(btn);
  }
}
