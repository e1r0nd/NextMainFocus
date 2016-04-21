/*global describe, beforeEach, module, inject, it, expect*/
describe('Controller: AboutCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('nextMainFocusApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    'use strict';
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
        // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    'use strict';
    expect(AboutCtrl.awesomeThings.length)
      .toBe(3);
  });
});
