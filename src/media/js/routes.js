(function() {

// Please leave quotes around keys! They're needed for Space Heater.
var routes = window.routes = [
    {'pattern': '^/tests$', 'view_name': 'tests'},
    {'pattern': '^/fxa-authorize$', 'view_name': 'fxa_authorize'},
];

define('routes', [
    'routes_static',
    'views/static',
    'views/tests',
    'views/fxa_authorize',
], function(routes_static, static_view) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        route.view = require('views/' + route.view_name);
    }
    Object.keys(routes_static).forEach(function(key) {
        routes.push({
            pattern: '^' + routes_static[key].path + '$',
            view_name: 'static',
            view: static_view,
        });
    });
    return routes;
});

})();
