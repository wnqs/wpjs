/**
 * 游戏资源获取页渲染
 */
window.renderResources = function () {
    var data = window.DATA_RESOURCES || [];
    var app = document.getElementById('app');

    var html = '<div class="page">';
    html += '<div class="page-header">';
    html += '<h1>📦 游戏资源获取</h1>';
    html += '<p>各类资源的获取途径一览</p>';
    html += '</div>';

    if (!data.length) {
        html += '<div style="text-align:center;padding:60px 0;color:var(--text-muted);"><p>暂无数据</p></div>';
        html += '</div>';
        app.innerHTML = html;
        return;
    }

    html += '<div class="data-table-wrap">';
    html += '<table class="data-table">';
    html += '<thead><tr><th>资源名称</th><th>类型</th><th>获取途径</th><th>备注</th></tr></thead>';
    html += '<tbody>';
    data.forEach(function (item) {
        html += '<tr>';
        html += '<td style="font-weight:600;color:var(--text-primary);">' + (item.icon || '') + ' ' + item.name + '</td>';
        html += '<td>' + (item.type || '-') + '</td>';
        html += '<td>' + (Array.isArray(item.ways) ? item.ways.join('<br>') : item.ways || '-') + '</td>';
        html += '<td style="color:var(--text-muted);font-size:0.82rem;">' + (item.notes || '-') + '</td>';
        html += '</tr>';
    });
    html += '</tbody></table>';
    html += '</div>';
    html += '</div>';

    app.innerHTML = html;
};
