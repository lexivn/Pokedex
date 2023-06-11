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

let pokBigmsg = "";
let pokname = "";
let pokheigth = 0;

for (i=0; i < pokemonList.length; i++ ) {
    pokBigmsg = "";
    pokname = pokemonList[i].name;
    pokheigth = pokemonList[i].height;
    
    if (pokheigth >= 7){
        pokBigmsg = " - Wow, that's big!";
    }
    
    document.write(`${pokname} ( height: ${pokheigth}) ${pokBigmsg} <br>`);
}

