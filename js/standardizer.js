function csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

$(document).ready(function () {
    $('#addNavbar').load("/html/navbar.html");

    $('#btn-nav-previous').click(function () {
        $(".menu-inner-box").animate({ scrollLeft: "-=100px" });
    });

    $('#btn-nav-next').click(function () {
        $(".menu-inner-box").animate({ scrollLeft: "+=100px" });
    });

    $('.getAccountBtnValue').click(function () {
        $('#sourceAccountData').html('');
        $("button").removeClass("addbgforBtn");
        $(this).addClass("addbgforBtn");

        var btndata = $(this).attr("data");
        $.get('../csvFiles/Standard CofA.csv', function (data) {
            var jsonData = csvJSON(data);
            console.log(jsonData);


            var html = '<div class="rounded">';
            jsonData.forEach(function getvalues(ourrow) {
                console.log(ourrow.Name)
                // split line into columns
                //var columns = ourrow.split(",");

                if (btndata == ourrow.Type && (!ourrow.Number=='' || ourrow.Name=='')) {
                    html += '<p class="p-2 mb-2 dynamicDiv rounded">' + ourrow.Number + '<span class="px-2">' + ourrow.Name + '</span>' + '</p>';

                }
            })
            html += "</div>";
            console.log(html)

            $('#sourceAccountData').append(html);

        });
        console.log(btndata)
        //var btndata = ($(this).text());
        $('button[data="' + btndata + '"]').trigger('click');
    })

    $(".menu-item").click(function () {
        debugger
        $("button").removeClass("menulistColor");
        $(this).addClass("menulistColor");

        $.get('../csvFiles/MasterChartOfAcounts - Sheet1.csv', function (data) {
            $('#masterData').html('');
            var jsonData = csvJSON(data);
            console.log(jsonData);
            var html = '<div class="rounded">';
            var btndata = ($(this).attr("data")).toLowerCase();
            console.log(btndata)
            jsonData.forEach(function getvalues(ourrow) {
                if (btndata == (ourrow.AccountTypeName).toLowerCase()) {

                    html += '<p class="p-2 mb-2 dynamicDiv rounded"><i class="fa-solid fa-grip-dots-vertical"></i>' + ourrow.AccountCode + '<span class="">--' + ourrow.AccountName + '</span>' + '</p>';
                }
                else {
                    html += '<p class="p-2 mb-2 dynamicDiv rounded"><i class="fa-solid fa-grip-dots-vertical"></i>' + ourrow.AccountCode + '<span class="">--' + ourrow.AccountName + '</span>' + '</p>';
                }

            })
            html += "</div>";
            console.log(html)
            // insert into div
            $('#masterData').append(html);

        });
    }); 
})


