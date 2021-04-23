import * as THREE from 'three';
import { getRouteBounds } from './route';
import { Point } from './types';

const SHOULD_ROTATE = true;

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

	const material = new THREE.LineBasicMaterial({ color: 0xf0f3f4 });
	const points = routePoints.map((rp: Point) => {
		const x = THREE.MathUtils.mapLinear(rp.lon, minLon, maxLon, 0, 100);
		const y = THREE.MathUtils.mapLinear(rp.lat, minLat, maxLat, 0, 150);
		const z = THREE.MathUtils.mapLinear(rp.ele, minEle, maxEle, 0, 20);
		return new THREE.Vector3(x, y, z);
	});

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const line = new THREE.Line(geometry, material);
	scene.add(line);


	const animate = () => {
		requestAnimationFrame(animate);

		if (SHOULD_ROTATE) {
			line.rotation.y += 0.01;
		}

		renderer.render(scene, camera);
	};

	animate();
};
