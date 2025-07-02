const url = "https://api.jikan.moe/v4/top/anime?limit=24";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Les données de l'API
    getImage(data);

    data.data.forEach((data) => {
      fullImage(data);
    });
  });

function getImage(source) {
 
}

function fullImage(data) {
  let allImages = data.images.jpg.image_url;
  console.log(allImages);
  let index = document.querySelector("#premiun");
  let container = document.createElement('article')

   container.innerHTML = `<div>
        <img class="h-auto max-w-full rounded-lg" src="${allImages}" alt="">
       </div>`;

        index.appendChild(container)
}
