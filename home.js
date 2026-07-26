/**
 * 首页渲染
 */
window.renderHome = function () {
    const navItems = [
        { icon: '车辆',   name: '车辆数据',     desc: '全车辆图鉴与属性',   route: 'vehicles' },
        { icon: '平衡',   name: '平衡性调整',   desc: '版本更新调整记录',   route: 'balance' },
        { icon: '芯片',   name: '芯片系统',     desc: '芯片图鉴与搭配',     route: 'chips' },
        { icon: '赋能',   name: '赋能系统',     desc: '赋能模块与推荐',     route: 'empower' },
        { icon: '资源',   name: '资源获取',     desc: '全资源获取途径',     route: 'resources' },
        { icon: '壁纸',   name: '静态壁纸',     desc: '精美壁纸收藏',       route: 'wallpaper-static' },
        { icon: '动态',   name: '动态壁纸',     desc: '动态壁纸展示',       route: 'wallpaper-live' },
        { icon: 'CG',    name: 'CG',          desc: '游戏CG动画',         route: 'cg' },
        { icon: 'PV',    name: 'PV',          desc: '宣传视频合集',       route: 'pv' },
    ];

    const updates = window.DATA_BALANCE ? window.DATA_BALANCE.slice(0, 3) : [];

    var html = '<div class="page">';

    // Hero
    html += '<section class="hero">';
    html += '<h1>王牌竞速数据整合站</h1>';
    html += '<p>一站式查询车辆图鉴、芯片赋能攻略、版本平衡性调整与游戏媒体资源</p>';
    html += '</section>';

    // Quick Nav
    html += '<div class="quick-nav">';
    navItems.forEach(function (item) {
        html += '<div class="quick-card" onclick="window.location.hash=\'#/' + item.route + '\'">';
        html += '<div class="quick-icon">' + item.icon + '</div>';
        html += '<h3>' + item.name + '</h3>';
        html += '<p>' + item.desc + '</p>';
        html += '</div>';
    });
    html += '</div>';

    // Recent Updates
    if (updates.length) {
        html += '<section class="recent-updates">';
        html += '<h2>📰 最近更新</h2>';
        updates.forEach(function (u) {
            html += '<div class="update-item">';
            html += '<span class="version">' + (u.version || '') + '</span>';
            html += '<span class="date">' + (u.date || '') + '</span>';
            html += '<div class="desc">' + (u.summary || u.content || '') + '</div>';
            html += '</div>';
        });
        html += '</section>';
    }

    html += '</div>';

    document.getElementById('app').innerHTML = html;
};
