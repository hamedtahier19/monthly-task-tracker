# 🗓️ Monthly Task Tracker (Full‑Stack Web App)

هذا الملف **README.md** يحتوي على كل شيء: الفكرة، التصميم، الهيكلة، وأكواد أساسية (Front‑End + Back‑End) لبناء موقع جدول شهري تفاعلي.

---

## 1️⃣ فكرة المشروع

موقع ويب يساعد شخص واحد (أو عدة مستخدمين لاحقاً) على **تنظيم وتتبع المهام الشهرية** أسبوعاً بأسبوع، مع نسبة إنجاز وتعديل مباشر من الواجهة.

---

## 2️⃣ محتوى الجدول الشهري

### الأسبوع 1
**المهمة الأساسية:** إكمال مشروع X أو المهمة الرئيسية

**المهام الجانبية:**
- قراءة مقال عن الموضوع
- مشاهدة فيديو تعليمي
- تجربة تطبيق أو أداة جديدة

---

### الأسبوع 2
**المهمة الأساسية:** إعداد تقرير أو تحليل البيانات

**المهام الجانبية:**
- مراجعة أمثلة سابقة
- جمع معلومات إضافية من مواقع موثوقة
- كتابة ملخص يومي

---

### الأسبوع 3
**المهمة الأساسية:** تطوير مهارة محددة (برمجة / تصميم / تسويق)

**المهام الجانبية:**
- قراءة كتاب أو فصل تعليمي
- مشاهدة فيديو قصير تعليمي
- تطبيق المهارة عملياً

---

### الأسبوع 4
**المهمة الأساسية:** مراجعة وتقييم الأداء الشهري

**المهام الجانبية:**
- عمل قائمة بالإنجازات
- تحديد نقاط التحسين
- التخطيط للشهر القادم

> 🔔 ملاحظة: يمكن إضافة أو حذف المهام حسب الحاجة.

---

## 3️⃣ UI / UX Design (التصميم)

### 🎨 الشكل العام
- ألوان هادئة (أزرق – رمادي – أبيض)
- خطوط واضحة (Roboto / Cairo)
- تباعد مريح بين العناصر

### ⚙️ التفاعل
- Accordion لكل أسبوع (قابل للطي)
- Checkbox لكل مهمة
- Progress Bar لنسبة الإنجاز
- أزرار إضافة / حذف / تعديل

---

## 4️⃣ التقنيات المستخدمة

### Front‑End
- HTML
- CSS
- JavaScript
- Bootstrap 5
- React.js

### Back‑End
- Node.js
- Express.js
- تخزين مبدئي: JSON / LocalStorage
- (قابل للتطوير: MongoDB أو MySQL)

---

## 5️⃣ هيكلة المشروع

```
monthly-task-tracker/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── tasks.js
│   └── data/
│       └── tasks.json
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── WeekCard.jsx
│       ├── App.js
│       └── index.js
│
└── README.md
```

---

## 6️⃣ Back‑End (Express.js)

### server.js
```js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = require('./data/tasks.json');

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  tasks = req.body;
  res.json({ message: 'Tasks updated successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

---

## 7️⃣ Front‑End (React + Bootstrap)

### App.js
```jsx
import React, { useEffect, useState } from 'react';
import WeekCard from './components/WeekCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => setWeeks(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📅 Monthly Task Tracker</h2>
      {weeks.map((week, index) => (
        <WeekCard key={index} week={week} />
      ))}
    </div>
  );
}

export default App;
```

---

### WeekCard.jsx
```jsx
import React, { useState } from 'react';

export default function WeekCard({ week }) {
  const [tasks, setTasks] = useState(week.tasks);

  const completed = tasks.filter(t => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div className="card mb-3">
      <div className="card-header" data-bs-toggle="collapse" data-bs-target={`#${week.id}`}>
        <strong>{week.title}</strong>
      </div>

      <div id={week.id} className="collapse show">
        <div className="card-body">
          <p><b>Main Task:</b> {week.mainTask}</p>

          {tasks.map((task, i) => (
            <div key={i} className="form-check">
              <input type="checkbox" className="form-check-input"
                checked={task.done}
                onChange={() => {
                  const newTasks = [...tasks];
                  newTasks[i].done = !newTasks[i].done;
                  setTasks(newTasks);
                }} />
              <label className="form-check-label">{task.title}</label>
            </div>
          ))}

          <div className="progress mt-3">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 8️⃣ ميزات إضافية (Future Work)

- 🔐 نظام تسجيل دخول
- 💾 حفظ البيانات في Database
- 📄 تصدير PDF
- 📱 تحويله إلى PWA أو تطبيق هاتف

---

## 9️⃣ الخلاصة

✔ جدول شهري منظم
✔ تصميم تفاعلي UI/UX
✔ React + Node.js
✔ قابل للتطوير مستقبلاً

---

💡 **إذا حاب:**
- أحول المشروع إلى **PWA**
- أربطه بقاعدة بيانات
- أو أجهز لك **Repo GitHub جاهز**

قلي وش نطوّر الخطوة الجاية 🚀





{              التعديلات 

اريد منك الاتي اريدالتعديل الوضع اليلل اريد ان يكون في جيمع الموقع وليس في مكان محدد .  
الثاني . 
اريد رفع الموقع على كيب هاب 
وعندما ارفع على الموقع كيب هاب واريد التعديلات حتى بعد الحرب 

الثالث .

اريد ان يكون الموقع متجاوب مع جيمع الصفحات 

الرابع .
اريد ان يكون الموقع مقسم ان يكون لي الموقع ادمن  وادمن ليده صلاحيات ان يدخل على حسبات المستخدمين 
واريد جيمع صلاحيات ادمن 


}


