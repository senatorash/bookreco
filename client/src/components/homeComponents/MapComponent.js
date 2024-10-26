import { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapComponent = ({ apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMarker = () => {
      if (window.google && window.google.maps && window.google.maps.marker) {
        const { AdvancedMarkerElement } = window.google.maps.marker;

        if (AdvancedMarkerElement) {
          // Use AdvancedMarkerElement if available
          new AdvancedMarkerElement({
            map: mapRef.current,
            position: center,
          });
        } else {
          // Fallback to standard Marker if AdvancedMarkerElement is unavailable
          new window.google.maps.Marker({
            map: mapRef.current,
            position: center,
          });
        }
      }
    };

    // Run marker initialization if mapRef is assigned
    if (mapRef.current) {
      initializeMarker();
    }
  }, [mapRef.current]);

  return (
    <div className="map_container">
      <div className="map">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          />
        </LoadScript>
      </div>
    </div>
  );
};

export default MapComponent;
