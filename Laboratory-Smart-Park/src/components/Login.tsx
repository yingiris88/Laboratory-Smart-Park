import React, { useState } from 'react';
import { User, LogIn, Phone, Lock, Sparkles } from 'lucide-react';
import type { User as UserType } from '../App';

interface LoginProps {
  onLogin: (user: UserType) => void;
  onNavigateToRegister: () => void;
}

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phone || !password) {
      alert('请输入手机号和密码');
      return;
    }

    // 模拟登录验证
    const mockUser: UserType = {
      id: Date.now().toString(),
      name: phone === '13800000001' ? '张科研' : phone === '13800000002' ? '李主管' : '王服务',
      role: phone === '13800000001' ? 'researcher' : phone === '13800000002' ? 'admin' : 'service',
      department: phone === '13800000001' ? '实验组团I' : phone === '13800000002' ? '资产部' : '物业部',
      phone,
    };

    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">苏州实验室</h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-blue-400"></span>
            智慧园区管理系统
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-blue-400"></span>
          </p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-8 border border-white/60">
          <div className="space-y-5">
            {/* 手机号 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2 ml-1">手机号</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all relative bg-white"
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2 ml-1">密码</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all relative bg-white"
                />
              </div>
            </div>

            {/* 登录按钮 */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              {/* 按钮光效 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <LogIn className="w-5 h-5 relative z-10" />
              <span className="relative z-10">登录</span>
            </button>

            {/* 注册链接 */}
            <div className="text-center pt-2">
              <span className="text-gray-500 text-sm">还没有账号？</span>
              <button
                onClick={onNavigateToRegister}
                className="text-blue-600 text-sm ml-2 hover:text-indigo-600 hover:underline transition-colors"
              >
                立即注册
              </button>
            </div>
          </div>

          {/* 测试账号提示 */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 backdrop-blur-sm">
            <p className="text-xs text-blue-900 mb-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              测试账号
            </p>
            <div className="space-y-1.5 text-xs text-blue-700">
              <div className="flex items-center gap-2">
                <span className="w-16 text-gray-500">科研人员</span>
                <span className="flex-1 font-mono bg-white/60 px-2 py-1 rounded">13800000001</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-gray-500">管理员</span>
                <span className="flex-1 font-mono bg-white/60 px-2 py-1 rounded">13800000002</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-gray-500">服务人员</span>
                <span className="flex-1 font-mono bg-white/60 px-2 py-1 rounded">13800000003</span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            系统运行正常
          </p>
        </div>
      </div>
    </div>
  );
}