$(document).ready(function() {
  var offset = 0;
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
    $(featuredbio).html('<img class = "images img-responsive thumbnail" id=' + featuredpic + ' src=  ' + featured.media.photos.photo[3].$t + '>' + "<b>" + 'My ID: ' + featured.id.$t + "<br>" + 'My Shelter\'s ID: ' + featured.shelterId.$t + "</br>" + 'Shelter Phone: ' + featured.contact.phone.$t + "<br>" + 'Shelter Email: ' +"</b>" + "<a href = mailto:" + featured.contact.email.$t + ">" + featured.contact.email.$t + "</a>" + "<br>" + featured.description.$t);
  });
  function buildPanels(arr) {
    for (var i = 0; i < arr.length; i++) {
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
  for (var i = offset; i <= pups.length; i++) {
  $(pups[i]).attr('id', "dog" + (i + 1));
  }
}
function setImageId () {
  var pics = $('.images');
  for (var i = offset; i <= pics.length; i++) {
  $(pics[i]).attr('id', "image" + (i + 1));
  }
}


$('#submit').on("click", function() {
    $('#featureddog').hide();
    $('h1').hide();
    $('#heart').hide();

      var zip = $('#zipinput').val();
      if (zip.length !== 5) {
      alert('Please enter a valid zip code');
      }
      localStorage.setItem('location',zip);

      var size = $('#sizeselect').val();
      var age = $('#ageselect').val();
      var sex = $('#sexselect').val();

      // function Dog(zip, size, age, sex){
      //   this.size = size;
      //   this.age = age;
      //   this.sex = sex;
      //   this.zip = zip;
      // }
      //
      // var firstDog = new Dog(zip, size, age, sex);
      // console.log(firstDog);

      var url = `https://g-pet.herokuapp.com/pet.find?location=${zip}&animal=dog&count=12&format=json`;
      if (size) {
        url += `&size=${size}`;
        localStorage.setItem('dogsize', size);
      }
      if (age) {
        url += `&age=${age}`;
        localStorage.setItem('dogage', age);
      }
      if (sex) {
        url += `&sex=${sex}`;
        localStorage.setItem('dogsex',sex);
      }
      var $xhr = $.getJSON(url);
      $xhr.done(function(data){
        // console.log(data);
        let dogs = data.petfinder.pets.pet;
        var offset = data.petfinder.lastOffset.$t;
        localStorage.setItem('searchOffset', offset);
        var newurl = url += '&offset=' + offset;
        console.log(newurl);
        buildPanels(dogs);

      populate(dogs);
      });
      function populate (arr) {
      for (var i = 0; i < arr.length; i++) {
        let name = '#dog' + (i + 1) + ' .panel-title';
        $(name).html(arr[i].name.$t);
        let bio = '#dog' + (i + 1) + ' .panel-body';
        let pic = 'image' + (i + 1);
        $(bio).html('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + arr[i].media.photos.photo[3].$t + '>' + "<b>"+' My ID: ' + arr[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + arr[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + arr[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + arr[i].contact.email.$t + ">" + arr[i].contact.email.$t +"</a>" + "<br>" + arr[i].description.$t);
      }
    }
            $('#moreresults').on("click", function () {
            console.log('more results');
            var alreadyZip = localStorage.getItem('location');
            var currentOffset = localStorage.getItem('searchOffset');
            let newurl =  `https://g-pet.herokuapp.com/pet.find?location=${alreadyZip}&offset=${currentOffset}&animal=dog&count=12&format=json`;
          var alreadySize = localStorage.getItem('dogsize');
          var alreadySex = localStorage.getItem('dogsex');
          var alreadyAge = localStorage.getItem('dogage');
          if (alreadySize) {
            newurl += `&size=${alreadySize}`;
          }
          if (alreadySex) {
            newurl += `&sex=${alreadySex}`;
          }
          if (alreadyAge) {
            newurl += `&age=${alreadyAge}`;
          }
          getMore(newurl);
          function getMore (anotherurl) {
            $.getJSON(anotherurl).then(function (result) {
              let moreDogs = result.petfinder.pets.pet;
              console.log(moreDogs)
              buildPanels(moreDogs);
              populate(moreDogs);
            });
          }
          // $bhr.done(function (data) {
          //   let moreDogs = data.petfinder.pets.pet;
          //   buildPanels(moreDogs);
          // });
          });
        }
      );
$('#clear').on("click", function () {
  localStorage.clear();
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
// });
