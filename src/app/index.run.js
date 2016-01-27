(function() {
  'use strict';

  angular
    .module('gerbsDawg')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {
    $rootScope.isAuthenticated = false;
    // $log.debug('runBlock end');
  }

})();
