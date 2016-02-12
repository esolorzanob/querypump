angular.module('AnswerController', []).controller('AnswerController', ['$scope', '$location', '$routeParams', 'Answer', 'User', '$localStorage',
  function ($scope, $location, $routeParams, Answer, User, $localStorage) {

    $scope.getAuthenticatedUser = function (user) {
      if (user) {
        $scope.authenticatedUser = user;
        return;
      }
      if (typeof $localStorage.token === 'undefined') {
        return null;
      }
    };

    $scope.create = function () {
		var answer = new Answer({
			response_user: $scope.authenticatedUser.id,
			answer: this.answer,
			comment: this.comment,
			question_id: this.question_id // revisar
        });
		answer.$save(function (res) {
			$location.path('answers/view/' + res.id);
			$scope.body = '';
		}, function (err) {
			console.log(err);
		});
    };

    $scope.find = function () {
		$scope.answers = Answer.query();
    };
    
    $scope.remove = function (answer) {
      answer.$remove(function (res) {
        if (res) {
          for (var i in $scope.answers) {
            if ($scope.answers[i] === answer) {
              $scope.answers.splice(i, 1);
            }
          }
        }
      }, function (err) {
        console.log(err);
      })
    };

    $scope.update = function (answer) {
      answer.$update(function (res) {
      }, function (err) {
        console.log(err);
      });
    };

    $scope.findOne = function () {
      var splitPath = $location.path().split('/');
      var answerId = splitPath[splitPath.length - 1];
      $scope.answer = Answer.get({ answerId: answerId });
    };
  }
]);
