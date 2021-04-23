import { getRoutePoints } from './route';
import { renderRoutePoints } from './renderRoutePoints';

const render = (route: string) => {
	getRoutePoints(route).then(renderRoutePoints);
};

var routeSelect = document.getElementById('route');
render(routeSelect.value);

document.getElementById('route').addEventListener('change', function () {
	render(this.value);
});
