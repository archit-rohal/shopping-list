const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");
const filter = document.querySelector(".filter");
function checkState(check) {
  if (check == 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }
}

function addItem(e) {
  e.preventDefault();
  let newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  const li = document.createElement("li");
  // li.appendChild(document.createTextNode(newItem));
  li.textContent = newItem;

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  newItem = "";
  let listCount = itemList.childElementCount;
  checkState(listCount);
}
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

const deleteItem = (e) => {
  // let foo = prompt("Are you sure? (y/n)").toLowerCase();
  if (e.target.classList.contains("fa-xmark")) {
    console.log(e.target);
    if (confirm("Are you sure?")) {
      if (e.target.tagName === "I") {
        e.target.parentNode.parentElement.remove();
      }
      let listCount = itemList.childElementCount;
      checkState(listCount);
    } else {
      return;
    }
  }
};

function removeAll() {
  const lis = document.querySelectorAll("li");
  console.log(lis);
  console.log(itemList.children); // output - HTMLCollectioin which is why itemList.children.remove() won't work; remove method works only on elements/nodes
  lis.forEach((item) => item.remove());
  checkState(0);
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    console.log(itemName);
    if (itemName.includes(text)) {
      // return
      item.style.display = "flex";
    } else {
      // item.remove()
      item.style.display = "none";
    }
  });
}
clearAll.addEventListener("click", removeAll); // Clearing all items
checkState(itemList.childElementCount); // Checking state
filter.addEventListener("input", filterItems);
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", deleteItem); // Deleting list items
