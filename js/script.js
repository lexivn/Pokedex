// IIFE 
pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(item) {
        if (typeof (item) === 'object') {
            Object.keys
            // if (JSON.stringify(Object.keys(item)) === JSON.stringify(Object.keys(pokemonList[0]))) {
            pokemonList.push(item);
            //}

        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {

        let container = document.querySelector('.pokemon-list');        // Taking the element <ul> using the class ".pokemon-list"
        let listItem = document.createElement('li');                    // Creating the <li> element

        let button = document.createElement('button');                  // Creating the button element
        button.innerText = pokemon.name;                                // Giving the "Pokemon's name" to the button
        button.classList.add('pokemon-list__item');                     // Appliying a the class "pokemon-list__item" to the button

        listItem.appendChild(button);                                   // Appending the button to the list <li> as a child
        container.appendChild(listItem);                                // Appending the <li> elements to the unordered list <ul> as its child

        button.addEventListener('click', function () {                  // Creating the event handler
            showDetails(pokemon)
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function showLoadingMessage() {
        let showLoadingMessage = document.querySelector('.loading-message');
        let p = document.createElement('p');
        p.innerText = 'Loading information ...';
        showLoadingMessage.appendChild(p);
    }

    function hideLoadingMessage() {
        let removeLoadingMessage = document.querySelector('p');
        removeLoadingMessage.parentElement.removeChild(removeLoadingMessage);
    }

    //Fetch return a promise which is passed to first then function
    function loadList() {

        showLoadingMessage();                                           // Show loading message

        return fetch(apiUrl).then(function (response) {                 // Load data from external resource. 
            setTimeout(hideLoadingMessage, 500);
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            }); //Why it need a ;
        }).catch(function (e) {
            console.error(e);
        })
    }

    //DetailsUrl property to load the detailed data for a given Pokémon
    function loadDetails(item) {
        
        showLoadingMessage();                                           // Show loading message

        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            setTimeout(hideLoadingMessage, 500);
            return response.json();                                     // Taking the json property from the objec(response)
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails

    };

})();

// This function just add 'Pikachu' manually
pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: '[electric]' });   // Fix it

// Get all the list of Pokemon to create a button with the name of each one
pokemonRepository.loadList().then(function (pokemon) {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});