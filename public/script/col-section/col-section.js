import {renderCollections} from "./render-collections.js";
import {createCollectionFunc} from "./create-collection.js";

export async function colSection() {

  const reqCollectionSectionElem = document.querySelector("main .req-collection-section");
  const contentHTML = `
    <span class="collection-title">
      Collections Section
    </span>

    <div class="create-collection">
      <span>Collection</span>
      <button class="char-btn create-collection-btn">
        +
      </button>
    </div>

    <div class="saved-collection-wrapper"></div>
  `;

  reqCollectionSectionElem.innerHTML = contentHTML;
  
  const createCollectionElem = document.querySelector("main .req-collection-section .create-collection .create-collection-btn");

  createCollectionElem.addEventListener("click", e => {
    createCollectionFunc();
  })

  await renderCollections();
}