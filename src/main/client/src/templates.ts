import {render} from "./utils";

/**
 *
 * Album Grid
 *
 */

export const albumGrid = (albums: Album[]) => {
    if (!albums.length){
        return render(`<div class="rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center" draggable="false">There are no albums to show. Add one using the form above.</div>`);
    }

    return albums.map(album => render(albumElem(album)));
}

export const albumElem = (album: Album) => `
      <div id="album-${album.id}" data-order="${album.order}" data-target="${album.id}" data-title="${album.title}" class="album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200" draggable="true">
        <div class="pointer-events-none border-b border-gray-800 p-2"><span class="font-bold">Album Title:</span> <span>${album.title}</span></div>
        <div class="pointer-events-none border-b border-gray-800 p-2"><span class="font-bold">Created:</span> <span>${album.createdAt}</span></div>
      </div>
    `

/**
 *
 * Image Grid
 *
 */

export const imageGrid = (albumId: number) => render(`<div class="image-grid" data-album="${albumId}"></div>`)

export const imageCollection = (images: Image[]) => {
    if (!images.length){
        return render(`<div style="grid-column: 1/6" class="rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center">There are no images to show. Add one using the form above.</div>`);
    }

    return images.map(image => render(imageElem(image)));
}

export const imageElem = (image: Image) => `
    <div id="image-${image.id}" data-target="${image.id}" class="image">
      <div class="cursor-pointer shadow-lg flex flex-col p-2 rounded items-center bg-white text-gray-800 transition-default hover:bg-blue-200">
        <div class="rounded-full flex w-24 h-24 overflow-hidden">
          <img src="/image-gallery/resources/images/${image.path}" alt="${image.title}" style="object-fit: cover" />
        </div>
        <div class="border-b border-gray-800 text-gray-800 self-stretch text-center mt-2">
          <span class="font-bold">Title:</span> <span>${image.title}</span>
        </div>
      </div>
    </div>
`