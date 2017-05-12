$(document).ready(function() {
    var offset = 0;
    var audio = document.createElement("audio");
    audio.src = "dogbark.m4a";
    $('.cartoons').hover(function() {
        audio.play();
    });
    $('.navbar-brand').on("click", function() {
        audio.play();
      });
    //making AJAX call for featured dog div on default search page
    var $yhr = $.getJSON(`https://g-pet.herokuapp.com/pet.getRandom?animal=dog&count=1&output=basic&format=json`);
    $yhr.done(function(data) {
        var featured = data.petfinder.pet;
        let featuredname = '#featureddog .panel-title';
        $(featuredname).html(featured.name.$t);
        let featuredbio = '#featureddog .panel-body';
        var featuredStory;
        if (featured.description !== undefined) {
          featuredStory = featured.description.$t;
        }
        else {
          featuredStory = 'My story may be not very well known, but I promise I can give you love if you give me a furever home.';
        }
        let featuredpic = '#featuredimage';
        var featuredPhoto;
        if (featured.media.photos !== undefined) {
          featuredPhoto = featured.media.photos.photo[3].$t;
        }
        else {
          featuredPhoto = "images/dogunavailable.jpg";
        }
        var morePhone;
        if (featured.contact.phone.$t !== undefined) {
          featuredPhone = featured.contact.phone.$t;
        }
        else {
          featuredPhone = 'Unavailable';
        }
        $(featuredbio).html('<img class = "images img-responsive thumbnail" id=' + featuredpic + ' src=  ' + featuredPhoto + '>' + "<b>" + 'My ID: ' + featured.id.$t + "<br>" + 'My Shelter\'s ID: ' + featured.shelterId.$t + "</br>" + 'Shelter Phone: ' + featuredPhone + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + featured.contact.email.$t + ">" + featured.contact.email.$t + "</a>" + "<br>" + featuredStory);
    });
    // var offset = 0;
    //building panel dynamically, can re-use this code for future AJAX calls
    function buildPanels(arr) {
        for (var i = 0; i < arr.length; i++) {
            $('#resultdiv').append(
                '<div class="col-md-3 col-sm-4 col-xs-12 col-xs-offset-1">' +
                '<div class="panel panel-default dogPanels">' +
                '<div class="panel-heading dogNames">' +
                '<h3 class="panel-title"></h3>' +
                '</div>' +
                '<div class="panel-body">' +
                '</div>' +
                '</div>' +
                '</div>');
        }
        setDogId();
        setImageId();
    }
    //setting Ids for dogs-Id goes on etire panel
    function setDogId() {
        var pups = $('.col-md-3');
        for (var i = 0; i <= pups.length; i++) {
            $(pups[i]).attr('id', "dog" + (i + 1));
        }
    }
    //setting Ids for images of dogs-Image only goes on image itself which is inside the panel body
    function setImageId() {
        var pics = $('.images');
        for (var i = 0; i <= pics.length; i++) {
            $(pics[i]).attr('id', "image" + (i + 1));
        }
    }
    //AJAX call for first set of 12 results
    $('#submit').on("click", function() {
        $('#moreresults').show();
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
            localStorage.setItem('dogsize', size);
        }
        if (age) {
            url += `&age=${age}`;
            localStorage.setItem('dogage', age);
        }
        if (sex) {
            url += `&sex=${sex}`;
            localStorage.setItem('dogsex', sex);
        }
        var $xhr = $.getJSON(url);
        $xhr.done(function(data) {
            let dogs = data.petfinder.pets.pet;
            console.log(dogs);
            buildPanels(dogs);
            populate(dogs);
        });
        //populating panels with selectors referencing both id and class
        function populate(arr) {
            for (var i = 0; i < arr.length; i++) {
                let name = '#dog' + (i + 1) + ' .panel-title';
                $(name).append(arr[i].name.$t);
                let pic = 'image' + (i + 1);
                var dogPhoto;
                let bio = '#dog' + (i + 1) + ' .panel-body';
                var dogStory;
                if (arr[i].description.$t !== undefined) {
                  dogStory = arr[i].description.$t;
                }
                else {
                  dogStory = 'My story may be not very well known, but I promise I can give you love if you give me a furever home!';
                }
                if (arr[i].media.photos !== undefined) {
                  dogPhoto = arr[i].media.photos.photo[3].$t;
                }
                else (dogPhoto = "images/dogunavailable.jpg");
                var shelterPhone;
                if (arr[i].contact.phone.$t !== undefined) {
                  shelterPhone = arr[i].contact.phone.$t;
                }
                else {
                  shelterPhone = 'Unavailable';
                }
                $(bio).append('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + dogPhoto + '>' + "<b>" + ' My ID: ' + arr[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + arr[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + shelterPhone + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + arr[i].contact.email.$t + ">" + arr[i].contact.email.$t + "</a>" + "<br>" + dogStory);
            }
        }
        //setting Ids for dogs in all AJAX calls after first one
        function setNewDogId() {
            var pups = $('.col-md-3');
            for (var i = offset; i <= pups.length; i++) {
                $(pups[i]).attr('id', "dog" + (i + 1));
            }
        }
        //setting Ids for images in all AJAX calls after first one
        function setNewImageId() {
            var pics = $('.images');
            for (var i = offset; i <= pics.length; i++) {
                $(pics[i]).attr('id', "image" + (i + 1));
            }
        }
        //populating panels for each AJAX call after the first one
        function repopulate(arr) {
            for (var i = offset; i <= offset + 12; i++) {
                let name = '#dog' + (i + 1) + ' .panel-title';
                var num = (i === offset) ? 0 : num + 1;
                $(name).append(arr[num].name.$t);
                var morePhotos;
                let pic = 'image' + (i + 1);
                var moreStory;
                let bio = '#dog' + (i + 1) + ' .panel-body';
                if (arr[num].media.photos !== undefined) {
                    morePhotos = arr[num].media.photos.photo[3].$t;
                } else {
                    morePhotos = "images/dogunavailable.jpg";
                }
                if (arr[num].description.$t !== undefined) {
                  moreStory = arr[num].description.$t;
                }
                else {
                  moreStory = 'My story may be not very well known, but I promise I can give you love if you give me a furever home!';
                }
                var morePhone;
                if (arr[num].contact.phone.$t !== undefined) {
                  morePhone = arr[num].contact.phone.$t;
                }
                else {
                  morePhone = 'Unavailable';
                }
                $(bio).append('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + morePhotos + '>' + "<b>" + ' My ID: ' + arr[num].id.$t + "<br>" + 'My Shelter\'s ID: ' + arr[num].shelterId.$t + "</br>" + 'Shelter Phone: ' + morePhone + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + arr[num].contact.email.$t + ">" + arr[num].contact.email.$t + "</a>" + "<br>" + moreStory);
            }

        }
        //setting url and accessing local storage for all AJAX calls after first one
        $('#moreresults').on("click", function() {
            offset += 12;
            var alreadyZip = localStorage.getItem('location');
            var newurl = `https://g-pet.herokuapp.com/pet.find?location=${alreadyZip}&offset=${offset}&animal=dog&count=12&format=json`;
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
            //gets more data and calls all functions to append data to DOM
            function getMore(anotherurl) {
                $.getJSON(anotherurl).then(function(result) {
                    console.log(result);
                    let moreDogs = result.petfinder.pets.pet;
                    buildPanels(moreDogs);
                    setNewDogId();
                    setNewImageId();
                    repopulate(moreDogs);
                });
            }
        });
    });
    //clearing local storage and HTML when user opts to start new search
    $('#clear').on("click", function() {
        localStorage.clear();
        $('#resultdiv').html('');
    });
    //building rows inside of table in shelter search
    function buildRows(data) {
      $('#shelterlist').append(
        '<tr id = "header"></tr>'
      );
        for (var i = 0; i < data.length; i++) {
            $('#shelterlist').append(
              '<tr class = "rescueList"></tr>'
            );
        }
        setRowId();
    }
    //building divs for table in shelter search
    function buildDivs() {
        $('.rescueList').append(
            '<td class = "col-md-5 name">Unavailable</td>' +
            '<td class = "col-md-4 email">Unavailable</td>' +
            '<td class = "col-md-3 phone">Unavailable</td>'
        );
    }
    function buildHeader () {
      $('#header').append(
        '<td class = "labels col-md-5">Name</td>' +
        '<td class = "labels col-md-4">Phone</td>' +
        '<td class = "labels col-md-3">Email</td>'
      );
    }
    //setting ids for all rows with class .rescueList
    function setRowId() {
        var pounds = $('.rescueList');
        for (var i = 0; i <= pounds.length; i++) {
            $(pounds[i]).attr('id', "shelter" + (i + 1));
        }
    }
    //setting boolean so user can start a new shelter search every time they put in a new zip code and will delete tds from previous search
    var clicked = false;
    $('#search').on("click", function() {
        clicked = true;
        if (clicked === true) {
            $('#shelterlist').html('');
        }
        var shelterZip = $('#shelterinput').val();
        var $zhr = $.getJSON(`https://g-pet.herokuapp.com/shelter.find?location=${shelterZip}&count=30&format=json`);
        $zhr.done(function(data) {
            let rescues = data.petfinder.shelters.shelter;
            buildHeader();
            buildRows(rescues);
            buildDivs();
            for (let i = 0; i < rescues.length; i++) {
                let poundName = '#shelter' + (i + 1) + ' .name';
                let poundEmail = '#shelter' + (i + 1) + ' .email';
                let poundPhone = '#shelter' + (i + 1) + ' .phone';
                $(poundName).html(rescues[i].name.$t);
                $(poundEmail).html("<a href = mailto:" + rescues[i].email.$t + ">" + rescues[i].email.$t + "</a>");
                $(poundPhone).html(rescues[i].phone.$t);
            }
        });
    });
});
