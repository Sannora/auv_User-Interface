import './LeafletMap.css'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-draw';

const DrawControl = () => {
  const map = useMap();
  const drawControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Feature group to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Draw Control configuration
    drawControlRef.current = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polyline: true,
        polygon: true,
        circle: false,
        marker: false,
        rectangle: false,
        circlemarker: false,
      },
    });

    map.addControl(drawControlRef.current);

    // Event listener: log drawn layer coords
    map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
        const latlngs = layer.getLatLngs();
        console.log("Çizilen koordinatlar:", latlngs);
      }
    });

    return () => {
      map.removeControl(drawControlRef.current);
    };
  }, [map]);

  return null;
};

const LiveLocationTracker = () => {
    const [location, setLocation] = useState(null);
    const map = useMap();

    useEffect(() => {
        if(!navigator.geolocation){
            console.error("Tarayıcı konum servisini desteklemiyor.");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPosition = [latitude, longitude];
                setLocation(newPosition);
                map.setView(newPosition, 15); // Haritayı güncelle
            },
            (error) => {
                console.error("Konum alınamadı:", error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [map]);

    return location ?(
        <Marker position={location} icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        })} />
    ) : null;
}

function LeafletMap(){

    return(

        <MapContainer className='leaflet-map-component' center={[39.9255, 32.8663]} zoom={6}>
            <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            <DrawControl />
            <LiveLocationTracker />
        </MapContainer>

    )

}

export default LeafletMap;