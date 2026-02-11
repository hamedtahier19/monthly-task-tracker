النظام الكامل لواجهات الموقع (UI/UX DETAILS)
🎯 هوية الموقع (قبل الدخول في الصفحات)
🎨 الألوان

Primary: #2563EB (أزرق هادئ – أزرار أساسية)

Secondary: #64748B (نصوص ثانوية)

Background: #F8FAFC

Success: #22C55E (إنجاز)

Warning: #F59E0B (متأخر)

Danger: #EF4444 (حذف)

🔤 الخط

عربي: Cairo

إنجليزي: Inter

العناوين: وزن 600

النصوص: وزن 400

🧱 أسلوب التصميم

Cards

Rounded corners (12px)

Shadow خفيف

Icons بسيطة (Lucide / HeroIcons)

1️⃣ Landing Page (الصفحة الأولى)
🎯 الهدف

شرح فكرة الموقع + دفع المستخدم للتسجيل

🧩 الهيكلة

Header

Logo (Monthly Tracker)

زر Login

زر Get Started

Hero Section

عنوان كبير:

نظم شهرك… وراقب إنجازك خطوة بخطوة

وصف قصير

زرين:

ابدأ الآن (Primary)

مشاهدة العرض (Secondary)

Features Section

Card 1: تتبع أسبوعي

Card 2: Progress Bar

Card 3: تعديل المهام

Preview Section

صورة Dashboard (Mockup)

Footer

About

Contact

GitHub

2️⃣ Login Page (تسجيل الدخول)
🧩 الهيكلة

Card في منتصف الصفحة

Logo أعلى

Input Email

Input Password

Checkbox (Remember me)

زر Login

Link: Create account

🧠 UX

Validation فوري

Error message تحت الحقل

Loading Spinner عند الدخول

3️⃣ Dashboard (لوحة التحكم)
🎯 الهدف

نظرة سريعة على الشهر

🧩 الهيكلة

Top Bar

اسم المستخدم

زر Settings

Logout

Summary Cards (4 Cards)

نسبة إنجاز الشهر

عدد المهام

المهام المكتملة

المتبقية

Monthly Progress

Progress Bar كبير (0–100%)

Weekly Cards

Week 1 → Week 4

كل Card:

اسم الأسبوع

Progress صغير

زر View

4️⃣ Weekly Tasks Page (قلب الموقع)
🎯 الهدف

تنفيذ وتتبع المهام

🧩 الهيكلة

Accordion لكل أسبوع

Header:

اسم الأسبوع

Progress %

Body:

Main Task (Highlighted)

Divider

Side Tasks List

Task Item

Checkbox

اسم المهمة

Icon (edit / delete)

🧠 التفاعل

Checkbox → تحديث Progress مباشر

Collapse / Expand Animation

حفظ تلقائي (LocalStorage / API)

5️⃣ Add / Edit Task Page
🧩 الهيكلة

Form Card

Input: Task Title

Dropdown: Week

Radio:

Main Task

Side Task

Textarea (Optional note)

Buttons

Save (Primary)

Delete (Danger)

Cancel

🧠 UX

Disable Save إذا الحقول فارغة

Toast Notification بعد الحفظ

6️⃣ Monthly Progress Page (التقارير)
🎯 الهدف

تحليل الأداء

🧩 الهيكلة

Progress Circle (إنجاز الشهر)

Bar Chart (إنجاز كل أسبوع)

List:

أهم الإنجازات

نقاط التحسين

🧠 UX

ألوان واضحة

أرقام كبيرة

قابل للتصدير PDF

7️⃣ Settings Page
🧩 الهيكلة

Profile Info

Language (AR / EN)

Theme (Light / Dark)

Export Data

Logout

🧠 User Flow (رحلة المستخدم)

Landing

Login

Dashboard

Weekly Tasks

Add/Edit

Progress

Settings


البرومبت العام (Base UI Prompt)

Modern Web UI/UX Design for Monthly Task Tracker Website
Clean, minimal, productivity-focused dashboard design, soft neutral colors (blue, gray, white), modern typography (Cairo / Inter), smooth spacing, rounded cards, subtle shadows, responsive layout, professional SaaS style, user-friendly, accessible design, elegant icons, progress visualization, calm and focused atmosphere

🧭 خريطة صفحات الموقع (Page Flow)

1️⃣ Landing Page
2️⃣ Login Page
3️⃣ Dashboard
4️⃣ Weekly Tasks Page
5️⃣ Add / Edit Task Page
6️⃣ Monthly Progress Page
7️⃣ Settings Page

1️⃣ Landing Page (الصفحة الرئيسية)
🎯 الهدف

تعريف المستخدم بالموقع وتحفيزه للدخول

🧠 البرومبت

Landing page UI for productivity web app, hero section with headline “Organize Your Month Smartly”, call-to-action buttons (Get Started / Login), illustration of task management dashboard, clean layout, modern SaaS style, soft gradient background, responsive design

🧩 العناصر

Hero Section

زر ابدأ الآن

شرح مختصر للمميزات

Preview للـ Dashboard

2️⃣ Login Page (تسجيل الدخول)
🧠 البرومبت

Minimal login page UI, centered card, email and password input, soft shadows, rounded corners, modern typography, calm colors, professional web app authentication design

🧩 العناصر

Email / Password

Login Button

Remember Me

3️⃣ Dashboard (لوحة التحكم)
🧠 البرومبت

Modern dashboard UI for task tracking app, cards layout, monthly overview, progress bars, weekly summaries, clean grid system, elegant icons, professional SaaS dashboard

🧩 العناصر

نسبة إنجاز الشهر

عدد المهام المكتملة

كروت الأسابيع

شريط تقدم عام

4️⃣ Weekly Tasks Page (صفحة الأسابيع)
🧠 البرومبت

Weekly task planner UI, accordion layout for weeks, checkboxes for tasks, main task highlighted, smooth expand/collapse animation, clean spacing, readable layout

🧩 العناصر

Accordion (Week 1 → Week 4)

Checkbox لكل مهمة

Progress Bar لكل أسبوع

5️⃣ Add / Edit Task Page (إضافة وتعديل)
🧠 البرومبت

Task creation and edit page UI, simple form layout, input fields, dropdown for week selection, primary action buttons, minimal and clean form design

🧩 العناصر

اسم المهمة

اختيار الأسبوع

نوع المهمة (أساسية / جانبية)

Save / Delete

6️⃣ Monthly Progress Page (التقارير)
🧠 البرومبت

Monthly progress analytics UI, charts and progress bars, completion statistics, clean data visualization, soft colors, professional productivity analytics dashboard

🧩 العناصر

Progress Circle

Chart شهري

إنجازات الشهر

7️⃣ Settings Page (الإعدادات)
🧠 البرومبت

User settings page UI, profile settings, theme toggle, language selector, clean list layout, minimal and professional design

🧩 العناصر

تغيير الثيم

اللغة

تصدير PDF

تسجيل خروج

🎨 ألوان مقترحة

Primary: #2563EB

Secondary: #64748B

Background: #F8FAFC

Success: #22C55E

🔤 الخطوط

Arabic: Cairo / IBM Plex Arabic

English: Inter / Poppins