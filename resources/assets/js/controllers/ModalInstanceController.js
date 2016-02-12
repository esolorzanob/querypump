angular.module('ModalInstanceController',[]).controller('ModalInstanceController', function ($scope, $uibModalInstance, items) {
  
  $scope.id = items[0];
  $scope.category = items[1];
  $scope.posting_user = items[2];
  $scope.body = items[3];
  $scope.options = items[4];
  
  $scope.selected = {
    item: $scope.options[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
