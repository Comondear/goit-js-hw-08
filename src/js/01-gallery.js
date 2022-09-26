import SimpleLightbox from 'simplelightbox';

import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line

import { galleryItems } from './gallery-items';
// Change code below this line



console.log(galleryItems);

const container = document.querySelector('.gallery');
const pictureMap = createGallery(galleryItems);

container.insertAdjacentHTML('beforeend', pictureMap)

function createGallery(gallery) {
    return gallery
        .map(({ preview, original, description }) => {
            return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
            </div>`;
        })
        .join('');
}

console.log(pictureMap);

container.addEventListener('click', onImgClick)

function onImgClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== "IMG") {
        return;
    }

    const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" >
`)
    instance.show()
    
    container.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape') {
            instance.close();
        }
    });
}

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});

