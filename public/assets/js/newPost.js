$(document).ready(function () {
  console.log("js connected")
      // Gets an optional query string from our url (i.e. ?post_id=23)
      var url = window.location.search;
      var postId;
      // Sets a flag for whether or not we're updating a post to be false initially
      var updating = false;

      // If we have this section in our url, we pull out the post id from the url
      // In localhost:8080/cms?post_id=1, postId is 1
      if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId);
      }

      // Getting jQuery references to the post body, title, form, and category select
      var bodyInput = $("#body");
      var titleInput = $("#title");
      var dateform = $("#newPost");
      var postCategorySelect = $("#category");
      var dateLocation = $("#location");
      var long = $("#latitudeInput");
      var lat = $("#longitudeInput");

      // Giving the postCategorySelect a default value
      postCategorySelect.val("Something casual");


      // Google Places Autocomplete
      var searchInput = "";
      autocomplete = new google.maps.places.Autocomplete((document.getElementById("location")), {
          types: ["geocode", "establishment"]
      });
        // event listener for typing in a city and out outputting the coordinates
        $(document).on("change", searchInput, function () {
          document.getElementById("latitudeInput").value = undefined;
          document.getElementById("longitudeInput").value = undefined;
      });

      // event listener for using get location button using modernizer and open weather api
      $("#getLocation").on("click", function () {
        event.preventDefault()
        get_location(thisLocation)
        function get_location() {
          if (Modernizr.geolocation) {
          navigator.geolocation.getCurrentPosition(thisLocation);
          } else {
            // no native support; maybe try Gears?
          }
        }
        function thisLocation(position) {
          // define the current users long and lat
          var thisLat = position.coords.latitude;
          var thisLong = position.coords.longitude;
          // enter the values into the long lat inputs on google fonts
          var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+ thisLat +"&lon="+ thisLong +"&appid=" + "19ebe7d8453b09616b508ab44e2e92b8";
          // Here we run our AJAX call to the OpenWeatherMap API for the city name
          $.ajax({
          url: queryURL,
          method: "GET"
          })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(citySearch) {
          var theLocation = citySearch.name
          console.log(theLocation)
          // set the textarea to the city city name
          $(dateLocation).val(theLocation);
          });
        }      
      });

      // Adding an event listener for when the form is submitted
      $(dateform).on("submit", function handleFormSubmit(event) {
        event.preventDefault();

        
        // Wont submit the post if we are missing a body or a title
        if (!titleInput.val().trim() || !bodyInput.val().trim()  || !long.val().trim() || !lat.val().trim()  ) {
          return;
        }

        // Constructing a newPost object to hand to the database
        var uncheckedPost = {
          title: titleInput.val().trim(),
          body: bodyInput.val().trim(),
          category: postCategorySelect.val(),
          location: dateLocation.val(),
          interested: null,
        };

        var dirtyPost = JSON.stringify(uncheckedPost)
        console.log(dirtyPost)
        // settings for filtering the post for bad launguage
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter",
          "method": "POST",
          "headers": {
            "x-rapidapi-host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
            "x-rapidapi-key": "d82c676afemsh7edaf163ce44088p1641dajsn681616f67751",
            "content-type": "application/x-www-form-urlencoded"
          },
          "data": {
            "censor-character": "#",
            "content": dirtyPost
          }
        }
        



        $.ajax(settings).done(function (response) {
          console.log(response)
          var theResponse = response['censored-content']
        
        var cleanPost = JSON.parse(theResponse)
        console.log(cleanPost)


        console.log(cleanPost);
        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
          cleanPost.id = postId;
          updatePost(cleanPost);
        } else {
          console.log(cleanPost)
          submitPost(cleanPost);
        }

        }) 
      });

      // Submits a new post and brings user to blog page upon completion
      function submitPost(Post) {
        $.post("/api/posts/", Post, function () {
          
          //Navigate the user back to their dashboard
          window.location.href = "/dashboard";
        });
      }

      // Gets post data for a post if we're editing
      function getPostData(id) {
        $.get("/api/posts/" + id, function (data) {
          if (data) {
            // If this post exists, prefill our cms forms with its data
            titleInput.val(data.title);
            bodyInput.val(data.body);
            postCategorySelect.val(data.category);
            postLocation.val(data.location)
            // If we have a post with this id, set a flag for us to know to update the post
            // when we hit submit
            updating = true;
          }
        });
      }

      // Update a given post, bring user to the blog page when done
      function updatePost(post) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
          })
          .then(function () {
            window.location.href = "/dashboard";
          });
      }
    });