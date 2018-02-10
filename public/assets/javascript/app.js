$.getJSON('/articles', function (data) {
  for (var i = 0; i < data.length; i++) {
    $('#articles').append('<li class="list-group-item"> <p data-id="' + data[i]._id + '">' + data[i].title + '<br />' + '<a href="' + data[i].link + '"' + 'target="' + "_blank" + ' " >' + data[i].link + '</a>' + '<button type="button" class="btn btn-success artbtns" id="saveart">Make Note</button>' + '</p>' + '</li>');
  }
});


$(document).on("click", 'p', function () {
  console.log("Clicked Article")
  $('#notes').empty();
  var thisId = $(this).attr('data-id');


  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })

    .done(function (data) {
      console.log(data);
      $('#notes').append('<h2>' + data.title + '</h2>');
      $('#notes').append('<input type="text" class="form-control" id="titleinput" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1">');
      $('#notes').append('<textarea class="form-control" id="bodyinput" aria-label="With textarea"></textarea>');
      $('#notes').append('<button type="button" class="btn btn-primary" data-id="' + data._id + '" id="savenote">Save Note</button>');
      if (data.note) {
        console.log(data.note);
        $('#notes').append('<button type="button" class="btn btn-danger" data-id="' + data.note._id + '" id="deletenote">Delete Note</button>');
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });
});


$(document).on('click', '#deletenote', function () {
  var thisId = $(this).attr('data-id');
  $.ajax({
    method: "POST",
    url: "/deletenote/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function () {
      $('#titleinput').val("");
      $('#bodyinput').val("");
      console.log("removed Note");
    });
});


$(document).on('click', '#savenote', function () {
  var thisId = $(this).attr('data-id');
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function (data) {
      console.log(data);
      $('#titleinput').val("");
      $('#bodyinput').val("");
    });
});

$(document).on('click', '#saveart', function () {
  var thisId = $(this).attr('data-id');
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
  })
    .done(function (data) {
      console.log(data);
      console.log("article saved");
    });
});

