import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart2, Edit3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Header */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
                <div className="container container-custom">
                    <Link className="navbar-brand fw-bold text-primary-custom" to="/">
                        📅 Monthly Tracker
                    </Link>
                    <div className="d-flex gap-2">
                        <Link to="/login" className="btn btn-outline-primary fw-semibold">
                            تسجيل الدخول
                        </Link>
                        <Link to="/login" className="btn btn-primary-custom fw-semibold">
                            ابدأ الآن
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-gradient py-5 text-center">
                <div className="container container-custom py-5">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="display-4 fw-bold mb-3 text-dark"
                    >
                        نظم شهرك… وراقب إنجازك <span className="text-primary-custom">خطوة بخطوة</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: "600px" }}
                    >
                        أداة بسيطة وفعالة لمتابعة مهامك الشهرية، وتحليل أدائك لضمان الإنتاجية المستمرة.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="d-flex justify-content-center gap-3"
                    >
                        <Link to="/login" className="btn btn-primary-custom btn-lg d-flex align-items-center gap-2">
                            ابدأ التخطيط مجاناً <ArrowRight size={20} />
                        </Link>
                        <a href="#features" className="btn btn-outline-secondary btn-lg">
                            تعرف على المزيد
                        </a>
                    </motion.div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-5 bg-white">
                <div className="container container-custom">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">لماذا Monthly Tracker؟</h2>
                        <p className="text-secondary">كل ما تحتاجه لإدارة شهرك بذكاء</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                <div className="mb-3 text-primary-custom d-flex justify-content-center">
                                    <CheckCircle size={48} />
                                </div>
                                <h4 className="fw-bold">تتبع أسبوعي</h4>
                                <p className="text-secondary">قسم مهامك إلى 4 أسابيع منظمة لسهولة التركيز والإنجاز.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                <div className="mb-3 text-success d-flex justify-content-center">
                                    <BarChart2 size={48} />
                                </div>
                                <h4 className="fw-bold">تحليل الأداء</h4>
                                <p className="text-secondary">رسوم بيانية ونسب مئوية توضح مدى تقدمك في إنجاز الأهداف.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                <div className="mb-3 text-warning-custom d-flex justify-content-center" style={{ color: 'var(--warning-color)' }}>
                                    <Edit3 size={48} />
                                </div>
                                <h4 className="fw-bold">مرونة كاملة</h4>
                                <p className="text-secondary">أضف، عدل، واحذف المهام بسهولة تامة لتناسب جدولك المتغير.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preview Mockup Section */}
            <section className="py-5 bg-light">
                <div className="container container-custom text-center">
                    <h2 className="fw-bold mb-5">نظرة من الداخل</h2>
                    <div className="bg-white p-2 rounded shadow-lg mx-auto" style={{ maxWidth: "900px", minHeight: "400px" }}>
                        <div className="d-flex align-items-center justify-content-center h-100 text-secondary bg-light rounded" style={{ minHeight: "380px" }}>
                            <p>Dashboard Preview Image Implementation Placeholder</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-4 mt-auto">
                <div className="container container-custom text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} Monthly Task Tracker. Designed for Productivity.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
