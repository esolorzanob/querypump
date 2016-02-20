angular.module('AnswerService', []).factory('Answer', ['$resource',
  function ($resource) {
    return $resource('/api/answer/:id', {
      id: '@id',
      column: '@column',
      value: '@value'
      
    }, {
      update: {
        method: 'PUT'
      },
      findGroup: {
        method: 'GET',
        isArray: true,
        url: '/api/answer/findGroup/:column,:value'
      }
    });
  }
]);