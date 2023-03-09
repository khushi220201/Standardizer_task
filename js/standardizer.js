$(document).ready(function () {
    $('#addNavbar').load("/html/navbar.html");

    $.get('../csvFiles/MasterChartOfAcounts - Sheet1.csv', function (data) {

        // start the table
        var html = '<div class="rounded">';

        // split into lines
        var rows = data.split("\n").slice(1);
        //console.log(rows)

        // parse lines
        rows.forEach(function getvalues(ourrow) {

            // split line into columns
            var columns = ourrow.split(",");

            html += '<p class="p-2 mb-2 dynamicDiv rounded">'+ columns[4]+ '<span class="px-2">'+columns[5]+'</span>'+'</p>';

        })
    //     // close table
        html += "</div>";
        console.log(html)
        // insert into div
        $('#masterData').append(html);

    });
   // Load the CSV data
//   $.get('../csvFiles/MasterChartOfAcounts - Sheet1.csv', function(csvData) {
//     // Convert to JSON
//     var jsonData = csvJSON(csvData);
    
//     // Do something with the JSON data
//     console.log(jsonData);
//   });

    

})
// function csvJSON(csv){

//     var lines=csv.split("\n");
  
//     var result = [];
  
//     var headers=lines[0].split(",");
  
//     for(var i=1;i<lines.length;i++){
  
//         var obj = {};
//         var currentline=lines[i].split(",");
  
//         for(var j=0;j<headers.length;j++){
//             obj[headers[j]] = currentline[j];
//         }
  
//         result.push(obj);
  
//     }

//     return JSON.stringify(result);
//   }

