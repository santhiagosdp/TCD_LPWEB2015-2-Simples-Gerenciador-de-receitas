/* <!-- 
Linguagem de programação WEB
Sistemas de Informação
CEULP ULBRA
Santhiago Dionizio Pinto
santhiagosdp@gmail.com
-->*/
(function(){
	
	var API_BASE = '/TCD-lpWeb/api';

angular.module('receitas', ['ngRoute', 'angular-loading-bar'])

.config(
    
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController'
            })
            .when('/receitas', {
                templateUrl: 'views/receitas/lista.html',
                controller: 'ReceitasListaController'
            })
            .when('/receitas/editor/:id', {
                templateUrl: 'views/receitas/editor.html',
                controller: 'ReceitasEditorController'
            })
            .when('/receitas/editor', {
                templateUrl: 'views/receitas/editor.html',
                controller: 'ReceitasEditorController'
            })
			.when('/receitas/detalhes/:id', {
                templateUrl: 'views/receitas/detalhes.html',
                controller: 'ReceitasDetalhesController' 
            })
            .when('/receitas/tipo', {
                templateUrl: 'views/receitas/tipo.html',
                controller: 'ReceitasTipoController' 
            })       
        
            .otherwise({
                redirectTo: '/'
            });
    }  
       
       )

.controller('HomeController', function($rootScope,$scope, $http, $location){
	
	$rootScope.mostrarMenuInicio = function() {
        return ($location.path() != '/');
    };  
	
    $(document).ready(function () {
        $('.carousel').carousel({
            interval: 2000
        })
    });
    
})

.controller('ReceitasListaController', function($scope, $http, $location, $routeParams){
    
    $http.get(API_BASE + '/receitas')
    .then(function(response){
        $scope.dados = response.data;
    });
	
    $scope.delete = function(dado, dadoId) {
        
        if (confirm('Tem certeza que deseja excluir a Receita ' + dado.nome + ' ?')) {
            $http.delete(API_BASE + '/receitas/' + dadoId)
            .then(function(response){
                $scope.dados = response.data;
                //$scope.dados.splice(dadoId, 1);
            });
        }
    };    
    
    $scope.editar = function(idDado) {
        $location.path('/receitas/editor/' + idDado);
    };
    
	$scope.ver = function(dado) {
          //$location.path('/receitas/1/detalhes');
		$location.path('/receitas/detalhes/' + dado.id );
    };	
	
})

.controller('ReceitasEditorController', function($scope, $http, $location, $routeParams){
   $http.get(API_BASE + '/tipos')
    .then(function(response){
        $scope.tipos = response.data;
    });  
    
    if ($routeParams.id) {
        $http.get(API_BASE + '/receitas/' + $routeParams.id)
        .success(function(response){
            $scope.dado = response;
        });
    }
    
    $scope.salvar = function(dado) {
        $http.post(API_BASE + '/receitas', dado)
        .success(function(response) {
            alert('Receita Salva com Sucesso!');
            $location.path('/receitas');
        });
    };

    $scope.cancelar = function() {
        $location.path('/receitas');
    }
    
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});
    
    
})

.controller('ReceitasDetalhesController', function($scope, $http, $location,$routeParams){
    
       $http.get(API_BASE + '/receitas/' + $routeParams.id)
        .then(function(response){
            $scope.receita = response.data;    
    });	
    
    
	
   $scope.alerta = function(ind) {
          alert(ind);
    };
    
    $scope.cancelar = function() {
        $location.path('/receitas');
    }

})

.controller('ReceitasTipoController', function($scope, $http, $location, $routeParams){
   $http.get(API_BASE + '/tipos')
    .then(function(response){
        $scope.tipos = response.data;
    });  
    
    if ($routeParams.id) {
        $http.get(API_BASE + '/tipos/' + $routeParams.id)
        .success(function(response){
            $scope.dado = response;
        });
    }
    
   $scope.salvar = function(dado) {
            $http.post(API_BASE + '/tipos', dado)
            .success(function(response) {
                alert('Tipo Salvo com Sucesso!');
                
             $location.path('/receitas/tipo/');
                $http.get(API_BASE + '/tipos')
        .then(function(response){
            $scope.tipos = response.data;
        });

            });
    };
    
    $scope.cancelar = function() {
        $location.path('/receitas/editor');
    }
    
    $scope.delete = function(dado, dadoId) {
        
        if (confirm('Tem certeza que deseja excluir o tipo de receita ' + dado.nome + ' ?')) {
            $http.delete(API_BASE + '/tipo/' + dadoId)
            .then(function(response){
                $scope.tipos = response.data;
                //$scope.dados.splice(index, 1);
            });
        }
    };    
    
    $scope.editar = function(idDado) {
        $location.path('/receitas/tipo/' + idDado);
    };
    
       
})







})();












