import React, { useContext, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import PageTransition from '../components/PageTransition';
import { Settings, User, Bell, Shield, LogOut, Lock, Key } from 'lucide-react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  const handleSave = () => {
    toast.success('Preferences saved successfully!');
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div>
              <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mb-1">Account Settings</h1>
              <p className="text-[#6B7280] text-sm font-medium">Manage your profile and preferences</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${activeTab === 'profile' ? 'bg-[#64748B] text-[#7C3AED]' : 'text-[#4B5563] hover:border hover:border-black hover:bg-transparent'}`}
              >
                <User size={18} /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${activeTab === 'notifications' ? 'bg-[#64748B] text-[#7C3AED]' : 'text-[#4B5563] border border-transparent hover:border-black hover:bg-transparent'}`}
              >
                <Bell size={18} /> Notifications
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${activeTab === 'security' ? 'bg-[#64748B] text-[#7C3AED]' : 'text-[#4B5563] border border-transparent hover:border-black hover:bg-transparent'}`}
              >
                <Shield size={18} /> Security
              </button>
            </div>

            <div className="md:col-span-2 space-y-6">
              
              {activeTab === 'profile' && (
                <>
                  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm animate-fade-in">
                    <h3 className="text-lg font-bold text-[#111827] mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#374151] mb-1.5">Full Name</label>
                        <input type="text" className="w-full text-sm text-[#111827] bg-gray-50 border border-[#E5E7EB] px-4 py-2.5 rounded-lg cursor-not-allowed" value={user?.name || "User"} disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email Address</label>
                        <input type="email" className="w-full text-sm text-[#111827] bg-gray-50 border border-[#E5E7EB] px-4 py-2.5 rounded-lg cursor-not-allowed" value={user?.email || "user@example.com"} disabled />
                      </div>
                      <p className="text-xs text-[#6B7280] mt-2">Your profile information is synced securely.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#EF4444]/20 p-6 shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <h3 className="text-lg font-bold text-[#EF4444] mb-2">Danger Zone</h3>
                    <p className="text-sm text-[#6B7280] mb-4">Logging out will end your current session securely.</p>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-lg font-semibold text-sm transition-all">
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm animate-fade-in">
                  <h3 className="text-lg font-bold text-[#111827] mb-1">Notification Preferences</h3>
                  <p className="text-sm text-[#6B7280] mb-6">Choose what updates you want to receive via email.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#111827] text-sm">Product Updates</h4>
                        <p className="text-xs text-[#6B7280]">News about new templates, features, and fixes.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#7C3AED] bg-gray-100 border-gray-300 rounded focus:ring-[#7C3AED] cursor-pointer" />
                    </div>
                    <hr className="border-[#E5E7EB]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#111827] text-sm">Resume Analytics</h4>
                        <p className="text-xs text-[#6B7280]">Weekly reports on how your ATS scores are improving.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#7C3AED] bg-gray-100 border-gray-300 rounded focus:ring-[#7C3AED] cursor-pointer" />
                    </div>
                    <hr className="border-[#E5E7EB]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#111827] text-sm">Marketing Emails</h4>
                        <p className="text-xs text-[#6B7280]">Promotions, discounts, and career tips.</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-[#7C3AED] bg-gray-100 border-gray-300 rounded focus:ring-[#7C3AED] cursor-pointer" />
                    </div>
                    
                    <button onClick={handleSave} className="mt-4 px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg font-semibold text-sm hover:bg-[#6D28D9] transition-colors shadow-sm">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111827] mb-0.5">Account Security</h3>
                      <p className="text-sm text-[#6B7280]">Manage your password and security settings</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#374151] mb-1.5">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                        <input type="password" placeholder="••••••••" className="w-full text-sm text-[#111827] bg-white border border-[#E5E7EB] pl-10 pr-4 py-2.5 rounded-lg focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#374151] mb-1.5">New Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                        <input type="password" placeholder="Must be at least 8 characters" className="w-full text-sm text-[#111827] bg-white border border-[#E5E7EB] pl-10 pr-4 py-2.5 rounded-lg focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#374151] mb-1.5">Confirm New Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                        <input type="password" placeholder="Match new password" className="w-full text-sm text-[#111827] bg-white border border-[#E5E7EB] pl-10 pr-4 py-2.5 rounded-lg focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all" />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button onClick={handleSave} className="px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg font-semibold text-sm hover:bg-[#6D28D9] transition-colors shadow-sm">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default SettingsPage;
