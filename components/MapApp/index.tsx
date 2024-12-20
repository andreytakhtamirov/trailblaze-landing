'use client'

import Slider from '@/components/MapApp/Controls/Slider';
import TransportationMode from '@/components/MapApp/Controls/TransportationMode';
import Locations from '@/components/MapApp/Controls/Locations'
import { fetchRoute } from '@/requests/fetchRoute';
import { decodeWithElevation } from '@/util/polylineDecode';
import mapboxgl, { LngLat } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from 'react';


export default function MapApp() {

  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isSettingOrigin, setIsSettingOrigin] = useState<boolean | null>(null);
  const originMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destinationMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [originPoint, setOriginPoint] = useState<LngLat | null>(null);
  const [destinationPoint, setDestinationPoint] = useState<LngLat | null>(null);

  const [selectedActivity, setSelectedActivity] = useState("walking");
  const [sliderValue, setSliderValue] = useState(6);

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
    if (isSettingOrigin == null) return;

    alert(`here: ${isSettingOrigin}`);

    setIsSettingOrigin(prev => {
      if (prev != null) {
        const isUpdateOriginMarker = updateMarker(prev, e.lngLat);
        if (originMarkerRef.current == null || destinationMarkerRef.current == null) {
          alert(`is update origin marker : ${isUpdateOriginMarker}`);
          return isUpdateOriginMarker;
        }
      }

      alert("null");

      return null;
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
  }, [originPoint, destinationPoint, sliderValue, selectedActivity]);

  const resetMarkers = () => {
    originMarkerRef.current?.remove();
    destinationMarkerRef.current?.remove();
    originMarkerRef.current = null;
    destinationMarkerRef.current = null;
    setOriginPoint(null);
    setDestinationPoint(null);
    setIsSettingOrigin(null);
    // removeRoute();
  };

  const handleMarkerUpdate = () => {
    setOriginPoint(originMarkerRef.current?.getLngLat() ?? null);
    setDestinationPoint(originMarkerRef.current?.getLngLat() ?? null);
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
    <div className="flex flex-col xl:flex-row w-full gap-4">
      <div className="flex flex-col w-full xl:w-1/3 gap-4">
        <div className="flex flex-col py-2 gap-4 xl:gap-8 lg:items-center">

          {/* Locations, Slider, and Transportation Mode Section */}
          <div className="flex flex-col xl:flex-row justify-between items-center w-full xl:justify-center">
            <div className="p-4 gap-8 sm:max-w-[450px] md:max-w-[1000px] w-full grid grid-flow-cols grid-cols-1 xl:w-auto border-2 rounded-xl">
              <div className="border-b-4 pb-4">
                <Locations
                  isSettingOrigin={isSettingOrigin}
                  originPoint={originPoint}
                  destinationPoint={destinationPoint}
                  onClickOrigin={() => setIsSettingOrigin(true)}
                  onClickDestination={() => setIsSettingOrigin(false)}
                />
              </div>
              <Slider value={sliderValue} onChange={handleSliderChange} />
              <div className="w-full">
                <TransportationMode
                  setSelectedActivity={setSelectedActivity}
                  selectedActivity={selectedActivity}
                />
              </div>
            </div>
          </div>

          {/* Bottom row for Reset Button and Find Route Button */}
          {false &&
            <div className="flex xl:flex-row flex-col xl:justify-between xl:pt-4 pt-2 gap-4 w-full xs:flex-row xs:justify-between lg:px-8">
              {/* Reset Button */}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={resetMarkers}
              >
                Reset
              </button>

              {/* Find Route Button */}
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={getRoute}
              >
                Find Route
              </button>
            </div>
          }
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 xl:w-2/3">
        <div
          id="map-container"
          className="rounded-md w-full h-[70vh] max-h-[1000px]"
          ref={mapContainer}
        />
      </div>
    </div>
  </>
}