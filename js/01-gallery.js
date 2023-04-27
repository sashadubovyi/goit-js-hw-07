import { galleryItems } from "./gallery-items.js";

const ulGallery = document.querySelector(".gallery");

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

ulGallery.innerHTML = createGallery(galleryItems);
ulGallery.addEventListener("click", onImageClick);

let instance = {};

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600">`,
    {
      onShow: (instance) => { 
        document.addEventListener('keydown', closeOnEscape);

      },
      onClose: (instance) => { 
        document.removeEventListener('keydown', closeOnEscape);
      },
    }
  );
  instance.show();
}

function closeOnEscape(event) {
  if (event.code === 'Escape') {
    instance.close();
  }
}
