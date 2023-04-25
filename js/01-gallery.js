import { galleryItems } from "./gallery-items.js";

const ulGallery = document.querySelector(".gallery");
const addGallaryMarkup = createGallery(galleryItems);

ulGallery.innerHTML = addGallaryMarkup;
ulGallery.addEventListener("click", onImageClick);

function createGallery(images) {
  return images
    .map(
      (image) =>
        `
        <li class="gallery__item">
        <a class="gallery__link" href="${image.original}">
          <img
            class="gallery__image"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
          />
        </a>
      </li>
    `
    )
    .join("");
}
function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600">`
  );
  instance.show();

  ulGallery.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}
