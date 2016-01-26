(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .controller('AddController', AddController);

  /** @ngInject */
  function AddController($scope, $timeout, webDevTec, toastr, $firebaseArray) {
    var vm = this;

    // vm.awesomeThings = [];
    vm.sayings = [];
    // vm.classAnimation = '';
    // vm.creationDate = 1453781753078;
    vm.addSaying = addSaying;
    vm.selectRandom = selectRandom;
    // vm.showToastr = showToastr;
    vm.randomSaying = '';
    var ref = new Firebase('https://gerbsdawg.firebaseio.com/sayings');

    activate();

    function activate() {
      // getWebDevTec();
      // $timeout(function() {
      //   vm.classAnimation = 'rubberBand';
      // }, 4000);

      vm.sayings = $firebaseArray(ref);
      console.log(vm.sayings);

      // seedData();
      vm.randomSaying = vm.selectRandom();
      console.log('random', vm.randomSaying);
    }

    function selectRandom() {
      return vm.sayings[0];
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

    // function showToastr() {
    //   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //   vm.classAnimation = '';
    // }

    // function getWebDevTec() {
    //   vm.awesomeThings = webDevTec.getTec();

    //   angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //     awesomeThing.rank = Math.random();
    //   });
    // }
  }
})();
