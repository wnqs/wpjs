/**
 * 芯片要求计算器
 */
window.renderCalculator = function () {
    var data = window.DATA_CALCULATOR || { cost_table: {}, rarity_names: {}, max_level: 10 };
    var costTable = data.cost_table || {};
    var rarityNames = data.rarity_names || {};
    var maxLevel = data.max_level || 10;

    var app = document.getElementById('app');

    var html = '<div class="page">';

    // Header
    html += '<div class="page-header">';
    html += '<h1>芯片要求计算器</h1>';
    html += '<p>计算芯片从当前等级升至目标等级所需的芯片数量</p>';
    html += '</div>';

    // Calculator form
    html += '<div class="calc-card">';
    html += '<div class="calc-form">';

    // Current level
    html += '<div class="calc-row">';
    html += '<label>当前等级</label>';
    html += '<div class="calc-input-group">';
    html += '<button class="calc-btn" onclick="adjustLevel(-1, ' + maxLevel + ')">−</button>';
    html += '<input type="number" id="curLevel" value="1" min="1" max="' + maxLevel + '" readonly>';
    html += '<button class="calc-btn" onclick="adjustLevel(1, ' + maxLevel + ')">+</button>';
    html += '</div>';
    html += '</div>';

    // Target level
    html += '<div class="calc-row">';
    html += '<label>目标等级</label>';
    html += '<div class="calc-input-group">';
    html += '<button class="calc-btn" onclick="adjustTarget(-1, ' + maxLevel + ')">−</button>';
    html += '<input type="number" id="tarLevel" value="' + maxLevel + '" min="1" max="' + maxLevel + '" readonly>';
    html += '<button class="calc-btn" onclick="adjustTarget(1, ' + maxLevel + ')">+</button>';
    html += '</div>';
    html += '</div>';

    // Chip rarity
    html += '<div class="calc-row">';
    html += '<label>芯片稀有度</label>';
    html += '<select id="chipRarity" class="calc-select">';
    Object.keys(rarityNames).forEach(function (key) {
        var selected = key === 'epic' ? ' selected' : '';
        html += '<option value="' + key + '"' + selected + '>' + rarityNames[key] + '</option>';
    });
    html += '</select>';
    html += '</div>';

    // Calculate button
    html += '<button class="calc-submit" onclick="doCalculate()">计算所需芯片</button>';

    html += '</div>'; // calc-form

    // Results
    html += '<div class="calc-result" id="calcResult" style="display:none;">';
    html += '<h3>计算结果</h3>';
    html += '<div class="result-items" id="resultItems"></div>';
    html += '</div>';

    html += '</div>'; // calc-card

    // Info note
    html += '<div class="calc-note">';
    html += '<p><strong>升级规则：</strong></p>';
    html += '<ul>';
    html += '<li>稀有芯片：每级需要 1 个同类型芯片</li>';
    html += '<li>史诗芯片：1-5级每级 1 个，6-10级每级 2 个同类型芯片</li>';
    html += '<li>传说芯片：1-3级每级 1 个，4-6级每级 2 个，7-10级每级 3 个同类型芯片</li>';
    html += '<li>升级不会失败，消耗对应数量的同类型芯片</li>';
    html += '</ul>';
    html += '</div>';

    html += '</div>';

    app.innerHTML = html;
};

// 等级调整函数
window.adjustLevel = function (delta, maxLevel) {
    maxLevel = maxLevel || 10;
    var input = document.getElementById('curLevel');
    var val = parseInt(input.value, 10) + delta;
    var tar = parseInt(document.getElementById('tarLevel').value, 10);
    if (val < 1) val = 1;
    if (val > maxLevel) val = maxLevel;
    if (val >= tar) val = tar - 1;
    if (val < 1) val = 1;
    input.value = val;
};

window.adjustTarget = function (delta, maxLevel) {
    maxLevel = maxLevel || 10;
    var input = document.getElementById('tarLevel');
    var val = parseInt(input.value, 10) + delta;
    var cur = parseInt(document.getElementById('curLevel').value, 10);
    if (val < 2) val = 2;
    if (val > maxLevel) val = maxLevel;
    if (val <= cur) val = cur + 1;
    if (val > maxLevel) val = maxLevel;
    input.value = val;
};

window.doCalculate = function () {
    var data = window.DATA_CALCULATOR || { cost_table: {}, rarity_names: {} };
    var costTable = data.cost_table || {};
    var rarityNames = data.rarity_names || {};

    var cur = parseInt(document.getElementById('curLevel').value, 10);
    var tar = parseInt(document.getElementById('tarLevel').value, 10);
    var rarity = document.getElementById('chipRarity').value;
    var costs = costTable[rarity] || [];

    if (cur >= tar) {
        alert('目标等级必须大于当前等级');
        return;
    }

    var total = 0;
    var details = [];
    for (var i = cur + 1; i <= tar; i++) {
        var need = costs[i] || 1;
        total += need;
        details.push({ level: i, need: need });
    }

    var resultDiv = document.getElementById('calcResult');
    var itemsDiv = document.getElementById('resultItems');
    resultDiv.style.display = '';

    var html = '';
    html += '<div class="result-summary">';
    html += '<span class="result-total">总计：<strong>' + total + '</strong> 个</span>';
    html += '<span class="result-meta">' + (rarityNames[rarity] || rarity) + '芯片 · ' + cur + '级 → ' + tar + '级</span>';
    html += '</div>';

    html += '<table class="result-table">';
    html += '<tr><th>目标等级</th><th>所需芯片数</th></tr>';
    details.forEach(function (d) {
        html += '<tr><td>' + d.level + '级</td><td>' + d.need + ' 个</td></tr>';
    });
    html += '<tr class="result-total-row"><td><strong>总计</strong></td><td><strong>' + total + ' 个</strong></td></tr>';
    html += '</table>';

    itemsDiv.innerHTML = html;
};
