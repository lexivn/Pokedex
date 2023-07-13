// IIFE 
pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(item) {
        if (typeof (item) === 'object') {
            //Object.keys
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
            // Here start the function to make Modal visible          
            showModal(pokemon);
            console.log(pokemon);
        });
     
    }

    function showModal(item) {
        let modalContainer = document.querySelector('#modal-container');
        
        // Clear all the existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonName = document.createElement('h1');
        pokemonName.innerHTML = item.name;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerHTML = ('Height: ' + item.height);

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('src', item.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
  

    function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    // Hide the modal when click outside the modal
    window.addEventListener('keydown', (e)=> {
        modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //Fetch return a promise which is passed to first then function
    function loadList() {
        
        //showLoadingMessage();                                           // Show loading message

        return fetch(apiUrl).then(function (response) {                 // Load data from external resource. 
           // setTimeout(hideLoadingMessage, 500);
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
        
        //showLoadingMessage();                                           // Show loading message

        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
           // setTimeout(hideLoadingMessage, 500);                        // Set a timeout to hide the "Loading message"
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
//pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: '[electric]' });   // Fix it

// Get all the list of Pokemon to create a button with the name of each one
pokemonRepository.loadList().then(function (pokemon) {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});