/**
 * 平衡性调整页渲染
 */
window.renderBalance = function () {
    var data = window.DATA_BALANCE || [];
    var app = document.getElementById('app');

    var html = '<div class="page">';
    html += '<div class="page-header">';
    html += '<h1>⚖️ 平衡性调整</h1>';
    html += '<p>各版本车辆 / 芯片 / 赋能系统调整记录</p>';
    html += '</div>';

    if (!data.length) {
        html += '<div style="text-align:center;padding:60px 0;color:var(--text-muted);"><p>暂无数据</p></div>';
    } else {
        data.forEach(function (item) {
            html += '<div class="update-item" style="margin-bottom:14px;">';
            html += '<span class="version">' + (item.version || '') + '</span>';
            html += '<span class="date">' + (item.date || '') + '</span>';
            html += '<div class="desc" style="margin-top:8px;">' + renderBalanceContent(item) + '</div>';
            html += '</div>';
        });
    }

    html += '</div>';
    app.innerHTML = html;
};

function renderBalanceContent(item) {
    var html = '';
    if (item.summary) {
        html += '<p style="color:var(--text-secondary);margin-bottom:8px;">' + item.summary + '</p>';
    }
    if (Array.isArray(item.changes)) {
        item.changes.forEach(function (c) {
            var arrow = c.direction === '增强' ? '⬆️' : c.direction === '削弱' ? '⬇️' : c.direction === '调整' ? '🔄' : '';
            html += '<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">';
            html += '<span style="color:var(--accent-cyan);font-weight:600;">' + (c.target || '') + '</span> ';
            if (arrow) html += '<span>' + arrow + '</span> ';
            html += '<span style="color:var(--text-secondary);font-size:0.88rem;">' + (c.content || '') + '</span>';
            html += '</div>';
        });
    }
    if (item.content) {
        html += '<p style="color:var(--text-secondary);font-size:0.88rem;">' + item.content + '</p>';
    }
    return html;
}
