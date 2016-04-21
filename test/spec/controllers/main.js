/*global describe, beforeEach, module, inject, it, expect*/
describe('Controller: MainCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('nextMainFocusApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    'use strict';
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
        // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    'use strict';
    expect(MainCtrl.awesomeThings.length)
      .toBe(3);
  });
});
