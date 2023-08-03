// IIFE
pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(item) {
    if (typeof item === "object") {
      pokemonList.push(item);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let container = document.querySelector(".row"); // Taking the element <ul> using the class ".list-group"

    let button = document.createElement("button"); // Creating the buttons as <li> elements. Using the "list-group-item" class
    button.setAttribute("data-toggle", "modal"); // Adds the attribute
    button.setAttribute("data-target", "#exampleModal"); //
    button.classList.add("btn", "btn-outline-success", "m-1", "list-group-item-action", "col-2", "text-capitalize"); // Appliying a the class "btn btn-primary" to the button
    button.innerText = pokemon.name; // Giving the "Pokemon's name" to the button

    container.appendChild(button); // Appending the <buttons> elements to the unordered list <ul> as its child

    button.addEventListener("click", function () {
      // Creating the event handler when click buttons
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // Here start the function to make Modal visible
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function searchInput(e) {
    let input = e.target.value.toLowerCase();
    console.log(input);
    let arrayPokemonList = document.querySelectorAll(".btn");

    arrayPokemonList.forEach((button) => {
      console.log(input);

      if (button.innerText.toLowerCase().includes(input)) {
        button.style.display = "inherit";
      } else {
        button.style.display = "none";
      }
    });
  }

  let input = document.querySelector("input");
  input.addEventListener("input", searchInput);

  function showModal(item) {
    // Clean the Modal Body
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerText = "";

    // Modal Header
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.classList.add("text-capitalize"),
      (modalTitle.innerText = item.name);

    // New contento to Modal Body
    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerHTML = "Height: " + item.height;

    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerHTML = "Weight: " + item.weight;

    let pokemonImage = document.createElement("img");
    pokemonImage.classList.add("img-fluid");
    pokemonImage.setAttribute("alt", "Responsive image");
    pokemonImage.setAttribute("src", item.imageUrl);

    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);
    modalBody.appendChild(pokemonImage);

    let modalContainer = document.querySelector("#exampleModal");
    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  // Hide the modal when click outside the modal
  window.addEventListener("keydown", (e) => {
    modalContainer = document.querySelector("#exampleModal");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  function hideModal() {
    let modalContainer = document.querySelector("#exampleModal");
    modalContainer.classList.remove("is-visible");
  }

  //Fetch return a promise which is passed to the first "then" function
  function loadList() {
    //showLoadingMessage();                                             // Show loading message

    return fetch(apiUrl)
      .then(function (response) {
        // Load data from external resource.
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            weight: item.weight,
            detailsUrl: item.url,
          };
          add(pokemon);
        }); //Why it need a ;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //DetailsUrl property to load the detailed data for a given Pokémon
  function loadDetails(item) {
    //showLoadingMessage();                                             // Show loading message

    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        // setTimeout(hideLoadingMessage, 500);                          // Set a timeout to hide the "Loading message"
        return response.json(); // Taking the json property from the objec(response)
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Get all the list of Pokemon to create a button with the name of each one
pokemonRepository.loadList().then(function (pokemon) {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
