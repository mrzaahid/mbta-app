"use client";

import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  longitude: number;
  latitude: number;
  zoom: number;
}

export default function Maps({ longitude, latitude, zoom }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map>(null);
  const markerRef = useRef<maplibregl.Marker>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=QydBibbo9H9r1oOeJwE9',
      center: [longitude, latitude],
      zoom: zoom
    });

    markerRef.current = new maplibregl.Marker({
      color: "#a07028",
      draggable: false 
    })
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); 

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLngLat([longitude, latitude]);
      mapRef.current.easeTo({
        center: [longitude, latitude],
        duration: 1000, 
        essential: true
      });
    }
  }, [longitude, latitude]); 

  return <div ref={mapContainer} style={{ height: '400px', width: '100%' }} className="rounded-lg" />;
}