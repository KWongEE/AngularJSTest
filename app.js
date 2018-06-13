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

app.controller('LineCtrl', function ($scope, $rootScope){
  $rootScope.$on('data', function(event, data) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var airline_names = [];
    for (var key in data) {
      if (key != "undefined") {
      if (data.hasOwnProperty(key)) {
        airline_names.push(key);
      }}
    }

    var incident_month = [];
    for (var key in data) {
      if (key != "undefined"){
        if (data.hasOwnProperty(key)){
          //Each airline will be given an array for $scope.data charts
          incident_month = Object.values(data);
          Object.values(data).forEach(function(airline){
            //Inside the specific airline array
            debugger;
            var counter =0;
            var monthlyamount = [];
            airline.forEach(function(incident){

              var closeamount = incident["Close Amount"]
              var current_month = incident["Incident Date"].split('/')[0]
              if (incident["Incident Date"].split('/')[0] == current_month) {
                counter +=1;
                if (closeamount != "-"){
                 closeamount = Number(closeamount.replace(/[^0-9\.-]+/g,""));
                 closeamount += closeamount;
                 monthlyamount.push(closeamount);
                }
              }
              function getSum(total,num){
                return total+ num;
              }
              debugger;
              monthlyamount.reduce(getSum);
              closeamount = monthlyamount.reduce(getSum)/monthlyamount.length;
              incident_month[0] = closeamount;
              debugger;

            })


          })


          // debugger;
          // data[key].forEach(function(incident){
          //   incident_month.push(incident["Incident Date"].split('/')[0])
          //   ;
          // })
        }
      }
    }
   $scope.labels = months;
   $scope.series = airline_names;
   debugger;
   $scope.data = [
     [65, 59, 80, 81, 56, 55, 40],
     [28, 48, 40, 19, 86, 27, 90]
   ];
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
 });
 });









//
//   $rootScope.$on('data', function(event, data) {
//     console.log(data);
      // var airline_names = [];
      // for (var key in data) {
      //   if (key != "undefined") {
      //   if (data.hasOwnProperty(key)) {
      //     airline_names.push(key);
      //   }}
      // }
//
//
//       var incident_month = [];
//       for (var key in data) {
//         if (key != "undefined"){
//           if (data.hasOwnProperty(key)){
//             data[key].forEach(function(incident){
//               incident_month.push(incident["Incident Date"].split('/')[0])
//             })
//           }
//         }
//       }
//     debugger;
//
//     $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
//     $scope.type = 'StackedBar';
//     $scope.series = airline_names
//     $scope.options = {
//       scales: {
//         xAxes: [{
//           stacked: true,
//         }],
//         yAxes: [{
//           stacked: true
//         }]
//       }
//     };
//
//   });
// });
