import React from 'react';
import { Wrench, Building2, BookOpen, Route, Utensils, Calendar, Coffee, Home as HomeIcon, Users, ClipboardList, Briefcase, LogOut, FileText } from 'lucide-react';
import type { Page } from '../App';
import type { User } from '../App';
import campusImage from 'figma:asset/9442d02984a8706708ddc86055fb38f368d7fd0d.png';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  user: User | null;
  onLogout: () => void;
}

export function HomePage({ onNavigate, user, onLogout }: HomePageProps) {
  const currentDate = new Date();

  return (
    <div className="min-h-screen pb-8">
      {/* 头部背景图片 */}
      <div className="relative h-[280px] overflow-hidden">
        <img 
          src={campusImage} 
          alt="园区鸟瞰图" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        
        {/* 状态栏 */}
        <div className="absolute top-0 left-0 right-0 px-5 pt-3 flex justify-between items-center text-white text-sm">
          <span>{currentDate.getHours()}:{String(currentDate.getMinutes()).padStart(2, '0')}</span>
          <div className="flex gap-1 items-center">
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white/60 rounded-sm"></div>
            </div>
            <span className="ml-1">📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* 用户信息 */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <div className="text-white">
            <div className="text-sm opacity-90">欢迎回来</div>
            <div className="text-xl">{user?.name || '游客'}</div>
            <div className="text-xs opacity-75 mt-1">
              {user?.role === 'researcher' ? '科研人员' : user?.role === 'admin' ? '管理员' : '服务人员'} · {user?.department}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm flex items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            退出
          </button>
        </div>

        {/* 活动通知 */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm">
          活动预告｜春节活动通知 请到活动室参加团圆饭包饺...
        </div>
      </div>

      <div className="px-4 mt-2">
        {/* 天气卡片 - 简化版 */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl px-5 py-3 shadow-lg mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">☀️</div>
            <div>
              <div className="text-2xl text-white">28°C</div>
              <div className="text-xs text-white/80">阳转多云</div>
            </div>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-xs text-white/80">紫外线</div>
              <div className="text-lg text-white">5级</div>
            </div>
            <div className="w-px bg-white/30"></div>
            <div>
              <div className="text-xs text-white/80">风速</div>
              <div className="text-lg text-white">4.3m/s</div>
            </div>
          </div>
        </div>

        {/* 快捷入口（根据角色显示） */}
        {user?.role === 'researcher' && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate('repair-process')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <FileText className="w-5 h-5" />
              <span>我的报修</span>
            </button>
            <button
              onClick={() => onNavigate('my-orders')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <ClipboardList className="w-5 h-5" />
              <span>我的服务订单</span>
            </button>
          </div>
        )}

        {user?.role === 'admin' && (
          <div className="mb-3">
            <button
              onClick={() => onNavigate('order-management')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-5 h-5" />
              <span>工单管理</span>
            </button>
          </div>
        )}

        {user?.role === 'service' && (
          <div className="mb-3">
            <button
              onClick={() => onNavigate('service-execution')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              <span>服务执行</span>
            </button>
          </div>
        )}

        {/* 科研护航模块 */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm mb-4">
          <h2 className="mb-4 text-gray-800">科研护航</h2>
          <div className="grid grid-cols-4 gap-6">
            <button 
              onClick={() => onNavigate('repair-request')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 via-blue-300/30 to-purple-500/30 backdrop-blur-md flex items-center justify-center group-hover:from-blue-500/40 group-hover:via-blue-300/40 group-hover:to-purple-500/40 transition-all border border-white/40 shadow-sm">
                <Wrench className="w-7 h-7 text-blue-600" />
              </div>
              <span className="text-xs text-gray-700">报修申请</span>
            </button>
            
            <button 
              onClick={() => onNavigate('space-renovation')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-green-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-green-500/20 transition-all border border-green-500/20">
                <Building2 className="w-7 h-7 text-green-500" />
              </div>
              <span className="text-xs text-gray-700">空间改造</span>
            </button>
            
            <button 
              onClick={() => onNavigate('knowledge-base')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-purple-500/20 transition-all border border-purple-500/20">
                <BookOpen className="w-7 h-7 text-purple-500" />
              </div>
              <span className="text-xs text-gray-700">知识库</span>
            </button>
            
            <button 
              onClick={() => onNavigate('transport-route')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-orange-500/20 transition-all border border-orange-500/20">
                <Route className="w-7 h-7 text-orange-500" />
              </div>
              <span className="text-xs text-gray-700">搬运路线</span>
            </button>
          </div>
        </div>

        {/* 员工服务模块 */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm">
          <h2 className="mb-4 text-gray-800">员工服务</h2>
          <div className="grid grid-cols-4 gap-6">
            <button
              onClick={() => onNavigate('dining')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-yellow-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-yellow-500/20 transition-all border border-yellow-500/20">
                <Utensils className="w-7 h-7 text-yellow-500" />
              </div>
              <span className="text-xs text-gray-700">智慧餐饮</span>
            </button>
            
            <button
              onClick={() => onNavigate('meeting-room')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-green-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-green-500/20 transition-all border border-green-500/20">
                <Calendar className="w-7 h-7 text-green-500" />
              </div>
              <span className="text-xs text-gray-700">会议预定</span>
            </button>
            
            <button
              onClick={() => onNavigate('recreation')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-red-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-500/20 transition-all border border-red-500/20">
                <Coffee className="w-7 h-7 text-red-500" />
              </div>
              <span className="text-xs text-gray-700">智慧休闲</span>
            </button>
            
            <button
              onClick={() => onNavigate('accommodation')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
                <HomeIcon className="w-7 h-7 text-indigo-500" />
              </div>
              <span className="text-xs text-gray-700">智慧住宿</span>
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-4 gap-6">
            <button
              onClick={() => onNavigate('visitor-appointment')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/20 transition-all border border-blue-500/20">
                <Users className="w-7 h-7 text-blue-500" />
              </div>
              <span className="text-xs text-gray-700">访客预约</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}