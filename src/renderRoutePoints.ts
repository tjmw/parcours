import * as THREE from 'three';
import { Point } from './types';

export const renderRoutePoints = (routePoints: Point[]) => {
	const minLon = Math.min(...routePoints.map((p) => p.lon));
	const maxLon = Math.max(...routePoints.map((p) => p.lon));
	const minLat = Math.min(...routePoints.map((p) => p.lat));
	const maxLat = Math.max(...routePoints.map((p) => p.lat));
	const minEle = Math.min(...routePoints.map((p) => p.ele));
	const maxEle = Math.max(...routePoints.map((p) => p.ele));
	console.log({ minLon, maxLon, minLat, maxLat, minEle, maxEle });

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		500,
	);
	camera.position.set(75, 0, 200);
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

	const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
	const points = routePoints.map((rp: Point) => {
		const x = THREE.MathUtils.mapLinear(rp.lon, minLon, maxLon, 0, 100);
		const y = THREE.MathUtils.mapLinear(rp.lat, minLat, maxLat, 0, 150);
		const z = THREE.MathUtils.mapLinear(rp.ele, minEle, maxEle, 0, 20);
		return new THREE.Vector3(x, y, z);
	});

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const line = new THREE.Line(geometry, material);
	scene.add(line);

	renderer.render(scene, camera);

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
		console.log('rotate!');
		// line.rotation.x += 0.01;
		line.rotation.y += 0.01;
		// line.rotation.z += 0.01;
		renderer.render(scene, camera);
	};

	// animate();
};
