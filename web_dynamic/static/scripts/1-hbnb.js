window.onload = function() {
    let amenities = {};

    $("input#input-amenity").on('change', function() {
      if( $(this).is(':checked') ) {
          amenities[$(this)[0].attributes["data-id"].nodeValue] = $(this)[0].attributes["data-name"].nodeValue;
      } else {
          delete amenities[$(this)[0].attributes["data-id"].nodeValue];
      }
      if (Object.keys(amenities).length) $(".amenities h4").text(Object.values(amenities).join(", "));
    });

};