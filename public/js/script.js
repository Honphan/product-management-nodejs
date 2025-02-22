console.log("script.js loaded");

//filter product by status

const filterBtn = document.querySelectorAll("[button-filter]");
if (filterBtn.length > 0) {
  let url = new URL(window.location.href);

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const status = btn.getAttribute("button-filter");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url;
    });
  });
}

// search product by title

const searchInput = document.querySelector(".form-search");

if (searchInput) {
  let url = new URL(window.location.href);
  searchInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const search = e.target.elements.search.value;

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

if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.getAttribute("button-pagination");

      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// change status product
const buttonStatus = document.querySelectorAll("[buttonStatus]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const status = btn.getAttribute("buttonStatus");
      const id = btn.getAttribute("statusId");
      console.log(status, id);

      // Add alert
      const isConfirm = confirm(`Bạn có chắc chắn muốn thay đổi trạng thái của sản phẩm này?`);
      if(!isConfirm) return;
      
      url.pathname = `/admin/products/changeStatus/${status}/${id}`;
      window.location.href = url.href;
    });
  });
}

// end change status product

//change multi
const buttonMulti = document.querySelector("#form-change-multi");
if (buttonMulti) {
  const selectAll = buttonMulti.querySelector("#checkAll");

  const checkboxes = buttonMulti.querySelectorAll("input[class='checkItem']");

  selectAll.addEventListener("click", () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const totalChecked = buttonMulti.querySelectorAll(
        "input[class='checkItem']:checked"
      ).length;

      if (totalChecked == checkboxes.length) {
        selectAll.checked = true;
      } else {
        selectAll.checked = false;
      }
    });
  });
}

const filterMulti = document.querySelector("#filter-status");

if (filterMulti) {
  const statusMulti = filterMulti.querySelector("#inlineFormCustomSelect");


  filterMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = statusMulti.value;
    const ids = [];
    const checkboxes = buttonMulti.querySelectorAll(
      "input[class='checkItem']:checked"
    );
    checkboxes.forEach((checkbox) => {
      ids.push(checkbox.value);
    });
    console.log(status);
    console.log(ids);
    const inputStatus = document.querySelector("#inlineFormInputName");
    inputStatus.value = ids.join(", ");
    console.log(inputStatus.value);
    if (ids.length > 0) {
      const buttonSubmit = filterMulti.querySelector("#button-submit-change");
      buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        filterMulti.action = `/admin/products/changeStatusMulti?_method=PATCH`;
        filterMulti.submit();
      });
    }
  });
}

//end change multi

// delete product
const buttonDelete = document.querySelectorAll("#button-delete");
console.log(buttonDelete);
if (buttonDelete) {
  buttonDelete.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.getAttribute("deleteid");
      console.log(id);
      const isConfirm = confirm(
        `Are you sure you want to delete this product?`
      );
      if (isConfirm) {
        const formDelete = document.querySelector("#delete-form");
        formDelete.action = `/admin/products/delete/${id}?_method=DELETE`;
        formDelete.submit();
      }
    });
  });
}

//end delete product


//alert status

const alertStatus = document.querySelector("#alert-status");
if(alertStatus){
  console.log(alertStatus);
  setTimeout(() => {
    alertStatus.classList.add("d-none");
  }, 3000);
}
//end alert status


// upload image
const uploadImage = document.querySelector("#form-create-product");
if(uploadImage){
  const inputImage = document.querySelector("#thumbnail");
  const previewImage = document.querySelector("#thumbnail-preview");
  console.log(inputImage);
  console.log(previewImage);
  inputImage.addEventListener("change", (e) => {
    const [file] = inputImage.files;
    if(file){
      previewImage.src = URL.createObjectURL(file);
    }
  });
}



// end upload image


