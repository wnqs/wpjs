/**
 * 王牌竞速数据整合站 — 客户端路由
 */
(function () {
    'use strict';

    const routes = {
        '':                     'renderHome',
        'home':                 'renderHome',
        'vehicles':             'renderVehicles',
        'balance':              'renderBalance',
        'calculator':           'renderCalculator',
        'chips':                'renderChips',
        'empower':              'renderEmpower',
        'resources':            'renderResources',
        'wallpaper-static':     'renderWallpaperStatic',
        'wallpaper-live':       'renderWallpaperLive',
        'cg':                   'renderCG',
        'pv':                   'renderPV',
    };

    function getRoute() {
        const hash = window.location.hash.replace('#/', '').replace('#', '').split('/')[0].toLowerCase();
        return routes[hash] ? hash : 'home';
    }

    function navigate() {
        const route = getRoute();
        const renderFn = window[routes[route]];
        if (typeof renderFn === 'function') {
            renderFn();
        }
        document.querySelectorAll('.nav-links a').forEach(function (a) {
            var href = a.getAttribute('href');
            a.classList.toggle('active', href === '#/' + route || (route === 'home' && href === '#/'));
        });
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('navToggle').classList.remove('open');
    }

    window.addEventListener('hashchange', navigate);

    window.Router = {
        navigate: navigate,
        getRoute: getRoute,
    };

})();
