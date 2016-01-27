(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('AddSayingModalController', AddSayingModalController);

  /** @ngInject */
  function AddSayingModalController($firebaseArray, $firebaseObject, $window, toastr, $modalInstance, $cookies, $rootScope) {
    var vm = this;
    var firebase = null;
    var p;

    vm.sayings = [];
    vm.authenticate = authenticate;
    vm.addSaying = addSaying;
    vm.closeModal = closeModal;
    vm.isAuthenticated = $rootScope.isAuthenticated;
    vm.logout = logout;
    vm.newSaying = {};
    vm.password = '';
    vm.rememberPass = null;
    vm.removeSaying = removeSaying;

    activate();

    function activate() {
      firebase = new Firebase('https://gerbsdawg.firebaseio.com/');
      vm.sayings = $firebaseArray(firebase.child('sayings'));
      vm.rememberPass = true;

      if(!$rootScope.isAuthenticated) {
        console.log('not authed');
        // Grab the password
        var obj = $firebaseObject(firebase);
        obj.$loaded().then(function() {
          p = obj.editPassword;

          // Check the cookie, if there's a value, use it to auth
          var cookie = $cookies.get('gerbdawg');
          if(cookie) {
            vm.password = cookie;
            authenticate();
          }
        });
      }
    }

    function authenticate() {
      // Check password show view and add cookie
      if(vm.password == p) {
        $rootScope.isAuthenticated = true;
        vm.isAuthenticated = true;
        // If the user wanted to remember the password..
        if(vm.rememberPass) {
          // Create a cookie with a 1-month expiry
          var now = new Date();
          $cookies.put('gerbdawg', p, {
            expires: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
          });
        }
        toastr.success('The password worked, Big Dawg!');
      }
      else {
        vm.password = '';
        toastr.error('Wrong password, gerb.');
        // If it's wrong, take out the cookie
        $cookies.remove('gerbdawg');
      }
    }

    function addSaying() {
      vm.sayings.$add(vm.newSaying);
      vm.newSaying = {};
      toastr.success('New saying added.');
    }

    function closeModal() {
      $modalInstance.dismiss();
    }

    function logout() {
      $rootScope.isAuthenticated = false;;
      vm.isAuthenticated = false;
      $cookies.remove('gerbdawg');
    }

    function removeSaying(saying) {
      if($window.confirm('Are you sure you want to remove this?')) {
        vm.sayings.$remove(saying);
        toastr.error('Saying removed.');
      }
    }
  }
})();
