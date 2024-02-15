const pokeApp = angular.module("pokeList", []);

pokeApp.controller("pokeListController", function ($scope, $http) {
    let allPokemons = [];
    const pokeNameArr = [];
    $http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10").then(function (response) {
        response.data.results.map(poke => pokeNameArr.push(poke.name));
        allPokemons = response.data.results;
        console.log(pokeNameArr);
        $scope.items = pokeNameArr;
    });

    $scope.complete = function(string) {
        $scope.hidethis = false;
        var output = [];
        angular.forEach(pokeNameArr, function (pokemon) {
            if (pokemon.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                output.push(pokemon);
            }
        });
        $scope.filterPoke = output;
    }

    $scope.selected = function( pokemon ) {
        $scope.selectedPokemon = {};
        const pokeUrl = allPokemons.find( element => element.name === pokemon).url;
        let selectedPokemon = {};
        $http.get(pokeUrl).then( function( response ){ 
            console.log( response.data );
            selectedPokemon = {
                name: response.data.name,
                weight: response.data.weight,
                order: response.data.order,
                height: response.data.height,
            } 
            $scope.selectedPokemon = selectedPokemon;
        });
    }

    $scope.details = function(){
        if( $scope.selectedPokemon.length === 0 ){
            return false;
        } else {
            return true;
        }
    }

    $scope.blur = function() {
        if( $scope.pokemon.length === 0 ){
            $scope.hidethis = true;
        }
    }

    $scope.fillTextbox = function(string){  
        $scope.pokemon = string;  
        $scope.hidethis = true;  
        console.log( $scope.pokemon );
   }
    console.log($scope.pokeName);
})