import GpxParser from 'gpxparser';
import routeReference from './routeData/Bread_Cheese_Route.gpx';
import type { Point, RouteBounds } from './types';

const rawGpxToPoints = (rawGpx: string): Point[] => {
	const gpx = new GpxParser();
	gpx.parse(rawGpx);
	return gpx.tracks[0].points;
};

export const getRoutePoints = (): Promise<Point[]> => {
	return fetch(routeReference)
		.then((response) => {
			return response.text();
		})
		.then((rawGpxData) => {
			return rawGpxToPoints(rawGpxData);
		});
};

export const getRouteBounds = (points: Point[]): RouteBounds => {
	const lons = points.map((p) => p.lon);
	const lats = points.map((p) => p.lat);
	const eles = points.map((p) => p.ele);

	return {
		minLon: Math.min(...lons),
		maxLon: Math.max(...lons),
		minLat: Math.min(...lats),
		maxLat: Math.max(...lats),
		minEle: Math.min(...eles),
		maxEle: Math.max(...eles),
	};
};
