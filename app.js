/**
 * 王牌竞速数据整合站 — 主应用逻辑
 */
(function () {
    'use strict';

    var dataLoaded = false;
    var pendingHash = null;

    // ===== 数据加载 =====
    var DATA_FILES = [
        { key: 'DATA_VEHICLES', path: 'data/vehicles.json' },
        { key: 'DATA_BALANCE', path: 'data/balance.json' },
        { key: 'DATA_CHIPS', path: 'data/chips.json' },
        { key: 'DATA_EMPOWER', path: 'data/empower.json' },
        { key: 'DATA_RESOURCES', path: 'data/resources.json' },
        { key: 'DATA_WALLPAPERS', path: 'data/wallpapers.json' },
        { key: 'DATA_MEDIA', path: 'data/media.json' },
    ];

    function loadAllData(callback) {
        var remaining = DATA_FILES.length;

        DATA_FILES.forEach(function (item) {
            fetch(item.path)
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
                .then(function (data) {
                    window[item.key] = data;
                })
                .catch(function (err) {
                    console.warn('加载 ' + item.path + ' 失败:', err.message);
                    window[item.key] = [];
                })
                .finally(function () {
                    remaining--;
                    if (remaining === 0 && callback) callback();
                });
        });
    }

    // ===== 导航栏交互 =====
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });

    // ===== 路由缓冲：数据加载前的 hash 变更暂存 =====
    window.addEventListener('hashchange', function () {
        var modal = document.getElementById('modal');
        if (modal) modal.remove();

        if (dataLoaded && window.Router) {
            window.Router.navigate();
        } else {
            pendingHash = window.location.hash;
        }
    });

    // ===== 初始化 =====
    loadAllData(function () {
        dataLoaded = true;
        if (window.Router) {
            var hash = pendingHash || window.location.hash;
            if (!hash || hash === '#') {
                window.location.hash = '#/home';
            } else {
                // hashchange 事件会触发 Router.navigate()
                window.Router.navigate();
            }
        }
        console.log('🏎️ 王牌竞速数据整合站已启动');
    });
})();
