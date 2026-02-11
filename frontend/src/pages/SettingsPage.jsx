import React from 'react';
import Layout from '../components/Layout';
import { Moon, Globe, LogOut, FileText, User } from 'lucide-react';

const SettingsPage = () => {
    return (
        <Layout title="الإعدادات">
            <div className="row justify-content-center">
                <div className="col-md-8">

                    {/* Profile Section */}
                    <div className="custom-card mb-4 d-flex align-items-center gap-4">
                        <div className="bg-light rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 80, height: 80 }}>
                            <User size={40} className="text-secondary" />
                        </div>
                        <div>
                            <h4 className="fw-bold m-0">Ahmed User</h4>
                            <p className="text-secondary m-0">ahmed@example.com</p>
                        </div>
                        <button className="btn btn-outline-primary ms-auto">تعديل الملف</button>
                    </div>

                    {/* Preferences */}
                    <div className="custom-card mb-4">
                        <h5 className="fw-bold mb-4">التفضيلات</h5>

                        <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                            <div className="d-flex align-items-center gap-3">
                                <div className="p-2 bg-light rounded text-dark"><Moon size={20} /></div>
                                <div>
                                    <h6 className="m-0 fw-bold">المظهر الداكن</h6>
                                    <small className="text-secondary">تبديل بين الفاتح والداكن</small>
                                </div>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" />
                            </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between py-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="p-2 bg-light rounded text-dark"><Globe size={20} /></div>
                                <div>
                                    <h6 className="m-0 fw-bold">اللغة</h6>
                                    <small className="text-secondary">العربية / English</small>
                                </div>
                            </div>
                            <select className="form-select w-auto">
                                <option>العربية</option>
                                <option>English</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="custom-card">
                        <h5 className="fw-bold mb-4">إجراءات أخرى</h5>

                        <button className="btn w-100 d-flex align-items-center gap-3 text-start p-3 hover-bg-light border-bottom bg-white">
                            <FileText size={20} className="text-primary-custom" />
                            <div>
                                <h6 className="m-0 fw-bold">تصدير البيانات (PDF)</h6>
                                <small className="text-secondary">احصل على نسخة من تقريرك الشهري</small>
                            </div>
                        </button>

                        <button className="btn w-100 d-flex align-items-center gap-3 text-start p-3 hover-bg-light text-danger bg-white">
                            <LogOut size={20} />
                            <h6 className="m-0 fw-bold">تسجيل الخروج</h6>
                        </button>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
