'use client'

import Slider from '@/components/MapApp/Controls/Slider';
import TransporationMode from '@/components/MapApp/Controls/TransportationMode';
import { fetchRoute } from '@/requests/fetchRoute';
import { decodeWithElevation } from '@/util/polylineDecode';
import mapboxgl, { LngLat } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from 'react';


export default function MapApp() {

  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isSettingOrigin, setIsSettingOrigin] = useState<boolean>(true);
  const originMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destinationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [originLabel, setOriginLabel] = useState(markerToString(originMarkerRef));
  const [destinationLabel, setDestinationLabel] = useState(markerToString(destinationMarkerRef));

  const [selectedActivity, setSelectedActivity] = useState("walking");
  const [sliderValue, setSliderValue] = useState(3);

  const initializeMap = () => {
    if (mapboxAccessToken != null) {
      mapboxgl.accessToken = mapboxAccessToken;
    }

    return new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-80.543, 43.472],
      zoom: 10
    });
  };

  const handleMapClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    if (!mapRef.current) return;

    setIsSettingOrigin(prev => {
      return updateMarker(prev, e.lngLat);
    });
  }, []);

  const updateMarker = (isOrigin: boolean, lngLat: LngLat) => {
    const markerRef = isOrigin ? originMarkerRef : destinationMarkerRef;
    const onDragEnd = isOrigin ? onDragOrigin : onDragDestination;

    if (markerRef.current) {
      markerRef.current.setLngLat(lngLat);
      handleMarkerUpdate();
      return !isOrigin;
    }

    const newMarker = new mapboxgl.Marker({ color: isOrigin ? '#FF0000' : '#0000FF' })
      .setLngLat(lngLat)
      .setDraggable(true)
      .addTo(mapRef.current!)
      .on('dragend', onDragEnd);

    markerRef.current = newMarker;
    handleMarkerUpdate();
    return !isOrigin;
  };

  function onDragOrigin() {
    updateMarker(true, originMarkerRef.current!.getLngLat());
  }

  function onDragDestination() {
    updateMarker(false, destinationMarkerRef.current!.getLngLat());
  }

  useEffect(() => {
    mapRef.current = initializeMap();
    mapRef.current.on('click', handleMapClick);

    return () => {
      mapRef.current?.off('click', handleMapClick);
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    getRoute();
  }, [originLabel, destinationLabel, sliderValue, selectedActivity]);

  const resetMarkers = () => {
    originMarkerRef.current?.remove();
    destinationMarkerRef.current?.remove();
    originMarkerRef.current = null;
    destinationMarkerRef.current = null;
    setOriginLabel(markerToString(null));
    setDestinationLabel(markerToString(null));
    setIsSettingOrigin(true);
    // removeRoute();
  };

  function markerToString(markerRef: React.RefObject<mapboxgl.Marker> | null) {
    const lngLat = markerRef?.current?.getLngLat();
    if (!lngLat) {
      return "Not Selected";
    }

    const { lng, lat } = lngLat;
    return `${lng.toFixed(3)}, ${lat.toFixed(3)}`;
  }

  const handleMarkerUpdate = () => {
    setOriginLabel(markerToString(originMarkerRef));
    setDestinationLabel(markerToString(destinationMarkerRef));
  };

  async function getRoute() {
    if (originMarkerRef.current == null || destinationMarkerRef.current == null) {
      return;
    }

    const influence: number = 10 ** sliderValue;

    console.log(influence);

    const data = await fetchRoute(selectedActivity, [originMarkerRef.current!.getLngLat(), destinationMarkerRef.current!.getLngLat()], influence);

    console.log(data);

    const maxIndex = data.paths.length - 1;
    data.paths.reverse().forEach((path: { points: string; }, index: number) => {
      const points = path.points;
      const decoded = decodeWithElevation(points)
      console.log(decoded);

      displayRoute(decoded.points, index, maxIndex);
    });
  }


  function displayRoute(coordinates: GeoJSON.Position[], index: number, maxIndex: number) {
    if (mapRef?.current == null) {
      return;
    }

    removeRoute(index);

    mapRef.current.addSource(`route-${index}`, {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": coordinates
        },
      },
    });

    mapRef.current.addLayer({
      'id': `route-${index}`,
      'type': 'line',
      'source': `route-${index}`,
      'paint': {
        'line-color': index == maxIndex ? '#FF0000' : '#808080',
        'line-width': 4,
      },
    });

    // mapRef.current.cameraForBounds()
  }

  function removeRoute(index: number) {
    if (mapRef?.current == null) {
      return;
    }

    if (mapRef.current.getLayer(`route-${index}`) != null) {
      mapRef.current.removeLayer(`route-${index}`);
    }

    if (mapRef.current.getSource(`route-${index}`) != null) {
      mapRef.current.removeSource(`route-${index}`);
    }
  }

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };


  return <>
    <div className="grid py-2 gap-4 grid-flow-col">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetMarkers}>Reset</button>

      <div className="grid py-2 gap-16 grid-flow-row">
        <p>Origin: {originLabel}</p>
      </div>

      <div className="grid py-2 gap-16 grid-flow-row">
        <p>Destination: {destinationLabel}</p>
      </div>

      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={getRoute}>Find Route</button>
    </div>
    < TransporationMode setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} />
    <div className="flex flex-col items-center gap-2 p-4">
      <label htmlFor="slider" className="text-center text-gray-700">
        Influence: {sliderValue}
      </label>
      <Slider value={sliderValue} onChange={handleSliderChange} />
    </div>
    <div className="shadow-three grid place-items-center pt-4">
      <div id="map-container" className="rounded-md w-[100%] h-[500px]" ref={mapContainer} />
    </div>
  </>
}