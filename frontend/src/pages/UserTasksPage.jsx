import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

const UserTasksPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { currentUser, isAdmin } = useApp();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // التحقق من صلاحيات الأدمن
        if (!currentUser || !isAdmin()) {
            navigate('/login');
            return;
        }

        fetchUserTasks();
    }, [userId, currentUser, isAdmin, navigate]);

    const fetchUserTasks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}/tasks`, {
                headers: {
                    'x-user-id': currentUser.id.toString()
                }
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                setTasks(data.tasks);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user tasks:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout title="مهام المستخدم">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`مهام ${user?.name || 'المستخدم'}`}>
            <div className="mb-4">
                <button
                    className="btn btn-outline-secondary d-flex align-items-center gap-2"
                    onClick={() => navigate('/admin')}
                >
                    <ArrowLeft size={18} /> العودة للوحة التحكم
                </button>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">معلومات المستخدم</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <p className="text-secondary small mb-1">الاسم</p>
                            <p className="fw-bold">{user?.name}</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-secondary small mb-1">البريد الإلكتروني</p>
                            <p className="fw-bold">{user?.email}</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-secondary small mb-1">ID</p>
                            <p className="fw-bold">{user?.id}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                    <h5 className="mb-0 fw-bold">المهام الأسبوعية</h5>
                </div>
                <div className="card-body">
                    {tasks.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-secondary">لا توجد مهام لهذا المستخدم</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {tasks.map((week, index) => (
                                <div key={index} className="col-12">
                                    <div className="card border">
                                        <div className="card-header bg-light">
                                            <h6 className="mb-0 fw-bold">{week.title}</h6>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-3"><strong>المهمة الرئيسية:</strong> {week.mainTask}</p>
                                            <p className="mb-2 text-secondary small">المهام الجانبية:</p>
                                            <ul className="list-unstyled">
                                                {week.sideTasks?.map((task, i) => (
                                                    <li key={i} className="d-flex align-items-center gap-2 mb-2">
                                                        {task.done ? (
                                                            <CheckCircle size={18} className="text-success" />
                                                        ) : (
                                                            <Circle size={18} className="text-secondary" />
                                                        )}
                                                        <span className={task.done ? 'text-decoration-line-through text-secondary' : ''}>
                                                            {task.title}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-3">
                                                <div className="progress" style={{ height: '8px' }}>
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        style={{
                                                            width: `${week.sideTasks ? (week.sideTasks.filter(t => t.done).length / week.sideTasks.length * 100) : 0}%`
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="small text-secondary mt-2 mb-0">
                                                    {week.sideTasks ? week.sideTasks.filter(t => t.done).length : 0} من {week.sideTasks?.length || 0} مكتملة
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UserTasksPage;
