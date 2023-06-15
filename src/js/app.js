import CategoryView from "./categoryView.js";
import productsView from "./productsView.js";
import "../css/output.css"

document.addEventListener("DOMContentLoaded",()=>{
    CategoryView.setApp()
    productsView.setApp();
})