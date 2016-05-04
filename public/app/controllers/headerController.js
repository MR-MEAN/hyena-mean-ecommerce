commerceApp.controller('headerController', ['$scope', '$location','$http','$log','$route', "shareService",function($scope, $location, $http, $log, $route, shareService) {
  // header template array --- not necessary yet but in the future we'll add easy to change templates
  $scope.header =[ { name: 'header.html', url: 'app/pages/header.html'} ];
  // set header 
  $scope.header = $scope.header[0];
  
  // save shareService to $scope
  $scope.shareService = shareService;
  $scope.toProfile = shareService.toProfile;
  $scope.toLogin = shareService.toLogin;
  $scope.toRegister = shareService.toRegister;
  $scope.logout = shareService.logout;
  
  // default displayLogin bool to true 
  $scope.displayLogin = true;
  
    // watch the logout bool in shareService 
    $scope.$watch('shareService.didLogout', function(newVal, oldVal){
        // if shareService just logged out
        if(newVal === true){
            // reset the trigger
            $log.debug("header recognized logout");
            shareService.didLogout = false;
            // display the login nav
            $scope.displayLogin = true;
        }
    });

    // get username
    $scope.getUser = function(){
    $http({
      method: 'GET',
      url: '/user'
    }).then(function successCallback(response) {
        // set user in $scope with response data
        $scope.user = response.data;
        //debug response data
        $log.debug("/user callback was : " + JSON.stringify(response.data));
        
        // check if a user is logged in and set displayLogin to appropriate value
        if($scope.user === ''){
            $scope.displayLogin = true;
        } else {$scope.displayLogin = false;}
      }, function errorCallback(response) {
        $log.error("/user error was : " + response);
        $scope.user = "user error";
      });
    }
    
    // get user data any time the headerController is active
    $scope.getUser();
}]);