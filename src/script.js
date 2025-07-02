const url = "https://api.jikan.moe/v4/top/anime?limit=24";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Les données de l'API
    getImage(data.data);

    data.data.forEach((data) => {
      fullImage(data);
    });
  });

function fullImage(data) {
  let allImages = data.images.jpg.image_url;
  console.log(allImages);
  let index = document.querySelector("#premiun");
  let container = document.createElement("article");

  container.innerHTML = `<div>
        <img class="h-auto max-w-full rounded-lg" src="${allImages}" alt="">
       </div>`;

  index.appendChild(container);
}


function getImage(source) {
  console.log(source);
  let image =  source[4].images.jpg.image_url
  console.log(image)
   let titre =source[4].title
   let autretitre =source[4].title_japanese

   let description = source[4].synopsis


  let html = document.createElement('article')
  let containerEl = document.querySelector('#card-reference')
  html.innerHTML = 
  `
     <div class="flex flex-col sm:flex-row max-w-4xl mx-auto bg-neutral shadow-sm">
          <div class="relative w-full h-64 sm:h-auto sm:w-1/2">
            <img
              src="${image}"
              alt="Vue de Venise"
              class="absolute w-full h-full object-cover"
            />
          </div>
          <div class="w-full sm:w-1/2 pt-8 pb-6 px-8">
            <h2 class="text-2xl mb-2">${titre}</h2>
            <p class="font-thin mb-10 sm:mb-20 truncate">
              ${description}
            </p>
            <a
              href="#"
              class="inline-flex items-center gap-4 rounded shadow-md p-3 bg-gradient-to-r from-red-300 to-orange-300"
            >
              <span class="text-sm">${autretitre}</span>
              <img 
              src="ressources/paper-plane.svg" 
              alt=""
              class="w-6"
              />
            </a>
          </div>
        </div>
     
  `
  containerEl.appendChild(html)
}
