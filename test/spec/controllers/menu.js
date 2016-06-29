/*global describe, beforeEach, module, inject, it, expect*/
describe('Controller: MenuCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('nextmainfocusApp'));

  var MenuCtrl,
    scope,
    rootScope,
    translate,
    localStorageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    translate = {
      key: '',
      use: function (key) {
        if (key) {
          translate.key = key;
        } else {
          scope.language = translate.key;
        }
      }
    };
    scope.searchInp = {
      focus: function () {},
      val: function () {}
    };
    scope.menuDiv = {
      toggle: function () {}
    };
    scope.searchDiv = scope.menuDiv;
    localStorageService = {
      get: function () {}
    };

    MenuCtrl = $controller('MenuCtrl', {
      $scope: scope
        // place here mocked dependencies
    });
  }));
  beforeEach(inject(function ($rootScope) {
    rootScope = $rootScope.$new();
  }));

  it('reloadItems: broadcast ', function () {
    scope.items = [{
      type: 'project'
    }, {
      type: 'task'
    }];
    scope.filters = '';
    scope.query = '';
    scope.$root.$broadcast('reloadItems');
    expect(rootScope.filteredItems.length)
      .toBe(2);
  });

  it('changeLanguage: set russian language ', function () {
    scope.changeLanguage('ru');
    expect(scope.language)
      .toBe('ru');
  });

  it('search: search two task items', function () {
    scope.items = [{
      type: 'task'
    }, {
      type: 'task'
    }, {
      type: 'project'
    }];
    scope.filters = 'task';
    scope.search();
    expect(rootScope.filteredItems.length)
      .toBe(2);
    scope.filters = 'project';
    scope.search();
    expect(rootScope.filteredItems.length)
      .toBe(1);
  });

  it('toggleFilters: should filter on toggle and get one item on focus', function () {
    scope.items = [{
      type: 'task',
      order: '0'
    }, {
      type: 'task',
      order: '1'
    }];
    scope.toggleFilters('focus');
    expect(rootScope.filteredItems.length)
      .toBe(1);
  });

  it('toggleSearch: should filter by search', function () {
    scope.items = [{
      title: 'asd'
    }, {
      title: 'sdf'
    }, {
      title: 'zxc'
    }];
    scope.filters = '';
    scope.query = 'sd';
    scope.toggleSearch();
    expect(rootScope.filteredItems.length)
      .toBe(2);
    scope.toggleSearch(true);
    expect(rootScope.global.search)
      .toBe('');
  });

  it('clearSearch: should cear filters', function () {
    expect(rootScope.global.search)
      .toBe('');
  });

});
