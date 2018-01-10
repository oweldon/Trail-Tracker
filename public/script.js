console.log("Sanity check!");

var marker;
var map;
function placeMarker(location) {
    if (marker) {
        //if marker already was created change positon
        marker.setPosition(location);
    } else {
        //create a marker
        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
    });
      getCoords(location);
  }
}
var initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.090839, lng: -121.970406},
    zoom: 9
  });
  google.maps.event.addListener(map, 'click', function(event) {
   placeMarker(event.latLng);

});
}
function getCoords(location){
        $.ajax({
            type: "POST",
            url: "/coords",
            data: { lat: location.lat, lng: location.lng },
            success: function(data) {
                //show content
                console.log('Success!');
                console.log(data);
                // append a div to a results area for each hike
                var hikeBody = document.getElementById("allHikes");
                data.places.forEach(function(place){
                  var hike = document.createElement('div');
                  hike.innerText = place.name + ":" + " " + place.city;
                  hikeBody.appendChild(hike);
                });
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err)
            }
        });
      }
