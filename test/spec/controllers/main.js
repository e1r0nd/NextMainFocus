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
    ['Title', 'Author', 'Mark', 'date', 'confirmRemove', 'bookTitleHelper', 'addNew'].forEach(function (itm, i) {
      scope[((i < 4) ? 'book' : '') + itm] = new HtmlFactory();
      if (i < 4) {
        scope['book' + itm + 'Div'] = new HtmlFactory();
      }
    });

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      updateBooks: function () {}
    });
  }));

  it('removeBookDialog: store a book\'s index before the removing', function () {
    scope.removeBookDialog('123456789');
    expect(scope.index)
      .toBe('123456789');
  });

  it('removeBook: remove the book by the stored index', function () {
    scope.books = [
      {
        index: '1'
      },
      {
        index: '123456789'
      }
    ];
    scope.removeBook('123456789');
    expect(scope.books.length)
      .toBe(1);
  });

  it('addBook: add a book to the list, should be 1 item', function () {
    scope.books = [];
    scope.book = {
      title: 'Test 1'
    };
    scope.addBook();
    expect(scope.books.length)
      .toBe(1);
  });

  it('newBook: create a new book', function () {
    scope.newBook(); // test a book
    expect(scope.isEmpty)
      .toBe(true);
    expect(scope.book.mark)
      .toBe('5');
    expect(scope.book.type)
      .toBe('book');
    scope.newBook(true); // test an article
    expect(scope.isEmpty)
      .toBe(true);
    expect(scope.book.mark)
      .toBe('5');
    expect(scope.book.type)
      .toBe('article');
  });

  it('revertBook: revert changes', function () {
    scope.books = [
      {
        index: '1'
      },
      {
        title: 'zxc',
        index: '123456789'
      }
    ];
    scope.originalBook = {
      title: 'abc',
      index: '123456789'
    };
    scope.isEmpty = false;
    scope.revertBook('123456789');
    expect(scope.books[1].title)
      .toBe('abc');
    expect(scope.originalBook)
      .toBe(null);
    scope.originalBook = {
      title: 'abc',
      index: '123456789'
    };
    scope.isEmpty = true;
    scope.revertBook('');
    expect(scope.books[1].title)
      .toBe('abc');
  });

  it('editBook: initialize changes', function () {
    scope.editBook({
      title: 'Test 1'
    }, '123456789');
    expect(scope.book.title)
      .toBe('Test 1');
    expect(scope.index)
      .toBe('123456789');
  });

  it('saveEdits: save this book to the list', function () {
    scope.books = [
      {
        index: '1'
      },
      {
        title: '>zxc',
        index: '123456789'
      }
    ];
    scope.saveEdits({ // save an existing book
      title: '<Test 1',
      author: 'New',
      mark: '5'
    }, '123456789');
    expect(scope.books[1].title)
      .toBe('&lt;Test 1');
    scope.saveEdits({ // change the mark for an existing book
      title: 'Test 2',
      author: 'New',
      tag: 'fiction',
      mark: '3'
    }, '1');
    expect(scope.books[0].title)
      .toBe('Test 2');
    expect(scope.books[0].tag)
      .toBe('fiction');
    scope.saveEdits({ // save an empty book
      title: '',
      author: '',
      mark: '3'
    }, '1');
    expect(scope.books.length)
      .toBe(2);
    scope.isEmpty = true; // add a new one
    scope.book = {
      title: 'asd',
      author: 'A',
      mark: '6'
    };
    scope.saveEdits({
      title: 'asd',
      author: 'A',
      mark: '6'
    }, '');
    expect(scope.books.length)
      .toBe(3);

    // console.debug(scope.books);
  });

  it('sortableBookList: set a sortable object', function () {
    expect(scope.sortableBookList.delay)
      .toBe(0);
    expect(scope.sortableBookList.animation)
      .toBe(150);
    expect(scope.sortableBookList.handle)
      .toBe('.book-itm-tag');

    // console.debug(scope.books);
  });

  it('clearDateInp: clear a date input state', function () {
    scope.book = {
      date: '2000-06-01'
    };
    scope.clearDateInp();
    expect(scope.book.date)
      .toBe('');
  });
});
