$(document).ready(function() {
  var $yhr = $.getJSON(`https://g-pet.herokuapp.com/pet.getRandom?animal=dog&count=1&output=basic&format=json`);
  $yhr.done(function(data) {
    var featured = data.petfinder.pet;
    let featuredname = '#featureddog .panel-title';
    $(featuredname).html(featured.name.$t);
    let featuredbio = '#featureddog .panel-body';
    $(featuredbio).html(featured.description.$t);
    let featuredpic = '#featuredimage';
    $(featuredpic).attr("src",featured.media.photos.photo[3].$t );

  });
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
    $('#featureddog').hide();
    $('h1').hide();
    buildPanels();
      var zip = $('#zipinput').val();
      var size = $('#sizeselect').val();
      var age = $('#ageselect').val();
      var sex = $('#sexselect').val();
      var url = `https://g-pet.herokuapp.com/pet.find?location=${zip}&animal=dog&count=12&format=json`;
      if (size) {
        url += `&size=${size}`;
      }
      if (age) {
        url += `&age=${age}`;
      }
      if (sex) {
        url += `&sex=${sex}`;
      }
      var $xhr = $.getJSON(url);
      $xhr.done(function(data){
        let dogs = data.petfinder.pets.pet;
        console.log(data);
        for (var i = 0; i < dogs.length; i++) {
          let name = '#dog' + (i + 1) + ' .panel-title';
            $(name).html(dogs[i].name.$t);
            let bio = '#dog' + (i + 1) + ' .panel-body';
              $(bio).html(dogs[i].description.$t);
              let pic = '#image' + (i + 1);
                $(pic).attr("src", dogs[i].media.photos.photo[3].$t);
              }
});
});
});
