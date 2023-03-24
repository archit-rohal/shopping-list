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

function displayItems() {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    let listCount = itemList.childElementCount;
    checkState(listCount);
}

function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value;
    if (newItem === "") {
        alert("Please add an item");
        return;
    }
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    newItem = "";
    let listCount = itemList.childElementCount;
    checkState(listCount);
}

function addItemToDOM(item) {
    const li = document.createElement("li");
    // li.appendChild(document.createTextNode(newItem));
    li.textContent = item;

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);

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

function addItemToStorage(item) {
    const itemsFromStorage = getItemFromStorage();
    // console.log(itemsFromStorage);
    // console.log(typeof (itemsFromStorage));
    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;

}

const onDeleteItem = (e) => {
    // let foo = prompt("Are you sure? (y/n)").toLowerCase();
    // console.log(e.target.parentElement.textContent);
    console.log(e.target.parentElement.parentElement)
    deleteItemFromDOM(e);
    deleteItemFromStorage(e.target.parentElement.parentElement.textContent);
};
function deleteItemFromStorage(foo) {
    const itemsFromStorage = getItemFromStorage();
    // console.log(itemsFromStorage);
    const updatedItems = itemsFromStorage.filter(item => item !== foo);
    // console.log(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    // const itemsFromStorage = getItemFromStorage();
    // console.log(typeof (itemsFromStorage));
    // console.log(itemsFromStorage);
    // console.log(JSON.stringify(itemsFromStorage));
    // console.log(itemsFromStorage.removeItem(e.target));
    // itemsFromStorage.forEach(item => {
    //     localStorage.removeItem(JSON.stringify(item));
    // }
    // )

    // console.log(JSON.stringify(foo));
    // localStorage.removeItem('items', JSON.stringify(foo));
}


function deleteItemFromDOM(e) {
    if (e.target.classList.contains("fa-xmark")) {
        // console.log(e.target);
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

}

function onRemoveAll() {
    removeAllFromDOM();
    removeAllFromStorage();
}
function removeAllFromStorage() {
    // const itemsFromStorage = getItemFromStorage();
    const updatedItems = [];
    // console.log(itemsFromStorage);
    localStorage.setItem('items', JSON.stringify(updatedItems));
}
function removeAllFromDOM() {
    const lis = document.querySelectorAll("li");
    // console.log(lis);
    // console.log(itemList.children); // output - HTMLCollectioin which is why itemList.children.remove() won't work; remove method works only on elements/nodes
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
(() => {
    clearAll.addEventListener("click", onRemoveAll); // Clearing all items
    checkState(itemList.childElementCount); // Checking state
    filter.addEventListener("input", filterItems); // Filtering items
    itemForm.addEventListener("submit", onAddItemSubmit);  // Submitting form
    itemList.addEventListener("click", onDeleteItem); // Deleting list items
    document.addEventListener('DOMContentLoaded', displayItems);
})();

