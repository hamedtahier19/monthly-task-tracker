import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, t } = useApp();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);

        setLoading(false);

        if (result.success) {
            // التوجيه حسب نوع المستخدم
            if (result.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative">
            <Link to="/" className="position-absolute top-0 start-0 m-4 text-decoration-none text-secondary d-flex align-items-center gap-2">
                <ArrowLeft size={20} /> {t('backHome')}
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card border-0 shadow-lg p-4"
                style={{ maxWidth: '400px', width: '100%', borderRadius: '16px' }}
            >
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary-custom mb-1">{t('welcomeBack')}</h3>
                    <p className="text-secondary small">سجّل دخولك لمتابعة إنجازاتك</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-secondary small">{t('email')}</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0"><Mail size={18} className="text-muted" /></span>
                            <input
                                type="email"
                                name="email"
                                className="form-control border-start-0 ps-0"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-secondary small">{t('password')}</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0"><Lock size={18} className="text-muted" /></span>
                            <input
                                type="password"
                                name="password"
                                className="form-control border-start-0 ps-0"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label small text-secondary" htmlFor="remember">{t('rememberMe')}</label>
                        </div>
                        <a href="#" className="small text-decoration-none text-primary-custom">{t('forgotPassword')}</a>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <span className="spinner-border spinner-border-sm"></span> : <><LogIn size={18} /> {t('login')}</>}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="small text-secondary mb-0">
                        {t('noAccount')} <a href="#" className="text-primary-custom fw-bold text-decoration-none">{t('createAccount')}</a>
                    </p>
                </div>

                <div className="mt-3 p-2 bg-light rounded">
                    <p className="small text-muted mb-1"><strong>للاختبار:</strong></p>
                    <p className="small text-muted mb-0">Admin: admin@example.com / admin123</p>
                    <p className="small text-muted mb-0">User: user@example.com / user123</p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
