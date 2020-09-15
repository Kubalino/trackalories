import StorageCtrl from './storagectrl.js'

// Item Constructor
class Item {
    constructor(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
}

// Data Structure / State
const state = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
}

// Public Methods
const getItems = () => {
    return state.items;        
}

const addItem = (name, calories) => {
    let id;
    // Create ID
    if(state.items.length > 0) {
        id = state.items[state.items.length -1].id + 1;
    } else {
        id = 0;
    }

    // Calories to number
    calories = parseInt(calories)
    // Create new item
    let newItem = new Item(id, name, calories);
    // Add to items array
    state.items.push(newItem);
    //console.log(newItem);
    
    return newItem;
}

const getItembyId = id => {
    let found = null;
    state.items.forEach(item => {
        if(item.id === id) {
            found = item;
        }
    });
    return found;
}

const updateItem = (name, calories) => {
    calories = parseInt(calories);
    let found = null;

    state.items.forEach( item => {
        if(item.id === state.currentItem.id) {
            item.name = name;
            item.calories = calories;
            found = item;
        }
    });

    return found;
}

const deleteItem = id => {
    // Get ids
    const ids = state.items.map(item => {
        return item.id;
    });

    // Get index
    const index = ids.indexOf(id);
    // Remove item
    state.items.splice(index, 1);
}

const clearAllItems = () => {
    state.items = [];
}

const setCurrentItem = item => {
    state.currentItem = item;
}

const getCurrentItem = () => {
    return state.currentItem;
}

const getTotalCalories = () => {
    let total = 0;

    state.items.forEach( item => {
        total += item.calories;
    });
    state.totalCalories = total;
    return state.totalCalories;
}

const logState = () => {
    return state;
}

export default {
    getItems,
    addItem,
    getItembyId,
    updateItem,
    deleteItem,
    clearAllItems,
    setCurrentItem,
    getCurrentItem,
    getTotalCalories,
    logState
}