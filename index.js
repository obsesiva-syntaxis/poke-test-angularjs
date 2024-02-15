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
        const pokeUrl = allPokemons.find( element => element.name === pokemon).url;
        $http.get(pokeUrl).then( function( response ){ 
            console.log( response.data ); 
        });

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