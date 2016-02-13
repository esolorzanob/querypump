angular.module('QuestionController', []).controller('QuestionController', ['$scope', '$location', '$routeParams', 'Question', 'User', '$localStorage', '$uibModal', '$log', 'Answer',
  function ($scope, $location, $routeParams, Question, User, $localStorage, $uibModal, $log, Answer) {
    
    
  $scope.items = [];
   
  $scope.animationsEnabled = true;

  $scope.open = function (size,question) {
    var id = question.id;
    $scope.items.push(id);
    var category = question.category;
    $scope.items.push(category);
    var posting_user = question.posting_user;
    $scope.items.push(posting_user);
    var body = question.body;
    $scope.items.push(body);
    var options = question.answers;
    options = options.split(",");
    $scope.items.push(options);
       
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
      $scope.getAuthenticatedUser();
      console.log($scope.authenticatedUser);
      var answer = new Answer({
        response_user: $scope.authenticatedUser.id,
        answer: $scope.items[5],
        comment: "test",
        question_id: $scope.items[0]
      });
      answer.$save(function (res) {
        console.log("exito");
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

    $scope.create = function () {
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
      $scope.questions = Question.query({},function (data) {
        
         data.forEach(function (question, i) {
          var user = User.get({userId: question.posting_user},function(){
             question.posting_user = user.username;
          });       
         
        }, this);});
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
  }
]);
