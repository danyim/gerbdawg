(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        values: '='
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: false,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.values, function(value) {
        typist.type(value);
      });

      // watcher = scope.$watch('vm.contributors', function() {
      //   angular.forEach(vm.contributors, function(contributor) {
      //     typist.type(contributor.login).pause().delete();
      //   });
      // });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributor) {
      var vm = this;

      activate();

      function activate() {

      }
    }

  }

})();
