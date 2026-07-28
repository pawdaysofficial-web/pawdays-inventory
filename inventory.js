/* คลังสินค้า — Inventory
 * Ported from the Claude Design component Inventory.dc.html. The design file is
 * a DC template (`{{ }}` bindings + <sc-if>/<sc-for>) driven by the DC runtime;
 * this is the same state machine and the same derived values as plain JS, so the
 * page runs on the design system's stylesheet alone with no runtime to load.
 */
(function () {
  'use strict';

  // ── constants ────────────────────────────────────────────────────────────
  const CHANNELS = ['Shopee', 'TikTok Shop', 'LINE Shop', 'หน้าร้าน'];
  const STATUSES = ['รอดำเนินการ', 'ยืนยัน', 'ตัดสต๊อก'];
  const CHANNEL_GP = { 'Shopee': 5, 'TikTok Shop': 8, 'LINE Shop': 3, 'หน้าร้าน': 0 };
  const TODAY = '2026-07-28';

  const emptyProductForm = () => ({
    name: '', sku: '', category: '', cost: '', price: '', unit: '', reorderPoint: '', baseStock: ''
  });

  // ── state ────────────────────────────────────────────────────────────────
  const state = {
    page: 'dashboard',
    reportTab: 'stock',
    products: [
      { id: 'p1', sku: 'AP-001', name: 'เสื้อยืดโอเวอร์ไซส์ สีดำ', category: 'เสื้อผ้า', cost: 120, price: 259, unit: 'ตัว', reorderPoint: 10, baseStock: 45 },
      { id: 'p2', sku: 'AP-002', name: 'เดรสลายดอก', category: 'เสื้อผ้า', cost: 180, price: 390, unit: 'ตัว', reorderPoint: 8, baseStock: 22 },
      { id: 'p3', sku: 'AP-003', name: 'กางเกงยีนส์ขาบาน', category: 'เสื้อผ้า', cost: 220, price: 450, unit: 'ตัว', reorderPoint: 10, baseStock: 6 },
      { id: 'p4', sku: 'BT-001', name: 'เซรั่มวิตามินซี 30ml', category: 'ความงาม', cost: 85, price: 199, unit: 'ขวด', reorderPoint: 20, baseStock: 60 },
      { id: 'p5', sku: 'BT-002', name: 'ครีมกันแดด SPF50', category: 'ความงาม', cost: 60, price: 159, unit: 'หลอด', reorderPoint: 20, baseStock: 15 },
      { id: 'p6', sku: 'BT-003', name: 'แปรงแต่งหน้าเซ็ต 5 ชิ้น', category: 'ความงาม', cost: 95, price: 220, unit: 'เซ็ต', reorderPoint: 10, baseStock: 33 },
      { id: 'p7', sku: 'HM-001', name: 'กระบอกน้ำสแตนเลส 500ml', category: 'ของใช้ในบ้าน', cost: 70, price: 159, unit: 'ใบ', reorderPoint: 15, baseStock: 50 },
      { id: 'p8', sku: 'HM-002', name: 'หมอนรองคอเมมโมรี่โฟม', category: 'ของใช้ในบ้าน', cost: 110, price: 259, unit: 'ใบ', reorderPoint: 10, baseStock: 18 },
      { id: 'p9', sku: 'AC-001', name: 'เคสโทรศัพท์ใส กันกระแทก', category: 'อุปกรณ์เสริม', cost: 25, price: 89, unit: 'ชิ้น', reorderPoint: 30, baseStock: 80 },
      { id: 'p10', sku: 'AC-002', name: 'สายชาร์จ Type-C 1เมตร', category: 'อุปกรณ์เสริม', cost: 35, price: 99, unit: 'เส้น', reorderPoint: 30, baseStock: 5 }
    ],
    movements: [
      { id: 'm1', type: 'in', date: '2026-07-20', productId: 'p1', qty: 20, price: 110, note: 'สั่งซื้อล็อตใหม่' },
      { id: 'm2', type: 'in', date: '2026-07-21', productId: 'p4', qty: 30, price: 80, note: 'เติมสต๊อกเซรั่ม' },
      { id: 'm3', type: 'out', date: '2026-07-21', productId: 'p1', qty: 3, listPrice: 259, gpPercent: 5, channel: 'Shopee', status: 'ตัดสต๊อก', note: '' },
      { id: 'm4', type: 'out', date: '2026-07-22', productId: 'p9', qty: 10, listPrice: 89, gpPercent: 8, channel: 'TikTok Shop', status: 'ตัดสต๊อก', note: '' },
      { id: 'm5', type: 'out', date: '2026-07-22', productId: 'p6', qty: 2, listPrice: 220, gpPercent: 3, channel: 'LINE Shop', status: 'ตัดสต๊อก', note: '' },
      { id: 'm6', type: 'in', date: '2026-07-23', productId: 'p1', qty: 10, price: 110, note: 'เติมสต๊อกเสื้อยืด' },
      { id: 'm7', type: 'out', date: '2026-07-23', productId: 'p2', qty: 4, listPrice: 390, gpPercent: 0, channel: 'หน้าร้าน', status: 'ตัดสต๊อก', note: '' },
      { id: 'm8', type: 'out', date: '2026-07-24', productId: 'p5', qty: 5, listPrice: 159, gpPercent: 5, channel: 'Shopee', status: 'ตัดสต๊อก', note: '' },
      { id: 'm9', type: 'out', date: '2026-07-24', productId: 'p10', qty: 8, listPrice: 99, gpPercent: 8, channel: 'TikTok Shop', status: 'ตัดสต๊อก', note: '' },
      { id: 'm10', type: 'in', date: '2026-07-25', productId: 'p7', qty: 15, price: 65, note: '' },
      { id: 'm11', type: 'out', date: '2026-07-25', productId: 'p3', qty: 2, listPrice: 450, gpPercent: 5, channel: 'Shopee', status: 'ยืนยัน', note: '' },
      { id: 'm12', type: 'out', date: '2026-07-25', productId: 'p8', qty: 3, listPrice: 259, gpPercent: 3, channel: 'LINE Shop', status: 'ตัดสต๊อก', note: '' },
      { id: 'm13', type: 'out', date: '2026-07-26', productId: 'p1', qty: 5, listPrice: 259, gpPercent: 8, channel: 'TikTok Shop', status: 'ตัดสต๊อก', note: '' },
      { id: 'm14', type: 'out', date: '2026-07-27', productId: 'p9', qty: 15, listPrice: 89, gpPercent: 5, channel: 'Shopee', status: 'รอดำเนินการ', note: '' },
      { id: 'm15', type: 'out', date: '2026-07-27', productId: 'p4', qty: 10, listPrice: 199, gpPercent: 3, channel: 'LINE Shop', status: 'ตัดสต๊อก', note: '' },
      { id: 'm16', type: 'in', date: '2026-07-27', productId: 'p10', qty: 20, price: 38, note: 'เติมสายชาร์จ' },
      { id: 'm17', type: 'out', date: '2026-07-28', productId: 'p6', qty: 4, listPrice: 220, gpPercent: 0, channel: 'หน้าร้าน', status: 'ตัดสต๊อก', note: '' },
      { id: 'm18', type: 'out', date: '2026-07-28', productId: 'p2', qty: 2, listPrice: 390, gpPercent: 5, channel: 'Shopee', status: 'ยืนยัน', note: '' }
    ],
    filterOutChannel: 'all', filterOutStatus: 'all',
    filterRepChannel: 'all', filterRepType: 'all',
    dialogOpen: false, editId: null,
    pf: emptyProductForm(),
    inForm: { productId: '', qty: '', cost: '', date: TODAY, note: '' },
    outForm: { productId: '', qty: '', listPrice: '', gpPercent: '5', channel: 'Shopee', status: 'รอดำเนินการ', date: TODAY, note: '' }
  };

  // ── helpers ──────────────────────────────────────────────────────────────
  const esc = (v) => String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const fmt = (n) => '฿' + Math.round(n || 0).toLocaleString('th-TH');

  function currentStock(p, movements) {
    let s = p.baseStock;
    movements.forEach((mv) => {
      if (mv.productId !== p.id) return;
      if (mv.type === 'in') s += mv.qty;
      else if (mv.status === 'ตัดสต๊อก') s -= mv.qty;
    });
    return s;
  }

  function nextId(prefix, list) {
    let n = list.length + 1;
    while (list.some((x) => x.id === prefix + n)) n++;
    return prefix + n;
  }

  const statusClassOf = (st) =>
    st === 'ตัดสต๊อก' ? 'tag tag-accent-2' : st === 'ยืนยัน' ? 'tag tag-accent' : 'tag tag-neutral';

  /** The design system's three-plate misregistered numeral (.cmyk-num): the
   *  .paper span carries the text for assistive tech, the C/M/Y plates repeat
   *  it aria-hidden and multiply into a dark core. */
  function plateNum(text, size, ground) {
    const t = esc(text);
    const style = 'font-size:' + size + 'px;font-weight:600;font-family:var(--font-heading)' +
      (ground ? ';--cmyk-num-ground:' + ground : '');
    return '<div class="cmyk-num" style="' + style + '">' +
      '<span class="paper">' + t + '</span>' +
      '<span class="plate plate-c" aria-hidden="true">' + t + '</span>' +
      '<span class="plate plate-m" aria-hidden="true">' + t + '</span>' +
      '<span class="plate plate-y" aria-hidden="true">' + t + '</span>' +
      '</div>';
  }

  /** <option> with `selected` resolved against the current value. */
  const option = (value, label, current) =>
    '<option value="' + esc(value) + '"' + (String(current) === String(value) ? ' selected' : '') + '>' +
    esc(label) + '</option>';

  /** Text/number/date input bound to state[section][field]. */
  function input(section, field, opts) {
    const o = opts || {};
    const key = section + '.' + field;
    return '<input class="input" data-act="field" data-section="' + section + '" data-field="' + field + '"' +
      ' data-k="' + key + '"' +
      (o.type ? ' type="' + o.type + '"' : '') +
      (o.min != null ? ' min="' + o.min + '"' : '') +
      (o.max != null ? ' max="' + o.max + '"' : '') +
      (o.placeholder ? ' placeholder="' + esc(o.placeholder) + '"' : '') +
      ' value="' + esc(state[section][field]) + '">';
  }

  const field = (label, control) =>
    '<div class="field"><label>' + esc(label) + '</label>' + control + '</div>';

  /** Product picker shared by the in/out forms. */
  function productSelect(section) {
    return '<select class="input" data-act="field" data-section="' + section + '" data-field="productId"' +
      ' data-k="' + section + '.productId">' +
      option('', 'เลือกสินค้า', state[section].productId) +
      state.products.map((p) => option(p.id, p.name + ' (' + p.sku + ')', state[section].productId)).join('') +
      '</select>';
  }

  /** Filter select bound to a top-level state key. */
  function filterSelect(key, allLabel, values) {
    return '<select class="input" data-act="state" data-key="' + key + '" data-k="' + key + '">' +
      option('all', allLabel, state[key]) +
      values.map((v) => option(v.value != null ? v.value : v, v.label != null ? v.label : v, state[key])).join('') +
      '</select>';
  }

  /** Segmented radio group. `name` scopes the radios; CSS drives the checked look. */
  function seg(name, act, options, current, extraStyle) {
    return '<div class="seg"' + (extraStyle ? ' style="' + extraStyle + '"' : '') + '>' +
      options.map((o) => {
        const value = o.value != null ? o.value : o;
        const label = o.label != null ? o.label : o;
        return '<label class="seg-opt"><input type="radio" name="' + name + '" data-act="' + act + '"' +
          ' value="' + esc(value) + '"' + (String(current) === String(value) ? ' checked' : '') + '>' +
          esc(label) + '</label>';
      }).join('') +
      '</div>';
  }

  function table(head, rows, emptyText) {
    const body = Array.isArray(rows) ? rows.join('') : rows;
    return '<div class="table-scroll"><table class="table"><thead><tr>' +
      head.map((h) => '<th>' + esc(h) + '</th>').join('') +
      '</tr></thead><tbody>' +
      (body ? body
        : '<tr><td colspan="' + head.length + '" class="text-muted" style="padding:var(--space-4) var(--space-2)">' +
          esc(emptyText || 'ไม่มีรายการ') + '</td></tr>') +
      '</tbody></table></div>';
  }

  // ── derived values (the design's renderVals) ─────────────────────────────
  function computeVals() {
    const s = state;

    const products = s.products.map((p) => {
      const stock = currentStock(p, s.movements);
      return Object.assign({}, p, {
        stock,
        low: stock < p.reorderPoint,
        costStr: fmt(p.cost),
        priceStr: fmt(p.price),
        stockValueStr: fmt(stock * p.cost)
      });
    });
    const productsById = {};
    products.forEach((p) => { productsById[p.id] = p; });

    const totalStockValue = products.reduce((a, p) => a + p.stock * p.cost, 0);
    const lowStockList = products.filter((p) => p.low);
    const todaySales = s.movements
      .filter((m) => m.type === 'out' && m.date === TODAY)
      .reduce((a, m) => a + m.qty * (m.listPrice * (1 - (m.gpPercent || 0) / 100)), 0);

    const enrich = (m) => {
      const isOut = m.type === 'out';
      const netPrice = isOut ? m.listPrice * (1 - (m.gpPercent || 0) / 100) : m.price;
      const total = m.qty * netPrice;
      const prod = productsById[m.productId];
      return Object.assign({}, m, {
        productName: prod ? prod.name : '-',
        sku: prod ? prod.sku : '',
        price: netPrice,
        total,
        totalStr: fmt(total),
        priceStr: fmt(netPrice),
        listPriceStr: isOut ? fmt(m.listPrice) : '',
        gpPercentStr: isOut ? (m.gpPercent || 0) + '%' : '',
        netPriceStr: isOut ? fmt(netPrice) : '',
        typeLabel: m.type === 'in' ? 'รับเข้า' : 'จ่ายออก',
        typeTagClass: m.type === 'in' ? 'tag tag-accent' : 'tag tag-accent-2',
        channelLabel: m.channel || '-',
        statusLabel: m.status || '-',
        statusClass: m.status ? statusClassOf(m.status) : 'tag tag-neutral',
        canAdvance: Boolean(m.status) && m.status !== 'ตัดสต๊อก',
        nextLabel: m.status ? STATUSES[STATUSES.indexOf(m.status) + 1] : ''
      });
    };

    const allMovements = s.movements.map(enrich)
      .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    const recentMovements = allMovements.slice(0, 8);
    const inMovements = allMovements.filter((m) => m.type === 'in');

    const salesByChannelMap = {};
    CHANNELS.forEach((c) => { salesByChannelMap[c] = 0; });
    s.movements.filter((m) => m.type === 'out').forEach((m) => {
      if (salesByChannelMap[m.channel] == null) salesByChannelMap[m.channel] = 0;
      salesByChannelMap[m.channel] += m.qty * (m.listPrice * (1 - (m.gpPercent || 0) / 100));
    });
    const maxChannelSales = Math.max(1, ...CHANNELS.map((c) => salesByChannelMap[c]));
    const salesByChannel = CHANNELS.map((c) => ({
      channel: c,
      total: salesByChannelMap[c],
      totalStr: fmt(salesByChannelMap[c]),
      barPct: Math.round(salesByChannelMap[c] / maxChannelSales * 100)
    }));

    const outMovements = allMovements.filter((m) => m.type === 'out')
      .filter((m) => s.filterOutChannel === 'all' || m.channel === s.filterOutChannel)
      .filter((m) => s.filterOutStatus === 'all' || m.status === s.filterOutStatus);

    const reportMovements = allMovements
      .filter((m) => s.filterRepType === 'all' || m.type === s.filterRepType)
      .filter((m) => s.filterRepChannel === 'all' || m.channel === s.filterRepChannel);
    const reportMovementTotal = reportMovements.reduce((a, m) => a + m.total, 0);

    return {
      products,
      totalSku: products.length,
      totalStockValueStr: fmt(totalStockValue),
      todaySalesStr: fmt(todaySales),
      lowStockCount: lowStockList.length,
      lowStockList,
      recentMovements,
      inMovements,
      outMovements,
      reportMovements,
      reportMovementTotalStr: fmt(reportMovementTotal),
      salesByChannel,
      previewNetPriceStr: previewNetPrice()
    };
  }

  const previewNetPrice = () =>
    fmt((Number(state.outForm.listPrice) || 0) * (1 - (Number(state.outForm.gpPercent) || 0) / 100));

  // ── views ────────────────────────────────────────────────────────────────
  function viewDashboard(v) {
    const stat = (label, node) =>
      '<div><div class="text-muted stat-label">' + label + '</div>' + node + '</div>';

    return '<div class="page">' +
      '<h2 style="margin-bottom:var(--space-1)">ภาพรวม</h2>' +
      '<p class="text-muted" style="margin-bottom:var(--space-6)">สรุปสถานะคลังสินค้าและยอดขายวันนี้</p>' +

      '<div class="stat-row">' +
        stat('จำนวน SKU ทั้งหมด', plateNum(v.totalSku, 40)) +
        stat('มูลค่าสต๊อกคงเหลือ', plateNum(v.totalStockValueStr, 40)) +
        stat('ยอดขายวันนี้ (' + esc(TODAY) + ')', plateNum(v.todaySalesStr, 40)) +
        stat('สินค้าใกล้หมด', plateNum(v.lowStockCount, 40, 'var(--color-accent-2-100)')) +
      '</div>' +

      '<div class="dash-cols">' +
        '<div>' +
          '<h3 style="margin-bottom:var(--space-3)">ยอดขายตามช่องทาง</h3>' +
          v.salesByChannel.map((ch) =>
            '<div style="margin-bottom:var(--space-3)">' +
              '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">' +
                '<span>' + esc(ch.channel) + '</span><span class="text-muted">' + esc(ch.totalStr) + '</span>' +
              '</div>' +
              '<div style="height:8px;background:var(--color-surface);border-radius:var(--radius-sm);overflow:hidden">' +
                '<div style="height:100%;background:var(--color-accent);border-radius:var(--radius-sm);transition:width .6s ease;width:' + ch.barPct + '%"></div>' +
              '</div>' +
            '</div>').join('') +

          '<h3 style="margin:var(--space-6) 0 var(--space-3)">ความเคลื่อนไหวล่าสุด</h3>' +
          table(['วันที่', 'รายการ', 'สินค้า', 'ช่องทาง', 'จำนวน', 'มูลค่า'],
            v.recentMovements.map((m) =>
              '<tr>' +
                '<td>' + esc(m.date) + '</td>' +
                '<td><span class="' + m.typeTagClass + '">' + esc(m.typeLabel) + '</span></td>' +
                '<td>' + esc(m.productName) + '</td>' +
                '<td class="text-muted">' + esc(m.channelLabel) + '</td>' +
                '<td>' + esc(m.qty) + '</td>' +
                '<td>' + esc(m.totalStr) + '</td>' +
              '</tr>').join('')) +
        '</div>' +
        '<div>' +
          '<h3 style="margin-bottom:var(--space-3)">สินค้าที่ใกล้หมดสต๊อก</h3>' +
          (v.lowStockList.length
            ? v.lowStockList.map((p) =>
                '<div class="card" style="margin-bottom:var(--space-2)">' +
                  '<div style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-2)">' +
                    '<div>' +
                      '<div class="card-title" style="font-size:15px">' + esc(p.name) + '</div>' +
                      '<div class="card-meta">' + esc(p.sku) + '</div>' +
                    '</div>' +
                    '<span class="tag tag-accent-2" style="white-space:nowrap">คงเหลือ ' + esc(p.stock) + ' ' + esc(p.unit) + '</span>' +
                  '</div>' +
                '</div>').join('')
            : '<p class="text-muted">ไม่มีสินค้าที่ต่ำกว่าจุดสั่งซื้อ</p>') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function viewIn(v) {
    return '<div class="page">' +
      '<h2 style="margin-bottom:var(--space-1)">รับสินค้าเข้าคลัง</h2>' +
      '<p class="text-muted" style="margin-bottom:var(--space-6)">บันทึกการรับสินค้าเข้าพร้อมราคาต้นทุน</p>' +

      '<div class="in-form">' +
        field('สินค้า', productSelect('inForm')) +
        field('จำนวน', input('inForm', 'qty', { type: 'number', min: 1 })) +
        field('ราคาต้นทุน/หน่วย', input('inForm', 'cost', { type: 'number', min: 0 })) +
        field('วันที่', input('inForm', 'date', { type: 'date' })) +
        '<button class="btn btn-primary" data-act="submit-in">+ บันทึกรับเข้า</button>' +
      '</div>' +
      '<div class="field" style="margin-bottom:var(--space-6)"><label>หมายเหตุ</label>' +
        input('inForm', 'note', { placeholder: 'เช่น ล็อตใหม่จากซัพพลายเออร์' }) +
      '</div>' +

      '<h3 style="margin-bottom:var(--space-3)">ประวัติการรับเข้า</h3>' +
      table(['วันที่', 'สินค้า', 'SKU', 'จำนวน', 'ราคาต้นทุน', 'มูลค่ารวม', 'หมายเหตุ'],
        v.inMovements.map((m) =>
          '<tr>' +
            '<td>' + esc(m.date) + '</td><td>' + esc(m.productName) + '</td>' +
            '<td class="text-muted">' + esc(m.sku) + '</td>' +
            '<td>' + esc(m.qty) + '</td><td>' + esc(m.priceStr) + '</td><td>' + esc(m.totalStr) + '</td>' +
            '<td class="text-muted">' + esc(m.note) + '</td>' +
          '</tr>').join('')) +
    '</div>';
  }

  function viewOut(v) {
    return '<div class="page">' +
      '<h2 style="margin-bottom:var(--space-1)">จ่ายออกสินค้าตามช่องทาง</h2>' +
      '<p class="text-muted" style="margin-bottom:var(--space-6)">บันทึกออเดอร์และติดตามสถานะจนถึงตัดสต๊อก</p>' +

      '<div class="out-form">' +
        '<div class="out-item">' +
          field('สินค้า', productSelect('outForm')) +
          field('จำนวน', input('outForm', 'qty', { type: 'number', min: 1 })) +
        '</div>' +
        '<div class="out-price">' +
          field('1. ราคาขายหน้าเว็บ', input('outForm', 'listPrice', { type: 'number', min: 0 })) +
          field('2. ค่า GP (%)', input('outForm', 'gpPercent', { type: 'number', min: 0, max: 100 })) +
          field('3. ราคาขายสุทธิ (โดยประมาณ)',
            '<div class="input" id="net-preview" style="background:transparent;border-color:transparent;padding-left:0;font-weight:600">' +
            esc(v.previewNetPriceStr) + '</div>') +
        '</div>' +
        '<div class="out-meta">' +
          field('วันที่', input('outForm', 'date', { type: 'date' })) +
          field('หมายเหตุ', input('outForm', 'note')) +
        '</div>' +

        field('ช่องทางการขาย', seg('outChannel', 'out-channel', CHANNELS, state.outForm.channel)) +
        field('สถานะเริ่มต้น', seg('outStatus', 'out-status', STATUSES, state.outForm.status)) +
      '</div>' +
      '<button class="btn btn-primary" style="margin-bottom:var(--space-8)" data-act="submit-out">+ บันทึกจ่ายออก</button>' +

      '<div style="display:flex;gap:var(--space-4);margin-bottom:var(--space-3);flex-wrap:wrap">' +
        '<div class="field" style="max-width:200px"><label>กรองช่องทาง</label>' +
          filterSelect('filterOutChannel', 'ทุกช่องทาง', CHANNELS) + '</div>' +
        '<div class="field" style="max-width:200px"><label>กรองสถานะ</label>' +
          filterSelect('filterOutStatus', 'ทุกสถานะ', STATUSES) + '</div>' +
      '</div>' +

      table(['วันที่', 'สินค้า', 'ช่องทาง', 'จำนวน', 'ราคาขายหน้าเว็บ', 'ค่า GP', 'ราคาขายสุทธิ', 'มูลค่ารวม', 'สถานะ', ''],
        v.outMovements.map((m) =>
          '<tr>' +
            '<td>' + esc(m.date) + '</td><td>' + esc(m.productName) + '</td><td>' + esc(m.channel) + '</td>' +
            '<td>' + esc(m.qty) + '</td><td>' + esc(m.listPriceStr) + '</td>' +
            '<td class="text-muted">' + esc(m.gpPercentStr) + '</td>' +
            '<td>' + esc(m.netPriceStr) + '</td><td>' + esc(m.totalStr) + '</td>' +
            '<td><span class="' + m.statusClass + '">' + esc(m.status) + '</span></td>' +
            '<td>' + (m.canAdvance
              ? '<button class="btn btn-ghost" style="font-size:12px;padding:4px 8px;white-space:nowrap"' +
                ' data-act="advance" data-id="' + esc(m.id) + '">→ ' + esc(m.nextLabel) + '</button>'
              : '') + '</td>' +
          '</tr>').join('')) +
    '</div>';
  }

  function viewProducts(v) {
    return '<div class="page">' +
      '<div style="display:flex;justify-content:space-between;align-items:end;gap:var(--space-3);margin-bottom:var(--space-6);flex-wrap:wrap">' +
        '<div>' +
          '<h2 style="margin-bottom:var(--space-1)">ข้อมูลสินค้า</h2>' +
          '<p class="text-muted" style="margin:0">รายละเอียดสต๊อกของสินค้าแต่ละตัว</p>' +
        '</div>' +
        '<button class="btn btn-primary" data-act="add-product">+ เพิ่มสินค้าใหม่</button>' +
      '</div>' +
      table(['SKU', 'ชื่อสินค้า', 'หมวดหมู่', 'ต้นทุน', 'ราคาขาย', 'คงเหลือ', 'จุดสั่งซื้อ', ''],
        v.products.map((p) =>
          '<tr>' +
            '<td class="text-muted">' + esc(p.sku) + '</td>' +
            '<td>' + esc(p.name) + '</td>' +
            '<td>' + esc(p.category) + '</td>' +
            '<td>' + esc(p.costStr) + '</td>' +
            '<td>' + esc(p.priceStr) + '</td>' +
            '<td style="white-space:nowrap">' + esc(p.stock) + ' ' + esc(p.unit) +
              (p.low ? '<span class="tag tag-accent-2" style="margin-left:6px">ต่ำ</span>' : '') + '</td>' +
            '<td class="text-muted">' + esc(p.reorderPoint) + '</td>' +
            '<td style="white-space:nowrap">' +
              '<button class="btn btn-ghost" style="font-size:12px" data-act="edit-product" data-id="' + esc(p.id) + '">แก้ไข</button>' +
              '<button class="btn btn-ghost" style="font-size:12px;color:var(--color-accent-2)" data-act="del-product" data-id="' + esc(p.id) + '">ลบ</button>' +
            '</td>' +
          '</tr>').join('')) +
    '</div>';
  }

  function viewReports(v) {
    const stockTab =
      '<div>' +
        '<div style="margin-bottom:var(--space-4)">' + plateNum(v.totalStockValueStr, 36) + '</div>' +
        table(['SKU', 'ชื่อสินค้า', 'หมวดหมู่', 'คงเหลือ', 'ต้นทุน/หน่วย', 'มูลค่ารวม'],
          v.products.map((p) =>
            '<tr>' +
              '<td class="text-muted">' + esc(p.sku) + '</td><td>' + esc(p.name) + '</td>' +
              '<td>' + esc(p.category) + '</td>' +
              '<td style="white-space:nowrap">' + esc(p.stock) + ' ' + esc(p.unit) +
                (p.low ? '<span class="tag tag-accent-2" style="margin-left:6px">ต่ำ</span>' : '') + '</td>' +
              '<td>' + esc(p.costStr) + '</td><td>' + esc(p.stockValueStr) + '</td>' +
            '</tr>').join('')) +
      '</div>';

    const movementTab =
      '<div>' +
        '<div style="display:flex;gap:var(--space-4);margin-bottom:var(--space-4);flex-wrap:wrap">' +
          '<div class="field" style="max-width:200px"><label>ช่องทาง</label>' +
            filterSelect('filterRepChannel', 'ทุกช่องทาง', CHANNELS) + '</div>' +
          '<div class="field" style="max-width:200px"><label>ประเภทรายการ</label>' +
            filterSelect('filterRepType', 'ทั้งหมด', [
              { value: 'in', label: 'รับเข้า' }, { value: 'out', label: 'จ่ายออก' }
            ]) + '</div>' +
          '<div style="align-self:end;margin-left:auto" class="text-muted">รวมมูลค่าตามตัวกรอง: ' +
            '<strong style="color:var(--color-text)">' + esc(v.reportMovementTotalStr) + '</strong></div>' +
        '</div>' +
        table(['วันที่', 'รายการ', 'สินค้า', 'ช่องทาง', 'จำนวน', 'ราคา/หน่วย', 'มูลค่ารวม', 'สถานะ'],
          v.reportMovements.map((m) =>
            '<tr>' +
              '<td>' + esc(m.date) + '</td>' +
              '<td><span class="' + m.typeTagClass + '">' + esc(m.typeLabel) + '</span></td>' +
              '<td>' + esc(m.productName) + '</td>' +
              '<td class="text-muted">' + esc(m.channelLabel) + '</td>' +
              '<td>' + esc(m.qty) + '</td><td>' + esc(m.priceStr) + '</td><td>' + esc(m.totalStr) + '</td>' +
              '<td><span class="' + m.statusClass + '">' + esc(m.statusLabel) + '</span></td>' +
            '</tr>').join('')) +
      '</div>';

    return '<div class="page">' +
      '<h2 style="margin-bottom:var(--space-1)">รายงาน</h2>' +
      seg('reportTab', 'report-tab', [
        { value: 'stock', label: 'สินค้าคงเหลือ' },
        { value: 'movement', label: 'เคลื่อนไหวสินค้า' }
      ], state.reportTab, 'margin:var(--space-3) 0 var(--space-6)') +
      (state.reportTab === 'stock' ? stockTab : movementTab) +
    '</div>';
  }

  function viewDialog() {
    if (!state.dialogOpen) return '';
    const f = (label, control) => field(label, control);
    return '<div class="dialog-backdrop" data-act="backdrop">' +
      '<div class="dialog" role="dialog" aria-modal="true" aria-label="' +
        esc(state.editId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่') + '">' +
        '<div class="dialog-title">' + esc(state.editId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่') + '</div>' +
        '<div class="pf-grid">' +
          f('ชื่อสินค้า', input('pf', 'name')) +
          f('SKU', input('pf', 'sku')) +
          f('หมวดหมู่', input('pf', 'category')) +
          f('หน่วยนับ', input('pf', 'unit')) +
          f('ต้นทุน', input('pf', 'cost', { type: 'number' })) +
          f('ราคาขาย', input('pf', 'price', { type: 'number' })) +
          f('จุดสั่งซื้อ (reorder point)', input('pf', 'reorderPoint', { type: 'number' })) +
          f('สต๊อกเริ่มต้น', input('pf', 'baseStock', { type: 'number' })) +
        '</div>' +
        '<div class="dialog-actions">' +
          '<button class="btn btn-secondary" data-act="close-dialog">ยกเลิก</button>' +
          '<button class="btn btn-primary" data-act="save-product">บันทึก</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // ── actions ──────────────────────────────────────────────────────────────
  function submitIn() {
    const f = state.inForm;
    if (!f.productId || !f.qty) return;
    state.movements.unshift({
      id: nextId('m', state.movements), type: 'in', date: f.date || TODAY,
      productId: f.productId, qty: Number(f.qty), price: Number(f.cost) || 0, note: f.note || ''
    });
    state.inForm = { productId: '', qty: '', cost: '', date: TODAY, note: '' };
    render();
  }

  function submitOut() {
    const f = state.outForm;
    if (!f.productId || !f.qty) return;
    const prod = state.products.find((p) => p.id === f.productId);
    const listPrice = f.listPrice !== '' ? Number(f.listPrice) : (prod ? prod.price : 0);
    state.movements.unshift({
      id: nextId('m', state.movements), type: 'out', date: f.date || TODAY,
      productId: f.productId, qty: Number(f.qty), listPrice,
      gpPercent: Number(f.gpPercent) || 0, channel: f.channel, status: f.status, note: f.note || ''
    });
    state.outForm = {
      productId: '', qty: '', listPrice: '',
      gpPercent: String(CHANNEL_GP[f.channel] != null ? CHANNEL_GP[f.channel] : 0),
      channel: f.channel, status: 'รอดำเนินการ', date: TODAY, note: ''
    };
    render();
  }

  function advanceStatus(id) {
    const mv = state.movements.find((m) => m.id === id);
    if (!mv) return;
    const idx = STATUSES.indexOf(mv.status);
    if (idx < STATUSES.length - 1) mv.status = STATUSES[idx + 1];
    render();
  }

  function openAddProduct() {
    state.dialogOpen = true;
    state.editId = null;
    state.pf = emptyProductForm();
    render();
  }

  function openEditProduct(id) {
    const p = state.products.find((x) => x.id === id);
    if (!p) return;
    state.dialogOpen = true;
    state.editId = id;
    state.pf = {
      name: p.name, sku: p.sku, category: p.category, cost: p.cost,
      price: p.price, unit: p.unit, reorderPoint: p.reorderPoint, baseStock: p.baseStock
    };
    render();
  }

  function saveProduct() {
    const f = state.pf;
    if (!f.name || !f.sku) return;
    const data = {
      name: f.name, sku: f.sku, category: f.category,
      cost: Number(f.cost) || 0, price: Number(f.price) || 0, unit: f.unit,
      reorderPoint: Number(f.reorderPoint) || 0, baseStock: Number(f.baseStock) || 0
    };
    if (state.editId) {
      const p = state.products.find((x) => x.id === state.editId);
      if (p) Object.assign(p, data);
    } else {
      state.products.push(Object.assign({ id: nextId('p', state.products) }, data));
    }
    state.dialogOpen = false;
    render();
  }

  function closeDialog() {
    state.dialogOpen = false;
    render();
  }

  function deleteProduct(id) {
    state.products = state.products.filter((p) => p.id !== id);
    render();
  }

  // ── render ───────────────────────────────────────────────────────────────
  const main = document.getElementById('main');
  const dialogRoot = document.getElementById('dialog-root');
  const nav = document.getElementById('nav');

  const PAGES = {
    dashboard: viewDashboard, in: viewIn, out: viewOut, products: viewProducts, reports: viewReports
  };

  function render() {
    // Preserve the caret across the rebuild for whatever is focused.
    const active = document.activeElement;
    const key = active && active.dataset ? active.dataset.k : null;
    let selStart = null, selEnd = null;
    if (key) { try { selStart = active.selectionStart; selEnd = active.selectionEnd; } catch (e) { /* number/date inputs */ } }

    const v = computeVals();
    main.innerHTML = (PAGES[state.page] || viewDashboard)(v);
    dialogRoot.innerHTML = viewDialog();

    nav.querySelectorAll('a[data-page]').forEach((a) => {
      if (a.dataset.page === state.page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (key) {
      const next = document.querySelector('[data-k="' + key + '"]');
      if (next) {
        next.focus();
        if (selStart != null) { try { next.setSelectionRange(selStart, selEnd); } catch (e) { /* unsupported type */ } }
      }
    }
  }

  // ── events ───────────────────────────────────────────────────────────────
  // Field edits mutate state without a rebuild, so typing never loses the
  // caret; only the values that feed something else on screen re-render.
  function onFieldInput(el) {
    const section = el.dataset.section;
    state[section][el.dataset.field] = el.value;
    if (section === 'outForm' && (el.dataset.field === 'listPrice' || el.dataset.field === 'gpPercent')) {
      const preview = document.getElementById('net-preview');
      if (preview) preview.textContent = previewNetPrice();
    }
  }

  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const act = el.dataset.act;
    if (act === 'field') onFieldInput(el);
    else if (act === 'state') { state[el.dataset.key] = el.value; render(); }
    else if (act === 'report-tab') { state.reportTab = el.value; render(); }
    else if (act === 'out-status') { state.outForm.status = el.value; }
    else if (act === 'out-channel') {
      state.outForm.channel = el.value;
      state.outForm.gpPercent = String(CHANNEL_GP[el.value] != null ? CHANNEL_GP[el.value] : 0);
      render();
    }
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const act = el.dataset.act;
    if (act === 'nav') { e.preventDefault(); state.page = el.dataset.page; render(); }
    else if (act === 'submit-in') submitIn();
    else if (act === 'submit-out') submitOut();
    else if (act === 'advance') advanceStatus(el.dataset.id);
    else if (act === 'add-product') openAddProduct();
    else if (act === 'edit-product') openEditProduct(el.dataset.id);
    else if (act === 'del-product') deleteProduct(el.dataset.id);
    else if (act === 'close-dialog') closeDialog();
    else if (act === 'save-product') saveProduct();
    else if (act === 'backdrop' && e.target === el) closeDialog();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.dialogOpen) closeDialog();
  });

  render();
})();
