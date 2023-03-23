const button = document.querySelector('.btn');
const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const list = document.getElementById('item-list');
let addItem = () => {
  let firstItem = document.createElement('li');
  const liButton = document.createElement('button');
  liButton.innerHTML = '<i class="fa-solid fa-times"></i>'; // Add content to button element
  liButton.setAttribute('class', 'button'); // Set class attribute to button element
  firstItem.appendChild(liButton);
  let itemInputText = itemInput.value;
  firstItem.id = 'first-item'
  firstItem.textContent = itemInputText;
  list.appendChild(firstItem);
}
button.addEventListener('click', addItem)

const inputItem = (e) => {
  e.preventDefault();
  if (itemInput.value == '') {
    alert('Please add an item');
    return;
  }
  console.log('success');
}
itemForm.addEventListener('submit', inputItem)
// const itemForm = document.getElementById('item-form');
// const itemInput = document.getElementById('item-input');
// const itemList = document.getElementById('item-list');
// const newItem = itemInput.value;
// function addItem(e) {
//   e.preventDefault();
//
//   const newItem = itemInput.value;
//
//   // Validate Input
//   if (newItem === '') {
//     alert('Please add an item');
//     return;
//   }
//
//   // Create list item
//   const li = document.createElement('li');
//   li.appendChild(document.createTextNode(newItem));
//
//   const button = createButton('remove-item btn-link text-red');
//   li.appendChild(button);
//
//   itemList.appendChild(li);
//
//   itemInput.value = '';
// }
//
// function createButton(classes) {
//   const button = document.createElement('button');
//   button.className = classes;
//   const icon = createIcon('fa-solid fa-xmark');
//   button.appendChild(icon);
//   return button;
// }
//

