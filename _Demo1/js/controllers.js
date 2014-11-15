'use strict';

/* Controllers */

var nmfApp = angular.module('nmfApp', []);

nmfApp.controller('nmfListCtrl', function($scope) {
  $scope.projects = [
    {
		'name': 'Project1',
		'done': false
	},
    {
		'name': 'HomeProject',
		'done': true
	}
  ];
  
	$scope.toggleDone= function (project) {
		project.done = !project.done;
	};
	
	$scope.removeProject= function (project) {
		for (var n = 0 ; n < $scope.projects.length ; n++) {
			if ($scope.projects[n].name == project.name) {
				var removedObject = $scope.projects.splice(n,1);
				removedObject = null;
				break;
			}
		}
	};
	
	$scope.addProject= function () {
		var el = $('#newProject');
		
		$scope.projects.push({
			'name': el.val(),
			'done': false
		});
		el.val('');
	};
	
	$scope.editProject= function (project) {
		$scope.editedProject = project;
		$scope.originalProject = angular.extend({}, project);
	};
	
	$scope.saveEdits = function (project, event) {
		if (event === 'blur' && $scope.saveEvent === 'submit') {
			$scope.saveEvent = null;
			return;
		}

		$scope.saveEvent = event;

		if ($scope.reverted) {
			$scope.reverted = null;
			return;
		}

		project.name = project.name.trim();

		if (project.name === $scope.originalProject.name) {
			return;
		}

		$scope.editedProject = null;
		$scope.originalProject = null;
	};

	$scope.revertEdits = function (project) {
		$scope.projects[$scope.projects.indexOf(project)] = $scope.originalProject;
		$scope.editedProject = null;
		$scope.originalProject = null;
		$scope.reverted = true;
	};
});
