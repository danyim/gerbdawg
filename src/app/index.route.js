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
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        params: {
          openModal: true
        }
        // templateUrl: 'app/addSayingModal/addSayingModal.html',
        // controller: 'AddSayingModalController',
        // controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
