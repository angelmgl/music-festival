console.log('ready');
document.addEventListener('DOMContentLoaded', () => {
    createGallery();
})

function createGallery() {
    const $gallery = document.querySelector(".gallery-images");

    for(let i = 1; i <= 12; i++) {
        const $image = document.createElement("IMG");
        $image.src = `build/img/thumb/${i}.webp`;
        $image.dataset.imageId = i;

        // add function to open image
        $image.onclick = openImage;

        const $item = document.createElement("LI");
        $item.appendChild($image);

        $gallery.appendChild($item);
    }
}

function openImage(e) {
    const id = parseInt(e.target.dataset.imageId);

    // to create the image
    const $image = document.createElement("IMG");
    $image.src = `build/img/grande/${id}.webp`;

    const $overlay = document.createElement("DIV");
    $overlay.appendChild($image);
    $overlay.classList.add("g-overlay");

    // close image on click event
    $overlay.onclick = () => {
        $overlay.remove();
        $body.classList.remove("fix-body");
    }

    // button to close the img
    const $close = document.createElement('P');
    $close.textContent = "Cerrar";
    $close.classList.add("btn-close");
    $overlay.appendChild($close)
    $close.onclick = () => {
        $overlay.remove();
        $body.classList.remove("fix-body");
    }

    // to show on the html
    const $body = document.querySelector("body");
    $body.appendChild($overlay);
    $body.classList.add("fix-body");
}