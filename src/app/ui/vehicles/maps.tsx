   // components/Map.tsx
   "use client";

   import React, { useRef, useEffect } from 'react';
   import { Marker } from 'maplibre-gl';
   import maplibregl from 'maplibre-gl';
   import 'maplibre-gl/dist/maplibre-gl.css';

   interface MapProps {
     longitude: number;
     latitude: number;
     zoom: number;
   }


   export default function Maps(data : MapProps){
     const mapContainer = useRef<HTMLDivElement>(null);

     useEffect(() => {
        
       if (!mapContainer.current) return;

       const map = new maplibregl.Map({
         container: mapContainer.current,
         style: 'https://api.maptiler.com/maps/streets/style.json?key=QydBibbo9H9r1oOeJwE9', // Or your custom style
         center: [data.longitude, data.latitude],
         zoom: data.zoom
       });
       const marker = new Marker({
            color: "#a07028",
            draggable: true
        }).setLngLat([data.longitude, data.latitude])
        .addTo(map);
        
       return () => {map.remove();
        marker.remove();
       };
     }, [data.longitude, data.latitude, data.zoom]);

     return <div ref={mapContainer} style={{ height: '400px', width: '100%' }} />;
   };
