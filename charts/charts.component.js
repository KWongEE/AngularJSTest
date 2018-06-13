// var app = angular.module('app', ["chart.js"]);
function ChartsController() {

}
app.component('charts', {
  templateUrl: 'charts/charts.html',
  controller: ChartsController,
  controllerAs: 'vm'
})

app.directive("importSheetJs", [SheetJSImportDirective]);

function SheetJSImportDirective() {
  return {
    scope: {
      opts: '='
    },
    link: function ($scope, $elm) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();

        reader.onload = function (e) {
          /* read workbook */
          var bstr = e.target.result;
          var workbook = XLSX.read(bstr, {type:'binary'});
          var sheet_name_list = workbook.SheetNames;
          var airlines = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
          var dictionary = {};

          airlines.forEach(function(element){
            if (dictionary[element["Airline Name"]] == null) {
              dictionary[element["Airline Name"]] = [element];
            } else {
              dictionary[element["Airline Name"]].push(element);
            }
          });

          $scope.$root.$broadcast('data', dictionary);
        };
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  };
}


// for (var key in $scope.data) {
//   if ($scope.data.hasOwnProperty(key)) {
//     airline_names.push(key);
//     debugger;
//     console.log(airline_names);
//   }
// }

// function bargraph(){
//   return {
//     app.controller('StackedBarCtrl', ['$scope', function ($scope) {
//       $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//       $scope.type = 'StackedBar';
//       $scope.series = ['2015', '2017'];
//       $scope.options = {
//         scales: {
//           xAxes: [{
//             stacked: true,
//           }],
//           yAxes: [{
//             stacked: true
//           }]
//         }
//       };
//
//       $scope.data = [
//         [65, 59, 90, 81, 56, 55, 40],
//         [28, 48, 40, 19, 96, 27, 160]
//       ];
//     }]);
//
//   }
// }
