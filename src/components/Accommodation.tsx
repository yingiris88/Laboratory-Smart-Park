import React, { useState } from 'react';
import { ArrowLeft, Home, Calendar, Users, FileText, CheckCircle2 } from 'lucide-react';
import type { WorkOrder } from '../App';

interface AccommodationProps {
  onBack: () => void;
  onSubmitOrder: (order: Omit<WorkOrder, 'id' | 'status' | 'submitter' | 'submitTime'>) => void;
}

export function Accommodation({ onBack, onSubmitOrder }: AccommodationProps) {
  const [roomType, setRoomType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!roomType || !checkIn || !checkOut || !guestCount) {
      alert('请填写完整信息');
      return;
    }

    onSubmitOrder({
      category: '智慧住宿',
      title: `${roomType}预订`,
      description: `入住时间：${checkIn}\n退房时间：${checkOut}\n入住人数：${guestCount}人\n${remarks ? '备注：' + remarks : ''}`,
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
          <p className="text-gray-600">住宿预订已提交</p>
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
          <h1 className="text-lg">智慧住宿</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-blue-500" />
            <span>房间类型</span>
            <span className="text-red-500">*</span>
          </div>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择房间类型</option>
            <option value="单人间">单人间</option>
            <option value="双人间">双人间</option>
            <option value="套房">套房</option>
            <option value="公寓">公寓</option>
          </select>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>入住日期</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>退房日期</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
            <span>入住人数</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            placeholder="请输入入住人数"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>备注说明</span>
          </div>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="其他需求或说明"
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
