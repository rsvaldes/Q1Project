$(document).ready(function() {
  // var $ihr = $.getJSON(`https://g-ipinfodb.herokuapp.com/v3/ip-city/?format=json`);
  // $ihr.done(function(data) {
  //   console.log(data);
  // });
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
    $(featuredbio).html('<img class = "images img-responsive thumbnail" id=' + featuredpic + ' src=  ' + featured.media.photos.photo[3].$t + '>' + 'My ID: ' + featured.id.$t + "<br>" + 'My Shelter\'s ID: ' + featured.shelterId.$t + "</br>" + 'Shelter Phone: ' + featured.contact.phone.$t + "<br>" + 'Shelter Email: ' + "<a href = mailto:" + featured.contact.email.$t + ">" + featured.contact.email.$t + "</a>" + "<br>" + featured.description.$t);
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
      localStorage.setItem('location', zip);
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
        var newurl = url += '&offset=' + offset;
        console.log(newurl);
        buildPanels(dogs);
        $('#navigate').show();
        for (var i = 0; i < dogs.length; i++) {
          let name = '#dog' + (i + 1) + ' .panel-title';
          $(name).html(dogs[i].name.$t);
          let bio = '#dog' + (i + 1) + ' .panel-body';
          let pic = 'image' + (i + 1);
          $(bio).html('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + dogs[i].media.photos.photo[3].$t + '>' + "<b>"+' My ID: ' + dogs[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + dogs[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + dogs[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + dogs[i].contact.email.$t + ">" + dogs[i].contact.email.$t +"</a>" + "<br>" + dogs[i].description.$t);
        }
        
      });

          $('#moreresults').on("click", function (newurl) {
          var alreadyZip = localStorage.getItem('location');
          console.log(alreadyZip);
          console.log(newurl);
          var $bhr = $.getJSON(newurl);
          $bhr.done(function (data) {
          console.log(data);

          });
        }
);

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
var clicked = false;
$('#search').on("click", function () {
  clicked = true;
  if (clicked === true) {
    $('#shelterlist').html('');
  }
  $("#labels").show();
  var shelterZip = $('#shelterinput').val();
  var $zhr = $.getJSON(`https://g-pet.herokuapp.com/shelter.find?location=${shelterZip}&count=20&format=json`);
  $zhr.done(function(data){
    let rescues = data.petfinder.shelters.shelter;
    console.log('rescues', rescues);
    buildRows(rescues);
    buildDivs();
    for (let i = 0; i < rescues.length; i++) {
    // let emailaddress = rescues[i].email.$t;
    let poundName = '#shelter' + (i + 1) + ' .name';
    let poundEmail = '#shelter' + (i + 1) + ' .email';
    let poundPhone = '#shelter' + (i + 1) + ' .phone';
    $(poundName).html(rescues[i].name.$t);
    $(poundEmail).html("<a href = mailto:" + rescues[i].email.$t + ">" +rescues[i].email.$t +"</a>" );
    $(poundPhone).html(rescues[i].phone.$t);
  }
});
});
});
