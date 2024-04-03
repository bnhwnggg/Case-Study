// item class object
export class Item {
    constructor(id, name, price, img) {
        this.itemId = id;
        this.name = name;
        this.price = price;
        this.image = img;
    }
}

//item list
export class ItemList {
    constructor() {
        this.items = [];
    }

    addItem(name, price, img, sizes) {
        let id = this.items.length + 1; //itemId tiep theo bang item gan nhat + 1;
        let newItem = new Item(id, name, price, img, sizes);
        this.items.push(newItem);
        this.displayItems();
    }

    editItem(id, newName, newPrice, newImage, newSizes) {
        let itemIndex = this.items.findIndex(item => item.itemId === id);
        if (itemIndex !== -1) { //false check
            this.items[itemIndex] = new Item(id, newName, newPrice, newImage, newSizes);
            this.displayItems();
        }
    }

    deleteItem(id) {
        this.items = this.items.filter(item => item.itemId !== id);
        this.displayItems();
    }
    
    displayItems() {
        let container = document.getElementById('itemsContainer');
        container.innerHTML = '';
        this.items.forEach(item => {
            let itemId = item.itemId;
            let name = item.name;
            let price = item.price;
            let image = item.image;
            container.innerHTML += `
                <div class="card col-6 col-sm-3">
                    <img src="${image}" alt="${name}" style="width: 100%;">
                    <div class="item-desc">
                    <h3 class="item-name">${name}</h3>
                    <p class="item-price">$${price}</p>
                    <p>
                        <button class="btn" onclick="showEditForm(${itemId})">Edit</button>
                        <button class="btn" onclick="deleteItem(${itemId})">Delete</button>
                    </p>
                    </div>
                </div>
            `;
        });
    }
}


let itemList = new ItemList();

window.showEditForm = function(itemId) {
    let item = itemList.items.find(item => item.itemId === itemId);
    if (item) {
        document.getElementById('editName').value = item.name;
        document.getElementById('editPrice').value = item.price;
        document.getElementById('editImage').value = item.image;
        document.getElementById('editItemId').value = item.itemId;
        document.getElementById('editItemForm').style.display = 'block'; //bam edit hien form
    }
};

window.confirmEditForm = function() {
    let id = parseInt(document.getElementById('editItemId').value);
    let name = document.getElementById('editName').value;
    let price = parseFloat(document.getElementById('editPrice').value);
    let image = document.getElementById('editImage').value;
    itemList.editItem(id, name, price, image);
    document.getElementById('editItemForm').style.display = 'none';
};

window.addNewItem = function() {
    let name = document.getElementById('newItemName').value;
    let price = parseFloat(document.getElementById('newItemPrice').value);
    let img = document.getElementById('newItemImage').value;

    itemList.addItem(name, price, img);
    document.getElementById('newItemName').value = '';
    document.getElementById('newItemPrice').value = '';
    document.getElementById('newItemImage').value = '';
};

window.deleteItem = function(itemId) {
    itemId = parseInt(itemId); 
    itemList.deleteItem(itemId);
};

window.addEventListener('DOMContentLoaded', (event) => {// dat function trongDOMContentLoaded
    document.getElementById('sortOption').addEventListener('change', function() {
        let sortValue = this.value;
        if (sortValue === 'sortByPriceLH') {
            itemList.items.sort((a, b) => a.price - b.price);
        }
        itemList.displayItems();
    });
});

window.searchItems = function(){
    event.preventDefault();
    let searchValue = document.getElementById("itemSearch").value.toLowerCase();   
    let arrFilter=[];
    for(let i = 0; i<itemList.items.length;i++){
        let item=itemList.items[i];

        if(item.name.toLowerCase().includes(searchValue)){
            arrFilter.push(item);
        }
    }

    displaySearchItems(arrFilter);
}

function displaySearchItems(items) {
    let container = document.getElementById('itemsContainer');
    container.innerHTML = ''; 
    items.forEach(item => {
        container.innerHTML += `
            <div class="card col-6 col-sm-3">
                <img src="${item.image}" alt="${item.name}" style="width: 100%;">
                <div class="item-desc">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-price">$${item.price}</p>
                    <p>
                        <button class="btn" onclick="showEditForm(${item.itemId})">Edit</button>
                        <button class="btn" onclick="deleteItem(${item.itemId})">Delete</button>
                    </p>
                </div>
            </div>
        `;
    });
}


//vidu
itemList.addItem('GymShark Hoodie', 45, 'https://cdn.shopify.com/s/files/1/1693/6097/files/PowerWashedHoodieGSSmokeyGrey-ACIDWASHSMALLBALLA3A5J-GB8M-0817_1200x.jpg');