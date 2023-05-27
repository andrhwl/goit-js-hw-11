import { gallery } from ".";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
export function onloadImageCard(hits){
    const cardMarkup = hits.map((hit) =>{
        return `
        <div class="photo-card">
        <a href ="${hit.webformatURL}">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy"  />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b>${hit.likes}
          </p>
          <p class="info-item">
            <b>Views:</b>${hit.views}
          </p>
          <p class="info-item">
            <b>Comments:</b>${hit.comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b>${hit.downloads}
          </p>
        </div>
      </div>
        `;
    }).join(``);
    gallery.insertAdjacentHTML(`beforeend`, cardMarkup);
    
}
 export const markupLightbox = new simpleLightbox(`.photo-card a`,{});
