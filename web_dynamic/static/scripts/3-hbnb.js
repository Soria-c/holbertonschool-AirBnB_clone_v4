window.onload = function () {
  let amenities = {};

  $("input#input-amenity").on("change", function () {
    if ($(this).is(":checked")) {
      amenities[$(this)[0].attributes["data-id"].nodeValue] =
        $(this)[0].attributes["data-name"].nodeValue;
    } else {
      delete amenities[$(this)[0].attributes["data-id"].nodeValue];
    }
    if (Object.keys(amenities).length)
      $(".amenities h4").text(Object.values(amenities).join(", "));
  });

  $.ajax({
    type: "GET",
    url: "http://0.0.0.0:5001/api/v1/status/",
    success: function (data) {
      
      if (data.status === "OK") {
        console.log(data.status);
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    },
    error: function() {
      alert('Error API not available');
    }
  });

  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    contentType: "application/json",
    success: function(data) {
      for(const place of data) {
        $("section.places").append(
          `<article>
          <div class="title_box">
           <h2>${ place.name }</h2>
           <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
            ${place.max_guest} Guest
            </div>
            <div class="number_rooms">
            ${place.number_rooms} Bedroom
            </div>
            <div class="number_bathrooms">
            ${place.number_bathrooms} Bathroom
            </div>
          </div>
          <div class="user">
                 <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
               </div>
               <div class="description">
           ${place.description}
               </div>
          </article>`
        )
      }
    }
  })
};
