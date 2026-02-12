# 🗓️ Monthly Task Tracker - متتبع المهام الشهري

موقع ويب تفاعلي لتنظيم وتتبع المهام الشهرية أسبوعاً بأسبوع، مع نسبة إنجاز وتعديل مباشر من الواجهة.

## ✨ الميزات

### 🎯 للمستخدمين
- ✅ تنظيم المهام الأسبوعية والشهرية
- 📊 تتبع نسبة الإنجاز بشكل مرئي
- 🌙 وضع ليلي شامل لجميع الصفحات
- 🌐 دعم اللغتين العربية والإنجليزية
- 📱 تصميم متجاوب مع جميع الأجهزة (Mobile, Tablet, Desktop)
- 🎨 واجهة مستخدم عصرية وسهلة الاستخدام

### 👨‍💼 للأدمن
- 🛡️ لوحة تحكم خاصة بالأدمن
- 👥 إدارة المستخدمين (عرض، تعديل، حذف)
- 📋 عرض مهام جميع المستخدمين
- 📈 إحصائيات شاملة عن النظام

## 🛠️ التقنيات المستخدمة

### Frontend
- ⚛️ React.js
- 🎨 Bootstrap 5
- 🎭 Framer Motion (للحركات)
- 🎯 Lucide React (للأيقونات)
- 🌐 React Router

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 📁 JSON File Storage (قابل للتطوير لقاعدة بيانات)

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js (v14 أو أحدث)
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd رمضان
```

2. **تثبيت Backend**
```bash
cd backend
npm install
```

3. **تثبيت Frontend**
```bash
cd ../frontend
npm install
```

4. **تشغيل Backend**
```bash
cd backend
npm start
```
سيعمل الـ Backend على: `http://localhost:5000`

5. **تشغيل Frontend**
```bash
cd frontend
npm run dev
```
سيعمل الـ Frontend على: `http://localhost:5173`

## 👤 حسابات الاختبار

### حساب الأدمن
- **البريد الإلكتروني:** admin@example.com
- **كلمة المرور:** admin123

### حساب مستخدم عادي
- **البريد الإلكتروني:** user@example.com
- **كلمة المرور:** user123

## 📁 هيكلة المشروع

```
monthly-task-tracker/
│
├── backend/
│   ├── data/
│   │   ├── tasks.json          # بيانات المهام
│   │   └── users.json          # بيانات المستخدمين
│   ├── routes/
│   │   ├── auth.js             # APIs المصادقة
│   │   └── users.js            # APIs إدارة المستخدمين
│   ├── server.js               # ملف الخادم الرئيسي
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx      # مكون التخطيط الرئيسي
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Context للحالة العامة
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WeeklyTasksPage.jsx
│   │   │   ├── AddEditTaskPage.jsx
│   │   │   ├── MonthlyProgressPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── AdminDashboard.jsx      # لوحة تحكم الأدمن
│   │   │   └── UserTasksPage.jsx       # عرض مهام المستخدمين
│   │   ├── App.jsx
│   │   ├── index.css           # الأنماط العامة
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 رفع المشروع على GitHub

### الخطوات

1. **إنشاء Repository جديد على GitHub**
   - اذهب إلى [GitHub](https://github.com)
   - اضغط على "New Repository"
   - أدخل اسم المشروع (مثلاً: monthly-task-tracker)
   - اختر Public أو Private
   - لا تقم بإنشاء README (موجود بالفعل)

2. **ربط المشروع المحلي بـ GitHub**
```bash
# التأكد من وجود Git
git status

# إذا لم يكن موجوداً، قم بتهيئته
git init

# إضافة جميع الملفات
git add .

# عمل Commit
git commit -m "Initial commit: Monthly Task Tracker with Dark Mode and Admin System"

# ربط الـ Repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# رفع الملفات
git branch -M main
git push -u origin main
```

3. **التعديل بعد الرفع**
```bash
# بعد إجراء أي تعديلات
git add .
git commit -m "وصف التعديلات"
git push
```

## 🎨 الوضع الليلي

الوضع الليلي مطبق على جميع صفحات الموقع:
- يتم حفظ التفضيل في localStorage
- يعمل تلقائياً على جميع المكونات
- ألوان متناسقة ومريحة للعين

## 📱 التجاوب

الموقع متجاوب بالكامل مع:
- 📱 الهواتف الذكية (< 576px)
- 📱 الأجهزة اللوحية (576px - 768px)
- 💻 الحواسيب (> 768px)

## 🔐 الأمان

> **ملاحظة:** النظام الحالي مصمم للتطوير والاختبار. للإنتاج، يُنصح بـ:
> - استخدام JWT للمصادقة
> - تشفير كلمات المرور باستخدام bcrypt
> - استخدام HTTPS
> - إضافة Rate Limiting
> - استخدام قاعدة بيانات حقيقية (MongoDB, PostgreSQL, etc.)

## 🔄 التطوير المستقبلي

- [ ] إضافة قاعدة بيانات حقيقية
- [ ] تحسين نظام الأمان
- [ ] إضافة إشعارات
- [ ] تصدير التقارير PDF
- [ ] تحويل إلى PWA
- [ ] إضافة تطبيق موبايل

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الشخصي والتعليمي.

## 👨‍💻 المطور

تم تطوير هذا المشروع بواسطة [اسمك]

---

💡 **للمساعدة أو الاستفسارات:** يمكنك فتح Issue على GitHub
