// public/app.js

// URL for the API
const apiUrl = 'http://localhost:3000/api/products';

// Get elements
const addProductBtn = document.getElementById('add-product');
const productNameInput = document.getElementById('product-name');
const productQuantityInput = document.getElementById('product-quantity');
const productPriceInput = document.getElementById('product-price');
const productTable = document.getElementById('product-list');

// Fetch and display products
function loadProducts() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
      productTable.innerHTML = '';
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${product.price}</td>
          <td>
            <button class="edit" onclick="editProduct(${product.id})">Edit</button>
            <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        `;
        productTable.appendChild(row);
      });
    });
}

// Add a new product
addProductBtn.addEventListener('click', () => {
  const name = productNameInput.value;
  const quantity = productQuantityInput.value;
  const price = productPriceInput.value;

  if (!name || !quantity || !price) {
    alert('Please fill in all fields');
    return;
  }

  const newProduct = { name, quantity, price };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  })
    .then(response => response.json())
    .then(() => {
      productNameInput.value = '';
      productQuantityInput.value = '';
      productPriceInput.value = '';
      loadProducts();
    });
});

// Edit product
function editProduct(id) {
  const name = prompt('Enter new product name:');
  const quantity = prompt('Enter new quantity:');
  const price = prompt('Enter new price:');

  const updatedProduct = { name, quantity, price };

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProduct)
  })
    .then(response => response.json())
    .then(() => loadProducts());
}

// Delete product
function deleteProduct(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => loadProducts());
}

// Initial load
loadProducts();
