(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('AddSayingModalController', AddSayingModalController);

  /** @ngInject */
  function AddSayingModalController($firebaseArray, $firebaseObject, $window, toastr, $modalInstance, $cookies, $rootScope, $interval) {
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
    vm.passwordSayings = [
      'Sorry, you gotta be The Big Dawg to edit this stuff',
      'Show me if you\'re yet another gerb or The Big Dawg',
      'You can\'t just talk like The Big Dawg, you have to walk like The Big Dawg',
      'Gerbs are always nosy about things that aren\'t their business',
      'What do think The Big Dawg would type down there?',
      'Is that you again, gerb?',
      'This area is reserved for non-gerb, Big Dawgs only',
      'Only a gerb can\'t get past this',
      'Don\'t gerb this up',
      'The Big Dawg knows this like the back of his paw'
    ];
    vm.passwordSayingIndex = 0;
    vm.randomizePasswordSaying = randomizePasswordSaying;
    vm.rememberPass = null;
    vm.removeSaying = removeSaying;

    activate();

    function activate() {
      firebase = new Firebase('https://gerbsdawg.firebaseio.com/');
      vm.sayings = $firebaseArray(firebase.child('sayings'));
      vm.rememberPass = true;
      // Randomize the sayings
      randomizePasswordSaying();
      // Wait a satisfyingly long time to change it again if the user is still looking
      $interval(function() {
        randomizePasswordSaying();
      }, 10000);

      // Check if user is authenticated, if not, retrieve the password from Firebase
      if(!$rootScope.isAuthenticated) {
        // console.log('not authed');
        // Grab the password
        var obj = $firebaseObject(firebase);
        obj.$loaded().then(function() {
          p = obj.editPassword;

          // Check the cookie, if there's a value, use it to attempt to auth
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
        toastr.success('You\'re in, Big Dawg!');
      }
      else {
        vm.password = '';
        toastr.error('Wrong password, gerb.');
        // If it's wrong, take out the cookie
        $cookies.remove('gerbdawg');
        randomizePasswordSaying();
      }
    }

    function addSaying() {
      vm.sayings.$add(vm.newSaying);
      vm.newSaying = {};
      toastr.success('New saying added!');
    }

    function closeModal() {
      $modalInstance.dismiss();
    }

    function logout() {
      $rootScope.isAuthenticated = false;;
      vm.isAuthenticated = false;
      $cookies.remove('gerbdawg');
    }

    function randomizePasswordSaying() {
      var currentIdx = vm.passwordSayingIndex;
      var newIdx = Math.floor(Math.random() * vm.passwordSayings.length);
      do  {
        newIdx = Math.floor(Math.random() * vm.passwordSayings.length);
      }
      while(currentIdx == newIdx);
      vm.passwordSayingIndex = newIdx;
    }

    function removeSaying(saying) {
      if($window.confirm('Are you sure you want to remove this, Big Dawg?')) {
        vm.sayings.$remove(saying);
        toastr.error('Saying removed.');
      }
    }
  }
})();
