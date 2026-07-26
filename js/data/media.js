/**
 * CG & PV 页面渲染
 */
window.renderCG = function () {
    renderMedia('cg', '🎥 CG', '游戏CG动画合集');
};

window.renderPV = function () {
    renderMedia('pv', '📺 PV', '宣传视频合集');
};

function renderMedia(type, title, subtitle) {
    var all = window.DATA_MEDIA || [];
    var data = all.filter(function (m) { return m.type === type; });
    var app = document.getElementById('app');

    var html = '<div class="page">';
    html += '<div class="page-header">';
    html += '<h1>' + title + '</h1>';
    html += '<p>' + subtitle + '</p>';
    html += '</div>';

    if (!data.length) {
        html += '<div style="text-align:center;padding:60px 0;color:var(--text-muted);"><p>暂无数据</p></div>';
        html += '</div>';
        app.innerHTML = html;
        return;
    }

    html += '<div class="gallery-grid">';
    data.forEach(function (item) {
        html += '<div class="gallery-item" onclick="playMedia(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">';
        if (item.thumbnail) {
            html += '<img src="' + item.thumbnail + '" alt="' + item.name + '" loading="lazy" onerror="this.style.display=\'none\'">';
        } else {
            html += '<div style="width:100%;height:100%;background:linear-gradient(135deg,#1e293b,#0f172a);display:flex;align-items:center;justify-content:center;font-size:3rem;">' + (type === 'cg' ? '🎥' : '📺') + '</div>';
        }
        html += '<div class="gallery-label">' +
            '<span style="display:block;font-size:0.8rem;">' + item.name + '</span>' +
            (item.duration ? '<span style="font-weight:400;font-size:0.7rem;color:var(--text-muted);">' + item.duration + '</span>' : '') +
            '</div>';
        html += '</div>';
    });
    html += '</div>';
    html += '</div>';

    app.innerHTML = html;
}

window.playMedia = function (item) {
    var html = '<div class="modal-overlay" id="modal">' +
        '<div class="modal-content">' +
        '<button class="modal-close" id="modalClose">&times;</button>' +
        '<h2>' + item.name + '</h2>' +
        '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;background:#000;">';

    if (item.embed_url) {
        // Embedded iframe (Bilibili / YouTube etc.)
        html += '<iframe src="' + item.embed_url + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe>';
    } else if (item.url) {
        html += '<video src="' + item.url + '" controls autoplay style="position:absolute;top:0;left:0;width:100%;height:100%;" onerror="this.outerHTML=\'<p style=color:var(--text-muted);text-align:center;padding:40px;>视频加载失败</p>\'"></video>';
    } else {
        html += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:var(--text-muted);">暂无视频源</div>';
    }

    html += '</div>' +
        (item.desc ? '<p style="color:var(--text-secondary);font-size:0.85rem;margin-top:12px;">' + item.desc + '</p>' : '') +
        '</div></div>';

    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('modalClose').addEventListener('click', function () { document.getElementById('modal').remove(); });
    document.getElementById('modal').addEventListener('click', function (e) { if (e.target.id === 'modal') document.getElementById('modal').remove(); });
};
