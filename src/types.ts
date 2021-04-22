export type Point = {
	lat: number;
	lon: number;
	ele: number;
	time: Date;
};

export type RouteBounds = {
	minLat: number;
	maxLat: number;
	minLon: number;
	maxLon: number;
	minEle: number;
	maxEle: number;
};
