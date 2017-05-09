$(document).ready(function() {
  var audio = document.createElement("audio");
  audio.src = "dogbark.m4a";
$('.cartoons').hover(function() {
  audio.play();
});
  var $yhr = $.getJSON(`https://g-pet.herokuapp.com/pet.getRandom?animal=dog&count=1&output=basic&format=json`);
  $yhr.done(function(data) {
    var featured = data.petfinder.pet;
    console.log(featured);
    let featuredname = '#featureddog .panel-title';
    $(featuredname).html(featured.name.$t);
    let featuredbio = '#featureddog .panel-body';
    let featuredpic = '#featuredimage';
    $(featuredbio).html('<img class = "images img-responsive thumbnail" id=' + featuredpic + ' src=  ' + featured.media.photos.photo[3].$t + '>' + 'My ID: ' + featured.id.$t + "<br>" + 'My Shelter\'s ID: ' + featured.shelterId.$t + "</br>" + 'Shelter Phone: ' + featured.contact.phone.$t + "<br>" + 'Shelter Email: ' + featured.contact.email.$t + "<br>" + featured.description.$t);
  });
  function buildPanels(dogs) {
    for (var i = 0; i < dogs.length; i++) {
          $('#resultdiv').append(
          '<div class="col-md-3">'+
          '<div class="panel panel-default">'+
          '<div class="panel-heading">'+
          '<h3 class="panel-title"></h3>'+
          '</div>'+
          '<div class="panel-body">'+
          '</div>'+
          '</div>'+
          '</div>');
      }
  setDogId();
  setImageId();
  }
function setDogId () {
  var pups = $('.col-md-3');
  for (var i = 0; i <= pups.length; i++) {
  console.log($(pups[i]).attr('id', "dog" + (i + 1)));
  }
}
function setImageId () {
  var pics = $('.images');
  for (var i = 0; i <= pics.length; i++) {
  $(pics[i]).attr('id', "image" + (i + 1));
  }
}

$('#submit').on("click", function() {
    $('#featureddog').hide();
    $('h1').hide();
    $('#heart').hide();
      var zip = $('#zipinput').val();
      var size = $('#sizeselect').val();
      var age = $('#ageselect').val();
      var sex = $('#sexselect').val();
      var breed =$('#breedinput').val();
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
      if (breed) {
        url += `&breed=${breed}`;
      }
      var $xhr = $.getJSON(url);
      $xhr.done(function(data){
        let dogs = data.petfinder.pets.pet;
        console.log(dogs);
        buildPanels(dogs);
        for (var i = 0; i < dogs.length; i++) {
          let name = '#dog' + (i + 1) + ' .panel-title';
          $(name).html(dogs[i].name.$t);
          let bio = '#dog' + (i + 1) + ' .panel-body';
          let pic = 'image' + (i + 1);
          $(bio).html('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + dogs[i].media.photos.photo[3].$t + '>' + 'My ID: ' + dogs[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + dogs[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + dogs[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + dogs[i].contact.email.$t + "<br>" + dogs[i].description.$t);
        }
});
});
function buildRows (data) {
  for (var i = 0; i < data.length; i++)  {
    console.log('buildList');
    $('#shelterlist').append(
      '<tr class = "rescueList"></tr>'
    );
  }
  setRowId();
}
function buildDivs () {
  // for (var i = 0; i < 1; i++) {
  $('.rescueList').append(
    '<div class="col-md-12">'+
    '<div class="col-md-6">'+
    '<div class="name">unavailable</div>'+
    '</div>'+
    '<div class="col-md-3">'+
    '<div class="email">unavailable</div>'+
    '</div>'+
    '<div class="col-md-3">'+
    '<div class="phone">unavailable</div>'+
    '</div>'+
    '</div>'
  );
  // }
}

function setRowId () {
  var pounds = $('.rescueList');
  console.log(pounds);
  for (var i = 0; i <= pounds.length; i++) {
    $(pounds[i]).attr('id', "shelter" + (i + 1));
  }
}
$('#search').on("click", function () {
  var shelterZip = $('#shelterinput').val();
  var $zhr = $.getJSON(`https://g-pet.herokuapp.com/shelter.find?location=${shelterZip}&count=12&format=json`);
  $zhr.done(function(data){
    let rescues = data.petfinder.shelters.shelter;
    console.log('rescues', rescues);
    buildRows(rescues);
    buildDivs();
    for (let i = 0; i < rescues.length; i++) {
    let poundName = '#shelter' + (i + 1) + ' .name';
    let poundEmail = '#shelter' + (i + 1) + ' .email';
    let poundPhone = '#shelter' + (i + 1) + ' .phone';
    $(poundName).html(rescues[i].name.$t);
    $(poundEmail).html(rescues[i].email.$t);
    $(poundPhone).html(rescues[i].phone.$t);
  }
});
});
});
