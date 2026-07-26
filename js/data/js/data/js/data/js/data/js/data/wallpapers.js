/**
 * 壁纸页面渲染（静态 & 动态）
 */
window.renderWallpaperStatic = function () {
    renderWallpaper('static', '🖼️ 静态壁纸', '精美游戏壁纸收藏');
};

window.renderWallpaperLive = function () {
    renderWallpaper('live', '🎬 动态壁纸', '动态壁纸 / 视频壁纸展示');
};

function renderWallpaper(type, title, subtitle) {
    var all = window.DATA_WALLPAPERS || [];
    var data = all.filter(function (w) { return w.type === type; });
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
        html += '<div class="gallery-item" onclick="previewMedia(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">';
        if (type === 'static') {
            html += '<img src="' + (item.url || '') + '" alt="' + item.name + '" loading="lazy" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22225%22><rect fill=%221e293b%22 width=%22400%22 height=%22225%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 fill=%2264748b%22 font-size=%2216%22>暂无预览</text></svg>\'">';
        } else {
            html += '<video src="' + (item.url || '') + '" muted loop preload="metadata" onmouseover="this.play()" onmouseout="this.pause();this.currentTime=0;"></video>';
        }
        html += '<div class="gallery-label">' + item.name + '</div>';
        html += '</div>';
    });
    html += '</div>';
    html += '</div>';

    app.innerHTML = html;
}

window.previewMedia = function (item) {
    var innerHtml = '';
    if (item.type === 'static') {
        innerHtml = '<img src="' + item.url + '" alt="' + item.name + '" style="max-width:100%;max-height:70vh;border-radius:8px;margin:0 auto;display:block;" onerror="this.alt=\'图片加载失败\'">';
    } else {
        innerHtml = '<video src="' + item.url + '" controls autoplay style="max-width:100%;max-height:70vh;border-radius:8px;display:block;" onerror="this.outerHTML=\'<p style=color:var(--text-muted);>视频加载失败</p>\'"></video>';
    }

    var html = '<div class="modal-overlay" id="modal">' +
        '<div class="modal-content" style="text-align:center;">' +
        '<button class="modal-close" id="modalClose">&times;</button>' +
        '<h2>' + item.name + '</h2>' +
        innerHtml +
        (item.download ? '<a href="' + item.download + '" target="_blank" style="display:inline-block;margin-top:12px;padding:8px 24px;background:linear-gradient(135deg,var(--accent-cyan),var(--accent-purple));color:#fff;border-radius:8px;font-weight:600;">下载</a>' : '') +
        '</div></div>';

    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('modalClose').addEventListener('click', function () { document.getElementById('modal').remove(); });
    document.getElementById('modal').addEventListener('click', function (e) { if (e.target.id === 'modal') document.getElementById('modal').remove(); });
};
