import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const MonthlyProgressPage = () => {
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then(res => res.json())
            .then(data => setWeeks(data));
    }, []);

    // Prepare Data for Charts
    const weeklyCompletion = weeks.map(week => {
        const total = week.tasks.length || 1;
        const done = week.tasks.filter(t => t.done).length;
        return Math.round((done / total) * 100);
    });

    const totalTasks = weeks.reduce((acc, week) => acc + week.tasks.length, 0);
    const totalDone = weeks.reduce((acc, week) => acc + week.tasks.filter(t => t.done).length, 0);
    const totalRemaining = totalTasks - totalDone;

    const barData = {
        labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
        datasets: [
            {
                label: 'نسبة الإنجاز %',
                data: weeklyCompletion,
                backgroundColor: '#2563EB',
                borderRadius: 8,
            },
        ],
    };

    const doughnutData = {
        labels: ['مكتملة', 'متبقية'],
        datasets: [
            {
                data: [totalDone, totalRemaining],
                backgroundColor: ['#22C55E', '#E2E8F0'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <Layout title="تحليل الشهر">
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="custom-card h-100">
                        <h5 className="fw-bold mb-4">تقدم أسبوعي</h5>
                        <div style={{ height: '300px' }}>
                            <Bar options={{ responsive: true, maintainAspectRatio: false }} data={barData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="custom-card h-100">
                        <h5 className="fw-bold mb-4">الإنجاز الكلي</h5>
                        <div style={{ height: '250px' }} className="d-flex justify-content-center">
                            <Doughnut options={{ responsive: true, maintainAspectRatio: false }} data={doughnutData} />
                        </div>
                        <div className="text-center mt-4">
                            <h3 className="fw-bold">{Math.round((totalDone / (totalTasks || 1)) * 100)}%</h3>
                            <p className="text-secondary">إجمالي نسبة النجاح</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mt-2">
                <div className="col-12">
                    <div className="custom-card">
                        <h5 className="fw-bold mb-3">أبرز الإنجازات</h5>
                        <ul className="list-unstyled">
                            {weeks.map(week => (
                                week.tasks.filter(t => t.done).map((task, i) => (
                                    <li key={`${week.id}-${i}`} className="d-flex align-items-center gap-2 mb-2 text-success">
                                        ✅ <span className="text-dark">{task.title} ({week.title})</span>
                                    </li>
                                ))
                            ))}
                            {totalDone === 0 && <p className="text-secondary">لا توجد مهام مكتملة بعد.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MonthlyProgressPage;
