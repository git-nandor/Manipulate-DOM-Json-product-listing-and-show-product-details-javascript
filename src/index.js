import './style.css';
const products = require('./products.json');

// Homework:
// show every product in the table (check the table in "index.html")
// in the table you need to show the following datas:
// - name
// - first category
// - number of pictures
// - price
// - quantity

// if the user clicks on a row, then in the "product-details"
// show the following datas:
// - name
// - each categories
// - pictures
// - prices
// - quantity

// there are some tips around (in index.html and in this file)
// you can modify everything in index.js
// but you are forbidden to change anything in the index.html
// and I advise not to touch style.css unless you want to add a shiny style for
// your website :D

// IMPORTANT: The content of this file is only here to help You
// if you'd like to solve the problem with a different solution
// feel free to do it =)
// So you can modify, delete, rewrite everything here


const appDiv = document.getElementById('app');
const requiredProductDatas = ['name', 'categories', 'images', 'price', 'quantity'];
const productDetailsDiv = document.getElementsByClassName('product-details')[0];
const oldTableBody = document.getElementsByTagName('tbody')[0];


function buildTable() {
  let newTableBody = document.createElement('tbody');

  products.forEach(product => {
    let tableRow = generateRow(product);

    setRowListener(tableRow, product);
    newTableBody.appendChild(tableRow);
  });

  addNewBodyToTable(newTableBody);
}

function setRowListener(row, product) {
  let clickEvent;

  // Prepare function with product param
  let showProductDetails = showDetails.bind(clickEvent, product);
 
  // Set listener with binded function (addEventListener give event as param)
  row.addEventListener("click", showProductDetails);
}

// Add generated table body to the table
function addNewBodyToTable(newTableBody) {
  oldTableBody.parentElement.replaceChild(newTableBody, oldTableBody);
}

// Generate the rows for the table
function generateRow(product) {
  let row = document.createElement("tr");
 
  requiredProductDatas.forEach(requiredData => {
    let cellData = generateDisplayableCellData(requiredData, product[requiredData]);
    let cell = generateTableCell(cellData);
    
    addNewCellToRow(row, cell);
  });
  return row;
}

// Add the generated cell to the row
function addNewCellToRow(row, cell) {
  row.appendChild(cell);
}

// Generate a cell for the row
function generateTableCell(textContent) {
  let cell = document.createElement('td');
  cell.textContent = textContent;

  return cell;
}

// Create filtered and displayable data for cell
function generateDisplayableCellData(requiredData, productData) {
  if (requiredData === 'categories') {
    return productData[0];
  }else if (requiredData === 'images') {
    return productData.length;
  };
  return productData;
}

// Show product details elements
function showDetails(product, event) {
  let childList = productDetailsDiv.children;

  childList[0].textContent = product.name;
  childList[1].textContent = product.description;

  removeAllChildrenOfElement(childList[2]);
  populateCategoriesContainer(childList[2], product.categories);

  removeAllChildrenOfElement(childList[3]);
  populateImgContainer(childList[3], product.images);

  childList[4].textContent = product.price;
  childList[5].textContent = product.quantity;
}

// Add each category to the 'categoriesDiv'
function populateCategoriesContainer(categoriesContainerDiv, categories) {
  categories.forEach(category => {
    let categoryP = document.createElement('p');

    categoryP.textContent = category;
    categoriesContainerDiv.appendChild(categoryP);
  });
}

// Add each image to the 'imagesDiv'
function populateImgContainer(imgContainerDiv, images) {
  images.forEach(imageSrc => {
    let imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imgContainerDiv.appendChild(imageElement);
  });
}

// Remove all children of the given element
function removeAllChildrenOfElement(element) {
  while(element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  };
}

buildTable();