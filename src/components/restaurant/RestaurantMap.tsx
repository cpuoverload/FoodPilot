import { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import { Restaurant } from '../../types';

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

declare global {
  interface Window {
    BMap: any;
  }
}

function RestaurantMap({ restaurants }: RestaurantMapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const BMap = window.BMap;
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = new BMap.Map(mapRef.current);
      const point = new BMap.Point(121.4737, 31.2304);
      mapInstance.current.centerAndZoom(point, 15);
      mapInstance.current.enableScrollWheelZoom();
    }

    restaurants.forEach(restaurant => {
      const point = new BMap.Point(restaurant.location.lng, restaurant.location.lat);
      const marker = new BMap.Marker(point);
      const label = new BMap.Label(restaurant.name, { offset: new BMap.Size(20, -10) });
      marker.setLabel(label);
      mapInstance.current.addOverlay(marker);
    });
  }, [restaurants]);

  return (
    <Paper elevation={3} sx={{ position: 'sticky', top: 20 }}>
      <div ref={mapRef} style={{ height: '600px', width: '100%' }} />
    </Paper>
  );
}

export default RestaurantMap; 