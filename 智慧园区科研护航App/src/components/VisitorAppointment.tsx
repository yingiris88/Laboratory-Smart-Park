import React, { useState } from 'react';
import { ArrowLeft, Users, User, Phone, Calendar, Clock, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import type { WorkOrder } from '../App';

interface VisitorAppointmentProps {
  onBack: () => void;
  onSubmitOrder: (order: Omit<WorkOrder, 'id' | 'status' | 'submitter' | 'submitTime'>) => void;
}

export function VisitorAppointment({ onBack, onSubmitOrder }: VisitorAppointmentProps) {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorCount, setVisitorCount] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitLocation, setVisitLocation] = useState('');
  const [visitPurpose, setVisitPurpose] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!visitorName || !visitorPhone || !visitorCount || !visitDate || !visitTime || !visitLocation || !visitPurpose) {
      alert('请填写完整信息');
      return;
    }

    onSubmitOrder({
      category: '访客预约',
      title: `访客预约 - ${visitorName}`,
      description: `访客：${visitorName}\n联系电话：${visitorPhone}\n人数：${visitorCount}人\n来访时间：${visitDate} ${visitTime}\n来访事由：${visitPurpose}`,
      location: visitLocation,
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
          <h2 className="mb-2">预约成功</h2>
          <p className="text-gray-600">访客预约已提交，请等待审核</p>
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
          <h1 className="text-lg">访客预约</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-blue-500" />
            <span>访客姓名</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            placeholder="请输入访客姓名"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="w-5 h-5 text-blue-500" />
            <span>访客电话</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="tel"
            value={visitorPhone}
            onChange={(e) => setVisitorPhone(e.target.value)}
            placeholder="请输入访客联系电话"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
            <span>访客人数</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="number"
            value={visitorCount}
            onChange={(e) => setVisitorCount(e.target.value)}
            placeholder="请输入访客人数"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>来访日期</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>来访时间</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="time"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span>来访地点</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            value={visitLocation}
            onChange={(e) => setVisitLocation(e.target.value)}
            placeholder="例如：实验组团I，501实验室"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>来访事由</span>
            <span className="text-red-500">*</span>
          </div>
          <textarea
            value={visitPurpose}
            onChange={(e) => setVisitPurpose(e.target.value)}
            placeholder="请说明来访目的和事由"
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg"
        >
          提交预约
        </button>
      </div>
    </div>
  );
}
