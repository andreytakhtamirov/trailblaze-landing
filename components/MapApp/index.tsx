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
  const [isSettingOrigin, setIsSettingOrigin] = useState<boolean | null>(true);
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

    setIsSettingOrigin(prev => {
      if (prev != null) {
        const isUpdateOriginMarker = updateMarker(prev, e.lngLat);
        if (originMarkerRef.current == null || destinationMarkerRef.current == null) {
          return isUpdateOriginMarker;
        }
      }
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

  const handleMarkerUpdate = () => {
    setOriginPoint(originMarkerRef.current?.getLngLat() ?? null);
    setDestinationPoint(destinationMarkerRef.current?.getLngLat() ?? null);
  };

  async function getRoute() {
    if (originPoint == null || destinationPoint == null || selectedActivity == null) {
      return;
    }

    const influence: number = 10 ** sliderValue;

    const data = await fetchRoute(selectedActivity, [originPoint, destinationPoint], influence);

    console.log(data);
    await removeRoutes();

    const seen = new Set<string>();
    data.paths = data.paths.filter((path: { points: string; }) => {
      const serialized = JSON.stringify(decodeWithElevation(path.points).points);
      if (seen.has(serialized)) {
        return false;
      }
      seen.add(serialized);
      return true;
    });

    data.paths.reverse().forEach((path: { points: string }, index: number) => {
      const points = path.points;
      const decoded = decodeWithElevation(points)
      displayRoute(decoded.points, index, index == data.paths.length - 1);
    });
  }


  function displayRoute(coordinates: GeoJSON.Position[], index: number, isPrimary: boolean) {
    if (mapRef?.current == null) {
      return;
    }

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
        'line-color': isPrimary ? '#FF0000' : '#808080',
        'line-width': 4,
      },
    });

    // mapRef.current.cameraForBounds()
  }

  async function removeRoutes(): Promise<void> {
    if (mapRef?.current == null) {
      return;
    }

    // Remove all layers and sources 1-n stopping at the first encountered null.
    let index = 0;
    let layer: any | null = mapRef.current.getLayer(`route-${index}`);
    while (layer != null) {
      mapRef.current.removeLayer(`route-${index}`);
      if (mapRef.current.getSource(`route-${index}`) != null) {
        mapRef.current.removeSource(`route-${index}`);
      }
      index++;
      layer = mapRef.current.getLayer(`route-${index}`);
    }
  }

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };


  return <>
    <div className="flex flex-col xl:flex-row w-full gap-4">
      <div className="flex flex-col w-full xl:w-1/3 2xl:w-fit gap-4">
        <div className="flex flex-col py-2 gap-4 xl:gap-8 lg:items-center">

          {/* Locations, Slider, and Transportation Mode Section */}
          <div className="flex flex-col xl:flex-row justify-between items-center w-full xl:justify-center">
            <div className="p-4 gap-8 sm:max-w-[450px] md:max-w-[1000px] w-full grid grid-flow-cols grid-cols-1 xl:w-auto border-2 rounded-xl">
              <div className="border-b-4 pb-4">
                <Locations
                  isSettingOrigin={isSettingOrigin}
                  originPoint={originPoint}
                  destinationPoint={destinationPoint}
                  onClickOrigin={() => setIsSettingOrigin(prev => {
                    if (prev === true) {
                      return null;
                    }

                    return true;
                  })}
                  onClickDestination={() => setIsSettingOrigin(prev => {
                    if (prev === false) {
                      return null;
                    }

                    return false;
                  })}
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
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 xl:w-2/3 2xl:w-fit">
        <div
          id="map-container"
          className="rounded-md w-full h-[70vh] max-h-[1000px]"
          ref={mapContainer}
        />
      </div>
    </div>
  </>
}