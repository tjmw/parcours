import GpxParser from 'gpxparser';
import routeReference from './routeData/Bread_Cheese_Route.gpx';
import type { Point } from './types';

const rawGpxToPoints = (rawGpx: Foo): Point[] => {
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
