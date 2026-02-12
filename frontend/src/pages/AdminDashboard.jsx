import React, { useState, useEffect } from 'react';
import { Users, Activity, CheckCircle, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { currentUser, isAdmin, t } = useApp();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalTasks: 0,
        completedTasks: 0
    });

    useEffect(() => {
        // التحقق من صلاحيات الأدمن
        if (!currentUser || !isAdmin()) {
            navigate('/login');
            return;
        }

        fetchUsers();
    }, [currentUser, isAdmin, navigate]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'x-user-id': currentUser.id.toString()
                }
            });

            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
                setStats({
                    totalUsers: data.users.length,
                    activeUsers: data.users.filter(u => u.role === 'user').length,
                    totalTasks: 0, // سيتم حسابها لاحقاً
                    completedTasks: 0
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleViewUserTasks = async (userId) => {
        navigate(`/admin/users/${userId}/tasks`);
    };

    return (
        <Layout title="لوحة تحكم الأدمن">
            <div className="row g-4">
                {/* Stats Cards */}
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-secondary small mb-1">إجمالي المستخدمين</p>
                                    <h3 className="fw-bold mb-0">{stats.totalUsers}</h3>
                                </div>
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                                    <Users size={24} className="text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-secondary small mb-1">المستخدمون النشطون</p>
                                    <h3 className="fw-bold mb-0">{stats.activeUsers}</h3>
                                </div>
                                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                                    <Activity size={24} className="text-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-secondary small mb-1">إجمالي المهام</p>
                                    <h3 className="fw-bold mb-0">{stats.totalTasks}</h3>
                                </div>
                                <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                                    <Clock size={24} className="text-warning" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-secondary small mb-1">المهام المكتملة</p>
                                    <h3 className="fw-bold mb-0">{stats.completedTasks}</h3>
                                </div>
                                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                                    <CheckCircle size={24} className="text-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-bottom">
                            <h5 className="mb-0 fw-bold">إدارة المستخدمين</h5>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>الاسم</th>
                                                <th>البريد الإلكتروني</th>
                                                <th>الدور</th>
                                                <th>تاريخ الإنشاء</th>
                                                <th>الإجراءات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                            {user.role === 'admin' ? 'أدمن' : 'مستخدم'}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(user.createdAt).toLocaleDateString('ar-EG')}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleViewUserTasks(user.id)}
                                                        >
                                                            عرض المهام
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
