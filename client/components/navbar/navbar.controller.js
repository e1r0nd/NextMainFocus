'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
      'title': 'MENU_FOCUS',
      'link': '/',
      'icon': 'filter_center_focus'
  },
    {
      'title': 'MENU_PROJECTS',
      'link': '/projects',
      'icon': 'folder_open'
  },
    {
      'title': 'MENU_TASKS',
      'link': '/tasks',
      'icon': 'list'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth, $translate) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$translate = $translate;
    this.language = $translate.use();
  }

  isActive(route) {
    return route === this.$location.path();
  }

  changeLanguage(langKey) {
    // init translations
    try {
      this.$translate.use(langKey);
      this.language = this.$translate.use();
    } catch (e) {
      if (window.console && window.console.error) {
        console.error(e, e.stack);
      }
    }
  }
}

angular.module('nextMainFocusApp')
  .controller('NavbarController', NavbarController);
