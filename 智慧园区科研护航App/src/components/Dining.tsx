import React, { useState } from 'react';
import { ArrowLeft, Utensils, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import type { WorkOrder } from '../App';

interface DiningProps {
  onBack: () => void;
  onSubmitOrder: (order: Omit<WorkOrder, 'id' | 'status' | 'submitter' | 'submitTime'>) => void;
}

export function Dining({ onBack, onSubmitOrder }: DiningProps) {
  const [mealType, setMealType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!mealType || !date || !time || !peopleCount) {
      alert('请填写完整信息');
      return;
    }

    onSubmitOrder({
      category: '智慧餐饮',
      title: `${mealType}预订`,
      description: `用餐时间：${date} ${time}\n人数：${peopleCount}人\n${specialRequests ? '特殊要求：' + specialRequests : ''}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm w-full">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="mb-2">预订成功</h2>
          <p className="text-gray-600">您的用餐预订已提交</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">智慧餐饮</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="w-5 h-5 text-blue-500" />
            <span>用餐类型</span>
            <span className="text-red-500">*</span>
          </div>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择用餐类型</option>
            <option value="早餐">早餐</option>
            <option value="午餐">午餐</option>
            <option value="晚餐">晚餐</option>
            <option value="团体聚餐">团体聚餐</option>
          </select>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>用餐日期</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>用餐时间</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
            <span>用餐人数</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="number"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
            placeholder="请输入用餐人数"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span>特殊要求</span>
          </div>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="例如：素食、忌口等特殊需求"
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg"
        >
          提交预订
        </button>
      </div>
    </div>
  );
}
