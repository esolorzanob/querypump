angular.module('ModalInstanceController',[]).controller('ModalInstanceController', function ($scope, $uibModalInstance, items) {
  
  $scope.id = items[0];
  $scope.category = items[1];
  $scope.imgName = "/imgs/"+items[1]+".png";
  $scope.posting_user = items[2];
  $scope.body = items[3];
  $scope.options = items[4];
  $scope.comments = items[5];
  
  $scope.selected = {
    item: $scope.options[0]
  };

  $scope.ok = function () {
    items.push($scope.selected.item);
    items[5] = this.comment;
    $uibModalInstance.close(items);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
