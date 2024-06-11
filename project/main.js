let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteall = document.getElementById("deleteall");

let mood = "create";

let temp;
// get total

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//create prodect
let dataPro;

if (localStorage.prodect != null) {
  dataPro = JSON.parse(localStorage.prodect);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
      clearData();
    } else {
      dataPro[temp] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  // save data in localstorge
  localStorage.setItem("prodect", JSON.stringify(dataPro));

  // clear inputs data
  showData();
};

// clear inputs data function0
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `  <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].count}</td>
              <td>${dataPro[i].category}</td>
              <td onclick = "updateData(${i})"><button id="update">update</button></td>
              <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  if (dataPro.length > 0) {
    deleteall.innerHTML = `
    <button onclick="deleteAll()">delete All(${dataPro.length})</button>
    `;
  } else {
    deleteall.innerHTML = "";
  }
}
showData();

// delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.prodect = JSON.stringify(dataPro);
  showData();
}
// delete all
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search by title / category

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.focus();
  search.placeholder = `search by ${searchMood}`;
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `  <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].count}</td>
              <td>${dataPro[i].category}</td>
              <td onclick = "updateData(${i})"><button id="update">update</button></td>
              <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `  <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].count}</td>
              <td>${dataPro[i].category}</td>
              <td onclick = "updateData(${i})"><button id="update">update</button></td>
              <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}

// clean data
