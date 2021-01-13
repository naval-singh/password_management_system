$(document).ready(function () {

    $.getJSON('http://localhost:4000/fetch/category', function (data) {
        $.each(data, function (index, item) {
            $('#category').append($('<option>').text(item.name))
        })
    })

})