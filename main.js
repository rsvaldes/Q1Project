$(document).ready(function() {
  // var alreadyZip = localStorage.getItem()

  // if alreadyzip, then fire off getJSON request
  function buildPanels() {
    for (var i = 0; i < 12; i++) {
      setDogId();
      setImageId();
      $('#resultdiv').append(
      '<div class="col-md-3">'+
      '<div class="panel panel-default">'+
      '<div class="panel-heading">'+
      '<h3 class="panel-title"></h3>'+
      '</div>'+
      '<img class="images" + 1" src ="" class="col-md-12 thumbnail">'+
      '<div class="panel-body">'+
      '</div>'+
      '</div>');
  }

  }
function setDogId () {
  var count = 0;
  var pups = $('.col-md-3');
  for (var i = 0; i < pups.length; i++) {
    count++;
  $(pups[i]).attr('id', "dog" + count);
}
}
function setImageId () {
  var count = 0;
  var pics = $('.images');
  for (var i = 0; i < pics.length; i++) {
    count++;
  $(pics[i]).attr('id', "image" + count);
}
}

  $('#submit').on("click", function() {
    buildPanels();
      var zip = $('#zipinput').val();
      var $xhr = $.getJSON(`https://g-pet.herokuapp.com/pet.find?location=${zip}&animal=dog&count=12&format=json`);
      $xhr.done(function(data){
        var dogs = data.petfinder.pets.pet;
        console.log(dogs);
        for (var i = 0; i < dogs.length; i++) {
          let name = '#dog' + (i + 1) + ' .panel-title';
            $(name).html(dogs[i].name.$t);
            let bio = '#dog' + (i + 1) + ' .panel-body';
              $(bio).html(dogs[i].description.$t);
              let pic = '#image' + (i + 1);
              let photoArr = dogs[i].media.photos.photo
              [3]['$t'];
                $(pic).attr("src", dogs[i].media.photos.photo[0].$t);
      }
  });

});

})
// });
  // }
// });
// });
