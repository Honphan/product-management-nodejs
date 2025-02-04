console.log("script.js loaded");

//filter product by status

const filterBtn = document.querySelectorAll("[button-filter]");
if (filterBtn.length > 0) {
  let url = new URL(window.location.href);

  filterBtn.forEach((btn) => {
  
    btn.addEventListener("click", () => {
      const status = btn.getAttribute("button-filter");
     
      if(status){
        url.searchParams.set("status", status);
        } else  {
         url.searchParams.delete("status");
        }

        window.location.href = url;
    });
  });
 
}


// search product by title

const searchInput = document.querySelector(".form-search");

if(searchInput){
  let url = new URL(window.location.href);
  searchInput.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
    const search = e.target.elements.search.value;
    console.log(search);
    
    if (search) {
      url.searchParams.set("search", search);
    } else {
      url.searchParams.delete("search");
    }
    window.location.href = url;
  });
}


// pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
console.log(buttonPagination);

if(buttonPagination.length > 0){
  let url = new URL(window.location.href);
  buttonPagination.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.getAttribute("button-pagination");
      console.log(page);
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}