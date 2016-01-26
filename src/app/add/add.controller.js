(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('AddController', AddController);

  /** @ngInject */
  function AddController($firebaseArray, $window, toastr) {
    var vm = this;

    vm.sayings = [];
    vm.addSaying = addSaying;
    vm.removeSaying = removeSaying;
    vm.newSaying = {};
    var ref = new Firebase('https://gerbsdawg.firebaseio.com/sayings');

    activate();

    function activate() {
      vm.sayings = $firebaseArray(ref);
    }

    function addSaying() {
      vm.sayings.$add(vm.newSaying);
      vm.newSaying = {};
      toastr.success('New saying added.');
    }

    function removeSaying(saying) {
      if($window.confirm('Are you sure?')) {
        vm.sayings.$remove(saying);
        toastr.error('Saying removed.');
      }
    }
  }
})();
