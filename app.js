var app = angular.module('app', ["chart.js", "ngRoute",,"app.view1", "app.view2"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.config(function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
  });
});

app.controller('LineCtrl', function ($scope, $rootScope, $interval){

  $rootScope.$on('data', function(event, data) {
    delete data["undefined"];
    //Edge case where there is a <BR> at the end of xls file

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var airline_names = [];
    var dataset = [];
    for (var key in data) {
      //key is airline name
      if (key != "undefined") {
        if (data.hasOwnProperty(key)) {
          airline_names.push(key);

          //Each airline will be given an array for $scope.data charts
          dataset = Object.values(data);


          for(var i = 0; i < dataset.length; i++) {
            var airline = dataset[i];

            var monthlyamount = [];
            var airline_months = [0,0,0,0,0,0,0,0,0,0,0,0];
            var emptyarray = [...Array(12)].map(e => Array(0));
            //empty array is to store every close amount value per month in order to average

            airline.forEach(function(incident){
              var closeamount = incident["Close Amount"]
                var current_month = incident["Incident Date"].split('/')[0]
                if (closeamount != "-"){
                  closeamount = Number(closeamount.replace(/[^0-9\.-]+/g,""));
                  month_index = parseInt(current_month) - 1
                  emptyarray[month_index].push(closeamount);
                  //Pushes all close amounts into emptyarray per month
                }
            })
            function getSum(total,num){
              return total+ num;
            }
            var averages = emptyarray.map(month => {
              if (month.length === 0) { return 0; }
              return month.reduce(getSum)/month.length;
            });
            dataset[i] = averages;
          }
        }
      }
    }
    $scope.labels = months;
    $scope.series = airline_names;
    $scope.data = dataset;

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    $scope.options = {
      layout: {
        //This is for tooltip when hovering over chart. Seems to be issue with AngularJS Chart library
      padding: {
         bottom: 300
      }
   },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
    $interval(function () {
     getLiveChartData();
   }, 20);

   function getLiveChartData () {
     if ($scope.data.length) {
       $scope.labels = $scope.labels;
       $scope.data = $scope.data;
      }
    }
    console.log('Finished')
  });
});

app.controller("BarCtrl", function ($scope, $rootScope, $interval) {
  $rootScope.$on('code.data', function(event, data) {
    delete data["undefined"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var airport_code = [];
    var dataset = [];
    for (var key in data) {
      //key is airline name
      if (key != "undefined") {
        if (data.hasOwnProperty(key)) {
          airport_code.push(key);

          //Each airline will be given an array for $scope.data charts
          dataset = Object.values(data);
          for(var i = 0; i < dataset.length; i++) {
            var airline = dataset[i];

            var monthlyamount = [];
            var airline_months = [0,0,0,0,0,0,0,0,0,0,0,0];
            var claims_month = [...Array(12)].map(e => Array(0));
            //empty array is to store each claim per month
            airline.forEach(function(incident){
              var claim_number = incident["Claim Number"]
                var current_month = incident["Incident Date"].split('/')[0]
                if (claim_number != "<BR>"){
                  month_index = parseInt(current_month) - 1
                  claims_month[month_index].push(claim_number);
                  //Pushes all close amounts into claims_month per month
                }
            })
            var averages = claims_month.map(month => {
              if (month.length === 0) { return 0; }
              return month.length;
            })
            //Returns number of claims per month per airport code

            dataset[i] = averages;
          }
        }
      }
    }
    //Bar Chart Data
    $scope.labels = months;
    $scope.series = airport_code;

    $scope.data = dataset;
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.options = {
      layout: {
        //This is for tooltip when hovering over chart. Seems to be issue with AngularJS Chart library
      padding: {
         bottom: 300
      }
   },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
    $interval(function () {
     getLiveChartData();
    }, 20);

    function getLiveChartData () {
     if ($scope.data.length) {
       $scope.labels = $scope.labels;
       $scope.data = $scope.data;
      }
    }
  });
});
