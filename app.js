var app = angular.module('app', ["chart.js"]);

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

app.controller('StackedBarCtrl', function ($scope, $rootScope) {
  $rootScope.$on('data', function(event, data) {
    console.log(data);
    debugger;

    $scope.labels = airline_names;
    $scope.type = 'StackedBar';
    $scope.series = ['2015', '2016'];
    $scope.options = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };

    var airline_names = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        airline_names.push(key);
        debugger;
        console.log(airline_names);
      }
    }
  });
});
