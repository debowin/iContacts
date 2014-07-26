/**
 * Created by debojeet.chatterjee on 17/7/14.
 */
var app = angular.module("ionicApp",['ionic','ngAnimate']);

app.factory("ionFactory",function(){
    var factory = {};
    factory.employees = [{
            name:'Debojeet',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:123
        },
        {
            name:'Akhilesh',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:456
        },
        {
            name:'Priya',
            designation: 'CEO',
            sex: 'ion-woman',
            email: 'a@b.com',
            address: 'abc',
            contact:789
        },
        {
            name:'Sachin',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:987
        },
        {
            name:'Swapnil',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:342
        },
        {
            name:'Dipesh',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:654
        },
        {
            name:'Pranav',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:879
        },
        {
            name:'Sameer',
            designation: 'CEO',
            sex: 'ion-man',
            email: 'a@b.com',
            address: 'abc',
            contact:125
        }];
    factory.add = function(newName,newDesignation,newSex,newEmail,newAddress,newContact){
        factory.employees.push({
            name:newName,
            designation: newDesignation,
            sex: newSex,
            email: newEmail,
            address: newAddress,
            contact: newContact
            })
    };
    factory.del = function(emp){
        factory.employees.splice(factory.employees.indexOf(emp), 1);
    };
    factory.edit = function(index,empData){
        factory.employees[index] = empData;
        //console.log(factory.employees)
    };
    factory.reOrder = function(emp,start,end){
        factory.employees.splice(start, 1);
        factory.employees.splice(end, 0, emp);
    };
    return factory
});

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('main',{
            url:'/main',
            abstract: true,
            templateUrl: 'main.html'
        })
        .state('main.home',{
            url: '/home',
            views:{
                'home-tab': {
                    templateUrl: 'home.html',
                    controller: 'homeCtrl'
                }
            }
         })
        .state('main.add',{
            url: '/add',
            views:{
                'add-tab': {
                    templateUrl: 'add.html',
                    controller: 'addCtrl'
                }
            }
         })
        .state('main.edit',{
            url: '/edit/:id',
            views:{
                'home-tab': {
                    templateUrl: 'edit.html',
                    controller: 'editCtrl'
                }
            }
        })
        .state('main.show',{
            url: '/show/:id',
            views:{
                'home-tab': {
                    templateUrl: 'show.html',
                    controller: 'showCtrl'
                }
            }
        });
        $urlRouterProvider.otherwise("/main/home");
});

app.controller("addCtrl",function($scope,ionFactory,$state){
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
        ionFactory.add($scope.data.name,$scope.data.designation,$scope.data.sex,$scope.data.email,$scope.data.address,$scope.data.contact);
        $state.go('main.home')
    }
});

app.controller("showCtrl",function($scope,ionFactory,$stateParams,$state){
    var index = $stateParams.id;
    $scope.data = {
        name: ionFactory.employees[index].name,
        designation: ionFactory.employees[index].designation,
        sex: ionFactory.employees[index].sex,
        email: ionFactory.employees[index].email,
        address: ionFactory.employees[index].address,
        contact: ionFactory.employees[index].contact
    };
    $scope.goBack = function(){
        $state.go('main.home')
    }
});

app.controller("editCtrl",function($scope,ionFactory,$stateParams,$state){
    var index = $stateParams.id;
    $scope.data = {
        name: ionFactory.employees[index].name,
        designation: ionFactory.employees[index].designation,
        sex: ionFactory.employees[index].sex,
        email: ionFactory.employees[index].email,
        address: ionFactory.employees[index].address,
        contact: ionFactory.employees[index].contact
    };
    $scope.isMan = function(){
        return $scope.data.sex=="ion-man"
    };
    $scope.isWoman = function(){
        return $scope.data.sex=="ion-woman"
    };
    $scope.changePeople = function(){
        ionFactory.edit(index,$scope.data);
        $state.go('main.home')
    };
    //console.log($scope.data.sex)
});

app.controller("homeCtrl",function($scope,ionFactory){
    $scope.data = {showReorder:false,
                    showDelete:false};
    $scope.employees = ionFactory.employees;
    $scope.toggleDelete = function(){
        $scope.data.showReorder = false;
        $scope.data.showDelete = !$scope.data.showDelete
    };
    $scope.toggleReorder = function(){
        $scope.data.showDelete = false;
        $scope.data.showReorder = !$scope.data.showReorder
    };
    $scope.moveItem = function(emp, start, end) {
        ionFactory.reOrder(emp,start,end)
    };
    $scope.onItemDelete = function(emp) {
        ionFactory.del(emp)
    };
    $scope.goEdit = function(index){
        window.location = '#/main/edit/'+index
    }
});