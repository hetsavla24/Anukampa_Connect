import React, { useEffect, useRef, useState } from 'react';
import taxi from './taxi.png'
const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    console.log("MapComponent useEffect triggered");

    if (mapInstanceRef.current) {
      console.log("Map already initialized, skipping");
      return;
    }

    if (!mapRef.current) {
      console.error("Map container ref is null");
      setError("Map container not found");
      return;
    }

    const initializeMap = async () => {
      try {
        console.log("Starting map initialization");

        // Load CSS
        await Promise.all([
          loadCSS('https://unpkg.com/leaflet@1.8.0/dist/leaflet.css'),
          loadCSS('https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css')
        ]);

        // Load scripts
        await Promise.all([
          loadScript('https://unpkg.com/leaflet@1.8.0/dist/leaflet.js'),
          loadScript('https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js')
        ]);

        console.log("Leaflet scripts loaded");

        const L = window.L;
        if (!L) {
          throw new Error("Leaflet not loaded");
        }

        mapInstanceRef.current = L.map(mapRef.current).setView([19.114718, 72.838743], 11);
        const map = mapInstanceRef.current;

        console.log("Map instance created");

        const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
          maxZoom: 18
        }).addTo(map);

        console.log("Tile layer added");

        const taxiIcon = L.icon({
          iconUrl: taxi,
        //   taxi,
          iconSize: [70, 70]
        });

        markerRef.current = L.marker([19.114718, 72.838743], { icon: taxiIcon }).addTo(map);

        console.log("Marker added");

        map.on('click', function (e) {
          console.log("Map clicked", e);
          const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
          L.Routing.control({
            waypoints: [
              L.latLng(19.114718, 72.838743),
              L.latLng(e.latlng.lat, e.latlng.lng)
            ]
          }).on('routesfound', function (e) {
            console.log("Route found", e.routes);
            e.routes[0].coordinates.forEach(function (coord, index) {
              setTimeout(function () {
                markerRef.current.setLatLng([coord.lat, coord.lng]);
              }, 100 * index);
            });
          }).addTo(map);
        });

        console.log("Map initialization complete");
      } catch (err) {
        console.error("Error initializing map:", err);
        setError(err.message);
      }
    };

    initializeMap();

    return () => {
      console.log("Cleaning up map component");
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      // Remove added stylesheets
      document.querySelectorAll('link[data-leaflet]').forEach(el => el.remove());
    };
  }, []);

  const loadCSS = (href) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.leaflet = 'true';
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;