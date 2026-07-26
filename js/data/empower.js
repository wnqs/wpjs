/**
 * 赋能系统页渲染
 */
window.renderEmpower = function () {
    var data = window.DATA_EMPOWER || [];
    var app = document.getElementById('app');

    var html = '<div class="page">';
    html += '<div class="page-header">';
    html += '<h1>🔮 赋能系统</h1>';
    html += '<p>赋能模块图鉴 — 效果 / 解锁 / 推荐方案</p>';
    html += '</div>';

    if (!data.length) {
        html += '<div style="text-align:center;padding:60px 0;color:var(--text-muted);"><p>暂无数据</p></div>';
        html += '</div>';
        app.innerHTML = html;
        return;
    }

    html += '<div class="card-grid" id="empowerGrid">';
    data.forEach(function (item, idx) {
        html += '<div class="card" data-empower-idx="' + idx + '">';
        html += '<div class="card-body">';
        html += '<h3>' + (item.icon || '🔮') + ' ' + item.name + '</h3>';
        html += '<div class="tags">';
        if (item.type) html += '<span class="tag" style="background:rgba(168,85,247,0.2);color:var(--accent-purple);">' + item.type + '</span>';
        html += '</div>';
        html += '<div class="desc">' + (item.effect || '') + '</div>';
        if (item.unlock) html += '<div class="meta">解锁条件：' + item.unlock + '</div>';
        html += '</div></div>';
    });
    html += '</div>';
    html += '</div>';

    app.innerHTML = html;

    // Event delegation for card clicks
    document.getElementById('empowerGrid').addEventListener('click', function (e) {
        var card = e.target.closest('.card');
        if (!card) return;
        var idx = parseInt(card.getAttribute('data-empower-idx'), 10);
        if (!isNaN(idx) && data[idx]) {
            showEmpowerDetail(data[idx]);
        }
    });
};

window.showEmpowerDetail = function (item) {
    var html = '<div class="modal-overlay" id="modal">' +
        '<div class="modal-content">' +
        '<button class="modal-close" id="modalClose">&times;</button>' +
        '<h2>' + (item.icon || '🔮') + ' ' + item.name + '</h2>' +
        '<table class="info-table">' +
        (item.type ? '<tr><td>类型</td><td>' + item.type + '</td></tr>' : '') +
        (item.effect ? '<tr><td>效果</td><td>' + item.effect + '</td></tr>' : '') +
        (item.unlock ? '<tr><td>解锁条件</td><td>' + item.unlock + '</td></tr>' : '') +
        (item.level_max ? '<tr><td>最高等级</td><td>' + item.level_max + '</td></tr>' : '') +
        (item.recommend ? '<tr><td>推荐方案</td><td>' + item.recommend + '</td></tr>' : '') +
        '</table>' +
        '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('modalClose').addEventListener('click', function () { document.getElementById('modal').remove(); });
    document.getElementById('modal').addEventListener('click', function (e) { if (e.target.id === 'modal') document.getElementById('modal').remove(); });
};
