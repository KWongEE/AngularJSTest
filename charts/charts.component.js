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
          //To JSON to manage data more easily
          var dictionary = {};
          var aircode = {};
          airlines.forEach(function(element){
            //Sort by airline names
            if (dictionary[element["Airline Name"]] == null) {
              dictionary[element["Airline Name"]] = [element];
            } else {
              dictionary[element["Airline Name"]].push(element);
            }
            //Sort by airport codes
            if (aircode[element["Airport Code"]] == null){
              aircode[element["Airport Code"]] = [element];
            } else {
              aircode[element["Airport Code"]].push(element);
            }
          });
          //Made into object for performance

          $scope.$root.$broadcast('data', dictionary);
          $scope.$root.$broadcast('code.data', aircode);
          //rootScope to access in app.js.
        };
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  };
}
