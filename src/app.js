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
        addBtn: '.add-btn',
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

        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: totalCalories => {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
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

    // Public Methods
    return {
        init: () => {
            console.log('Initializing App...');           
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