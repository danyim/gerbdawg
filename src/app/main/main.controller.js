(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $firebaseArray, $log, $sanitize, $modal, hotkeys, $stateParams) {
    var vm = this;
    var firebase = null;
    vm.sayings = [];
    vm.addSaying = addSaying;
    vm.randomSaying = '';
    vm.registerHotkeys = registerHotkeys;
    vm.openModal = openModal;
    vm.modalIsOpen = null;

    activate();

    function activate() {
      firebase = new Firebase('https://gerbsdawg.firebaseio.com/');

      var data = $firebaseArray(firebase.child('sayings'))
      data.$loaded().then(function() {
        vm.sayings = data;
        // angular.forEach(vm.sayings, function(v, i) {
        //   // console.log('items', v);
        //   console.log('item index', v.index, i);
        //   v.update({ index: i });
        //   // if(v && !v.index) v.index = i;
        // });
      });

      vm.registerHotkeys();
      vm.modalIsOpen = false
      if($stateParams.openModal) vm.openModal();
      // seedData();
    }

    function addSaying(gerbMessage, dawgMessage) {
      vm.sayings.$add({
        gerbMessage: gerbMessage,
        dawgMessage: dawgMessage
      });
    }

    function openModal() {
      if(!vm.modalIsOpen) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'app/addSayingModal/addSayingModal.html',
          controller: 'AddSayingModalController',
          controllerAs: 'vm',
          size: 'lg'
        });

        vm.modalIsOpen = true;

        modalInstance.result.then(function (selectedItem) {

        }, function () {
          vm.modalIsOpen = false;
        });
      }
    }

    function registerHotkeys() {
      hotkeys.add({
        combo: 'a',
        description: 'Add things',
        callback: function() {
          vm.openModal();
        }
      });
    }

    // function seedData() {
    //   vm.addSaying('Ask questions', 'Answers questions you haven\'t even thought to ask');
    // }
  }
})();
