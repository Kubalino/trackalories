import ItemCtrl from './modules/itemctrl.js';
import StorageCtrl from './modules/storagectrl.js';
import UICtrl from './modules/uictrl.js';

// Load Event Listeners
const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
    // Disable submit on enter
    document.addEventListener('keypress', e => {
        if(e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    });
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    // Edit item event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
}

// Add item submit
const itemAddSubmit = e => {
    // Get form input from UICtrl
    const input = UICtrl.getItemInput();
    // Check for name and calories
    if(input.name !== '' && input.calories !== '') {
        // Add item
        const newItem = ItemCtrl.addItem(input.name, input.calories);
        // Add item to UI Ctrl
        UICtrl.addListItem(newItem);
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Store in local Storage
        StorageCtrl.storeItem(newItem);
        // Clear fields
        UICtrl.clearInput();
        // Show span message
        setInterval(UICtrl.showSpan(`${newItem.name} successfully added!`), 3000);
    }
    e.preventDefault();
}

//Edit Item click
const itemEditClick = e => {
    if(e.target.classList.contains('edit-item')) {
        // Get list item id
        const listId = e.target.parentNode.parentNode.id;
        // Break into an array
        const listIdArr = listId.split('-');
        // Get the actual id
        const id = parseInt(listIdArr[1]);
        // Get item
        const itemToEdit = ItemCtrl.getItembyId(id);
        // Set current item
        ItemCtrl.setCurrentItem(itemToEdit);
        // Add item to form
        UICtrl.addItemToForm();
    }
    e.preventDefault();
}

//Update item submit
const itemUpdateSubmit = e => {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updatedItem);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    //Update from LS
    StorageCtrl.updateItemFromStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
}

//Delete dubbotn event
const itemDeleteSubmit = e => {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();
    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    UICtrl.deleteListitem(currentItem.id);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    // Delete from LS
    StorageCtrl.deleteItemFromStorage(currentItem);

    UICtrl.clearEditState();

    e.preventDefault();
}

// Clear items event
const clearAllItemsClick = () => {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    // Remove from UI
    UICtrl.removeItems();
    // Remove from LS
    StorageCtrl.clearItemsFromStorage();

    UICtrl.hideList();

    e.preventDefault();
}

// Public Methods
const init = () => {
    console.log('Initializing App...');
    // Clear edit state / set initial set
    UICtrl.clearEditState();           
    // Fetch Items from Data / State Structure
    const items = ItemCtrl.getItems();
    // Check if any items
    if(items.length === 0) {
        UICtrl.hideList();
    } else {
        // Populate list with items
        UICtrl.populateItemList(items);
    }
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);            
    // Load event listeners
    loadEventListeners();
}

// Initialize App

init();