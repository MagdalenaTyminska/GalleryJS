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

let lightboxInstance = undefined;

gallery.insertAdjacentHTML("afterbegin", createGallery);

gallery.addEventListener("click", selectPicture);

function selectPicture(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const currentSelectedPicture = galleryItems.find(
    (picture) => event.target.src === picture.preview
  );

  if (currentSelectedPicture) {
    const modalWindow = basicLightbox.create(
      `<img src=${currentSelectedPicture.original}>`
    );
    modalWindow.show();
    lightboxInstance = modalWindow;
  }
}

document.addEventListener("keydown", function (event) {
  if (
    lightboxInstance &&
    lightboxInstance.visible() &&
    event.key === "Escape"
  ) {
    lightboxInstance.close();
    lightboxInstance = undefined;
  }
});
