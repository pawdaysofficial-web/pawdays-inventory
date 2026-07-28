/* Simple Password Auth for Pawdays Inventory
 * Single user: pawdays.official@gmail.com
 */
(function() {
  'use strict';

  // ⚙️ ตั้งค่า Password (เปลี่ยนให้เป็น password ของคุณ)
  const AUTH_PASSWORD = 'pawdays2024'; // 🔑 เปลี่ยนตรงนี้!

  class InventoryAuth {
    constructor() {
      this.loggedIn = false;
      this.checkSession();
    }

    checkSession() {
      // ตรวจสอบว่า user login อยู่จากก่อนหน้า
      if (localStorage.getItem('pawdays_logged_in') === 'true') {
        this.loggedIn = true;
      }
      this.render();
    }

    login(password) {
      if (password === AUTH_PASSWORD) {
        this.loggedIn = true;
        localStorage.setItem('pawdays_logged_in', 'true');
        this.render();
        return true;
      } else {
        alert('❌ Password ไม่ถูกต้อง');
        return false;
      }
    }

    logout() {
      this.loggedIn = false;
      localStorage.removeItem('pawdays_logged_in');
      this.render();
    }

    render() {
      const root = document.getElementById('auth-root');
      if (!root) return;

      if (!this.loggedIn) {
        // Login page
        root.innerHTML = this.loginHTML();
        root.querySelector('form').addEventListener('submit', (e) => {
          e.preventDefault();
          const password = root.querySelector('input[name="password"]').value;
          this.login(password);
        });
      } else {
        // Inventory page
        root.innerHTML = '';
        document.getElementById('inventory-app').style.display = 'block';
        document.getElementById('user-info').innerHTML =
          `📧 <strong>pawdays.official@gmail.com</strong> ` +
          `<button id="logout-btn" class="btn btn-ghost" style="margin-left:var(--space-3)">ออกจากระบบ</button>`;
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
      }
    }

    loginHTML() {
      return `
        <div style="min-height:100vh;background:var(--color-bg);color:var(--color-text);
                    display:grid;place-items:center;padding:var(--space-4)">
          <div style="width:min(360px,100%);animation:pageIn .45s ease">
            <div style="text-align:center;margin-bottom:var(--space-8)">
              <h1 style="margin-bottom:var(--space-2)">🐾 คลังสินค้า Pawdays</h1>
              <p class="text-muted">Inventory Management System</p>
            </div>
            <form style="display:grid;gap:var(--space-4)">
              <div class="field">
                <label>📧 Email</label>
                <input class="input" type="email" value="pawdays.official@gmail.com" disabled
                       style="background:var(--color-surface);opacity:0.7">
              </div>
              <div class="field">
                <label>🔐 Password</label>
                <input class="input" type="password" name="password" placeholder="••••••••" autofocus required>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%">เข้าสู่ระบบ</button>
            </form>
          </div>
        </div>
      `;
    }
  }

  // Initialize auth when DOM ready
  window.auth = new InventoryAuth();
})();
