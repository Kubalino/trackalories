const storeItem = item => {
    let items;
    // Check if any items in LS
    if(localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set LS
        localStorage.setItem('items', JSON.stringify(items));
    } else {
        // Get what is already in LS
        items = JSON.parse(localStorage.getItem('items'));
        // Push the new item
        items.push(item);
        // Reset LS
        localStorage.setItem('items', JSON.stringify(items));
    }
}

const getItemsFromStorage = () => {
    let items;
    if(localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

const updateItemFromStorage = updatedItem => {
    let items = JSON.parse(localStorage.getItem('items'));

    items.forEach((item, index) => {
        if(updatedItem.id === item.id) {
            items.splice(index, 1, updatedItem);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}

const deleteItemFromStorage = currentItem => {
    let items = JSON.parse(localStorage.getItem('items'));

    items.forEach((item, index) => {
        if(currentItem.id === item.id) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

const clearItemsFromStorage = () => {
    localStorage.removeItem('items');
}

export default {
    storeItem,
    getItemsFromStorage,
    updateItemFromStorage,
    deleteItemFromStorage,
    clearItemsFromStorage
}