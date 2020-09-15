import ItemCtrl from './itemctrl.js'

const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
}

// Public Methods
const populateItemList = items => {
    let html = '';

    items.forEach( item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
        </a>
    </li>`;
    })

    // Insert list items
    document.querySelector(UISelectors.itemList).innerHTML = html;
}

const getItemInput = () => {
    return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
    }
}

const addListItem = item => {
    // Show the list
    document.querySelector(UISelectors.itemList).style.display = 'block';
    // Create li element
    const li = document.createElement('li');
    li.className= 'collection-item';
    li.id = `item-${item.id}`;
    li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
    <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
    </a>`;

    document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
}

const updateListItem = item => {
    let listItems = document.querySelectorAll(UISelectors.listItems);

    // Turn nodeList into array
    listItems = Array.from(listItems);
    listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`) {
            document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
        }
    });
}

const deleteListitem = id => {
    const itemID =`#item-${id}`;
    const item = document.querySelector(itemID);
    item.remove();
}

const clearInput = () => {
    document.querySelector(UISelectors.itemNameInput).value = '';
    document.querySelector(UISelectors.itemCaloriesInput).value = '';
}

const addItemToForm = () => {
    document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
    document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
    showEditState();
}

const removeItems = () => {
    let listItems = document.querySelectorAll(UISelectors.listItems);
    // Turn Node List into array
    listItems = Array.from(listItems);
    listItems.forEach(item => {
        item.remove();
    });
}

const hideList = () => {
    document.querySelector(UISelectors.itemList).style.display = 'none';
}

const showTotalCalories = totalCalories => {
    document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
}

const clearEditState = () => {
    clearInput();
    document.querySelector(UISelectors.updateBtn).style.display = 'none';
    document.querySelector(UISelectors.deleteBtn).style.display = 'none';
    document.querySelector(UISelectors.backBtn).style.display = 'none';
    document.querySelector(UISelectors.addBtn).style.display = 'inline';
}

const showEditState = () => {
    document.querySelector(UISelectors.updateBtn).style.display = 'inline';
    document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
    document.querySelector(UISelectors.backBtn).style.display = 'inline';
    document.querySelector(UISelectors.addBtn).style.display = 'none';
}

const getSelectors = () => {
    return UISelectors;
}

export default {
    populateItemList,
    getItemInput,
    addListItem,
    updateListItem,
    deleteListitem,
    clearInput,
    addItemToForm,
    removeItems,
    hideList,
    showTotalCalories,
    clearEditState,
    showEditState,
    getSelectors
}