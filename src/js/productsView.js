const addNewProductbtn = document.getElementById("add-newProduct");
const titleDom = document.getElementById("product-title");
const quantityDom = document.getElementById("product-quantity");
const categoryDom = document.getElementById("select-Catedgory-Product");
const prodcuctsList = document.getElementById("products-List");
import Storage from "./storage.js";
class ProductsView {
  constructor() {
    addNewProductbtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = titleDom.value;
    const quantity = quantityDom.value;
    const category = categoryDom.value;
    if (!title || !quantity || !category) return alert("plese writing all");
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createdProductsList();
    titleDom.value = "";
    quantityDom.value = "";
    categoryDom.value = "";
  }
  setApp() {
    this.products = Storage.getAllProducts();
    this.createdProductsList();
  }
  createdProductsList() {
    let result = "";
    const findCategory = (id) => {
      const category = Storage.getAllCategories().find(
        (p) => p.id === parseInt(id)
      );
      return category.title;
    };
    this.products.forEach((p) => {
      return (result += ` <div class="flex w-full items-center justify-between mt-2">
            <p class="text-gray-400 text-[1.1rem] pr-8">${p.title}</p>
            <div class="flex items-center justify-between">
              <p class="text-gray-400 text-[.9rem] mr-3">${new Date(
                p.createdAt
              ).toLocaleDateString("en-us")}</p>
              <span
                class="text-gray-400 text-[.9rem] mr-3 px-2 py-[.1rem] ring-1 ring-gray-500 rounded-xl"
              >
                ${findCategory(p.category)}
              </span>
              <button
                class="text-gray-400 text-[.9rem] mr-3 px-2 py-[.1rem] ring-1 ring-gray-500 rounded-xl"
              >
                Edit
              </button>
              <span
                class="text-gray-400 text-[.9rem] bg-gray-600 mr-3 w-6 h-6 flex items-center justify-center ring-2 ring-gray-500 rounded-full"
              >
            ${p.quantity}
              </span>
              <button
                class="mr-[.1rem] text-red-400 text-[.9rem] px-2 py-[.1rem] ring-1 ring-red-400 rounded-xl"
              >
                delete
              </button>
            </div>
          </div>`);
    });
    prodcuctsList.innerHTML = result;
  }
}
export default new ProductsView();
