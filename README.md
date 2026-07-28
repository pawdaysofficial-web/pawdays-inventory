# 🐾 Pawdays Inventory Management System

คลังสินค้า Pawdays - ระบบจัดการสินค้าออนไลน์ สำหรับ pawdays.official@gmail.com

## 🎯 Features

- **ภาพรวม** — Dashboard แสดงสถิติคลังสินค้า, ยอดขายวันนี้, สินค้าต่ำ
- **รับเข้าสินค้า** — บันทึกการรับสินค้าพร้อมราคาต้นทุน
- **จ่ายออกสินค้า** — บันทึกออเดอร์, ติดตามสถานะ (รอดำเนินการ → ยืนยัน → ตัดสต๊อก)
- **ข้อมูลสินค้า** — จัดการสินค้า (เพิ่ม/แก้ไข/ลบ)
- **รายงาน** — วิเคราะห์สต๊อก, เคลื่อนไหวสินค้า พร้อม filter
- **🔐 Auth** — Password protection สำหรับ pawdays.official@gmail.com
- **☁️ Hosted** — GitHub Pages (FREE, no server cost)

## 🚀 Quick Start (10 นาที)

### ขั้นที่ 1: Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/pawdays-inventory.git
cd pawdays-inventory
```

### ขั้นที่ 2: ตั้ง Password

1. เปิด `auth.js`
2. หาบรรทัด:
```javascript
const AUTH_PASSWORD = 'pawdays2024'; // 🔑 เปลี่ยนตรงนี้!
```
3. เปลี่ยนเป็น password ของคุณ
4. Save file

### ขั้นที่ 3: Push ไป GitHub

```bash
git add auth.js
git commit -m "Set password for pawdays.official@gmail.com"
git push
```

### ขั้นที่ 4: Enable GitHub Pages

1. ไป GitHub Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)`
4. Save

**✅ เสร็จ!** เว็บของคุณจะถูก deploy ที่:
```
https://YOUR-USERNAME.github.io/pawdays-inventory
```

---

## 🔐 Login Credentials

```
📧 Email: pawdays.official@gmail.com
🔐 Password: [ตามที่คุณตั้งใน auth.js]
```

**Password ตั้งค่าใน**: `auth.js` บรรทัด 8

---

## 📁 File Structure

```
pawdays-inventory/
├── index.html          # Main page (login + app)
├── auth.js            # Password authentication
├── inventory.js       # Inventory app logic
├── ds/
│   └── styles.css     # Design system
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Pages auto-deploy
└── README.md          # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | HTML/CSS/JS | Free |
| Auth | Simple Password | Free |
| Hosting | GitHub Pages | Free |
| Database | Browser localStorage (ก่อน) | Free |

---

## 📊 Features

### Dashboard (ภาพรวม)
- 📦 จำนวน SKU ทั้งหมด
- 💰 มูลค่าสต๊อกคงเหลือ
- 📈 ยอดขายวันนี้
- 🔴 สินค้าที่ใกล้หมด
- 📊 กราฟยอดขายตามช่องทาง

### Inventory In (รับเข้าสินค้า)
- เลือกสินค้า
- ป้อนจำนวน + ราคาต้นทุน
- ประวัติการรับเข้า

### Inventory Out (จ่ายออกสินค้า)
- เลือกสินค้า + จำนวน
- ตั้งราคาขาย + ค่า GP
- เลือกช่องทาง (Shopee, TikTok Shop, LINE Shop, หน้าร้าน)
- ติดตามสถานะออเดอร์
- Advance status: รอดำเนินการ → ยืนยัน → ตัดสต๊อก

### Products (ข้อมูลสินค้า)
- ตารางสินค้าทั้งหมด 10 รายการ
- เพิ่ม/แก้ไข/ลบสินค้า
- แสดง SKU, ชื่อ, category, ต้นทุน, ราคา, สต๊อก, จุดสั่งซื้อ

### Reports (รายงาน)
- **สินค้าคงเหลือ** — รายงานมูลค่าสต๊อก
- **เคลื่อนไหวสินค้า** — ประวัติ in/out พร้อม filter ช่องทาง

---

## 🔒 Security Notes

⚠️ **ข้อควรระวัง**:
- Password เก็บใน JavaScript (visible ใน browser)
- เหมาะสำหรับ **1 user** เท่านั้น
- ไม่แนะนำสำหรับข้อมูลที่ยาก
- หากต้อง multi-user → upgrade เป็น Supabase Auth

---

## 📝 Data Persistence

ปัจจุบัน:
- ✅ Data เก็บใน browser memory
- ❌ Reload page = data หายไป
- ❌ ใช้ไม่ได้หลาย devices

Future upgrade:
- [ ] Connect Supabase database
- [ ] Real-time sync เก่า users
- [ ] Export/Import CSV
- [ ] Mobile app

---

## 🚨 Troubleshooting

| ปัญหา | วิธีแก้ |
|------|--------|
| ❌ Login ไม่ได้ | ตรวจสอบ password ว่าตรงหรือไม่ |
| ❌ GitHub Pages ไม่อัพเดต | ไปที่ Actions tab ดูว่า deploy สำเร็จหรือไม่ |
| ❌ Data หายเมื่อ reload | ปกติ - เพราะเก็บใน browser memory เท่านั้น |
| ❌ ไม่เห็น index.html | ตรวจสอบว่า rename `inventory.html` → `index.html` แล้วหรือยัง |

---

## 📞 Next Steps

1. **Immediate**: Deploy ด้วย GitHub Pages (เรียบร้อยแล้ว)
2. **Soon**: Add Supabase database สำหรับ data persistence
3. **Later**: Real-time sync สำหรับ multi-user
4. **Later**: Mobile app

---

## 📖 Documentation

- **SETUP.md** — Step-by-step guide
- **README.md** — นี่แหละ (reference)

---

**Made with ❤️ for Pawdays**
