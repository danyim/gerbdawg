(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('add', {
        url: '/add',
        templateUrl: 'app/add/add.html',
        controller: 'AddController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
