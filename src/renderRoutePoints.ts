import * as THREE from 'three';
import { getRouteBounds } from './route';
import { Point } from './types';

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

	// const g = new THREE.BoxGeometry();
	// const m = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	// const cube = new THREE.Mesh(g, m);
	// cube.position.set(-1, 1, -10);
	// scene.add(cube);

	// Y (ele)      Z (lat - North/South)
	// |          /
	// |        /
	// |      /
	// |    /
	// |  /
	// |_______________X (lon - East/West)

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

	// const scene = new THREE.Scene();
	// const camera = new THREE.PerspectiveCamera(
	// 	75,
	// 	window.innerWidth / window.innerHeight,
	// 	0.1,
	// 	1000,
	// );

	// const geometry = new THREE.BoxGeometry();
	// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	// const cube = new THREE.Mesh(geometry, material);
	// scene.add(cube);

	// camera.position.z = 5;

	// const renderer = new THREE.WebGLRenderer();
	// renderer.setSize(window.innerWidth, window.innerHeight);
	// document.body.appendChild(renderer.domElement);

	const animate = () => {
		requestAnimationFrame(animate);
		// line.rotation.x += 0.01;
		// line.rotation.y += 0.01;
		// line.rotation.z += 0.01;
		renderer.render(scene, camera);
	};

	animate();
};
