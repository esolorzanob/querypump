angular.module('AnswerService', []).factory('Answer', ['$resource',
  function ($resource) {
    return $resource('/api/answer/:answerId', {
      questionId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);