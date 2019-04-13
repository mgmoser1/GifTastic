$(document).ready(function trivia() {
    // GIPHY BETA API KEY: Dwmlj7sZzRAPR800A8DwHESIr2jFkZjv

    // sample search url: https://api.giphy.com/v1/gifs/search?api_key=Dwmlj7sZzRAPR800A8DwHESIr2jFkZjv&q=capybara&limit=10&offset=0&rating=G&lang=en

    // sample deconstructed: general url + api key + &q= + user input + &limit=10 + &rating=G

    // Output categories: "title": "capybara GIF", "rating": "g",  

    // fixed_height and fixed_height_still (200 X 200)
    // fixed_height_small and fixed_height_small_still (100 x 100)


   // GLOBAL VARIABLE //
    var animalArr = ["rabbit", "dog", "bear"];

    // FUNCTIONS //

    function addButton(array) {
        
        for(var i=0; i<array.length;i++) {
            var $newButton;
            var firstLetter = array[i].charAt(0);
            console.log(firstLetter);

            // https://en.wikipedia.org/wiki/Letter_frequency //
            
            if(firstLetter === "t" || firstLetter === "c" || firstLetter === "l" || firstLetter === "u") { // red
                $newButton = $('<button class= btn style= color:#f0edf2;background-color:#c70039;margin:5px; data-point= ' + array[i] + '>');
                $newButton.text(array[i]);
                $(".btn-holder").append($newButton);
            }
            else if(firstLetter === "a" || firstLetter === "b" || firstLetter === "e" || firstLetter === "v") { // purple
                $newButton = $('<button class= btn style= color:#f0edf2;background-color:#712d9e;margin:5px; data-point= ' + array[i] + '>');
                $newButton.text(array[i]);
                $(".btn-holder").append($newButton);
            }
            else if(firstLetter === "o" || firstLetter === "p" || firstLetter === "r" || firstLetter === "y") { // yellow
                $newButton = $('<button class= btn style= color:#f0edf2;background-color:#f7c741;margin:5px; data-point= ' + array[i] + '>');
                $newButton.text(array[i]);
                $(".btn-holder").append($newButton);
            }
            else if(firstLetter === "i" || firstLetter === "h" || firstLetter === "d" || firstLetter === "j") { // green
                $newButton = $('<button class= btn style= color:#f0edf2;background-color:#2dbe79;margin:5px; data-point= ' + array[i] + '>');
                $newButton.text(array[i]);
                $(".btn-holder").append($newButton);
            }
            else if(firstLetter === "s" || firstLetter === "f" || firstLetter === "n" || firstLetter === "k" || firstLetter === "x") { // blue
                $newButton = $('<button class= btn style= color:#f0edf2;background-color:#0071c5;margin:5px; data-point= ' + array[i] + '>');
                $newButton.text(array[i]);
                $(".btn-holder").append($newButton);
            }
            else if(firstLetter === "w" || firstLetter === "m" || firstLetter === "g" || firstLetter === "q" || firstLetter === "z") { // orange
                $newButton = $('<button class= btn style= color:#f0edf2;background-color:#f3814d;margin:5px; data-point= ' + array[i] + '>');
                $newButton.text(array[i]);
                $(".btn-holder").append($newButton);
            }
        }
    }

    // FUNCTION CALL //

    
    addButton(animalArr);

    // CLICK EVENTS //
    
    $(".add-btn").on("click", function () {
        event.preventDefault();
        $(".add-field").text("");
        $(".btn-holder").empty();
        var newAnimal = $(".add-field")
        .val()
        .trim();
        console.log(newAnimal);
        animalArr.push(newAnimal);
        
        addButton(animalArr);

    });    

  
    $(document).on("click",".btn", function () {
  //  $("button").on("click", function () {  // Did not work due to dynamically generated buttons.
        var animal = $(this).attr("data-point");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Dwmlj7sZzRAPR800A8DwHESIr2jFkZjv&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    var gifCard = $('<div class="card float-left col-sm-4 click-gif" style="width: 18rem;">');
                    var gifTitle = $('<h5 class="card-header">');
                    gifTitle.text(results[i].title);
                    var gifCardBody = $('<div class="card-body">');

                    var animalImage = $('<img class="card-img-top click-gif">');
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    // Look at pausing-gifs in 4-6 for example.
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');

                    var rating = $('<p class="card-text">');
                    rating.text("Rating: " + results[i].rating);
                    gifCardBody.prepend(rating);

                    gifCard.prepend(gifCardBody);
                    gifCard.prepend(animalImage);
                    gifCard.prepend(gifTitle);

                    $('.gif-container').prepend(gifCard);
                    console.log((animalImage).attr("data-animate"));
                }

            });
    });
// WORKS
    $(document).on("click",".click-gif", function () { // 
      
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });
});


