import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const translations = {
    ar: {
        appTitle: "المساعد الرمضاني",
        dashboard: "لوحة التحكم",
        weeklyTasks: "المهام الأسبوعية",
        progress: "التقارير",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
        welcomeBack: "مرحباً بك مجدداً 👋",
        login: "تسجيل الدخول",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        rememberMe: "تذكرني",
        forgotPassword: "نسيت كلمة المرور؟",
        noAccount: "ليس لديك حساب؟",
        createAccount: "إنشاء حساب جديد",
        backHome: "العودة للرئيسية",
        weekTitle: "عنوان الأسبوع",
        mainTask: "المهمة الرئيسية",
        sideTasks: "المهام الجانبية",
        addTask: "إضافة مهمة",
        addWeek: "إضافة خطة أسبوع",
        save: "حفظ",
        cancel: "إلغاء",
        deleteWeekConfirm: "هل أنت متأكد من حذف هذا الأسبوع بالكامل؟",
        deleteTaskConfirm: "هل أنت متأكد من حذف هذه المهمة؟",
        noWeeks: "لا توجد خطط أسبوعية مضافة حالياً. ابدأ بإضافة خطة جديدة!",
        completed: "مكتملة",
        from: "من",
        hello: "مرحباً بك، نتمنى لك يوماً مثمراً!",
        monthProgress: "إنجاز الشهر",
        remainingTasks: "المهام المتبقية",
        completedTasks: "المهام المكتملة",
        totalTasks: "إجمالي المهام",
        keepItUp: "حافظ على هذا المستوى!",
        waiting: "مهام قيد الانتظار",
        greatJob: "عمل رائع!",
        thisMonth: "لهذا الشهر",
        currentMonthProgress: "تقدم الشهر الحالي",
        closingIn: "أنت تقترب من تحقيق أهدافك لهذا الشهر! استمر في العمل الجاد.",
        weekOverview: "نظرة عامة على الأسابيع",
        editWeek: "تعديل الخطة الأسبوعية",
        newWeek: "إضافة خطة أسبوعية جديدة",
        enterSideTask: "أدخل مهمة جانبية...",
        add: "إضافة",
        noSideTasks: "لا يوجد مهام جانبية مضافة بعد.",
        saveChanges: "حفظ التعديلات",
        createPlan: "إنشاء الخطة",
        backToTasks: "العودة للمهام"
    },
    en: {
        appTitle: "Ramadan Tracker",
        dashboard: "Dashboard",
        weeklyTasks: "Weekly Tasks",
        progress: "Progress",
        settings: "Settings",
        logout: "Logout",
        welcomeBack: "Welcome Back 👋",
        login: "Login",
        email: "Email",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        createAccount: "Create account",
        backHome: "Back to Home",
        weekTitle: "Week Title",
        mainTask: "Main Task",
        sideTasks: "Side Tasks",
        addTask: "Add Task",
        addWeek: "Add Week Plan",
        save: "Save",
        cancel: "Cancel",
        deleteWeekConfirm: "Are you sure you want to delete this entire week?",
        deleteTaskConfirm: "Are you sure you want to delete this task?",
        noWeeks: "No weekly plans added yet. Start by adding a new plan!",
        completed: "Completed",
        from: "of",
        hello: "Welcome, have a productive day!",
        monthProgress: "Month Progress",
        remainingTasks: "Remaining Tasks",
        completedTasks: "Completed Tasks",
        totalTasks: "Total Tasks",
        keepItUp: "Keep it up!",
        waiting: "Tasks waiting",
        greatJob: "Great job!",
        thisMonth: "This Month",
        currentMonthProgress: "Current Month Progress",
        closingIn: "You are closing in on your goals for this month! Keep up the hard work.",
        weekOverview: "Weeks Overview",
        editWeek: "Edit Weekly Plan",
        newWeek: "Add New Weekly Plan",
        enterSideTask: "Enter side task...",
        add: "Add",
        noSideTasks: "No side tasks added yet.",
        saveChanges: "Save Changes",
        createPlan: "Create Plan",
        backToTasks: "Back to Tasks"
    }
};

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'ar');
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', language);
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                setCurrentUser(data.user);
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'خطأ في الاتصال بالخادم' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const isAdmin = () => {
        return currentUser && currentUser.role === 'admin';
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <AppContext.Provider value={{
            theme,
            toggleTheme,
            language,
            toggleLanguage,
            t,
            currentUser,
            login,
            logout,
            isAdmin
        }}>
            {children}
        </AppContext.Provider>
    );
};
