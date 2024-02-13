const pokeApp = angular.module("pokeList", []);

pokeApp.controller("pokeListController", function($scope, $http) {
    $http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10").then( function(response) {
            const pokeNameArr = [];
            response.data.results.map( poke => pokeNameArr.push(poke.name));
            console.log(pokeNameArr);
            $scope.items = pokeNameArr;
        });
     console.log( $scope.pokeName );
})