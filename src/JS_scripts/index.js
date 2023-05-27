import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadBtn from "./LoadBtn";
import SearchEngineService from "./SearchEngine";
import { onloadImageCard, markupLightbox } from "./OperationsMarkup";
 export  const submitBtn = document.querySelector(".search-form");
 export const moreBtn = document.querySelector(".load-more");
 export const gallery = document.querySelector(".gallery");
 const searchEngineService = new SearchEngineService();
 const loadBtn = new LoadBtn({selector: '.load-more', isHidden: true,});
    submitBtn.addEventListener("submit", onSearch);
    moreBtn.addEventListener("click", onClickMore);
async function onSearch(evt){
   evt.preventDefault();
   gallery.innerHTML =` `;
   loadBtn.hide();
   searchEngineService.resetPage();
   searchEngineService.searchQuery = evt.currentTarget.elements.searchQuery.value;
   if (searchEngineService.searchQuery === ` `){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
   }
   try{
     const result = await searchEngineService.fetchPictures();
     if(result.hits.length === 0){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
     }
     else{
       onloadImageCard(result.hits);
      //  const markupLightbox = new SimpleLightbox(`.photo-card a`,{});
       markupLightbox.refresh();
      if( result.hits.length < result.totalHits){
         Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
         loadBtn.show();
      }
      if (result.hits.length >= result.totalHits){
         Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         return;
      }
      loadBtn.show();
     }
   }catch(error){
      console.log(error);
   }
}
async function onClickMore(){
   try{
      loadBtn.disable();
      const result = await searchEngineService.fetchPictures();
       onloadImageCard(result.hits);
       markupLightbox.refresh();
      if (result.hits.length === 0) {
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         loadBtn.hide();
         return;
       }
       
       loadBtn.enable();
       if( result.hits.length >= result.totalHits || result.hits.length < 40 ){
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         loadBtn.hide();
         return;
       }
   }catch(error){
      console.log(error);
   }
}