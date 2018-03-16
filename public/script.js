var marker;
var map;
function placeMarker(location) {
    if (marker) {
      refresh();
        //if marker already was created change positon
        marker.setPosition(location);
    } else {
        //create a marker
        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
    });
  }
  map.addListener('click', getCoords(location));
}

function refresh(){
  if(marker){
    var element = document.getElementById("allHikes");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

var initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.090839, lng: -121.970406},
    zoom: 9,
    draggable: true
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
                // append a div to a results area for each hike
                data.places.forEach(function(place){
                  //Display the text
                  var textElement = document.createElement('p');
                  textElement.textContent = place.name + ': ' + place.city;

                  //Create the form for adding to wishlist
                  var hikeBody = document.getElementById("allHikes");
                  var hikeForm = document.createElement("form");
                  hikeForm.setAttribute('method',"post");
                  hikeForm.setAttribute('action',"/trails");
                  var trailName = document.createElement("input"); //input element, hidden
                  trailName.setAttribute('type', 'hidden');
                  trailName.setAttribute('name', 'name');
                  trailName.setAttribute('value', place.name);
                  var trailCity = document.createElement("input"); //input element, hidden
                  trailCity.setAttribute('type', 'hidden');
                  trailCity.setAttribute('name', 'city');
                  trailCity.setAttribute('value', place.city);
                  var trailState = document.createElement("input"); //input element, hidden
                  trailState.setAttribute('type', 'hidden');
                  trailState.setAttribute('name', 'state');
                  trailState.setAttribute('value', place.state);
                  var trailDesc = document.createElement("input"); //input element, hidden
                  trailDesc.setAttribute('type', 'hidden');
                  trailDesc.setAttribute('name', 'description');
                  trailDesc.setAttribute('value', place.description);
                  var trailDirections = document.createElement("input"); //input element, hidden
                  trailDirections.setAttribute('type', 'hidden');
                  trailDirections.setAttribute('name', 'directions');
                  trailDirections.setAttribute('value', place.directions);
                  var addWish = document.createElement("input"); //input element, Submit button
                  addWish.style.height = "40px";
                  addWish.style.color = "green";
                  addWish.setAttribute('type',"submit");
                  addWish.setAttribute('value',"Add To Wishlist");


                  hikeForm.appendChild(trailName);
                  hikeForm.appendChild(trailCity);
                  hikeForm.appendChild(trailState);
                  hikeForm.appendChild(trailDesc);
                  hikeForm.appendChild(trailDirections);
                  hikeForm.appendChild(addWish);
                  textElement.appendChild(hikeForm);
                  textElement.appendChild(document.createElement('hr'));
                  hikeBody.appendChild(textElement);
                });
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err)
            }
        });
      }

      $('.delete-trail').click(function(e){
        e.preventDefault();
        $.ajax({
          url: $(this).attr('href'),
          method: 'DELETE'
        }).done(function(data){
          window.location.href = '/trails/wishlist';
        });
      });
