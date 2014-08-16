/**
 * Created by debojeet.chatterjee on 17/7/14.
 */
var app = angular.module("ionicApp",['ionic','ngAnimate','restangular']);
            //{
            // name:'Debojeet',
            // designation: 'CEO',
            // sex: 'ion-man',
            // email: 'a@b.com',
            // address: 'abc',
            // contact:123
//         },
//         {
//             name:'Akhilesh',
//             designation: 'CEO',
//             sex: 'ion-man',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:456
//         },
//         {
//             name:'Priya',
//             designation: 'CEO',
//             sex: 'ion-woman',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:789
//         },
//         {
//             name:'Sachin',
//             designation: 'CEO',
//             sex: 'ion-man',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:987
//         },
//         {
//             name:'Swapnil',
//             designation: 'CEO',
//             sex: 'ion-man',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:342
//         },
//         {
//             name:'Dipesh',
//             designation: 'CEO',
//             sex: 'ion-man',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:654
//         },
//         {
//             name:'Pranav',
//             designation: 'CEO',
//             sex: 'ion-man',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:879
//         },
//         {
//             name:'Sameer',
//             designation: 'CEO',
//             sex: 'ion-man',
//             email: 'a@b.com',
//             address: 'abc',
//             contact:125
//         }

app.config(function($stateProvider, $urlRouterProvider,RestangularProvider){
    $stateProvider
        .state('main',{
            url:'/main',
            abstract: true,
            templateUrl: '/assets/partials/main.html'
        })
        .state('main.home',{
            url: '/home',
            views:{
                'home-tab': {
                    templateUrl: '/assets/partials/home.html',
                    controller: 'homeCtrl'
                }
            }
        })
        .state('main.add',{
            url: '/add',
            views:{
                'add-tab': {
                    templateUrl: '/assets/partials/add.html',
                    controller: 'addCtrl'
                }
            }
         })
        .state('main.edit',{
            url: '/edit/:id',
            views:{
                'home-tab': {
                    templateUrl: '/assets/partials/edit.html',
                    controller: 'editCtrl'
                }
            }
        })
        .state('main.show',{
            url: '/show/:id',
            views:{
                'home-tab': {
                    templateUrl: '/assets/partials/show.html',
                    controller: 'showCtrl'
                }
            }
        });
        $urlRouterProvider.otherwise("/main/home");
        RestangularProvider.setBaseUrl("/api");
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
});

app.controller("addCtrl",function($scope,$state,Restangular,$ionicPopup){
    $scope.data = {
        name: '',
        designation: '',
        sex: 'ion-man',
        email: '',
        address: '',
        contact: ''
    };
    $scope.isMan = function(){
        return $scope.data.sex=="ion-man"
    };
    $scope.isWoman = function(){
        return $scope.data.sex=="ion-woman"
    };
    $scope.addPeople = function(){
        //ionFactory.add($scope.data.name,$scope.data.designation,$scope.data.sex,$scope.data.email,$scope.data.address,$scope.data.contact);
        var newPerson = {
          name: $scope.data.name,
          designation: $scope.data.designation,
          contact: parseInt($scope.data.contact),
          sex: $scope.data.sex,
          email: $scope.data.email,
          address: $scope.data.address
        }
        Restangular.all("crudlist").post(newPerson)
        //Display Success Popup on delete.
        var alertPopup = $ionicPopup.alert({
         title: 'iContacts',
         template: 'Add Successful'
        })
        alertPopup.then(function(res) {
         console.log('Add Popup')
        })
        $state.go('main.home')
    }
});

app.controller("showCtrl",function($scope,$stateParams,$state,Restangular){
    $scope.data ={}
    var index = $stateParams.id;
    Restangular.one('crudone',index).get().then(function(stuff){
      $scope.data = stuff
    })
    $scope.goBack = function(){
        $state.go('main.home')
    }
});

app.controller("editCtrl",function($scope,$stateParams,$state,Restangular,$ionicPopup){
    $scope.data ={}
    var index = $stateParams.id;
    Restangular.one('crudone',index).get().then(function(stuff){
      $scope.data = stuff
    })
    $scope.isMan = function(){
        return $scope.data.sex=="ion-man"
    };
    $scope.isWoman = function(){
        return $scope.data.sex=="ion-woman"
    };
    $scope.confirmChanges = function(){
        var confirmPopup = $ionicPopup.confirm({
             title: 'iContacts',
             template: 'Are you sure?'
           });
           confirmPopup.then(function(res) {
             if(res) {
               console.log('Cool');
               $scope.changePeople();
             } else {
               console.log('Whatevs');
             }
           });
    }
    $scope.changePeople = function(){
        //ionFactory.edit(index,$scope.data);     
        $scope.data.contact = parseInt($scope.data.contact)
        $scope.data.put()
        //Display Success Popup on delete.
        var alertPopup = $ionicPopup.alert({
            title: 'iContacts',
            template: 'Edit Successful'
        })
        alertPopup.then(function(res) {
         console.log('Edit Popup');
        })
        $state.go('main.home')
    }
});

app.controller("homeCtrl",function($scope,Restangular,$state,$ionicPopup,$http){
    $scope.data = {showReorder:false,
                    showDelete:false};
    $scope.employees = {}
    setTimeout(function(){
      Restangular.all('crudlist').getList().then(function(stuff){
          $scope.employees = stuff
      })
    },500)
    $scope.toggleDelete = function(){
        $scope.data.showReorder = false;
        $scope.data.showDelete = !$scope.data.showDelete
    };
    $scope.toggleReorder = function(){
        $scope.data.showDelete = false;
        $scope.data.showReorder = !$scope.data.showReorder
    };
    $scope.moveItem = function(emp, start, end) {
      //Awesome Idea: Move one object's details into another and vice versa, like swapping a variable :D
        if(start==0)
            start = 1
        if(end==0)
            end = 1
        console.log(start,end)
      // setTimeout(function(){
      //   Restangular.all('crudlist').getList().then(function(stuff){
      //       $scope.employees = stuff
      //   })
      // },250)
};
    $scope.confirmDelete = function(emp){
        var confirmPopup = $ionicPopup.confirm({
             title: 'iContacts',
             template: 'Are you sure?'
           });
           confirmPopup.then(function(res) {
             if(res) {
               console.log('Cool');
               $scope.onItemDelete(emp);
             } else {
               console.log('Whatevs');
             }
           });
    }
    $scope.onItemDelete = function(emp) {
        //$scope.employees.splice(factory.employees.indexOf(emp), 1);
        //Restangular delete doesn't work as payload is sent.
        $http({method: 'DELETE', url: '/api/crudone/'+emp.id}).then(function(){
          //$scope.data.showDelete = false
          setTimeout(function(){
            Restangular.all('crudlist').getList().then(function(stuff){
                $scope.employees = stuff
            })
          },500)
        })
        //Display Success Popup on delete.
       var alertPopup = $ionicPopup.alert({
         title: 'iContacts',
         template: 'Delete Successful'
       })
       alertPopup.then(function(res) {
         console.log('Delete Popup')
       })
   }
    $scope.goEdit = function(index){
        window.location = '#/main/edit/'+index
    }
    $scope.doRefresh = function(){
    Restangular.all('crudlist').getList().then(function(stuff) {
       $scope.employees = stuff;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     })
    }
    // setInterval(refresh,1000)
});
