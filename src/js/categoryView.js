import Storage from "./storage.js"
const btnAddCategory =document.getElementById("btn-Add-Ctegory")
const titleDom =document.getElementById("category-title")
const CatedgoriesDom =document.getElementById("Catedgories")
const btnCanselCtegory =document.getElementById("btn-Cansel-Ctegory")
const discriptionDom =document.getElementById("category-discription")
const selectCatedgoryProduct=document.getElementById("select-Catedgory-Product")
const showAddCategoryList=document.getElementById("showAddCategoryList")

class CategoryView {
  constructor() {
    btnAddCategory.addEventListener("click",(e)=>this.addCategory(e))
    btnCanselCtegory.addEventListener("click",(e)=>this.cancelCategory(e))
    showAddCategoryList.addEventListener("click",(e)=>this.showCategory(e))
    this.categories=[]
  }
  addCategory(e){
    e.preventDefault()
    const title=titleDom.value;
    const discription=discriptionDom.value;
    if(!title||!discription)return alert("plese writing")
    Storage.saveCategories({title,discription})
    this.categories=Storage.getAllCategories()
    this.createdCategoryList()
    titleDom.value="";
    discriptionDom.value="";
    CatedgoriesDom.classList.add("hidden")
    showAddCategoryList.classList.remove("hidden")
  }
  setApp(){
    this.categories=Storage.getAllCategories() 
    this.createdCategoryList()
  }
   createdCategoryList(){
    let result='<option value="">select a Category</option>';
     
    this.categories.forEach(category => {
      return  result += `<option value=${category.id}>${category.title}</option>`
    });
    selectCatedgoryProduct.innerHTML=result;
  }
  cancelCategory(e){
    e.preventDefault()
    CatedgoriesDom.classList.add("hidden")
    showAddCategoryList.classList.remove("hidden")
  }
  
  showCategory(e){
    e.preventDefault()
    CatedgoriesDom.classList.add("flex")
    CatedgoriesDom.classList.remove("hidden")
    showAddCategoryList.classList.add("hidden")
  }
}

export default new CategoryView()