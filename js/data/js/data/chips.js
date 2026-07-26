/**
 * 芯片系统页渲染
 */
window.renderChips = function () {
    var chips = window.DATA_CHIPS || [];
    var app = document.getElementById('app');

    var html = '<div class="page">';
    html += '<div class="page-header">';
    html += '<h1>💠 芯片系统</h1>';
    html += '<p>芯片图鉴 — 套装效果 / 推荐搭配</p>';
    html += '</div>';

    if (!chips.length) {
        html += '<div style="text-align:center;padding:60px 0;color:var(--text-muted);"><p>暂无数据</p></div>';
        html += '</div>';
        app.innerHTML = html;
        return;
    }

    // Filter bar
    var rarities = ['全部', '传说', '史诗', '稀有'];
    html += '<div class="filter-bar" id="chipFilter">';
    rarities.forEach(function (r) {
        html += '<button class="filter-btn' + (r === '全部' ? ' active' : '') + '" data-rarity="' + r + '">' + r + '</button>';
    });
    html += '</div>';

    html += '<div class="card-grid" id="chipGrid">';
    chips.forEach(function (c) {
        html += renderChipCard(c);
    });
    html += '</div>';
    html += '</div>';

    app.innerHTML = html;

    // Filter
    document.getElementById('chipFilter').addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        document.querySelectorAll('#chipFilter .filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var rarity = btn.getAttribute('data-rarity');
        var cards = document.querySelectorAll('#chipGrid .chip-card');
        cards.forEach(function (card) {
            card.style.display = (rarity === '全部' || card.getAttribute('data-rarity') === rarity) ? '' : 'none';
        });
    });

    // Click -> modal
    document.getElementById('chipGrid').addEventListener('click', function (e) {
        var card = e.target.closest('.chip-card');
        if (!card) return;
        var id = card.getAttribute('data-id');
        var c = chips.find(function (x) { return x.id === id; });
        if (c) showChipDetail(c);
    });
};

function renderChipCard(c) {
    var rarityTag = 'tag-' + (c.rarity === '传说' ? 'legendary' : c.rarity === '史诗' ? 'epic' : 'rare');
    return '<div class="card chip-card" data-id="' + c.id + '" data-rarity="' + c.rarity + '">' +
        '<div class="card-body">' +
        '<h3>' + (c.icon || '💠') + ' ' + c.name + '</h3>' +
        '<div class="tags">' +
        '<span class="tag ' + rarityTag + '">' + c.rarity + '</span>' +
        (c.set_name ? '<span class="tag" style="background:rgba(0,240,255,0.1);color:var(--accent-cyan);">' + c.set_name + '</span>' : '') +
        '</div>' +
        '<div class="desc">' + (c.effect || '') + '</div>' +
        (c.suit_desc ? '<div class="meta">套装：' + c.suit_desc + '</div>' : '') +
        '</div></div>';
}

function showChipDetail(c) {
    var html = '<div class="modal-overlay" id="modal">' +
        '<div class="modal-content">' +
        '<button class="modal-close" id="modalClose">&times;</button>' +
        '<h2>' + (c.icon || '💠') + ' ' + c.name + '</h2>' +
        '<table class="info-table">' +
        '<tr><td>稀有度</td><td>' + c.rarity + '</td></tr>' +
        (c.set_name ? '<tr><td>所属套装</td><td>' + c.set_name + '</td></tr>' : '') +
        (c.effect ? '<tr><td>单件效果</td><td>' + c.effect + '</td></tr>' : '') +
        (c.suit_desc ? '<tr><td>套装效果</td><td>' + c.suit_desc + '</td></tr>' : '') +
        (c.recommend ? '<tr><td>推荐搭配</td><td>' + c.recommend + '</td></tr>' : '') +
        '</table>' +
        '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('modalClose').addEventListener('click', function () { document.getElementById('modal').remove(); });
    document.getElementById('modal').addEventListener('click', function (e) { if (e.target.id === 'modal') document.getElementById('modal').remove(); });
}
