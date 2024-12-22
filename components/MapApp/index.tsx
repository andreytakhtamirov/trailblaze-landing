'use client'

import Slider from '@/components/MapApp/Controls/Slider';
import TransportationMode from '@/components/MapApp/Controls/TransportationMode';
import Locations from '@/components/MapApp/Controls/Locations'
import { fetchRoute } from '@/requests/fetchRoute';
import mapboxgl, { LngLat } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Route } from '@/types/route';
import { decodeWithElevation } from '@/util/polylineDecode';
import Metrics from './Details/Metrics';
import { PolylineUtil } from '@/util/polyline';
import { MetricType } from '@/chart/metricsChart';
import { FormatHelper } from '@/util/formatHelper';

interface SelectedMetricState {
  metric: string | null;
  metricType: MetricType | null;
}

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

  const [routes, setRoutes] = useState<Array<Route> | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<SelectedMetricState>({
    metric: null,
    metricType: null,
  });

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

  const handleResize = () => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  };

  useEffect(() => {
    mapRef.current = initializeMap();
    mapRef.current.on('click', handleMapClick);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mapRef.current?.off('click', handleMapClick);
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    getRoute();
  }, [originPoint, destinationPoint, sliderValue, selectedActivity]);

  useEffect(() => {
    handleResize();
  }, [selectedRoute]);

  useEffect(() => {
    if (routes == null || routes.length === 0) {
      return;
    }

    const updateRoutes = async () => {
      await removeRoutes();

      setSelectedRoute(routes[routes.length - 1]);

      for (let route of routes) {
        displayRoute(route);
      }
    };

    updateRoutes();
  }, [routes]);

  useEffect(() => {
    const showMetric = async () => {
      if (mapRef.current == null || selectedMetric.metricType == null || selectedMetric.metric == null || selectedRoute == null) {
        return;
      }

      await removeMapMetrics();

      const metric = selectedMetric.metricType === MetricType.surface ? selectedRoute.surfacePolylines : selectedRoute.roadClassPolylines;
      const lineLayer = PolylineUtil.getLineLayer('metric', 'metric', "#FFFFFF", { isMetric: true });
      const source = PolylineUtil.getMultiLineSource(metric[selectedMetric.metric]);
      mapRef.current.addSource('metric', source);
      mapRef.current.addLayer(lineLayer);
    };

    showMetric();
  }, [selectedMetric]);

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

    const newRoutes: Array<Route> = [];

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
      const route = new Route(
        'route-' + index,
        'route-' + index,
        path,
        index === 0,
      );

      newRoutes.push(route);
    });

    setRoutes(newRoutes.reverse());
  }

  function displayRoute(route: Route) {
    if (mapRef?.current == null) {
      return;
    }

    mapRef.current.addSource(route.sourceId, route.sourceLayer);
    mapRef.current.addLayer(route.lineLayer);
  }

  async function removeRoutes(): Promise<void> {
    setSelectedRoute(null);
    setSelectedMetric({ metric: null, metricType: null });
    if (mapRef?.current == null) {
      return;
    }

    await removeMapMetrics();

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

  async function removeMapMetrics() {
    if (mapRef?.current == null) {
      return;
    }

    if (mapRef.current.getLayer('metric')) {
      mapRef.current.removeLayer('metric');
    }

    if (mapRef.current.getSource('metric')) {
      mapRef.current.removeSource('metric');
    }
  }

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };


  return <>
    <div className="flex flex-col xl:flex-row w-full gap-4">
      <div className="flex flex-col w-full xl:w-1/3 2xl:w-fit gap-4">
        <div className="flex flex-col py-2 gap-4 xl:gap-4 lg:items-center">

          {/* Locations, Slider, and Transportation Mode Section */}
          <div className="flex flex-col xl:flex-row justify-between items-center w-full xl:justify-center">
            <div className="p-4 gap-8 w-full grid grid-flow-cols grid-cols-1 xl:w-auto border-2 rounded-xl">
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
          {selectedRoute != null &&
            <div className="flex flex-col xl:flex-row justify-between items-center w-full xl:justify-center">
              <div className="p-4 gap-2 xl:max-w-[516px] w-full grid grid-flow-cols grid-cols-1 xl:w-auto border-2 rounded-xl">
                <div className="text-lg font-bold">
                  Route Info
                </div>
                <div className="grid grid-flow-col grid-cols-2 mx-2">
                  <div className="sm:max-w-[450px] md:max-w-[1000px]">
                    {selectedRoute != null && <Metrics route={selectedRoute!} type={MetricType.surface} selectedMetric={selectedMetric.metric} onMetricSelect={(metric: string) => {
                      setSelectedMetric({ metricType: MetricType.surface, metric: metric });
                    }} />}
                  </div>
                  <div className="sm:max-w-[450px] md:max-w-[1000px]">
                    {selectedRoute != null && <Metrics route={selectedRoute!} type={MetricType.roadClass} selectedMetric={selectedMetric.metric} onMetricSelect={(metric: string) => {
                      setSelectedMetric({ metricType: MetricType.roadClass, metric: metric });
                    }} />}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="flex-1 xl:w-2/3 2xl:w-fit relative">
        {/* Map Container */}
        <div
          id="map-container"
          className="rounded-md w-full xs:h-[50vh] sm:h-[50vh] md:min-h-full relative"
          ref={mapContainer}
        >
          {/* Route Info Overlay */}
          {selectedRoute && (
            <div
              className="absolute top-4 left-4 pointer-events-none"
            >
              <div
                className="bg-white bg-opacity-90 p-4 rounded-md shadow-md text-left pointer-events-auto"
              >
                <div className="text-md font-medium">
                  Distance: {FormatHelper.formatDistancePrecise(selectedRoute.distance, false, true)}
                </div>
                <div className="text-md font-medium">
                  Duration: {FormatHelper.formatDuration(selectedRoute.duration)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
}