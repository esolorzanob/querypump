angular.module('QuestionController', []).controller('QuestionController', ['$scope', '$location', '$routeParams', 'Question', 'User', '$localStorage', '$uibModal', '$log', 'Answer',
  function ($scope, $location, $routeParams, Question, User, $localStorage, $uibModal, $log, Answer) {

    $scope.getAuthenticatedUser();
    $scope.answerOptions = [];

    $scope.animationsEnabled = true;

    $scope.open = function (size, question) {
      $scope.items = [];
      var id = question.id;
      $scope.items.push(id);
      var category = question.category;
      var imgName = "/imgs/" + category + ".png";
      $scope.items.push(category);
      var posting_user = question.posting_user;
      $scope.items.push(posting_user);
      var body = question.body;
      $scope.items.push(body);
      var options = question.answers;
      options = options.split(",");
      $scope.items.push(options);
      var comments = question.enable_comments;
      $scope.items.push(comments);

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceController',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (items) {
        $scope.items = items;


        var answer = new Answer({
          response_user: $scope.authenticatedUser.id,
          answer: $scope.items[6],
          comment: $scope.items[5],
          question_id: $scope.items[0]
        });
        answer.$save(function (res) {
          $scope.find();
        }, function (err) {
          console.log(err);
        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };


    $scope.getAuthenticatedUser = function (user) {
      if (user) {
        $scope.authenticatedUser = user;
        return;
      }
      if (typeof $localStorage.token === 'undefined') {
        return null;
      }
      new User().$getByToken(function (user) {
        $scope.authenticatedUser = user;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.create = function (answerOptions) {
      $scope.answers = "";
      $scope.enable_comments = this.comments ? "1" : "0";
      answerOptions.forEach(function (option, i) {
        if (i == 0) {
          $scope.answers += option.answer;
        } else {
          $scope.answers += ", " + option.answer;
        }
      });

      var question = new Question({
        posting_user: $scope.authenticatedUser.id,
        body: this.body,
        answers: this.answers,
        enable_comments: this.enable_comments,
        category: this.category
      });
      question.$save(function (res) {
        $location.path('questions/view/' + res.id);
        $scope.body = '';
      }, function (err) {
        console.log(err);
      });
    };

    $scope.find = function () {
     
      var questions = Question.query({}, function () {
        var user = User.get({ userId: $scope.authenticatedUser.id },function(){
           $scope.responded = user.answer;
           questions.forEach(function (element, index) {
          
          for (var i = 0; i < $scope.responded.length; i++) {
            
            if (element.id == $scope.responded[i].question_id) {
              element.responded = true;
            }
          }
        }, this);
        });   
        
      });
      $scope.questions = questions;
      console.log($scope.questions);
    };



    $scope.remove = function (question) {
      question.$remove(function (res) {
        if (res) {
          for (var i in $scope.questions) {
            if ($scope.questions[i] === question) {
              $scope.questions.splice(i, 1);
            }
          }
        }
      }, function (err) {
        console.log(err);
      })
    };

    $scope.update = function (question) {
      question.$update(function (res) {
      }, function (err) {
        console.log(err);
      });
    };

    $scope.findOne = function () {
      var splitPath = $location.path().split('/');
      var questionId = splitPath[splitPath.length - 1];
      $scope.question = Question.get({ questionId: questionId });
    };

    $scope.test = function () {
      $scope.user = User.get({ userId: 18 });

    };

    $scope.addOption = function () {
      $scope.answerOptions.push({});
    };

    $scope.removeOption = function (index) {
      $scope.answerOptions.splice(index, 1);
    };
  }
]);
