import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Lock, Building2, UserCircle } from 'lucide-react';
import type { User as UserType, UserRole } from '../App';

interface RegisterProps {
  onRegister: (user: UserType) => void;
  onNavigateToLogin: () => void;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('researcher');
  const [department, setDepartment] = useState('');

  const handleRegister = () => {
    if (!name || !phone || !password || !confirmPassword) {
      alert('请填写完整信息');
      return;
    }

    if (password !== confirmPassword) {
      alert('两次密码不一致');
      return;
    }

    if (phone.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }

    const newUser: UserType = {
      id: Date.now().toString(),
      name,
      phone,
      role,
      department: role === 'researcher' ? department : role === 'admin' ? '管理部门' : '服务部门',
    };

    onRegister(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 返回按钮 */}
        <button
          onClick={onNavigateToLogin}
          className="flex items-center gap-2 text-white mb-6 hover:opacity-80"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回登录</span>
        </button>

        {/* 注册表单 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl text-center mb-6 text-gray-800">用户注册</h2>

          <div className="space-y-4">
            {/* 姓名 */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">姓名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入姓名"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 手机号 */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">手机号</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 用户角色 */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">用户角色</label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="researcher">实验室科研人员</option>
                  <option value="admin">管理员</option>
                  <option value="service">服务人员</option>
                </select>
              </div>
            </div>

            {/* 部门/单位 */}
            {role === 'researcher' && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">所属单位</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择单位</option>
                    <option value="实验组团I">实验组团I</option>
                    <option value="实验组团II">实验组团II</option>
                    <option value="实验组团III">实验组团III</option>
                    <option value="办公区A座">办公区A座</option>
                    <option value="办公区B座">办公区B座</option>
                  </select>
                </div>
              </div>
            )}

            {/* 密码 */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 注册按钮 */}
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
