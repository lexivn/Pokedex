
pokemonRepository = (function(){
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
        if(typeof(item) === "object") {
            if (Object.keys(item) === Object.keys(pokemonList[0]))
            pokemonList.push(item);
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        getAll: getAll,
        add: add        
    };
    
})();

pokemonList = pokemonRepository.getAll();

pokemonList.forEach( pokemon => {
    let bigPokemon = '';
    if(pokemon.height >= 7)
    {
        bigPokemon = " - Wohm, that's big!";
    }

    document.write(`${pokemon.name} (height: ${pokemon.height}) ${bigPokemon} <br>`);
});


