// IIFE 
pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 7,
            types: ['grass', 'poison']
        },
        {
            name: 'Igglybuff',
            height: 5.6,
            types: ['normal', 'fairy']
        },
        {
            name: 'Charizard',
            height: 0.5,
            types: ['fire', 'flying']
        },
        {
            name: 'Dragonite',
            height: 2.4,
            types: ['dragon', 'flying']
        },
        {
            name: 'Gastly',
            height: 0.3,
            types: ['ghost', 'posion']
        }

    ];

    function add(item) {
        if (typeof (item) === "object") {
            if (Object.keys(item) === Object.keys(pokemonList[0]))
                pokemonList.push(item);
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

        button.addEventListener('click', showDetails);                  // Creating the event handler

    }

    function showDetails(event) {
        console.log(event);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
        
    };

})();

//pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });   // Fix it

pokemonList = pokemonRepository.getAll();

pokemonList.forEach(pokemon => {

    pokemonRepository.addListItem(pokemon);

});


