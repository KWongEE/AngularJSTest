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
  // Configure all doughnut charts
  ChartJsProvider.setOptions('doughnut', {
    cutoutPercentage: 60
  });
  ChartJsProvider.setOptions('bubble', {
    tooltips: { enabled: false }
  });
});

app.controller('LineCtrl', function ($scope, $rootScope, $interval){

  $rootScope.$on('data', function(event, data) {
    delete data["undefined"];

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
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
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

app.controller("BarCtrl", function ($scope, $rootScope, $interval) {
  $rootScope.$on('data', function(event, data) {
    debugger;
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  });
});
