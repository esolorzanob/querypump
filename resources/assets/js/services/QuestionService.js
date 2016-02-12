angular.module('QuestionService', []).factory('Question', ['$resource',
  function ($resource) {
    return $resource('/api/question/:questionId', {
      questionId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);