$(document).ready(function() {
  var $ihr = $.getJSON(`https://g-ipinfodb.herokuapp.com/v3/ip-city/?format=json`);
  $ihr.done(function(data) {
    console.log(data);
  });
  var audio = document.createElement("audio");
  audio.src = "dogbark.m4a";
$('.cartoons').hover(function() {
  audio.play();
});
  var $yhr = $.getJSON(`https://g-pet.herokuapp.com/pet.getRandom?animal=dog&count=1&output=basic&format=json`);
  $yhr.done(function(data) {
    var featured = data.petfinder.pet;
    // console.log(featured);
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
  $(pups[i]).attr('id', "dog" + (i + 1));
  }
}
function setImageId () {
  var pics = $('.images');
  for (var i = 0; i <= pics.length; i++) {
  $(pics[i]).attr('id', "image" + (i + 1));
  }
}

$('#submit').on("click", function() {
    var offset = 0;
    $('#featureddog').hide();
    $('h1').hide();
    $('#heart').hide();
      var zip = $('#zipinput').val();
      if (zip.length !== 5) {
      alert('Please enter a valid zip code');
      }
      var alreadyZip = localStorage.setItem('location', zip);
      console.log(alreadyZip);
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
        // console.log(data);
        let dogs = data.petfinder.pets.pet;
        offset = data.petfinder.lastOffset.$t;
        // console.log(response);
        // console.log(pet);
        // console.log(dogs);
        buildPanels(dogs);
        $('#navigate').show();
        for (var i = 0; i < dogs.length; i++) {
          let name = '#dog' + (i + 1) + ' .panel-title';
          $(name).html(dogs[i].name.$t);
          let bio = '#dog' + (i + 1) + ' .panel-body';
          let pic = 'image' + (i + 1);
          $(bio).html('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + dogs[i].media.photos.photo[3].$t + '>' + 'My ID: ' + dogs[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + dogs[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + dogs[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + dogs[i].contact.email.$t + "<br>" + dogs[i].description.$t);
        }
        function getMore (data) {
          $('.moreresults').on("click", function () {
            buildPanels(dogs);
            $('#navigate').show();
          });
          localStorage.getItem(alreadyZip);
          var $brh = `https://g-pet.herokuapp.com/pet.find?location=${alreadyZip}&animal=dog&count=12&format=json&offset=${offset}`;
          $bhr.done(function (data) {
            for (var i = 0; i < dogs.length; i++) {
              let name = '#dog' + (i + 1) + ' .panel-title';
              $(name).html(dogs[i].name.$t);
              let bio = '#dog' + (i + 1) + ' .panel-body';
              let pic = 'image' + (i + 1);
              $(bio).html('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + dogs[i].media.photos.photo[3].$t + '>' + 'My ID: ' + dogs[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + dogs[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + dogs[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + dogs[i].contact.email.$t + "<br>" + dogs[i].description.$t);
            }
          });
        }
        getMore(data);

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
  $('.rescueList').append(
    '<td class = "col-md-6 name">Unavailable</td>'+
    '<td class = "col-md-3 email">Unavailable</td>'+
    '<td class = "col-md-3 phone">Unavailable</td>'
  );
}
function setRowId () {
  var pounds = $('.rescueList');
  console.log(pounds);
  for (var i = 0; i <= pounds.length; i++) {
    $(pounds[i]).attr('id', "shelter" + (i + 1));
  }
}
$('#search').on("click", function () {
  $("#labels").show();
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
