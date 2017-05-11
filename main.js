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
    //making AJAX call for featured dog div on default search page
    var $yhr = $.getJSON(`https://g-pet.herokuapp.com/pet.getRandom?animal=dog&count=1&output=basic&format=json`);
    $yhr.done(function(data) {
        var featured = data.petfinder.pet;
        // console.log(featured);
        let featuredname = '#featureddog .panel-title';
        $(featuredname).html(featured.name.$t);
        let featuredbio = '#featureddog .panel-body';
        let featuredpic = '#featuredimage';
        $(featuredbio).html('<img class = "images img-responsive thumbnail" id=' + featuredpic + ' src=  ' + featured.media.photos.photo[3].$t + '>' + "<b>" + 'My ID: ' + featured.id.$t + "<br>" + 'My Shelter\'s ID: ' + featured.shelterId.$t + "</br>" + 'Shelter Phone: ' + featured.contact.phone.$t + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + featured.contact.email.$t + ">" + featured.contact.email.$t + "</a>" + "<br>" + featured.description.$t);
    });
    // var offset = 0;
    //building panel dynamically, can re-use this code for future AJAX calls
    function buildPanels(arr) {
        for (var i = 0; i < arr.length; i++) {
            $('#resultdiv').append(
                '<div class="col-md-3">' +
                '<div class="panel panel-default">' +
                '<div class="panel-heading">' +
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
        // if (zip.length === 5) {
        $('#moreresults').show();
        // }
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
            buildPanels(dogs);
            populate(dogs);
        });
        //populating panels with selectors referencing both id and class
        function populate(arr) {
            for (var i = 0; i < arr.length; i++) {
                let name = '#dog' + (i + 1) + ' .panel-title';
                $(name).append(arr[i].name.$t);
                let bio = '#dog' + (i + 1) + ' .panel-body';
                let pic = 'image' + (i + 1);
                let photo;
                if (arr[i].media.photos !== undefined) {
                    photo = arr[i].media.photos.photo[3].$t;
                } else {
                    photo = "images/dogunavailable.jpg";
                }
                $(bio).append('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + photo + '>' + '<button type="button" id = "getInfo"class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm"'+ ">" + "Get Contact Info" + "</button>"+
                '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"' + ">" +
                '<div class="modal-dialog modal-sm" role="document"' + ">"+
                '<div class="modal-content"' + ">" + "<b>" + 'My ID: ' + arr[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + arr[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + arr[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + "<a href = mailto:" + arr[i].contact.email.$t + ">" + "</b>" + arr[i].contact.email.$t + "</a>" + '<button type="button" id = "close" class="btn btn-default" data-dismiss="modal"'+ ">" + "Close" + "</button>" + '</div>'+ '</div>'+ '</div>' + "<br>"+ arr[i].description.$t);
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
                let bio = '#dog' + (i + 1) + ' .panel-body';
                let pic = 'image' + (i + 1);
                var num = (i === offset) ? 0 : num + 1;
                let morePhotos;
                if (arr[num].media.photos !== undefined) {
                    morePhotos = arr[num].media.photos.photo[3].$t;
                } else {
                    morePhotos = "images/dogunavailable.jpg";
                }
                $(name).append(arr[num].name.$t);
                $(bio).append('<img class = "images img-responsive thumbnail" id=' + pic + ' src=  ' + morePhotos + '>' + "<b>" + ' My ID: ' + arr[num].id.$t + "<br>" + 'My Shelter\'s ID: ' + arr[num].shelterId.$t + "</br>" + 'Shelter Phone: ' + arr[num].contact.phone.$t + "<br>" + 'Shelter Email: ' + "</b>" + "<a href = mailto:" + arr[num].contact.email.$t + ">" + arr[num].contact.email.$t + "</a>" + "<br>" + arr[num].description.$t);
            }

        }
        // function createModal (arr) {
        //   '<button type="button" id = "getInfo"class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm"'+ ">" + "Get Contact Info" + "</button>"+
        //   '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"' + ">" +
        //   '<div class="modal-dialog modal-sm" role="document"' + ">"+
        //   '<div class="modal-content"' + ">" + "<b>" + 'My ID: ' + arr[i].id.$t + "<br>" + 'My Shelter\'s ID: ' + arr[i].shelterId.$t + "</br>" + 'Shelter Phone: ' + arr[i].contact.phone.$t + "<br>" + 'Shelter Email: ' + "<a href = mailto:" + arr[i].contact.email.$t + ">" + "</b>" + arr[i].contact.email.$t + "</a>" + '<button type="button" id = "close" class="btn btn-default" data-dismiss="modal"'+ ">" + "Close" + "</button>" + '</div>'+ '</div>'+ '</div>' + "<br>";
        // }
      });
        //setting url and accessing local storage for all AJAX calls after first one
        $('#moreresults').on("click", function() {
            offset += 12;
            console.log('more results');
            var alreadyZip = localStorage.getItem('location');
            var newurl = `https://g-pet.herokuapp.com/pet.find?location=${alreadyZip}&offset=${offset}&animal=dog&count=12&format=json`;
            console.log(offset);
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
        for (var i = 0; i < data.length; i++) {
            console.log('buildList');
            $('#shelterlist').append(
                '<tr class = "rescueList"></tr>'
            );
        }
        setRowId();
    }
    //building divs for table in shelter search
    function buildDivs() {
        $('.rescueList').append(
            '<td class = "col-md-6 name">Unavailable</td>' +
            '<td class = "col-md-3 email">Unavailable</td>' +
            '<td class = "col-md-3 phone">Unavailable</td>'
        );
    }
    //setting ids for all rows with class .rescueList
    function setRowId() {
        var pounds = $('.rescueList');
        console.log(pounds);
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
        $("#labels").show();
        var shelterZip = $('#shelterinput').val();
        var $zhr = $.getJSON(`https://g-pet.herokuapp.com/shelter.find?location=${shelterZip}&count=20&format=json`);
        $zhr.done(function(data) {
            let rescues = data.petfinder.shelters.shelter;
            console.log('rescues', rescues);
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

// });
