export default class Storage {
  static getAllCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    return categories.sort((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
  }
  static saveCategories(newCategory){
    const categories =Storage.getAllCategories()
    const existedItem=categories.find(c=>c.id===parseInt(newCategory.id))
    if (existedItem) {
        existedItem.title=newCategory.title;
        existedItem.discription=newCategory.discription;
        existedItem.createdAt=new Date().toISOString()
    } else {
        newCategory.createdAt=new Date().toISOString();
        newCategory.id=Date.now()
        categories.push(newCategory)
    }
    localStorage.setItem("categories",JSON.stringify(categories))
  }
  static getAllProducts(sort="latest") {
    console.log(sort);
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return products.sort((a, b) => {
      if(sort==="latest"){
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      }else if(sort==="earliest"){
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static saveProducts(newProduct){
    const products =Storage.getAllProducts()
    const existedItem=products.find(c=>c.id===parseInt(newProduct.id))
    if (existedItem) {
        existedItem.title=newProduct.title;
        existedItem.quantity=newProduct.quantity;
        existedItem.category=newProduct.category;
        existedItem.createdAt=new Date().toISOString()
    } else {
        newProduct.createdAt=new Date().toISOString();
        newProduct.id=Date.now()
        products.push(newProduct)
    }
    localStorage.setItem("products",JSON.stringify(products))
  }
}
