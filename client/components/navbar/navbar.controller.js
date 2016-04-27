'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
      'title': 'focus',
      'link': '/'
  },
    {
      'title': 'projects',
      'link': '/projects'
  },
    {
      'title': 'tasks',
      'link': '/tasks'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('nextMainFocusApp')
  .controller('NavbarController', NavbarController);
