import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart, Settings, LogOut, Moon, Sun, Languages } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout = ({ children, title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme, language, toggleLanguage, t } = useApp();

    const isActive = (path) => location.pathname === path ? 'bg-primary-custom text-white' : 'text-secondary hover-bg-light';

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="d-flex min-vh-100 bg-light" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Sidebar - Desktop */}
            <aside className="d-none d-md-flex flex-column bg-white shadow-sm p-3" style={{ width: '250px' }}>
                <div className="mb-4 px-2">
                    <h4 className="fw-bold text-primary-custom">{t('appTitle')}</h4>
                </div>

                <nav className="flex-grow-1 d-flex flex-column gap-2">
                    <Link to="/dashboard" className={`d-flex align-items-center gap-3 p-3 rounded text-decoration-none ${isActive('/dashboard')}`}>
                        <LayoutDashboard size={20} /> {t('dashboard')}
                    </Link>
                    <Link to="/tasks" className={`d-flex align-items-center gap-3 p-3 rounded text-decoration-none ${isActive('/tasks')}`}>
                        <CheckSquare size={20} /> {t('weeklyTasks')}
                    </Link>
                    <Link to="/progress" className={`d-flex align-items-center gap-3 p-3 rounded text-decoration-none ${isActive('/progress')}`}>
                        <BarChart size={20} /> {t('progress')}
                    </Link>
                    <Link to="/settings" className={`d-flex align-items-center gap-3 p-3 rounded text-decoration-none ${isActive('/settings')}`}>
                        <Settings size={20} /> {t('settings')}
                    </Link>
                </nav>

                <div className="mt-auto d-flex flex-column gap-2 border-top pt-3">
                    <div className="d-flex justify-content-between px-2">
                        <button onClick={toggleTheme} className="btn btn-sm btn-light border rounded-circle p-2">
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button onClick={toggleLanguage} className="btn btn-sm btn-light border rounded-circle p-2 font-monospace">
                            {language === 'ar' ? 'EN' : 'عربي'}
                        </button>
                    </div>
                    <button onClick={handleLogout} className="d-flex align-items-center gap-3 p-3 rounded text-danger border-0 bg-transparent hover-bg-light w-100">
                        <LogOut size={20} /> {t('logout')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow-1 overflow-auto bg-light">
                {/* Mobile Header */}
                <header className="d-md-none bg-white p-3 shadow-sm d-flex justify-content-between align-items-center sticky-top">
                    <h5 className="m-0 fw-bold">{title}</h5>
                    <div className="d-flex gap-2">
                        <button onClick={toggleTheme} className="btn btn-sm btn-light border rounded-circle p-2">
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                        <button className="btn btn-sm btn-outline-secondary"><Settings size={18} /></button>
                    </div>
                </header>

                <div className="container-custom py-4">
                    <header className="d-none d-md-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="fw-bold text-dark">{title}</h2>
                            <p className="text-secondary">{t('hello')}</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-white p-2 rounded-circle shadow-sm text-primary-custom fw-bold d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                A
                            </div>
                        </div>
                    </header>

                    {children}
                </div>
            </main>
        </div>
    );
};
export default Layout;
