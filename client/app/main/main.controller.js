'use strict';

(function() {
  class MainController {

    constructor($http, $scope, socket, Modal) {
      this.$http = $http;
      this.socket = socket;
      this.Items = [];
      this.newThingId = $('#newThing');

      this.deleteThing = Modal.confirm.delete(item => {
        this.$http.delete('/api/things/' + item._id);
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
      $.material.init();
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.Items = response.data;
          this.socket.syncUpdates('thing', this.Items);
        });
    }

    addThing() {
      if (this.newThingId.val()) {
        this.$http.post('/api/things', {
          title: this.newThingId.val()
        });
        this.newThingId.val('');
      }
    }

  }

  angular.module('nextMainFocusApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });

})();
