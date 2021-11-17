function initMap() {

    //Mapa
    const madrid = {
      lat: 40.405122527720636,
      lng: -3.7026692832519736
    };
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 14,
        center: madrid
      }
    );

    getPlaces(map)
    .then(places => {
      // 7. Instrucciones: Llamar a placeRestaurants pasandoles la info
      const markers = placeShops(map, places)
    })
    .catch(error => console.log(error))
  
    //// Markers
    // placeMarkers(map)
  
    //GeoLocation
    // setUserCenter(map)
  }

  
  function getPlaces() {
    return axios.get("/api")
      .then(response => response.data.places)
  }


function placeShops(map, places) {
  const markers = []

  // 8. Instrucciones: Por cada place creo un nuevo Marker
  places.forEach((places) => {
    const center = {
      lat: places.location.coordinates[1],
      lng: places.location.coordinates[0]
    };
    const newMarker = new google.maps.Marker({
      position: center,
      map: map,
      title: places.name
    });
    markers.push(newMarker);
    console.log(newMarker)
    console.log(places.name)

  });

  // var infowindow = new google.maps.InfoWindow({
  //   content: places.name[1]
  // });
  
  // // Creando un marker en el mapa
  // var marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(-34.5862088, -58.415677500000015),
  //   map: map,
  //   title: places.name
  // });
    
  // // Al hacer click sobre el marker mostraremos su información en una ventana
  // marker.addListener('click', function() {
  //   infowindow.open(map, marker);
  // });
  
  // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
  return markers
  
}
