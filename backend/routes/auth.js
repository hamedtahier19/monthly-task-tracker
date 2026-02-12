const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Helper to read users
const readUsers = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading users:", err);
        return [];
    }
};

// Helper to write users
const writeUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing users:", err);
        return false;
    }
};

// POST /api/auth/login - تسجيل الدخول
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // إرجاع بيانات المستخدم بدون كلمة المرور
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            success: true,
            user: userWithoutPassword,
            message: 'تم تسجيل الدخول بنجاح'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
    }
});

// POST /api/auth/register - إنشاء حساب جديد
router.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    const users = readUsers();

    // التحقق من وجود المستخدم
    if (users.find(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            message: 'البريد الإلكتروني مستخدم بالفعل'
        });
    }

    // إنشاء مستخدم جديد
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        email,
        password,
        name,
        role: 'user', // المستخدمون الجدد يكونون عاديين
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    if (writeUsers(users)) {
        const { password: _, ...userWithoutPassword } = newUser;
        res.json({
            success: true,
            user: userWithoutPassword,
            message: 'تم إنشاء الحساب بنجاح'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'خطأ في إنشاء الحساب'
        });
    }
});

module.exports = router;
