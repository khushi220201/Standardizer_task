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
        debugger
        $('#sourceAccountData').html('');
        $('#mostLikelyData').html('');
        $('#likelyData').html('');
        $('#possibleData').html('');
        $("button").removeClass("addbgforBtn");
        $(this).addClass("addbgforBtn");

        var btndata = $(this).attr("data");
        $.get('../csvFiles/Standard CofA.csv', function (data) {
            var jsonData = csvJSON(data);
           


            var html = '';
            var tableforMostLikely = '';
            var tableforLikely = '';

            var tableforPossible = '';

            jsonData.forEach(function getvalues(ourrow) {

                html += '<div class="rounded">';
                tableforMostLikely += '<div class="rounded droppable" >';
                tableforLikely += '<div class="rounded droppable">';

                tableforPossible += '<div class="rounded droppable">';





               
                // split line into columns
                //var columns = ourrow.split(",");

                if (btndata == ourrow.Type && (!ourrow.Number == '' || ourrow.Name == '')) {
                    html += '<p class="p-2 mb-2 dynamicDiv rounded"  id="' + ourrow.Number + '">' + ourrow.Number + '<span class="px-2">' + ourrow.Name + '</span>' + '</p>';
                    tableforMostLikely += '<p class="p-2 mb-2 dynamicDiv rounded" id="mostLikely_' + ourrow.Number + '"><span class="px-2"></span></p>';
                    tableforLikely += '<p class="p-2 mb-2 dynamicDiv rounded"  id="likely_' + ourrow.Number + '"><span class="px-2"></span></p>';

                    tableforPossible += '<p class="p-2 mb-2 dynamicDiv rounded"  id="possible_' + ourrow.Number + '"><span class="px-2"></span></p>';


                }
                html += "</div>";
                tableforMostLikely += "</div>";
                tableforLikely += "</div>";
                tableforPossible += "</div>";

            })


           

            $('#sourceAccountData').append(html);
            $('#mostLikelyData').append(tableforMostLikely);
            $('#likelyData').append(tableforLikely);
            $('#possibleData').append(tableforPossible);

        });
        
        //var btndata = ($(this).text());
        $('button[data="' + btndata + '"]').trigger('click');
    })

    $(".menu-item").click(function () {

        $("button").removeClass("menulistColor");
        $(this).addClass("menulistColor");
        var btndata = ($(this).attr("data")).toLowerCase();

        $.get('../csvFiles/MasterChartOfAcounts - Sheet1.csv', function (data) {
            $('#masterData').html('');
            var jsonData = csvJSON(data);
       



            var html = '';
            jsonData.forEach(function getvalues(ourrow) {

                html += '<div class="rounded draggable">';

                if ((btndata == 'all') && ourrow) {

                    html += '<p class="p-2 mb-2 dynamicDiv rounded"> ⠿' + ourrow.AccountCode + '<span class="">--' + ourrow.AccountName + '</span>' + '</p>';

                }

                else if ((((ourrow.AccountTypeName).toLowerCase()).includes(btndata))) {

                    html += '<p class="p-2 mb-2 dynamicDiv rounded"> ⠿' + ourrow.AccountCode + '<span class="">--' + ourrow.AccountName + '</span>' + '</p>';
                }
                html += "</div>";

            })

          
            // insert into div
            $('#masterData').append(html);

        });
    });
    $('#finalSubmit').click(function () {
        addDataToLocal();

    })


    new Sortable(masterData, {
        group: {
            name: 'shared',
            pull: 'clone' // To clone: set pull to 'clone'
        },
        animation: 150,
        sort: false,
    });

    new Sortable(mostLikelyData, {
        group: {
            name: 'shared',

        },
        animation: 150
    });

    new Sortable(likelyData, {
        group: {
            name: 'shared',

        },
        animation: 150
    });
    new Sortable(possibleData, {
        group: {
            name: 'shared',

        },
        animation: 150
    });



})

function addDataToLocal() {
    debugger
    let localData = localStorage.getItem('LikelyDestinationAccount');

    // var mostlikelyData = $("#mostLikelyData").find('p');
    // console.log(mostlikelyData);
    // var likelyData = $("#likelyData").find('p');
    // console.log(mostlikelyData);
    // var possibleData = $("#possibleData").find('p');
    // console.log(mostlikelyData);
    $('#mostLikelyData p').each(function() {
        console.log("id"+$(this).attr('id'));
        console.log("text"+$(this).text());
      });
    //var mostlikelydata = $('#mostLikelyData').find('p')

    // if (localData) {
    //     let localArray = JSON.parse(localData);
    //     let myId = localArray.length - 1;
    //     myId = localArray.map(x => x.id)[myId];
    //     const obj = {

    //         Id: myId + 1,
    //         MostLikely: mostlikelyData,
    //         Likely: likelyData,
    //         Possible: possibleData,

    //     };

    //     localArray.push(obj);
    //     localStorage.setItem('LikelyDestinationAccount', JSON.stringify(localArray));


    // }
    // else {
    //     const arryObj = [];
    //     const obj = {
    //         Id: 1,
    //         MostLikely: mostlikelyData,
    //         Likely: likelyData,
    //         Possible: possibleData,

    //     };
    //     arryObj.push(obj);
    //     localStorage.setItem('LikelyDestinationAccount', JSON.stringify(arryObj));

    // }
}
