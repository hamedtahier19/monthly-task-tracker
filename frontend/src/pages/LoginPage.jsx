import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock Authentication
        setTimeout(() => {
            setLoading(false);
            // For now, any input works
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative">
            <Link to="/" className="position-absolute top-0 start-0 m-4 text-decoration-none text-secondary d-flex align-items-center gap-2">
                <ArrowLeft size={20} /> العودة للرئيسية
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card border-0 shadow-lg p-4"
                style={{ maxWidth: '400px', width: '100%', borderRadius: '16px' }}
            >
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary-custom mb-1">مرحباً بك مجدداً 👋</h3>
                    <p className="text-secondary small">سجّل دخولك لمتابعة إنجازاتك</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-secondary small">البريد الإلكتروني</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0"><Mail size={18} className="text-muted" /></span>
                            <input type="email" className="form-control border-start-0 ps-0" placeholder="name@example.com" required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-secondary small">كلمة المرور</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0"><Lock size={18} className="text-muted" /></span>
                            <input type="password" className="form-control border-start-0 ps-0" placeholder="••••••••" required />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label small text-secondary" htmlFor="remember">تذكرني</label>
                        </div>
                        <a href="#" className="small text-decoration-none text-primary-custom">نسيت كلمة المرور؟</a>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <span className="spinner-border spinner-border-sm"></span> : <><LogIn size={18} /> تسجيل الدخول</>}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="small text-secondary mb-0">
                        ليس لديك حساب؟ <a href="#" className="text-primary-custom fw-bold text-decoration-none">إنشاء حساب جديد</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
