/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWRhcmlmLWtoYW4iLCJhIjoiY2wyZGc4b2cwMDFhMTNjcDl5Z25ucGsxbiJ9.TupgNSv3_74BPIcF1nEawA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mdarif-khan/cl2dhg3g700bc15jzw81h2139',
    scrollZoom: false,
    // center: [-118.172696, 34.064159],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
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
