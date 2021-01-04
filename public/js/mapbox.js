export default (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoib3Vkd2luIiwiYSI6ImNramI0YzFhdjBoNDIzMXNjb3NteDNsdHgifQ.uFmiV_GAQRTPcOejwzOgAg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/oudwin/ckje0yakqlru119mh3mgbct04',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Add Popup to
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
