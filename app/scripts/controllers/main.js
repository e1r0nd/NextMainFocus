/**************************************************
 * Next Main Focus // main.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - June 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
/*global $, angular, console*/
angular.module('nextmainfocusApp')
  .controller('MainCtrl', function ($scope, $rootScope, $filter, $translate, localStorageService) {
    'use strict';

    var searchIndex = function (index) {
        // select a item by its index
        var i;

        try {
          for (i in $scope.items) {
            if ($scope.items.hasOwnProperty(i)) {
              if (index === $scope.items[i].index) {
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
      encodeItems = function () {
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
          for (i in $scope.items) {
            if ($scope.items.hasOwnProperty(i)) {
              for (prop in $scope.items[i]) {
                if ($scope.items[i].hasOwnProperty(prop)) {
                  $scope.items[i][prop] = String($scope.items[i][prop])
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
      updateItems = function (isOrdered) {
        // boolean isOrdered - don't reorder items if Focus is opened
        var i,
          index,
          filteredItems;

        try {
          if (!isOrdered) { // reorder items
            filteredItems = $filter('orderBy')($filter('filter')($scope.items, {
              type: 'task'
            }), 'order');

            for (i in filteredItems) {
              if (filteredItems.hasOwnProperty(i)) {
                index = searchIndex(filteredItems[i].index);
                $scope.items[index].order = i;
              }
            }
          }
          localStorageService.set('items', $scope.items);
          $scope.$root.$broadcast('reloadItems');
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      },
      itemsInStore = localStorageService.get('items');

    $scope.items = itemsInStore || [];

    $scope.removeItemDialog = function (index) {
      // store a item's index before the removing in removeItem()
      try {
        $scope.index = index;
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };
    $scope.removeItem = function (index) {
      // remove the item by the stored index in removeItemDialog()
      try {
        $scope.items.splice(searchIndex(index), 1);
        updateItems(); // save the current item's set
        $scope.confirmRemove.modal('hide');
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.addItem = function () {
      // add new item
      try {
        $scope.items.push($scope.item);
        $scope.item = '';
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.newItem = function (project) {
      // create a fresh new item in a separate object
      try {
        $scope.item = {};

        $scope.isEmpty = true; // drop the dirty flag for the Modal dialog
        $scope.item.type = (project) ? 'project' : 'task';
        $scope.item.parentID = $rootScope.projectItems[0].index;
        $scope.itemTitleHelper.html($filter('translate')('ITEM_NOT_EMPTY'));
        ['Title', 'Date', 'Acronym', 'Details'].forEach(function (itm) { // clear inputs
          $('#item' + itm + 'Div')
            .addClass('is-empty');
        });
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.revertItem = function (index) {
      // revert changes for the edited item
      try {
        if (!$scope.isEmpty) {
          $scope.items[searchIndex(index)] = $scope.originalItem;
          $scope.index = null;
          $scope.originalItem = null;
          updateItems(); // save the current item's set
        }
        $('.has-error, .is-empty')
          .removeClass('has-error is-empty');
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.editItem = function (item, index) {
      // create a clone for editing
      try {
        $scope.isEmpty = false;
        $('.is-empty')
          .removeClass('is-empty'); // set the dirty flag for the Modal dialog #29
        $scope.item = item;
        $scope.originalItem = angular.extend({}, item);
        $scope.index = index;
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.saveEdits = function (item, index) {
      //save all chages or add the new created item
      try {
        $scope.isError = false;
        // check for empty values
        ['Title'].forEach(function (itm) {
          if ((!item[itm.toLowerCase()]) && !$scope.isError) {
            if (!item.title) {
              $scope.itemTitleHelper.html($filter('translate')('ITEM_NOT_EMPTY'));
            }

            $scope['item' + itm].focus();
            $scope['item' + itm + 'Div'].addClass('has-error');
            $scope.isError = true;
          }
        });

        if (!$scope.isError) {
          $scope.addNew.modal('hide');
          item.index = Date.now();
          if ('task' === item.type) {
            item.acronym = $scope.items[searchIndex(item.parentID)].acronym;
          }
          if ($scope.items[searchIndex(index)] && ($scope.items[searchIndex(index)].type !== item.type)) {
            item.order = String($filter('filter')($scope.items, {
                type: 'task'
              })
              .length); // the last one in the order
          }
        } else { // do not close the Modal dialog on error
          return;
        }

        if ($scope.isEmpty) { // add new item
          $scope.addItem();
        } else { // or save edited item
          $scope.items[searchIndex(index)] = item;
          $scope.index = null;
        }

        encodeItems(); // perform HTML tags
        updateItems(!$scope.isEmpty); // save the current item's set
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.sortableItemList = {
      // create an object for the sortable list
      delay: 0,
      animation: 150,
      handle: '.item-itm-tag', // match the draggable tag
      onUpdate: function (evt) { // Called by any change to the list (add / update / remove)
        var i, index;

        try {
          for (i in evt.models) { // reorder the Wishlist
            if (evt.models.hasOwnProperty(i)) {
              index = searchIndex(evt.models[i].index);
              $scope.items[index].order = i;
            }
          }
          updateItems(true); // save the current item's set
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      }
    };

    $scope.clearDateInp = function () {
      // clear a item's date
      $scope.item.date = '';
    };

    if (null === itemsInStore) { // create demo data for a new user
      try {
        $scope.items = [{
          title: 'Project A',
          date: '2016-06-12',
          index: '0001',
          order: '0',
          type: 'project',
          parentID: '0001',
          acronym: 'PRA',
          details: ''
        }, {
          title: 'Project B',
          date: '',
          index: '0002',
          order: '1',
          type: 'project',
          parentID: '0002',
          acronym: 'PRB',
          details: ''
        }, {
          title: 'Task 1',
          date: '2016-06-15',
          index: '0003',
          order: '0',
          type: 'task',
          parentID: '0001',
          acronym: 'PRA',
          details: 'Some details here'
        }, {
          title: 'Task 2',
          date: '',
          index: '0004',
          order: '3',
          type: 'task',
          parentID: '0001',
          acronym: 'PRA',
          details: 'Lorem epsilum est dollar set amet?'
        }, {
          title: 'Task A',
          date: '',
          index: '0005',
          order: '4',
          type: 'task',
          parentID: '0001',
          acronym: 'PRA',
          details: ''
        }, {
          title: 'Point 1',
          date: '',
          index: '0006',
          order: '5',
          type: 'task',
          parentID: '0002',
          acronym: 'PRB',
          details: 'This is the best one'
        }, {
          title: 'Point 2',
          date: '',
          index: '0005',
          order: '6',
          type: 'task',
          parentID: '0002',
          acronym: 'PRB',
          details: 'The cat-item'
        }];

        updateItems(true); // save the current item's set
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
          $scope.itemDate = $('#itemDate');
          $scope.itemTitleHelper = $('#itemTitleHelper');
          $scope.itemTitle = $('#itemTitle');
          $scope.itemTitleDiv = $('#itemTitleDiv');
          $scope.itemAcronym = $('#itemAcronym');
          $scope.itemAcronymDiv = $('#itemAcronymDiv');
          $scope.itemParent = $('#itemParent');
          $scope.itemParentDiv = $('#itemParentDiv');
          $scope.itemDescription = $('#itemDescription');
          $scope.itemDescriptionDiv = $('#itemDescriptionDiv');
          $scope.itemType = $('#itemType');
          $scope.itemTypeDiv = $('#itemTypeDiv');
          $scope.itemToggler = $('#itemToggler');
          $rootScope.togglebuttonBtn = $('.togglebutton-btn');

          try {
            $scope.addNew // hide "+" when the Modal dialog is opened
              .on('show.bs.modal', function () {
                $scope.addBtn.fadeOut();
                if ($('.togglebutton .toggle')
                  .length > 1) {
                  $scope.itemToggler.hide();
                } else {
                  $scope.itemToggler.show();
                }
              })
              .on('hide.bs.modal', function () {
                $scope.addBtn.fadeIn();
              });

            $scope.itemDate.bootstrapMaterialDatePicker({ // init the Datapicker
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
