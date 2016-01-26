(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('AddController', AddController);

  /** @ngInject */
  function AddController($firebaseArray) {
    var vm = this;

    vm.sayings = [];
    vm.addSaying = addSaying;
    var ref = new Firebase('https://gerbsdawg.firebaseio.com/sayings');

    activate();

    function activate() {
      vm.sayings = $firebaseArray(ref);
    }

    function addSaying(gerbMessage, dawgMessage) {
      vm.sayings.$add({
        gerbMessage: gerbMessage,
        dawgMessage: dawgMessage
      });
    }
  }
})();
