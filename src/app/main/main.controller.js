(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $firebaseArray, $log, $sanitize) {
    var vm = this;

    vm.sayings = [];
    vm.addSaying = addSaying;
    vm.randomSaying = '';
    var ref = new Firebase('https://gerbsdawg.firebaseio.com/sayings');

    activate();

    function activate() {

      vm.sayings = $firebaseArray(ref);
      $log.log(vm.sayings);

      // seedData();
    }

    function seedData() {
      vm.addSaying('Ask questions', 'Answers questions you haven\'t even thought to ask');
    }

    function addSaying(gerbMessage, dawgMessage) {
      vm.sayings.$add({
        gerbMessage: gerbMessage,
        dawgMessage: dawgMessage
      });
    }
  }
})();
