/**************************************************
 * Personal Bookshelf // main.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - January 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
/*global $, angular, console*/
angular.module('personalbookshelfApp')
  .controller('MainCtrl', function ($scope, $rootScope, $filter, $translate, localStorageService) {
    'use strict';

    var searchIndex = function (index) {
        // select a book by its index
        var i;

        try {
          for (i in $scope.books) {
            if ($scope.books.hasOwnProperty(i)) {
              if (index === $scope.books[i].index) {
                return i;
              }
            }
          }
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      },
      encodeBooks = function () {
        // encode html, $sanitize doesn't work with cyrillic
        var i,
          prop,
          tagsToReplace = {
            '<': '&lt;',
            '>': '&gt;'
          },
          replaceTag = function (tag) {
            try {
              return tagsToReplace[tag] || tag;
            } catch (e) {
              if (window.console && window.console.error) {
                console.error(e, e.stack);
              }
            }
          };

        try {
          for (i in $scope.books) {
            if ($scope.books.hasOwnProperty(i)) {
              for (prop in $scope.books[i]) {
                if ($scope.books[i].hasOwnProperty(prop)) {
                  $scope.books[i][prop] = String($scope.books[i][prop])
                    .replace(/[&<>]/g, replaceTag);
                }
              }
            }
          }
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      },
      updateBooks = function (isOrdered) {
        // boolean isOrdered - don't reorder books if Wishlist is opened
        var i,
          index,
          filteredItems;

        try {
          if (!isOrdered) { // reorder wishlist
            filteredItems = $filter('orderBy')($filter('filter')($scope.books, {
              mark: '5'
            }), 'order');

            for (i in filteredItems) {
              if (filteredItems.hasOwnProperty(i)) {
                index = searchIndex(filteredItems[i].index);
                $scope.books[index].order = i;
              }
            }
          }
          localStorageService.set('books', $scope.books);
          $scope.$root.$broadcast('reloadBooks');
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      },
      booksInStore = localStorageService.get('books');

    $scope.books = booksInStore || [];

    $scope.removeBookDialog = function (index) {
      // store a book's index before the removing in removeBook()
      try {
        $scope.index = index;
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };
    $scope.removeBook = function (index) {
      // remove the book by the stored index in removeBookDialog()
      try {
        $scope.books.splice(searchIndex(index), 1);
        updateBooks(); // save the current book's set
        $scope.confirmRemove.modal('hide');
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.addBook = function () {
      // add new book
      try {
        $scope.books.push($scope.book);
        $scope.book = '';
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.newBook = function (article) {
      // create a fresh new book in a separate object
      try {
        $scope.book = {};

        $scope.isEmpty = true; // drop the dirty flag for the Modal dialog
        $scope.book.mark = '5';
        $scope.book.type = (article) ? 'article' : 'book';
        $scope.bookTitleHelper.html($filter('translate')('BOOK_NOT_EMPTY'));
        ['Title', 'Author', 'Date'].forEach(function (itm) { // clear inputs
          $('#book' + itm + 'Div')
            .addClass('is-empty');
        });
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.revertBook = function (index) {
      // revert changes for the edited book
      try {
        if (!$scope.isEmpty) {
          $scope.books[searchIndex(index)] = $scope.originalBook;
          $scope.index = null;
          $scope.originalBook = null;
          updateBooks(); // save the current book's set
        }
        $('.has-error, .is-empty')
          .removeClass('has-error is-empty');
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.editBook = function (book, index) {
      // create a clone for editing
      try {
        $scope.isEmpty = false;
        $('.is-empty')
          .removeClass('is-empty'); // set the dirty flag for the Modal dialog #29
        $scope.book = book;
        $scope.originalBook = angular.extend({}, book);
        $scope.index = index;
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.saveEdits = function (book, index) {
      //save all chages or add the new created book
      try {
        var theSameTitle = function (title, index) { // don't add books with the same title
            var i,
              bookIndex = searchIndex(index);

            try {
              if (!title) {
                return;
              }
              for (i in $scope.books) {
                if ($scope.books.hasOwnProperty(i)) {
                  if ($scope.books[i].title &&
                    (($scope.books[i].title.toLowerCase() === title.toLowerCase() && $scope.isEmpty) ||
                      ($scope.books[i].title.toLowerCase() === title.toLowerCase() && bookIndex !== i))) {
                    return true;
                  }
                }
              }
              return false;
            } catch (e) {
              if (window.console && window.console.error) {
                console.error(e, e.stack);
              }
            }
          },
          today,
          isTheSameTitle = theSameTitle(book.title, index);

        $scope.isError = false;
        // check for empty values
        ['Title', 'Author', 'Mark', 'date'].forEach(function (itm) {
          if ((!book[itm.toLowerCase()] || isTheSameTitle) && !$scope.isError) {
            if (!book.title) {
              $scope.bookTitleHelper.html($filter('translate')('BOOK_NOT_EMPTY'));
            } else if (isTheSameTitle) {
              $scope.bookTitleHelper.html($filter('translate')('BOOK_EXISTS'));
            }

            if ('date' !== itm) {
              $scope['book' + itm].focus();
              $scope['book' + itm + 'Div'].addClass('has-error');
              $scope.isError = true;
            }
          }
          if ('date' === itm) { // if date is not provided
            today = new Date(); // set today for Done books
            book.date = (!book.date && book.mark > 0 && book.mark < 5) ? today.getFullYear() + '-' + ((today.getMonth() < 10) ? '0' : '') + (today.getMonth() + 1) + '-' + ((today.getDate() < 10) ? '0' : '') + today.getDate() : book.date || '';
          }
          if ('Mark' === itm) {
            book.mark = (isNaN(+book.mark) || book.mark < '1' || book.mark > '6') ? '5' : book.mark;
          }
          if ('Tag' === itm) {
            book.tag = ((book.tag !== 'fiction') || (book.tag !== 'education') || (book.tag !== 'entertainment')) ? '' : book.tag;
          }
        });

        if (!$scope.isError) {
          $scope.addNew.modal('hide');
          book.index = Date.now();
          if ($scope.books[searchIndex(index)] && ($scope.books[searchIndex(index)].mark !== book.mark)) {
            book.order = String($filter('filter')($scope.books, {
                mark: '5'
              })
              .length); // the last one in the order
          }
        } else { // do not close the Modal dialog on error
          return;
        }

        if ($scope.isEmpty) { // add new book
          $scope.addBook();
        } else { // or save edited book
          $scope.books[searchIndex(index)] = book;
          $scope.index = null;
        }

        encodeBooks(); // perform HTML tags
        updateBooks(!$scope.isEmpty); // save the current book's set
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.sortableBookList = {
      // create an object for the sortable list
      delay: 0,
      animation: 150,
      handle: '.book-itm-tag', // match the draggable tag
      onUpdate: function (evt) { // Called by any change to the list (add / update / remove)
        var i, index;

        try {
          for (i in evt.models) { // reorder the Wishlist
            if (evt.models.hasOwnProperty(i)) {
              index = searchIndex(evt.models[i].index);
              $scope.books[index].order = i;
            }
          }
          updateBooks(true); // save the current book's set
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      }
    };

    $scope.clearDateInp = function () {
      // clear a book's date
      $scope.book.date = '';
    };

    if (null === booksInStore) { // create demo data for a new user
      try {
        $scope.books = [{
          author: 'Author A',
          date: '',
          index: '0001',
          mark: '5',
          order: '1',
          type: 'book',
          tag: 'fiction',
          title: 'New Book'
        }, {
          author: 'https://github.com/e1r0nd/PersonalBookShelf/wiki',
          date: '',
          index: '0011',
          mark: '5',
          order: '2',
          type: 'article',
          tag: 'education',
          title: 'e1r0nd: PBS - Wiki'
        }, {
          author: 'Author A',
          date: '',
          index: '0002',
          mark: '5',
          order: '3',
          type: 'book',
          tag: 'education',
          title: 'Old book'
        }, {
          author: 'Author B',
          date: '',
          index: '0003',
          mark: '5',
          order: '4',
          type: 'book',
          tag: '',
          title: 'Someday read this'
        }, {
          author: 'Author A',
          date: '',
          index: '0004',
          mark: '0',
          order: '0',
          type: 'book',
          tag: 'entertainment',
          title: 'Good book'
        }, {
          author: 'Author C',
          date: '1982-02-13',
          index: '0005',
          mark: '4',
          order: '0',
          type: 'book',
          tag: '',
          title: 'This is the best one'
        }, {
          author: 'Author D',
          date: '1991-03-14',
          index: '0006',
          mark: '1',
          order: '0',
          type: 'book',
          tag: '',
          title: 'The cat-book'
        }, {
          author: 'Author D',
          date: '1991-03-20',
          index: '0007',
          mark: '2',
          order: '0',
          type: 'book',
          tag: 'entertainment',
          title: 'The dog-book'
        }, {
          author: 'Author E',
          date: '2000-06-15',
          index: '0008',
          mark: '3',
          order: '0',
          type: 'book',
          tag: 'education',
          title: 'The bird-book'
        }, {
          author: 'Author F',
          date: '',
          index: '0009',
          mark: '6',
          order: '0',
          type: 'book',
          tag: 'entertainment',
          title: 'The worst book'
        }];

        updateBooks(true); // save the current book's set
      } catch (err) {
        if (window.console && window.console.error) {
          console.error(err, err.stack);
        }
      }
    }

    try {
      $('document')
        .ready(function () {
          // cache all DOM queries
          $scope.addNew = $('#addNew');
          $scope.addBtn = $('#addBtn');
          $scope.confirmRemove = $('#confirmRemove');
          $scope.bookDate = $('#bookDate');
          $scope.bookTitleHelper = $('#bookTitleHelper');
          $scope.bookTitle = $('#bookTitle');
          $scope.bookTitleDiv = $('#bookTitleDiv');
          $scope.bookAuthor = $('#bookAuthor');
          $scope.bookAuthorDiv = $('#bookAuthorDiv');
          $scope.bookMark = $('#bookMark');
          $scope.bookMarkDiv = $('#bookMarkDiv');
          $scope.bookToggler = $('#bookToggler');
          $rootScope.togglebuttonBtn = $('.togglebutton-btn');

          try {
            $scope.addNew // hide "+" when the Modal dialog is opened
              .on('show.bs.modal', function () {
                $scope.addBtn.fadeOut();
                if ($('.togglebutton .toggle')
                  .length > 1) {
                  $scope.bookToggler.hide();
                } else {
                  $scope.bookToggler.show();
                }
              })
              .on('hide.bs.modal', function () {
                $scope.addBtn.fadeIn();
              });

            $scope.bookDate.bootstrapMaterialDatePicker({ // init the Datapicker
              format: 'YYYY-MM-DD',
              lang: $translate.use(),
              weekStart: 1,
              time: false,
              nowButton: true
            });
          } catch (e) {
            if (window.console && window.console.error) {
              console.error(e, e.stack);
            }
          }
        });
    } catch (e) {
      if (window.console && window.console.error) {
        console.error(e, e.stack);
      }
    }
  });
