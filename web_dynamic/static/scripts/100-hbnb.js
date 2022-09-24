window.onload = function () {
  let amenities = {};
  let st_ct = {};

  $("input#input-amenity").on("change", function () {
    if ($(this).is(":checked")) {
      amenities[$(this)[0].attributes["data-id"].nodeValue] =
        $(this)[0].attributes["data-name"].nodeValue;
    } else {
      delete amenities[$(this)[0].attributes["data-id"].nodeValue];
    }
    // if (Object.keys(amenities).length)
      $(".amenities h4").text(Object.values(amenities).join(", "));
  });

  $("input#input-st_ct").on("change", function () {
    if ($(this).is(":checked")) {
      st_ct[$(this)[0].attributes["data-id"].nodeValue] =
      [$(this)[0].attributes["data-name"].nodeValue, $(this)[0].attributes["data-class"].nodeValue];
    } else {
      delete st_ct[$(this)[0].attributes["data-id"].nodeValue];
    }
    // if (Object.keys(st_ct).length)

      $(".locations h4").text(Object.values(st_ct).map(x => x[0]).join(", "));
  });

  $.ajax({
    type: "GET",
    url: "http://0.0.0.0:5001/api/v1/status/",
    success: function (data) {
      if (data.status === "OK") {
        getPlaces();
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    },
    error: function () {
      alert("Error API not available");
    },
  });

  function getUser(id, place) {
    $.get(`http://0.0.0.0:5001/api/v1/users/${id}`, function (data) {
      $("section.places").append(
        `<article>
        <div class="title_box">
        <h2>${place.name}</h2>
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
              <b>Owner:</b> ${data.first_name} ${data.last_name}
            </div>
            <div class="description">
        ${place.description}
            </div>
        </article>`
      );
    });
  }

  function getPlaces (search_data={}) {
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      contentType: "application/json",
      data: JSON.stringify(search_data),
      success: function (d) {
        for (const place of d) {
          
          getUser(place.user_id, place);
        }
      },
    });
  }

  $("button#button").click(function () {
      const ids = Object.keys(amenities);
      const obj1 = [];
      const obj2 = [];
      for (const [key, value] of Object.entries(st_ct)) {
        if (value[1] == "City")
          obj2.push(key);
        else if (value[1] == "State")
          obj1.push(key);
      }
      getPlaces({"amenities": ids, "states": obj1, "cities": obj2})
    }
  )
};
