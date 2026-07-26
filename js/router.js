/**
 * 王牌竞速数据整合站 — 客户端路由
 * 基于 URL hash 的无刷新 SPA 路由
 */
(function () {
    'use strict';

    const routes = {
        '':                     'renderHome',
        'home':                 'renderHome',
        'vehicles':             'renderVehicles',
        'balance':              'renderBalance',
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
        // 更新导航高亮
        document.querySelectorAll('.nav-links a').forEach(function (a) {
            var nav = a.getAttribute('data-nav');
            a.classList.toggle('active', nav === route || (route === 'home' && nav === 'home'));
        });
        // 移动端关闭菜单
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('navToggle').classList.remove('open');
    }

    // 初始化路由
    window.addEventListener('hashchange', navigate);

    // 暴露给 app.js
    window.Router = {
        navigate: navigate,
        getRoute: getRoute,
    };

})();
