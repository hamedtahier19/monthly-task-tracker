import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AddEditTaskPage = () => {
    const { t } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we are editing an existing week passed via state
    const editMode = location.state?.week;

    const [formData, setFormData] = useState({
        id: editMode ? editMode.id : Date.now().toString(),
        title: editMode ? editMode.title : '',
        mainTask: editMode ? editMode.mainTask : '',
        tasks: editMode ? editMode.tasks : [] // Array of {title, done, type: 'side'}
    });

    const [weeks, setWeeks] = useState([]);
    const [sideTaskInput, setSideTaskInput] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then(res => res.json())
            .then(data => setWeeks(data));
    }, []);

    const handleAddSideTask = () => {
        if (!sideTaskInput.trim()) return;
        setFormData({
            ...formData,
            tasks: [...formData.tasks, { title: sideTaskInput, done: false, type: 'side' }]
        });
        setSideTaskInput('');
    };

    const removeSideTask = (index) => {
        const newTasks = [...formData.tasks];
        newTasks.splice(index, 1);
        setFormData({ ...formData, tasks: newTasks });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.mainTask) return;

        let updatedWeeks;
        if (editMode) {
            // Update existing week
            updatedWeeks = weeks.map(w => w.id === formData.id ? formData : w);
        } else {
            // Add new week
            updatedWeeks = [...weeks, formData];
        }

        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedWeeks)
        }).then(() => {
            navigate('/tasks');
        });
    };

    return (
        <Layout title={editMode ? t('editWeek') : t('newWeek')}>
            <div className="row justify-content-center">
                <div className="col-md-9">
                    <button className="btn btn-link text-secondary text-decoration-none mb-3 p-0 d-flex align-items-center gap-2" onClick={() => navigate('/tasks')}>
                        <ArrowLeft size={18} /> {t('backToTasks')}
                    </button>

                    <div className="custom-card">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-bold">{t('weekTitle')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="مثال: الأسبوع 1 - تعلم الأساسيات"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold text-primary-custom">{t('mainTask')}</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg border-primary-custom"
                                    placeholder="مثال: إكمال دورة React"
                                    value={formData.mainTask}
                                    onChange={e => setFormData({ ...formData, mainTask: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">{t('sideTasks')}</label>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('enterSideTask')}
                                        value={sideTaskInput}
                                        onChange={e => setSideTaskInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSideTask())}
                                    />
                                    <button className="btn btn-outline-secondary" type="button" onClick={handleAddSideTask}>
                                        <Plus size={18} /> {t('add')}
                                    </button>
                                </div>

                                {formData.tasks.length > 0 ? (
                                    <ul className="list-group list-group-flush border rounded">
                                        {formData.tasks.map((task, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>{task.title}</span>
                                                <button type="button" className="btn btn-sm text-danger" onClick={() => removeSideTask(index)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-secondary small mt-2">{t('noSideTasks')}</p>
                                )}
                            </div>

                            <div className="d-flex gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" onClick={() => navigate('/tasks')}>
                                    {t('cancel')}
                                </button>
                                <button type="submit" className="btn btn-primary-custom d-flex align-items-center gap-2">
                                    <Save size={18} /> {editMode ? t('saveChanges') : t('createPlan')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddEditTaskPage;
