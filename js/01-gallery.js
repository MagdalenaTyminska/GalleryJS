import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector("div.gallery");
const createGallery = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href=${original}>
  <img class="gallery__image" src=${preview} alt=${description} data-source=${original} height="200">
  </a>
  </div>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", createGallery);

gallery.addEventListener("click", selectPicture);

function selectPicture(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  galleryItems.forEach((picture) => {
    const modalWindow = basicLightbox.create(`<img src=${picture.original}>`);
    if (event.target.src === picture.preview) {
      modalWindow.show();
    }
    if (modalWindow.visible() === true) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          modalWindow.close();
        }
      });
    }
  });
}
