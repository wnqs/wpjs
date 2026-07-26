/**
 * 车辆数据页渲染
 */
window.renderVehicles = function () {
    var vehicles = window.DATA_VEHICLES || [];
    var app = document.getElementById('app');

    var html = '<div class="page">';

    // Header
    html += '<div class="page-header">';
    html += '<h1>🚗 车辆数据</h1>';
    html += '<p>全车辆图鉴 — 类型 / 稀有度 / 技能一览</p>';
    html += '</div>';

    // Filter bar
    var types = ['全部', '竞速', '辅助', '干扰'];
    html += '<div class="filter-bar" id="vehicleFilter">';
    types.forEach(function (t) {
        html += '<button class="filter-btn' + (t === '全部' ? ' active' : '') + '" data-type="' + t + '">' + t + '</button>';
    });
    html += '</div>';

    // Card grid
    html += '<div class="card-grid" id="vehicleGrid">';
    vehicles.forEach(function (v) {
        html += renderVehicleCard(v);
    });
    html += '</div>';
    html += '</div>';

    app.innerHTML = html;

    // Filter logic
    document.getElementById('vehicleFilter').addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        document.querySelectorAll('#vehicleFilter .filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var type = btn.getAttribute('data-type');
        var grid = document.getElementById('vehicleGrid');
        var cards = grid.querySelectorAll('.vehicle-card');
        cards.forEach(function (card) {
            if (type === '全部' || card.getAttribute('data-type') === type) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Card click -> modal
    document.getElementById('vehicleGrid').addEventListener('click', function (e) {
        var card = e.target.closest('.vehicle-card');
        if (!card) return;
        var id = card.getAttribute('data-id');
        var v = vehicles.find(function (x) { return x.id === id; });
        if (v) showVehicleDetail(v);
    });
};

function renderVehicleCard(v) {
    var typeTag = 'tag-' + (v.type === '竞速' ? 'racing' : v.type === '辅助' ? 'assist' : 'interfere');
    var rarityTag = 'tag-' + (v.rarity === '传说' ? 'legendary' : v.rarity === '史诗' ? 'epic' : v.rarity === '稀有' ? 'rare' : 'common');
    return '<div class="card vehicle-card" data-id="' + v.id + '" data-type="' + v.type + '">' +
        '<div class="card-img" style="background: linear-gradient(135deg, ' + (v.color1 || '#1e293b') + ', ' + (v.color2 || '#0f172a') + '); display:flex; align-items:center; justify-content:center; font-size:3rem;">' + (v.emoji || '🚗') + '</div>' +
        '<div class="card-body">' +
        '<h3>' + v.name + '</h3>' +
        '<div class="tags">' +
        '<span class="tag ' + typeTag + '">' + v.type + '</span>' +
        '<span class="tag ' + rarityTag + '">' + v.rarity + '</span>' +
        '</div>' +
        '<div class="desc">' + (v.skill_name ? '技能：' + v.skill_name : '') + '</div>' +
        '<div class="meta">' + (v.skill_desc || '') + '</div>' +
        '</div></div>';
}

function showVehicleDetail(v) {
    var html = '<div class="modal-overlay" id="modal">' +
        '<div class="modal-content">' +
        '<button class="modal-close" id="modalClose">&times;</button>' +
        '<h2>' + v.name + '</h2>' +
        '<table class="info-table">' +
        '<tr><td>类型</td><td>' + v.type + '</td></tr>' +
        '<tr><td>稀有度</td><td>' + v.rarity + '</td></tr>' +
        '<tr><td>技能名称</td><td>' + (v.skill_name || '-') + '</td></tr>' +
        '<tr><td>技能描述</td><td>' + (v.skill_desc || '-') + '</td></tr>' +
        (v.skill_cd ? '<tr><td>技能冷却</td><td>' + v.skill_cd + '</td></tr>' : '') +
        (v.max_speed ? '<tr><td>极速</td><td>' + v.max_speed + '</td></tr>' : '') +
        (v.acceleration ? '<tr><td>加速</td><td>' + v.acceleration + '</td></tr>' : '') +
        (v.handling ? '<tr><td>操控</td><td>' + v.handling + '</td></tr>' : '') +
        (v.recommend_chips ? '<tr><td>推荐芯片</td><td>' + v.recommend_chips + '</td></tr>' : '') +
        (v.recommend_empower ? '<tr><td>推荐赋能</td><td>' + v.recommend_empower + '</td></tr>' : '') +
        '</table>' +
        '<div style="color:var(--text-muted);font-size:0.8rem;margin-top:12px;">' + (v.notes || '') + '</div>' +
        '</div></div>';

    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('modalClose').addEventListener('click', function () {
        document.getElementById('modal').remove();
    });
    document.getElementById('modal').addEventListener('click', function (e) {
        if (e.target.id === 'modal') document.getElementById('modal').remove();
    });
}
