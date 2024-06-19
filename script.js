const inputSearch = document.querySelector('.input-search');
const searchResults = document.querySelector('.search-results');
const products = [
    { name: 'Basundi Chai', route: '/Product_details/Basundi_chai.html' },
    { name: 'Gud Chai', route: '/Product_details/Gud_Chai.html' },
    { name: 'Instant Coffee', route: '/Product_details/Instant_Coffee.html' },
    { name: 'Kadak Chai', route: '/Product_details/Kadak_chai.html' },
    { name: 'Limbu Pani', route: '/Product_details/Limbu_pani.html' },
    { name: 'Pineapple Juice', route: '/Product_details/Pineapple_juice.html' },
    { name: 'Ready Mix Chai', route: '/Product_details/Ready_Mix_chai.html' }
]; // Sample list of products with routes

let selectedIndex = -1;

// Event listener for input changes
inputSearch.addEventListener('input', function() {
    const searchText = inputSearch.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText));
    displaySearchResults(filteredProducts);
});

// Event listener for backspace key press
inputSearch.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' && inputSearch.value === '') {
        hideSearchResults();
    } else if (event.key === 'Enter' && selectedIndex !== -1) {
        navigateTo(products[selectedIndex].route);
    } else if (event.key === 'ArrowDown') {
        selectedIndex = Math.min(selectedIndex + 1, products.length - 1);
        highlightSelectedItem();
    } else if (event.key === 'ArrowUp') {
        selectedIndex = Math.max(selectedIndex - 1, -1);
        highlightSelectedItem();
    }
});

// Event listener to close the dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== inputSearch) {
        hideSearchResults();
    }
});

// Event listener to display all products when clicking on the search box
inputSearch.addEventListener('focus', function() {
    displaySearchResults(products);
});

function displaySearchResults(results) {
    // Clear previous results
    searchResults.innerHTML = '';
    selectedIndex = -1;

    const dropdownList = document.createElement('ul');
    dropdownList.classList.add('dropdown-list');
    results.forEach((result, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = result.name;
        link.href = result.route;
        listItem.appendChild(link);
        dropdownList.appendChild(listItem);

        // Highlight the first item by default
        if (index === 0) {
            selectedIndex = 0;
            listItem.classList.add('selected');
        }

        // Attach click event listener to list item
        listItem.addEventListener('click', function(event) {
            event.preventDefault();
            hideSearchResults(); // Close the dropdown
            navigateTo(result.route);
        });
    });
    searchResults.appendChild(dropdownList);
    searchResults.style.display = 'block'; // Show dropdown
}

function hideSearchResults() {
    searchResults.innerHTML = ''; // Clear results
    searchResults.style.display = 'none'; // Hide dropdown
}

function navigateTo(route) {
    window.location.href = route;
}

function highlightSelectedItem() {
    const items = document.querySelectorAll('.dropdown-list li');
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('selected');
            inputSearch.value = item.textContent;
        } else {
            item.classList.remove('selected');
        }
    });
}
