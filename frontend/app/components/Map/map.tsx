import { type LinksFunction } from "@vercel/remix";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof google !== "undefined" && google.maps) {
          resolve(); // Google Maps already loaded
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUGVkuwaettY7EMbUh6iwBWWZ3OwTYfHo&libraries=marker`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Google Maps script failed to load"));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadGoogleMapsScript();
        const { Map } = google.maps;
        const { AdvancedMarkerElement } = google.maps.marker;

        // Initialize the map
        const map = new Map(mapRef.current!, {
          center: { lat: 51.505, lng: -0.09 },
          zoom: 13,
        });

        // Create an AdvancedMarkerElement
        new AdvancedMarkerElement({
          map,
          position: { lat: 51.505, lng: -0.09 },
          title: "Advanced Marker",
          //   content:
          //     "<div style='padding: 5px; background: #fff; border: 1px solid #000;'>Hello World!</div>",
        });
      } catch (error) {
        console.error(error);
      }
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export const links: LinksFunction = () => [
  //   { rel: "stylesheet", href: leafletStyles },
];

export default MapComponent;
