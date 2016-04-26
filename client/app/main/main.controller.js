(function() {
  'use strict';

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.newThingId = $('#newThing');

      $scope.$on('$destroy', function() {
        'use strict';
        socket.unsyncUpdates('thing');
      });
      $.material.init();
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThingId.val()) {
        this.$http.post('/api/things', {
          name: this.newThingId.val()
        });
        this.newThingId.val('');
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('nextMainFocusApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });

})();
