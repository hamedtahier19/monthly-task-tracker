const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

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

// Helper to read tasks
const readTasks = () => {
    try {
        if (!fs.existsSync(TASKS_FILE)) return [];
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading tasks:", err);
        return [];
    }
};

// Middleware للتحقق من صلاحيات الأدمن
const requireAdmin = (req, res, next) => {
    // في بيئة الإنتاج، يجب التحقق من JWT token
    // هنا نستخدم طريقة بسيطة للتطوير
    const userId = req.headers['x-user-id'];
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(userId));

    if (!user || user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'غير مصرح لك بالوصول إلى هذا المورد'
        });
    }

    req.user = user;
    next();
};

// GET /api/users - جلب جميع المستخدمين (admin only)
router.get('/', requireAdmin, (req, res) => {
    const users = readUsers();
    // إزالة كلمات المرور من النتيجة
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json({ success: true, users: usersWithoutPasswords });
});

// GET /api/users/:id - جلب مستخدم محدد (admin only)
router.get('/:id', requireAdmin, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'المستخدم غير موجود'
        });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
});

// PUT /api/users/:id - تعديل مستخدم (admin only)
router.put('/:id', requireAdmin, (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'المستخدم غير موجود'
        });
    }

    // تحديث بيانات المستخدم
    const { email, name, role } = req.body;
    if (email) users[userIndex].email = email;
    if (name) users[userIndex].name = name;
    if (role) users[userIndex].role = role;

    if (writeUsers(users)) {
        const { password, ...userWithoutPassword } = users[userIndex];
        res.json({
            success: true,
            user: userWithoutPassword,
            message: 'تم تحديث المستخدم بنجاح'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'خطأ في تحديث المستخدم'
        });
    }
});

// DELETE /api/users/:id - حذف مستخدم (admin only)
router.delete('/:id', requireAdmin, (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'المستخدم غير موجود'
        });
    }

    // منع حذف الأدمن لنفسه
    if (users[userIndex].id === req.user.id) {
        return res.status(400).json({
            success: false,
            message: 'لا يمكنك حذف حسابك الخاص'
        });
    }

    users.splice(userIndex, 1);

    if (writeUsers(users)) {
        res.json({
            success: true,
            message: 'تم حذف المستخدم بنجاح'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'خطأ في حذف المستخدم'
        });
    }
});

// GET /api/users/:id/tasks - جلب مهام مستخدم محدد (admin only)
router.get('/:id/tasks', requireAdmin, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'المستخدم غير موجود'
        });
    }

    // في المستقبل، يمكن ربط المهام بالمستخدمين
    // حالياً نرجع جميع المهام كمثال
    const tasks = readTasks();
    res.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email },
        tasks
    });
});

module.exports = router;
