angular.module('AnswerController', []).controller('AnswerController', ['$scope', '$location', '$routeParams', 'Answer', 'User', '$localStorage',
  function ($scope, $location, $routeParams, Answer, User, $localStorage) {
    $scope.show = false;

    $scope.myDataSource = {
      chart: {
        caption: "Gender",
        subCaption: "",
        numberPrefix: "",
        theme: "ocean"
      },
      data: []
    };
    $scope.loadData = function () {
      $scope.show = true;
      for(var i =0; i < $scope.data.work.length; i++){
        var object = {};
        object.label = $scope.data.work[i].label;
        object.value = $scope.data.work[i].value;
        $scope.myDataSource.data.push(object);
      }
     
    };

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

    $scope.findGroup = function () {
      var splitPath = $location.path().split('/');
      var answerId = splitPath[splitPath.length - 1];
      answerId = answerId.split("-");
      $scope.answers = Answer.findGroup({ column: answerId[0], value: answerId[1] }, function (answers) {
        $scope.question = answers[0].question;
        $scope.data = $scope.formatData($scope.answers);

      });
    }



    $scope.formatData = function (answers) {
      var object = {};
      var male = 0;
      var female = 0;
      var countries = [];
      var works = [];
      var educations = [];
      var ages = [];
      var answersFinal = [];
      var comments = [];
      answers.forEach(function (answer, i) {
        //gender
        if (answer.user.gender == "Male") {
          male++;
        } else {
          female++;
        }
        //country
        if (countries.length == 0) {
          var country = {};
          country.label = answer.user.country;
          country.value = 1;
          countries.push(country);
        } else {
          var added = false;
          countries.forEach(function (element) {
            if (element.label == answer.user.country) {
              element.value++;
              added = true;
            } else if (added == false) {
              var country = {};
              country.label = answer.user.country;
              country.value = 1;
              countries.push(country);
              added = true;
            }
          }, this);
        }
        //work
        if (works.length == 0) {
          var work = {};
          work.label = answer.user.work;
          work.value = 1;
          works.push(work);
        } else {
          var added = false;
          works.forEach(function (element, i) {
            if (element.label == answer.user.work) {
              element.value++;
              added = true;
            } else if (added == false) {
              var work = {};
              work.label = answer.user.work;
              work.value = 1;
              works.push(work);
              added = true;
            }
          }, this);
        }
        
        //education
        if (educations.length == 0) {
          var education = {};
          education.label = answer.user.education;
          education.value = 1;
          educations.push(education);
        } else {
          var added = false;
          educations.forEach(function (element, i) {
            if (element.label == answer.user.education) {
              element.value++;
              added = true;
            } else if (added == false) {
              var education = {};
              education.label = answer.user.education;
              education.value = 1;
              educations.push(education);
              added = true;
            }
          }, this);
        }
        //DOB
        var dob = answer.user.dob;
        dob = dob.split("-");
        dob = dob[0];
        var date = new Date();
        var year = date.getFullYear();
        var age = year - dob;
        if (ages.length == 0) {
          var ageObj = {};
          ageObj.label = age;
          ageObj.value = 1;
          ages.push(ageObj);
        } else {
          var added = false;
          ages.forEach(function (element, i) {
            if (element.label == age) {
              element.value++;
              added = true;
            } else if (added == false) {
              var ageObj = {};
              ageObj.label = age;
              ageObj.value = 1;
              ages.push(ageObj);
              added = true;
            }
          }, this);
        }
        //answers
        if (answersFinal.length == 0) {
          var answerObj = {};
          answerObj.label = answer.answer;
          answerObj.value = 1;
          answersFinal.push(answerObj);
        } else {
          var added = false;
          answersFinal.forEach(function (element, i) {
            if (element.label == answer.answer) {
              element.value++;
              added = true;
            } else if (added == false) {
              var answerObj = {};
              answerObj.label = answer.answer;
              answerObj.value = 1;
              answersFinal.push(answerObj);
              added = true;
            }
          }, this);
        }
        //coments
        comments.push(answer.comment);
      }, this);

      object.comments = comments;
      object.answers = answersFinal;
      object.ages = ages;
      object.educations = educations;
      object.work = works;
      object.countries = countries;
      object.gender = [
        {
          label: "male",
          value: male.toString()
        },
        {
          label: "female",
          value: female.toString()
        }

      ];

      return object;
    }
  }


]);
