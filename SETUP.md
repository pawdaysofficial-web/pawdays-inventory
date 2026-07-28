# 🚀 Setup Guide - แค่ 10 นาที!

## **Phase 1: Create GitHub Repository (5 นาที)**

### Step 1.1: สร้าง Repo บน GitHub

1. ไปที่ https://github.com/new
2. ตั้งค่า:
   - **Repository name**: `pawdays-inventory`
   - **Description**: Pawdays Inventory Management System
   - **Public**: ✅ (เพื่อใช้ GitHub Pages ฟรี)
3. คลิก **Create repository**

### Step 1.2: Clone และ Push Code

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/pawdays-inventory.git
cd pawdays-inventory

# Copy ไฟล์ทั้งหมดจาก Pawdays Website
cp ../Pawdays\ Website/* . -r

# Commit and Push
git add .
git commit -m "Initial: Pawdays Inventory System"
git push -u origin main
```

**✅ Code อยู่บน GitHub แล้ว**

---

## **Phase 2: ตั้งค่า Password (2 นาที)**

### Step 2.1: แก้ไข auth.js

1. เปิด file `auth.js` ใน editor ของคุณ
2. หาบรรทัด:
```javascript
const AUTH_PASSWORD = 'pawdays2024'; // 🔑 เปลี่ยนตรงนี้!
```

3. เปลี่ยน password ให้เป็นของคุณ เช่น:
```javascript
const AUTH_PASSWORD = 'your-secure-password-here'; // 🔑 ตั้งรหัสแข็งแรง!
```

4. Save file

### Step 2.2: Push Changes

```bash
git add auth.js
git commit -m "Set password for pawdays.official@gmail.com"
git push
```

**✅ Password ตั้งแล้ว**

---

## **Phase 3: Enable GitHub Pages (3 นาที)**

1. ไปที่ GitHub Repo
2. คลิก **Settings** (ด้านบนขวา)
3. ไปที่ **Pages** (แผงซ้าย)
4. ตั้งค่า:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
5. คลิก **Save**
6. รอ 1-2 นาทีให้ deploy เสร็จ

**✅ เว็บของคุณจะเข้าถึงได้ที่:**
```
https://YOUR-USERNAME.github.io/pawdays-inventory
```

---

## **Phase 4: Test Login (1 นาที)**

1. ไปที่ https://YOUR-USERNAME.github.io/pawdays-inventory
2. ป้อน Password ที่คุณตั้งไว้
3. คลิก **เข้าสู่ระบบ**

**✅ ทำได้! ** Dashboard จะแสดงขึ้นมา

---

## 🎯 Login Credentials

```
📧 Email: pawdays.official@gmail.com
🔐 Password: [ตามที่คุณตั้งใน auth.js]
```

---

## 🎉 ตรวจสอบความเสร็จ

- ✅ GitHub repo สร้าง
- ✅ Code push ไป GitHub
- ✅ Password ตั้งค่า
- ✅ GitHub Pages enable
- ✅ Login ทดสอบได้

**🚀 พร้อมใช้งานแล้ว!**

---

## 📝 Important Notes

- **Email**: ใช้ได้เพียง `pawdays.official@gmail.com` เท่านั้น
- **Password**: เปลี่ยนได้ใน `auth.js` บรรทัด 8
- **Data**: เก็บใน browser memory (reload = หายไป)
- **Multiple users**: ยังใช้ไม่ได้ (single user setup)

---

## 🔒 ความปลอดภัย

⚠️ **เตือน**: Password เก็บใน JavaScript code (visible ใน browser)
- เหมาะสำหรับ 1 user เท่านั้น
- ถ้าต้องการ multi-user → ต้อง upgrade เป็น Supabase Auth

---

## 📞 เมื่อมีปัญหา

| ปัญหา | วิธีแก้ |
|------|--------|
| Login ไม่ได้ | ตรวจสอบ password ว่าตรงหรือไม่ |
| GitHub Pages ไม่อัพเดต | ไปที่ Actions tab ดูว่า deploy สำเร็จหรือไม่ |
| Data หายเมื่อ reload | ปกติ - เพราะเก็บใน browser memory เท่านั้น |

---

**ใช้ได้แล้ว! 🎉**
