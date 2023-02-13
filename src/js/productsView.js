const addNewProductbtn = document.getElementById("add-newProduct");
const titleDom = document.getElementById("product-title");
const quantityDom = document.getElementById("product-quantity");
const categoryDom = document.getElementById("select-Catedgory-Product");
const prodcuctsList = document.getElementById("products-List");
const lengthProducts = document.getElementById("length-Products");
const searchProductsDom = document.getElementById("search-products");
const sortProductsDom = document.getElementById("sort-products");
const filterCategoryProductsDom = document.getElementById("filter-category-products");
const addAProduct = document.getElementById("add-A-Product");
const editForm = document.getElementById("edit-Form");
const canselProductupdateDom = document.getElementById("cansel-Product-update");
const producttitleupdate = document.getElementById("product-title-update");
const productquantityupdate = document.getElementById("product-quantity-update");
const selectCatedgoryProductupdate = document.getElementById("select-Catedgory-Product-update");
const addProductupdateDom = document.getElementById("add-Product-update");

import Storage from "./storage.js";
class ProductsView {
  constructor() {
    addNewProductbtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchProductsDom.addEventListener("input",(e)=>this.searchProducts(e));
    sortProductsDom.addEventListener("change",(e)=>this.sortProducts(e));
    filterCategoryProductsDom.addEventListener("change",(e)=>this.filterCategoryProducts(e));
    canselProductupdateDom.addEventListener("click",(e)=>this.cancelUpdateProduct(e))
    addProductupdateDom.addEventListener("click",(e)=>this.Productupdate(e))
    this.products = [];
    this.editId=null;
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = titleDom.value;
    const quantity = quantityDom.value;
    const category = categoryDom.value;
    if (!title || !quantity || !category) return alert("plese writing all");
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createdProductsList(this.products);
    lengthProducts.textContent=this.products.length;
    addAProduct.classList.add("hidden")
    titleDom.value = "";
    quantityDom.value = "";
    categoryDom.value = "";
  }
  setApp() {
    this.products = Storage.getAllProducts();
    this.createdProductsList(this.products);
    if(!this.products.length){
      addAProduct.classList.remove("hidden")
    }
    lengthProducts.textContent=this.products.length
  }
  createdProductsList(products) {
    let result = "";
    const findCategory = (id) => {
      const category = Storage.getAllCategories().find(
        (p) => p.id === parseInt(id)
      );
      return category.title;
    };
    products.forEach((p) => {
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
                data-id=${p.id}
                class="edit-product text-gray-400 text-[.9rem] mr-3 px-2 py-[.1rem] ring-1 ring-gray-500 rounded-xl"
              >
                Edit
              </button>
              <span
                class="text-gray-400 text-[.9rem] bg-gray-600 mr-3 w-6 h-6 flex items-center justify-center ring-2 ring-gray-500 rounded-full"
              >
            ${p.quantity}
              </span>
              <button
                class="delete-Product mr-[.1rem] text-red-400 text-[.9rem] px-2 py-[.1rem] ring-1 ring-red-400 rounded-xl"
                data-id=${p.id}
              >
                delete
              </button>
            </div>
          </div>`);
    });
    prodcuctsList.innerHTML = result;
    const deleteBtns=[...document.querySelectorAll(".delete-Product")]
    deleteBtns.forEach(btn=>{
      return btn.addEventListener("click",(e)=>this.deleteProduct(e))
    })
    const editBtns=[...document.querySelectorAll(".edit-product")]
    editBtns.forEach(btn=>{
      return btn.addEventListener("click",(e)=>this.editProduct(e))
    })
  }
  searchProducts(e){
    const filterdProducts=this.products.filter(p=>{
      return p.title.toLowerCase().includes(e.target.value.toLowerCase().trim())
    })
    this.createdProductsList(filterdProducts)
  }
  sortProducts(e){
    this.products= Storage.getAllProducts(e.target.value)
     this.createdProductsList(this.products)
  }
  filterCategoryProducts(e){
    console.log(e.target.value);
    const filteredProducts=this.products.filter(p=>{
      if(e.target.value=="") return p
      return p.category==e.target.value
  })
    this.createdProductsList(filteredProducts)
  }
  deleteProduct(e){
    console.log(e.target.dataset.id);
    Storage.deleteProducts(e.target.dataset.id)
    this.products= Storage.getAllProducts()
     this.createdProductsList(this.products)
     if(!this.products.length){
      addAProduct.classList.remove("hidden")
    }

  }
  editProduct(e){
    editForm.classList.remove("hidden")
    prodcuctsList.classList.add("hidden")
    // console.log(e.target.dataset.id);
   const product= this.products.find(p=>p.id===parseInt(e.target.dataset.id))
   this.editId=e.target.dataset.id
   producttitleupdate.value=product.title
   productquantityupdate.value=product.quantity
   selectCatedgoryProductupdate.value=product.category
  }
  cancelUpdateProduct(e){
    e.preventDefault()
    editForm.classList.add("hidden")
    prodcuctsList.classList.remove("hidden")
  }
  Productupdate(e){
    e.preventDefault();
    const title =producttitleupdate.value;
    const quantity =productquantityupdate.value;
    const category =selectCatedgoryProductupdate.value;
    if (!title || !quantity || !category) return alert("plese writing all");
    Storage.saveProducts({ title, quantity, category,id:this.editId });
    this.products = Storage.getAllProducts();
    this.createdProductsList(this.products);
    editForm.classList.add("hidden")
    prodcuctsList.classList.remove("hidden")
    titleDom.value = "";
    quantityDom.value = "";
    categoryDom.value = "";
  }
}
export default new ProductsView();
