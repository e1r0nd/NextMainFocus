/*global describe, beforeEach, module, inject, it, expect*/
describe('Controller: MainCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('nextmainfocusApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    // create jQuery and Bootstrap mocks
    function HtmlFactory() { // constructor
      this.html = function () {};
      this.modal = function () {};
      this.focus = function () {};
      this.addClass = function () {};
    }
    ['Title', 'Author', 'Mark', 'date', 'confirmRemove', 'itemTitleHelper', 'addNew'].forEach(function (itm, i) {
      scope[((i < 4) ? 'item' : '') + itm] = new HtmlFactory();
      if (i < 4) {
        scope['item' + itm + 'Div'] = new HtmlFactory();
      }
    });

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      updateItems: function () {}
    });
  }));

  it('removeItemDialog: store a item\'s index before the removing', function () {
    scope.removeItemDialog('123456789');
    expect(scope.index)
      .toBe('123456789');
  });

  it('removeItem: remove the item by the stored index', function () {
    scope.items = [
      {
        index: '1'
      },
      {
        index: '123456789'
      }
    ];
    scope.removeItem('123456789');
    expect(scope.items.length)
      .toBe(1);
  });

  it('addItem: add a item to the list, should be 1 item', function () {
    scope.items = [];
    scope.item = {
      title: 'Test 1'
    };
    scope.addItem();
    expect(scope.items.length)
      .toBe(1);
  });

  it('newItem: create a new item', function () {
    scope.newItem(); // test a item
    expect(scope.isEmpty)
      .toBe(true);
    expect(scope.item.mark)
      .toBe('5');
    expect(scope.item.type)
      .toBe('item');
    scope.newItem(true); // test an article
    expect(scope.isEmpty)
      .toBe(true);
    expect(scope.item.mark)
      .toBe('5');
    expect(scope.item.type)
      .toBe('article');
  });

  it('revertItem: revert changes', function () {
    scope.items = [
      {
        index: '1'
      },
      {
        title: 'zxc',
        index: '123456789'
      }
    ];
    scope.originalItem = {
      title: 'abc',
      index: '123456789'
    };
    scope.isEmpty = false;
    scope.revertItem('123456789');
    expect(scope.items[1].title)
      .toBe('abc');
    expect(scope.originalItem)
      .toBe(null);
    scope.originalItem = {
      title: 'abc',
      index: '123456789'
    };
    scope.isEmpty = true;
    scope.revertItem('');
    expect(scope.items[1].title)
      .toBe('abc');
  });

  it('editItem: initialize changes', function () {
    scope.editItem({
      title: 'Test 1'
    }, '123456789');
    expect(scope.item.title)
      .toBe('Test 1');
    expect(scope.index)
      .toBe('123456789');
  });

  it('saveEdits: save this item to the list', function () {
    scope.items = [
      {
        index: '1'
      },
      {
        title: '>zxc',
        index: '123456789'
      }
    ];
    scope.saveEdits({ // save an existing item
      title: '<Test 1',
      author: 'New',
      mark: '5'
    }, '123456789');
    expect(scope.items[1].title)
      .toBe('&lt;Test 1');
    scope.saveEdits({ // change the mark for an existing item
      title: 'Test 2',
      author: 'New',
      tag: 'fiction',
      mark: '3'
    }, '1');
    expect(scope.items[0].title)
      .toBe('Test 2');
    expect(scope.items[0].tag)
      .toBe('fiction');
    scope.saveEdits({ // save an empty item
      title: '',
      author: '',
      mark: '3'
    }, '1');
    expect(scope.items.length)
      .toBe(2);
    scope.isEmpty = true; // add a new one
    scope.item = {
      title: 'asd',
      author: 'A',
      mark: '6'
    };
    scope.saveEdits({
      title: 'asd',
      author: 'A',
      mark: '6'
    }, '');
    expect(scope.items.length)
      .toBe(3);

    // console.debug(scope.items);
  });

  it('sortableItemList: set a sortable object', function () {
    expect(scope.sortableItemList.delay)
      .toBe(0);
    expect(scope.sortableItemList.animation)
      .toBe(150);
    expect(scope.sortableItemList.handle)
      .toBe('.item-itm-tag');

    // console.debug(scope.items);
  });

  it('clearDateInp: clear a date input state', function () {
    scope.item = {
      date: '2000-06-01'
    };
    scope.clearDateInp();
    expect(scope.item.date)
      .toBe('');
  });
});
