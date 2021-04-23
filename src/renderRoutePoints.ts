import * as THREE from 'three';
import { getRouteBounds } from './route';
import { Point } from './types';

const SHOULD_ROTATE = true;

const COLOR_MAPPINGS = [0xdaf7a6, 0x64d2ac, 0xffc300, 0xff5733, 0xc70039];

const colorFromEle = (ele: number, minEle: number, maxEle: number) => {
	const normalizedEle = THREE.MathUtils.mapLinear(ele, minEle, maxEle, 0, 5);
	return COLOR_MAPPINGS[Math.floor(normalizedEle)];
};

export const renderRoutePoints = (routePoints: Point[]) => {
	const { minLon, maxLon, minLat, maxLat, minEle, maxEle } = getRouteBounds(
		routePoints,
	);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		500,
	);
	camera.position.set(150, 0, 250);
	camera.lookAt(50, 75, 0);

	const scene = new THREE.Scene();

	// Y (lat - N/S) Z (ele)
	// |          /
	// |        /
	// |      /
	// |    /
	// |  /
	// |_______________X (lon - E/W)

	const map = new THREE.Group();

	routePoints.forEach((rp, idx) => {
		const nextRp = routePoints[idx + 1];

		if (nextRp) {
			const lineColor = colorFromEle(rp.ele, minEle, maxEle);
			const material = new THREE.LineBasicMaterial({ color: lineColor });

			// Start point
			const x = THREE.MathUtils.mapLinear(rp.lon, minLon, maxLon, 0, 100);
			const y = THREE.MathUtils.mapLinear(rp.lat, minLat, maxLat, 0, 150);
			const z = THREE.MathUtils.mapLinear(rp.ele, minEle, maxEle, 0, 20);
			const a = new THREE.Vector3(x, y, z);

			// End point
			const x1 = THREE.MathUtils.mapLinear(
				nextRp.lon,
				minLon,
				maxLon,
				0,
				100,
			);
			const y1 = THREE.MathUtils.mapLinear(
				nextRp.lat,
				minLat,
				maxLat,
				0,
				150,
			);
			const z1 = THREE.MathUtils.mapLinear(
				nextRp.ele,
				minEle,
				maxEle,
				0,
				20,
			);
			const b = new THREE.Vector3(x1, y1, z1);

			const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
			const line = new THREE.Line(geometry, material);
			map.add(line);
		}
	});

	scene.add(map);

	const animate = () => {
		requestAnimationFrame(animate);

		if (SHOULD_ROTATE) {
			map.rotation.y += 0.01;
		}

		renderer.render(scene, camera);
	};

	animate();
};
