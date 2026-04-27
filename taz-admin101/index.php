<?php
session_start();

// --- AGENCY SETTINGS (Multi-User) ---
$allowed_users = [
    "Danny123" => "12345@Taz",
    "Obum123"  => "12345@Taz"
];

// Handle Login Logic
if (isset($_POST['username']) && isset($_POST['password'])) {
    $input_user = $_POST['username'];
    $input_pass = $_POST['password'];

    if (array_key_exists($input_user, $allowed_users) && $allowed_users[$input_user] === $input_pass) {
        $_SESSION['logged_in'] = true;
        $_SESSION['user_name'] = $input_user;
    } else {
        $error = "Invalid username or password.";
    }
}

// Handle Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

// ==============================================================================
// 1. LOGIN VIEW (If not logged in)
// ==============================================================================
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true): 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TazVerde | Admin Access</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root { --green-dark: #0a1f11; --gold: #c8973a; --white: #ffffff; --glass-bg: rgba(255, 255, 255, 0.85); --glass-border: rgba(255, 255, 255, 0.2); }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: var(--green-dark); background: radial-gradient(circle at top left, #0e2b1a, #0a1f11); height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; overflow: hidden; }
        .login-card { background: var(--glass-bg); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); width: 100%; max-width: 950px; min-height: 580px; display: grid; grid-template-columns: 1.1fr 0.9fr; border-radius: 20px; border: 1px solid var(--glass-border); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; }
        .login-image { background: url('../assets/images/admin-panel.png') no-repeat center center; background-size: cover; position: relative; }
        .login-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,31,17,0.2), transparent); }
        .login-content { padding: 4.5rem 3.5rem; display: flex; flex-direction: column; justify-content: center; background: rgba(255, 255, 255, 0.2); }
        h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 300; color: var(--green-dark); margin-bottom: 0.5rem; line-height: 1.1; }
        h1 em { font-style: italic; color: var(--gold); }
        p.subheading { font-family: 'DM Sans', sans-serif; color: #444; margin-bottom: 3rem; font-size: 1rem; letter-spacing: 0.02em; }
        .form-group { margin-bottom: 1.8rem; }
        .input-wrapper { position: relative; width: 100%; }
        label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--green-dark); margin-bottom: 0.8rem; opacity: 0.8; }
        input { width: 100%; padding: 15px 18px; background: rgba(255, 255, 255, 0.5); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 8px; font-size: 1rem; font-family: 'DM Sans', sans-serif; transition: all 0.3s ease; }
        input[name="password"] { padding-right: 50px; }
        input:focus { outline: none; background: white; border-color: var(--gold); box-shadow: 0 0 0 4px rgba(200, 151, 58, 0.1); }
        .toggle-btn { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; display: flex; align-items: center; opacity: 0.5; transition: 0.3s; }
        .toggle-btn:hover { opacity: 1; }
        .toggle-btn svg { width: 20px; height: 20px; color: var(--green-dark); }
        .btn-login { background: var(--green-dark); color: var(--white); border: none; padding: 18px; width: 100%; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 1rem; cursor: pointer; margin-top: 1rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-login:hover { background: #14361e; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .error { color: #c0392b; font-size: 0.85rem; margin-bottom: 2rem; padding: 12px; background: rgba(192, 57, 43, 0.1); border-left: 3px solid #c0392b; border-radius: 4px; }
        @media (max-width: 900px) { .login-card { max-width: 500px; grid-template-columns: 1fr; min-height: auto; border-radius: 15px; } .login-image { display: none; } .login-content { padding: 4rem 2.5rem; } h1 { font-size: 2.2rem; } }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="login-image"></div>
        <div class="login-content">
            <h1>Welcome <em>back!</em></h1>
            <p class="subheading">Login to make changes on website</p>
            <?php if(isset($error)) echo "<p class='error'>$error</p>"; ?>
            <form method="POST">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" required autocomplete="username">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <div class="input-wrapper">
                        <input type="password" name="password" id="password-field" placeholder="••••••••" required autocomplete="current-password">
                        <span class="toggle-btn" onclick="togglePass()">
                            <svg id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </span>
                    </div>
                </div>
                <button type="submit" class="btn-login">Login</button>
            </form>
        </div>
    </div>
    <script>
        function togglePass() {
            const passInput = document.getElementById('password-field');
            const icon = document.getElementById('eye-icon');
            if (passInput.type === 'password') {
                passInput.type = 'text';
                icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                passInput.type = 'password';
                icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
            }
        }
    </script>
</body>
</html>

<?php else: 
// ==============================================================================
// 2. DASHBOARD VIEW (Responsive & Image Upload)
// ==============================================================================
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TazVerde CMS | Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root { --green: #0a1f11; --gold: #c8973a; --bg: #f4f7f5; --text: #333; --border: #e0e6e2; }
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; margin: 0; background: var(--bg); display: flex; height: 100vh; color: var(--text); }
        aside { width: 260px; background: var(--green); color: white; padding: 2rem 1.5rem; display: flex; flex-direction: column; transition: 0.3s; }
        main { flex: 1; padding: 3rem; overflow-y: auto; transition: 0.3s; }
        @media (max-width: 992px) {
            body { flex-direction: column; }
            aside { width: 100%; height: auto; padding: 1.5rem; }
            .logo-cms { margin-bottom: 1rem !important; }
            nav { display: flex; gap: 10px; flex-wrap: wrap; }
            nav a { margin-bottom: 0; padding: 8px 15px; font-size: 0.9rem; }
            main { padding: 1.5rem; }
        }
        .logo-cms { font-weight: 700; font-size: 1.2rem; margin-bottom: 3rem; color: var(--gold); }
        nav a { color: rgba(255,255,255,0.7); text-decoration: none; padding: 12px; display: block; border-radius: 6px; margin-bottom: 0.5rem; cursor: pointer; transition: 0.3s; border: 1px solid transparent; }
        nav a:hover, nav a.active { background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.1); }
        .logout { margin-top: auto; color: #ff6b6b !important; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .card { background: white; padding: 2rem; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.03); margin-bottom: 2rem; }
        @media (max-width: 600px) { .header h1 { font-size: 1.5rem; } .card { padding: 1.2rem; } .highlight-row { flex-direction: column; } }
        .form-group { margin-bottom: 1.5rem; }
        label { display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.9rem; color: #666; }
        input, textarea, select { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 6px; font-family: inherit; font-size: 1rem; }
        .btn-save { background: var(--green); color: white; border: none; padding: 14px 28px; border-radius: 6px; cursor: pointer; font-weight: 600; }
        .btn-add { background: var(--gold); color: white; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
        .product-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid var(--border); }
        .actions { display: flex; gap: 15px; }
        .btn-edit { color: var(--green); cursor: pointer; font-weight: 600; }
        .btn-del { color: #ff6b6b; cursor: pointer; }
        .hidden { display: none; }
        .img-preview { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-top: 10px; border: 1px solid var(--border); display: block; }
    </style>
</head>
<body>
<aside>
    <div class="logo-cms">TazVerde Admin</div>
    <nav>
        <a onclick="showTab('settings')" id="tab-settings" class="active">Site Settings</a>
        <a onclick="showTab('products')" id="tab-products">Manage Products</a>
        <a href="?logout=1" class="logout">Logout</a>
    </nav>
</aside>
<main>
    <section id="sec-settings">
        <div class="header"><h1>Site Settings</h1></div>
        <div class="card">
            <div class="form-group"><label>Contact Email</label><input type="email" id="set-email"></div>
            <div class="form-group"><label>Contact Phone</label><input type="text" id="set-phone"></div>
            <div class="form-group"><label>Response Time Text</label><input type="text" id="set-response"></div>
            <button class="btn-save" onclick="saveData()">Update Site Info</button>
        </div>
    </section>
    <section id="sec-products" class="hidden">
        <div class="header"><h1>Products</h1><button class="btn-add" onclick="openProductEditor()">+ Add New Product</button></div>
        <div class="card" id="product-list"></div>
    </section>
    <section id="sec-editor" class="hidden">
        <div class="header"><h1 id="editor-title">Edit Product</h1><button onclick="showTab('products')" style="background:none; border:none; cursor:pointer; color:var(--green); font-weight:bold;">← Back</button></div>
        <div class="card">
            <div class="form-group"><label>Product Name</label><input type="text" id="p-name"></div>
            <div class="form-group"><label>Teaser (Visible on card)</label><textarea id="p-teaser" rows="2"></textarea></div>
            <div class="form-group">
                <label>Product Image</label>
                <input type="file" id="p-file" accept="image/*" onchange="previewImage(this)">
                <input type="hidden" id="p-img-path">
                <img id="p-preview" class="img-preview" src="">
            </div>
            <div class="form-group"><label>Background Color Class (e.g. pc-vanilla)</label><input type="text" id="p-color"></div>
            <div class="form-group"><label>URL ID (e.g. vanilla-pods)</label><input type="text" id="p-id"></div>
            <hr style="margin:2.5rem 0; opacity:0.1;">
            <h3>Overlay Details</h3>
            <div class="form-group"><label>Modal Tag</label><input type="text" id="p-tag"></div>
            <div class="form-group"><label>Full Description</label><textarea id="p-desc" rows="4"></textarea></div>
            <label>Highlight List (Bullets)</label>
            <div id="highlight-container"></div>
            <button class="btn-add" onclick="addHighlightRow()" style="margin-top:10px; background:#666;">+ Add Highlight</button>
            <div style="margin-top:3rem;"><button class="btn-save" id="save-btn" onclick="saveProduct()">Save Product Details</button></div>
        </div>
    </section>
</main>
<script>
    let db = {};
    let currentEditId = null;
    async function loadData() {
        const res = await fetch('../content.json');
        db = await res.json();
        populateSettings();
        renderProductList();
    }
    function showTab(tab) {
        ['settings','products','editor'].forEach(s => document.getElementById('sec-'+s).classList.add('hidden'));
        ['settings','products'].forEach(t => document.getElementById('tab-'+t)?.classList.remove('active'));
        document.getElementById('sec-'+tab).classList.remove('hidden');
        if(document.getElementById('tab-'+tab)) document.getElementById('tab-'+tab).classList.add('active');
    }
    function populateSettings() {
        document.getElementById('set-email').value = db.global_settings.contact_email;
        document.getElementById('set-phone').value = db.global_settings.contact_phone;
        document.getElementById('set-response').value = db.global_settings.contact_response_time;
    }
    function renderProductList() {
        const list = document.getElementById('product-list');
        list.innerHTML = db.products.map(p => `<div class="product-item"><strong>${p.name}</strong><div class="actions"><span class="btn-edit" onclick="openProductEditor('${p.id}')">Edit</span><span class="btn-del" onclick="deleteProduct('${p.id}')">Delete</span></div></div>`).join('');
    }
    function previewImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => document.getElementById('p-preview').src = e.target.result;
            reader.readAsDataURL(input.files[0]);
        }
    }
    function openProductEditor(id = null) {
        currentEditId = id; showTab('editor'); document.getElementById('highlight-container').innerHTML = ''; document.getElementById('p-file').value = '';
        if(id) {
            const p = db.products.find(x => x.id === id);
            document.getElementById('editor-title').innerText = "Editing: " + p.name;
            document.getElementById('p-id').value = p.id;
            document.getElementById('p-name').value = p.name;
            document.getElementById('p-teaser').value = p.teaser;
            document.getElementById('p-img-path').value = p.image;
            document.getElementById('p-preview').src = '../' + p.image;
            document.getElementById('p-color').value = p.color_class;
            document.getElementById('p-tag').value = p.modal.tag;
            document.getElementById('p-desc').value = p.modal.desc;
            p.modal.highlights.forEach(h => addHighlightRow(h.title, h.text));
        } else {
            document.getElementById('editor-title').innerText = "New Product";
            ['p-id','p-name','p-teaser','p-img-path','p-color','p-tag','p-desc'].forEach(i => document.getElementById(i).value = '');
            document.getElementById('p-preview').src = ''; addHighlightRow();
        }
    }
    function addHighlightRow(title = '', text = '') {
        const div = document.createElement('div'); div.className = 'highlight-row'; div.style.display = "flex"; div.style.gap = "10px"; div.style.marginBottom = "10px";
        div.innerHTML = `<input type="text" placeholder="Title" value="${title}" class="h-title"><input type="text" placeholder="Detail" value="${text}" class="h-text"><button onclick="this.parentElement.remove()" style="color:red; background:none; border:none; cursor:pointer; font-size:1.5rem;">&times;</button>`;
        document.getElementById('highlight-container').appendChild(div);
    }
    async function saveProduct() {
        const btn = document.getElementById('save-btn'); btn.innerText = "Processing..."; btn.disabled = true;
        let finalImagePath = document.getElementById('p-img-path').value;
        const fileInput = document.getElementById('p-file');
        if (fileInput.files.length > 0) {
            const formData = new FormData(); formData.append('product_image', fileInput.files[0]);
            const upRes = await fetch('upload.php', { method: 'POST', body: formData });
            const upData = await upRes.json();
            if (upData.status === 'success') { finalImagePath = upData.path; }
            else { alert("Upload failed!"); btn.innerText = "Save Product Details"; btn.disabled = false; return; }
        }
        const newProd = { id: document.getElementById('p-id').value, name: document.getElementById('p-name').value, teaser: document.getElementById('p-teaser').value, image: finalImagePath, color_class: document.getElementById('p-color').value, modal: { tag: document.getElementById('p-tag').value, title: document.getElementById('p-name').value, desc: document.getElementById('p-desc').value, highlights: [] } };
        document.querySelectorAll('.highlight-row').forEach(row => {
            const title = row.querySelector('.h-title').value;
            const text = row.querySelector('.h-text').value;
            if(title) newProd.modal.highlights.push({title, text});
        });
        if(currentEditId) { const index = db.products.findIndex(x => x.id === currentEditId); db.products[index] = newProd; }
        else { db.products.push(newProd); }
        await fetch('save.php', { method: 'POST', body: JSON.stringify(db) });
        alert("Success!"); btn.innerText = "Save Product Details"; btn.disabled = false; renderProductList(); showTab('products');
    }
    async function saveData() {
        db.global_settings.contact_email = document.getElementById('set-email').value;
        db.global_settings.contact_phone = document.getElementById('set-phone').value;
        db.global_settings.contact_response_time = document.getElementById('set-response').value;
        await fetch('save.php', { method: 'POST', body: JSON.stringify(db) });
        alert("Settings Saved!");
    }
    function deleteProduct(id) { if(confirm('Delete?')) { db.products = db.products.filter(x => x.id !== id); saveData().then(() => renderProductList()); } }
    loadData();
</script>
</body>
</html>
<?php endif; ?>