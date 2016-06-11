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
      mark: '1'
    }, {
      mark: '2'
    }, {
      mark: '5'
    }];
    scope.filters = '1';
    scope.$root.$broadcast('reloadItems');
    // console.debug(rootScope.filteredItems);
    expect(rootScope.filteredItems.length)
      .toBe(1);
  });

  it('changeLanguage: set russian language ', function () {
    scope.changeLanguage('ru');
    expect(scope.language)
      .toBe('ru');
  });

  it('search: search two items with the mark 1 in the list of three ', function () {
    scope.items = [{
      mark: '1'
    }, {
      mark: '2'
    }, {
      mark: '6'
    }];
    scope.filters = '1';
    scope.search();
    expect(rootScope.filteredItems.length)
      .toBe(2);
    scope.filters = '6';
    scope.search();
    expect(rootScope.filteredItems.length)
      .toBe(1);
  });

  it('toggleFilters: should filter on toggle and get one item with the mark 6', function () {
    scope.items = [{
      mark: '1'
    }, {
      mark: '1'
    }, {
      mark: '6'
    }];
    scope.toggleFilters('6');
    expect(rootScope.filteredItems.length)
      .toBe(1);
  });

  it('selectType: should filter by type and get one item', function () {
    scope.items = [{
      type: '1',
      mark: '6'
    }, {
      type: '1',
      mark: '6'
    }, {
      type: '2',
      mark: '6'
    }];
    scope.filters = '6';
    scope.selectType('2');
    expect(rootScope.filteredItems.length)
      .toBe(1);
  });

  it('toggleSearch: should filter by search', function () {
    scope.items = [{
      title: 'asd',
      mark: '6'
    }, {
      title: 'sdf',
      mark: '6'
    }, {
      title: 'zxc',
      mark: '6'
    }];
    scope.filters = '-1';
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

  it('toggleTag: get one item by tag Fiction', function () {
    scope.items = [{
      tag: 'fiction'
    }, {
      tag: 'education'
    }];
    scope.filters = '-1';
    scope.toggleTag('fiction');
    expect(rootScope.filteredItems.length)
      .toBe(1);
    // console.debug(rootScope.filteredItems);
  });
});
