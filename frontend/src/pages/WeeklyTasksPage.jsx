import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const WeeklyTasksPage = () => {
    const { t } = useApp();
    const [weeks, setWeeks] = useState([]);
    const [openWeek, setOpenWeek] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWeeks();
    }, []);

    const fetchWeeks = () => {
        fetch('http://localhost:5000/api/tasks')
            .then(res => res.json())
            .then(data => setWeeks(data));
    };

    const toggleWeek = (id) => {
        setOpenWeek(openWeek === id ? null : id);
    };

    const saveWeeks = (newWeeks) => {
        setWeeks(newWeeks);
        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWeeks)
        });
    };

    const handleTaskCheck = (weekIndex, taskIndex) => {
        const newWeeks = [...weeks];
        newWeeks[weekIndex].tasks[taskIndex].done = !newWeeks[weekIndex].tasks[taskIndex].done;
        saveWeeks(newWeeks);
    };

    const handleTaskDelete = (weekIndex, taskIndex) => {
        if (!window.confirm(t('deleteTaskConfirm'))) return;
        const newWeeks = [...weeks];
        newWeeks[weekIndex].tasks.splice(taskIndex, 1);
        saveWeeks(newWeeks);
    };

    const handleDeleteWeek = (weekId) => {
        if (!window.confirm(t('deleteWeekConfirm'))) return;
        const newWeeks = weeks.filter(w => w.id !== weekId);
        saveWeeks(newWeeks);
    };

    const handleEditWeek = (week) => {
        navigate('/add-task', { state: { week } });
    };

    return (
        <Layout title={t('weeklyTasks')}>
            <div className="d-flex justify-content-end mb-4">
                <Link to="/add-task" className="btn btn-primary-custom d-flex align-items-center gap-2">
                    <Plus size={18} /> {t('addWeek')}
                </Link>
            </div>

            {weeks.length === 0 && (
                <div className="text-center py-5 text-secondary">
                    <p>{t('noWeeks')}</p>
                </div>
            )}

            <div className="accordion" id="weeksAccordion">
                {weeks.map((week, wIndex) => {
                    const completed = week.tasks.length > 0 ? week.tasks.filter(t => t.done).length : 0;
                    const total = week.tasks.length;
                    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
                    const isOpen = openWeek === week.id;

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: wIndex * 0.1 }}
                            key={week.id}
                            className="card mb-3 border-0 shadow-sm overflow-hidden"
                        >
                            <div
                                className={`card-header bg-white p-3 d-flex justify-content-between align-items-center ${isOpen ? 'border-primary-custom border-bottom' : ''}`}
                            >
                                <div className="d-flex align-items-center gap-3 cursor-pointer flex-grow-1" onClick={() => toggleWeek(week.id)} style={{ cursor: 'pointer' }}>
                                    <div className={`rounded-circle p-2 ${isOpen ? 'bg-primary-custom text-white' : 'bg-light text-secondary'}`}>
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                    <div>
                                        <h5 className="m-0 fw-bold">{week.title}</h5>
                                        <small className="text-secondary">{completed} {t('from')} {total} {t('completed')}</small>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="progress-custom d-none d-md-block" style={{ width: '100px' }}>
                                        <div className="progress-bar-custom" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span className="fw-bold text-primary-custom">{progress}%</span>

                                    <div className="d-flex gap-1 ms-3">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditWeek(week)} title="تعديل الأسبوع">
                                            <Edit size={16} />
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteWeek(week.id)} title="حذف الأسبوع">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="collapse show"
                                    >
                                        <div className="card-body bg-light">
                                            <div className="alert alert-info border-0 d-flex align-items-center gap-2 mb-3">
                                                <strong>{t('mainTask')}:</strong> {week.mainTask}
                                            </div>

                                            {week.tasks.length > 0 ? (
                                                <ul className="list-group list-group-flush rounded shadow-sm">
                                                    {week.tasks.map((task, tIndex) => (
                                                        <li key={tIndex} className="list-group-item d-flex align-items-center justify-content-between p-3">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={task.done}
                                                                    onChange={() => handleTaskCheck(wIndex, tIndex)}
                                                                />
                                                                <span className={task.done ? 'text-decoration-line-through text-secondary' : 'fw-medium'}>
                                                                    {task.title}
                                                                </span>
                                                            </div>
                                                            <div className="d-flex gap-2 opacity-50 hover-opacity-100">
                                                                {/* Edit task redirects to week edit for now or we could strictly just delete */}
                                                                <button className="btn btn-sm btn-link text-danger p-0" onClick={() => handleTaskDelete(wIndex, tIndex)}>
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-secondary small text-center">{t('noSideTasks')}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default WeeklyTasksPage;
