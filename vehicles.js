/**
 * 王牌竞速数据整合站 — 车辆图鉴页面
 */

// ===== 图标资源 =====
const ICONS = {
  type: {
    '竞速': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/3dff9aca-3af3-47c0-bf76-cce424c2d846.png',
    '干扰': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/3275e576-7547-4a19-94e9-71725a09c902.png',
    '辅助': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/76986bb0-a074-42e8-9f7a-acf66eb19ea3.png',
    '评分': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/57b6bd90-c852-4ee7-9720-e9a58f07914c.png',
  },
  track: {
    '城市': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/cab840bc-ee68-4bff-9d26-0919a8836907.png',
    '山路': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/fb120b3c-bceb-4d2d-b282-428f6d0bbf3a.png',
    '场地': 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/9bdee65d-6c29-4170-ba12-cd60bf8fdfac.png',
  },
  rating: 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/57b6bd90-c852-4ee7-9720-e9a58f07914c.png',
  glory_bg: 'https://backend.appmiaoda.com/projects/supabase316894448002838528/storage/v1/object/public/images/fc890049-ab85-47b7-8d66-a3959f3862b9.png',
};

// ===== 稀有度映射 =====
const RARITY_CLASS = {
  '传说': 'legendary',
  '史诗': 'epic',
  '稀有': 'rare',
  '普通': 'common',
  '耀世': 'glory',
};

// ===== 车辆图标 Emoji（按 id 映射） =====
const CAR_EMOJIS = {
  'blade': '⚔️',
  'interceptor': '⚡',
  'support-x': '🛡️',
  'glory-one': '🌟',
  'common-car': '🚗',
};

// ===== 稀有度颜色 =====
function getRarityColor(rarity) {
  var map = {
    '传说': '#ff6a00',
    '史诗': '#a855f7',
    '稀有': '#3b82f6',
    '普通': '#22c55e',
    '耀世': '#ffd700',
  };
  return map[rarity] || '#94a3b8';
}

// ===== 渲染单张车辆卡片 =====
function renderVehicleCard(v) {
  var rarityCls = RARITY_CLASS[v.rarity] || 'common';
  var color = v.color || getRarityColor(v.rarity);
  var typeCls = v.type === '竞速' ? 'racing' : v.type === '干扰' ? 'interfere' : 'assist';
  var typeName = v.type;

  // 赛道图标 HTML
  var trackIcons = '';
  if (v.tracks && v.tracks.length) {
    v.tracks.forEach(function (t) {
      var src = ICONS.track[t];
      trackIcons += '<img src="' + src + '" alt="' + t + '" title="' + t + '" style="width:18px;height:18px;vertical-align:middle;border-radius:4px;border:1px solid rgba(0,240,255,0.15);" loading="lazy">';
    });
  }

  // 评分星星（满分 10 分，每颗星代表 2 分）
  var stars = Math.round((v.rating || 0) / 2);
  var starHtml = '';
  for (var i = 0; i < 5; i++) {
    starHtml += i < stars ? '★' : '☆';
  }

  var cards = '';

  cards += '<div class="v-card rarity-' + rarityCls + '" onclick="showVehicleDetail(\'' + v.id + '\')" data-type="' + v.type + '">';
  cards += '<div class="v-card-inner">';

  // 卡片头部：稀有度色条 + 车辆纹章
  cards += '<div class="v-card-header" style="background: linear-gradient(135deg, ' + color + '22, ' + color + '08);">';
  cards += '<div class="rarity-bar rarity-' + rarityCls + '"></div>';

  // 耀世车辆特殊背景
  if (v.rarity === '耀世') {
    cards += '<div style="position:absolute;inset:0;background:url(' + ICONS.glory_bg + ') center/cover no-repeat;opacity:0.25;pointer-events:none;"></div>';
  }

  cards += '<div class="v-card-emblem">' + (CAR_EMOJIS[v.id] || '🏎️') + '</div>';

  // 类型角标
  cards += '<div class="v-card-type type-' + typeCls + '">';
  cards += '<img src="' + ICONS.type[v.type] + '" alt="' + typeName + '" style="width:14px;height:14px;vertical-align:middle;margin-right:2px;" loading="lazy">';
  cards += '<span>' + typeName + '</span>';
  cards += '</div>';

  cards += '</div>';

  // 卡片主体
  cards += '<div class="v-card-body">';
  cards += '<div class="v-name" style="color:' + color + ';">' + v.name + '</div>';

  // 评分
  cards += '<div class="v-rating">';
  cards += '<img src="' + ICONS.rating + '" alt="评分" style="width:14px;height:14px;vertical-align:middle;margin-right:2px;" loading="lazy">';
  cards += '<span class="stars">' + starHtml + '</span>';
  cards += '<span>' + v.rating.toFixed(1) + '</span>';
  cards += '</div>';

  // 赛道图标
  if (trackIcons) {
    cards += '<div class="v-tracks" style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px;">' + trackIcons + '</div>';
  }

  cards += '</div>';

  cards += '</div>';
  cards += '</div>';

  return cards;
}

// ===== 渲染车辆详情弹窗 =====
function showVehicleDetail(id) {
  var vehicles = window.DATA_VEHICLES || [];
  var v = null;
  for (var i = 0; i < vehicles.length; i++) {
    if (vehicles[i].id === id) {
      v = vehicles[i];
      break;
    }
  }
  if (!v) return;

  var color = v.color || getRarityColor(v.rarity);
  var rarityCls = RARITY_CLASS[v.rarity] || 'common';
  var typeCls = v.type === '竞速' ? 'racing' : v.type === '干扰' ? 'interfere' : 'assist';

  // 赛道标签
  var trackTags = '';
  if (v.tracks && v.tracks.length) {
    v.tracks.forEach(function (t) {
      trackTags += '<span class="track-tag" style="padding:1px 6px;border-radius:6px;font-size:0.65rem;background:rgba(0,240,255,0.08);color:var(--text-muted);border:1px solid var(--border-color);">' + t + '</span>';
    });
  }

  // 评分星星
  var stars = Math.round((v.rating || 0) / 2);
  var starHtml = '';
  for (var i = 0; i < 5; i++) {
    starHtml += i < stars ? '★' : '☆';
  }

  // 属性条宽度百分比（假设 max_speed 最高 1200）
  var speedPct = Math.min(100, ((v.max_speed || 800) / 1200) * 100);
  var accelPct = Math.min(100, ((v.acceleration || 800) / 1200) * 100);
  var handlPct = Math.min(100, ((v.handling || 800) / 1200) * 100);

  var html = '';
  html += '<div class="modal-overlay open" id="modal">';
  html += '<div class="modal" style="border-color:' + color + ';">';

  // 弹窗头部
  html += '<div class="modal-header" style="border-bottom:3px solid ' + color + ';">';
  html += '<h2 style="color:' + color + ';">' + (CAR_EMOJIS[v.id] || '🏎️') + ' ' + v.name + '</h2>';
  html += '<button class="modal-close" onclick="closeModal()">&times;</button>';
  html += '</div>';

  // 弹窗主体
  html += '<div class="modal-body">';

  // 基本信息行
  html += '<div class="detail-row"><span class="label">类型</span><span class="value"><span class="tag type-' + typeCls + '">' + v.type + '</span></span></div>';
  html += '<div class="detail-row"><span class="label">稀有度</span><span class="value"><span class="tag tag-' + rarityCls + '">' + v.rarity + '</span></span></div>';
  html += '<div class="detail-row"><span class="label">评分</span><span class="value" style="color:#fbbf24;">' + starHtml + ' ' + v.rating.toFixed(1) + '</span></div>';
  html += '<div class="detail-row"><span class="label">适合赛道</span><span class="value">' + trackTags + '</span></div>';

  // 属性条
  html += '<div style="margin-top:16px;">';
  html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:0.85rem;"><span style="width:40px;color:var(--text-muted);font-weight:600;">极速</span><span style="width:36px;text-align:right;color:var(--text-primary);font-weight:700;font-size:0.8rem;">' + v.max_speed + '</span><div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;"><div style="height:100%;border-radius:3px;width:' + speedPct + '%;background:' + color + ';"></div></div></div>';
  html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:0.85rem;"><span style="width:40px;color:var(--text-muted);font-weight:600;">加速</span><span style="width:36px;text-align:right;color:var(--text-primary);font-weight:700;font-size:0.8rem;">' + v.acceleration + '</span><div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;"><div style="height:100%;border-radius:3px;width:' + accelPct + '%;background:' + color + ';"></div></div></div>';
  html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:0.85rem;"><span style="width:40px;color:var(--text-muted);font-weight:600;">操控</span><span style="width:36px;text-align:right;color:var(--text-primary);font-weight:700;font-size:0.8rem;">' + v.handling + '</span><div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;"><div style="height:100%;border-radius:3px;width:' + handlPct + '%;background:' + color + ';"></div></div></div>';
  html += '</div>';

  // 技能
  html += '<div class="skill-box" style="border-color:' + color + ';">';
  html += '<div class="skill-name">技能：' + v.skill_name + '</div>';
  html += '<div class="skill-desc">' + v.skill_desc + '</div>';
  if (v.skill_cd) {
    html += '<div class="skill-cd">冷却：' + v.skill_cd + '</div>';
  }
  html += '</div>';

  // 推荐芯片 & 赋能
  if (v.recommend_chips) {
    html += '<div class="detail-row"><span class="label">推荐芯片</span><span class="value" style="font-weight:400;font-size:0.85rem;">' + v.recommend_chips + '</span></div>';
  }
  if (v.recommend_empower) {
    html += '<div class="detail-row"><span class="label">推荐赋能</span><span class="value" style="font-weight:400;font-size:0.85rem;">' + v.recommend_empower + '</span></div>';
  }

  html += '</div>';
  html += '</div>';
  html += '</div>';

  // 移除已有弹窗再添加新弹窗
  var oldModal = document.getElementById('modal');
  if (oldModal) oldModal.remove();

  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstElementChild);
}

// ===== 关闭弹窗 =====
function closeModal() {
  var modal = document.getElementById('modal');
  if (modal) modal.remove();
}

// ===== 渲染车辆页面 =====
window.renderVehicles = function () {
  var vehicles = window.DATA_VEHICLES || [];
  var app = document.getElementById('app');

  if (!vehicles.length) {
    app.innerHTML = '<div class="page"><div class="page-header"><h1>车辆数据</h1><p class="page-desc">全车辆图鉴与属性一览</p></div><div class="empty-state"><div class="empty-icon">&#x1F697;</div><p>暂无车辆数据</p></div></div>';
    return;
  }

  // ===== 构建页面 HTML =====
  var html = '';
  html += '<div class="page">';

  // 页面标题
  html += '<div class="page-header">';
  html += '<h1>车辆数据</h1>';
  html += '<p class="page-desc">全车辆图鉴与属性一览（共 <strong>' + vehicles.length + '</strong> 辆）</p>';
  html += '</div>';

  // 筛选栏
  html += '<div class="filter-bar" id="vehicleFilterBar">';
  html += '<button class="filter-btn active" data-filter="全部" onclick="filterVehicles(\'全部\')">全部</button>';

  var typeList = ['竞速', '干扰', '辅助', '评分'];
  typeList.forEach(function (t) {
    html += '<button class="filter-btn" data-filter="' + t + '" onclick="filterVehicles(\'' + t + '\')">';
    html += '<img src="' + ICONS.type[t] + '" alt="' + t + '" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;" loading="lazy">';
    html += '<span>' + (t === '评分' ? '综合评分' : t) + '</span>';
    html += '</button>';
  });

  html += '</div>';

  // 图例
  html += '<div style="display:flex;flex-wrap:wrap;gap:14px;padding:8px 0 4px;">';
  var legendItems = [
    { color: '#ff6a00', label: '传说' },
    { color: '#a855f7', label: '史诗' },
    { color: '#3b82f6', label: '稀有' },
    { color: '#22c55e', label: '普通' },
    { color: '#ffd700', label: '耀世' },
  ];
  legendItems.forEach(function (item) {
    html += '<div style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--text-muted);"><span style="width:10px;height:10px;border-radius:50%;display:inline-block;background:' + item.color + ';"></span>' + item.label + '</div>';
  });
  html += '</div>';

  // 车辆网格
  html += '<div class="vehicle-grid" id="vehicleGrid">';

  vehicles.forEach(function (v) {
    html += renderVehicleCard(v);
  });

  html += '</div>'; // vehicle-grid
  html += '</div>'; // page

  app.innerHTML = html;

  // 点击弹窗外部关闭
  setTimeout(function () {
    document.addEventListener('click', function modalOutsideClick(e) {
      var modal = document.getElementById('modal');
      if (modal && e.target === modal) {
        closeModal();
        document.removeEventListener('click', modalOutsideClick);
      }
    });
  }, 100);
};

// ===== 筛选车辆 =====
window.filterVehicles = function (type) {
  // 更新按钮状态
  var btns = document.querySelectorAll('#vehicleFilterBar .filter-btn');
  btns.forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === type);
  });

  // 筛选卡片
  var cards = document.querySelectorAll('#vehicleGrid .v-card');
  cards.forEach(function (card) {
    if (type === '全部' || type === '评分' || card.getAttribute('data-type') === type) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
};
