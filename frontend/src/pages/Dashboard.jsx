import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { CheckCircle, Clock, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Helper to calculate stats
const calculateStats = (weeks) => {
    let totalTasks = 0;
    let completedTasks = 0;

    weeks.forEach(week => {
        week.tasks.forEach(task => {
            totalTasks++;
            if (task.done) completedTasks++;
        });
    });

    return {
        total: totalTasks,
        completed: completedTasks,
        remaining: totalTasks - completedTasks,
        progress: totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)
    };
};

const Dashboard = () => {
    const { t } = useApp();
    const [weeks, setWeeks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then(res => res.json())
            .then(data => {
                setWeeks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch tasks", err);
                setLoading(false);
            });
    }, []);

    const stats = calculateStats(weeks);

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;

    return (
        <Layout title={t('dashboard')}>
            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                {[
                    { title: t('monthProgress'), value: `${stats.progress}%`, icon: <CheckCircle />, color: 'text-success', sub: t('keepItUp') },
                    { title: t('remainingTasks'), value: stats.remaining, icon: <Clock />, color: 'text-warning-custom', sub: t('waiting') },
                    { title: t('completedTasks'), value: stats.completed, icon: <Calendar />, color: 'text-primary-custom', sub: t('greatJob') },
                    { title: t('totalTasks'), value: stats.total, icon: <AlertCircle />, color: 'text-secondary', sub: t('thisMonth') },
                ].map((card, idx) => (
                    <div key={idx} className="col-md-3 col-sm-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="custom-card h-100 d-flex flex-column justify-content-between"
                        >
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <span className="text-secondary fw-semibold small">{card.title}</span>
                                <span className={`${card.color}`}>{React.cloneElement(card.icon, { size: 24 })}</span>
                            </div>
                            <div>
                                <h3 className="fw-bold mb-1">{card.value}</h3>
                                <p className="text-secondary small mb-0">{card.sub}</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Main Progress Bar */}
            <div className="custom-card mb-4">
                <h5 className="fw-bold mb-3">{t('currentMonthProgress')}</h5>
                <div className="progress-custom mb-2" style={{ height: '24px' }}>
                    <div
                        className="progress-bar-custom justify-content-center d-flex align-items-center text-white small fw-bold"
                        style={{ width: `${stats.progress}%`, backgroundColor: 'var(--primary-color)' }}
                    >
                        {stats.progress}%
                    </div>
                </div>
                <p className="text-secondary small">{t('closingIn')}</p>
            </div>

            {/* Weekly Overview */}
            <h5 className="fw-bold mb-3">{t('weekOverview')}</h5>
            <div className="row g-4">
                {weeks.map((week, idx) => {
                    const weekTotal = week.tasks.length;
                    const weekDone = week.tasks.filter(t => t.done).length;
                    const weekProgress = weekTotal === 0 ? 0 : Math.round((weekDone / weekTotal) * 100);

                    return (
                        <div key={week.id} className="col-md-6">
                            <Link to="/tasks" className="text-decoration-none text-dark">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="custom-card"
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold m-0 text-text-primary">{week.title}</h6>
                                        <span className={`badge ${weekProgress === 100 ? 'bg-success' : 'bg-primary-custom'}`}>
                                            {weekProgress}%
                                        </span>
                                    </div>
                                    <p className="text-secondary small mb-3 text-truncate">
                                        <span className="fw-bold text-dark">{t('mainTask')}:</span> {week.mainTask}
                                    </p>
                                    <div className="progress-custom">
                                        <div className="progress-bar-custom" style={{ width: `${weekProgress}%` }}></div>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Dashboard;
