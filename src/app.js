// Storage Controller



// Item Controller
const ItemCtrl = ( () => {
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
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookies', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: () => {
            return state.items;        
        },

        addItem: (name, calories) => {
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
            newItem = new Item(id, name, calories);
            // Add to items array
            state.items.push(newItem);
            console.log(newItem);
            
            return newItem;
        },

        getItembyId: id => {
            let found = null;
            state.items.forEach(item => {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        updateItem: (name, calories) => {
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
        },

        deleteItem: id => {
            // Get ids
            const ids = state.items.map(item => {
                return item.id;
            });

            // Get index
            const index = ids.indexOf(id);
            // Remove item
            state.items.splice(index, 1);
        },

        clearAllItems: () => {
            state.items = [];
        },

        setCurrentItem: item => {
            state.currentItem = item;
        },

        getCurrentItem: () => {
            return state.currentItem;
        },

        getTotalCalories: () => {
            let total = 0;

            state.items.forEach( item => {
                total += item.calories;
            });
           state.totalCalories = total;
            return state.totalCalories;
        },

        logState: () => {
            return state;
        }
    }
})();



// UI Controler
const UICtrl = ( () => {
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
    return {
        populateItemList: items => {
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
        },

        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: (item) => {
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
        },

        updateListItem: item => {
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
        },

        deleteListitem: id => {
            const itemID =`#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },

        removeItems: () => {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn Node List into array
            listItems = Array.from(listItems);
            listItems.forEach(item => {
                item.remove();
            });
        },

        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: totalCalories => {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        
        clearEditState: () => {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: () => {
            return UISelectors;
        }
    }
})();



// App Controller
const AppCtrl = ( (ItemCtrl, UICtrl) => {
    // Load Event Listeners
    const loadEventListeners = () => {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();
        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        // Disable submit on enter
        document.addEventListener('keypress', e => {
            if(e.key === 'Enter') {
                e.preventDefault();
                return false;
            }
        })
        // Edit item event click
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
            // Clear fields
            UICtrl.clearInput();
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
        
        UICtrl.hideList();

        e.preventDefault();
    }


    // Public Methods
    return {
        init: () => {
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
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();