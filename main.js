$(document).ready(function() {
  $('#submit').on("click", function() {
  var zip = $('#zipinput').val();
  var $xhr = $.getJSON(`https://g-pet.herokuapp.com/pet.find?location=${zip}&animal=dog&count=30&format=json`);
  $xhr.done(function(data){
    var dogs = data.petfinder.pets.pet;
    console.log(dogs.length);
    // console.log(names[0]['name']['$t']);
    // $('#dog1').html(names[0]['name']['$t']);
    console.log(dogs);
    for (var i = 0; i < dogs.length; i++) {
      let name = '#dog' + (i + 1) + ' .panel-title';
        $(name).html(dogs[i].name.$t);
        let bio = '#dog' + (i + 1) + ' .panel-body';
          $(bio).html(dogs[i].description.$t);
          let pic = '#image' + (i + 1);
          // console.log($('#dog1'));
          let photoArr = dogs[i].media.photos.photo[0]['$t'];
          console.log(source);
            $(pic).attr("src", dogs[i].media.photos.photo[0].$t);
            // console.log(dogs[0]['media']['photos']['photo'][0]['$t']);
    }

    // for(let key of names) {
    //   console.log(key);
    //   $('.panel-title').html(key.name['$t']);
      // console.log(names[key]['name']['$t']);

    // $('#info').html(data.petfinder.pets.pet[0].age.$t);

  });
});
});
// var $search = $("#search").val();
//         $.getJSON(`http://www.omdbapi.com/?t=${$search}`)
//             .done(function(data) {
//                 let movie = {};
//                 for (let key in data) {
//                     movie[key.toLowerCase()] = data[key];
//                 }
  //grab input and dynamically add to url for getJSON request;reference AJAX hero
// $.get('http://api.petfinder.com/pet.find?key=a5235e721f5d00483b6e655e8cddacd2&location=80304&format=json', function(data){
//   // you may use "data" to access the underlying data
// )

// function searchForDog(zipCode) {
//   $.getJSON('http://api.petfinder.com/pet.find?key=a5235e721f5d00483b6e655e8cddacd2&format=json&location=')
// }
