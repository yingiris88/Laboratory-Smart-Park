import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import type { WorkOrder } from '../App';

interface MeetingRoomProps {
  onBack: () => void;
  onSubmitOrder: (order: Omit<WorkOrder, 'id' | 'status' | 'submitter' | 'submitTime'>) => void;
}

export function MeetingRoom({ onBack, onSubmitOrder }: MeetingRoomProps) {
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!room || !date || !startTime || !endTime || !peopleCount || !purpose) {
      alert('请填写完整信息');
      return;
    }

    onSubmitOrder({
      category: '会议预定',
      title: `${room}预定`,
      description: `会议时间：${date} ${startTime}-${endTime}\n人数：${peopleCount}人\n会议主题：${purpose}`,
      location: room,
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
          <h2 className="mb-2">预定成功</h2>
          <p className="text-gray-600">会议室预定已提交</p>
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
          <h1 className="text-lg">会议预定</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span>会议室</span>
            <span className="text-red-500">*</span>
          </div>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择会议室</option>
            <option value="大会议室A（容纳50人）">大会议室A（容纳50人）</option>
            <option value="大会议室B（容纳50人）">大会议室B（容纳50人）</option>
            <option value="中会议室C（容纳20人）">中会议室C（容纳20人）</option>
            <option value="小会议室D（容纳10人）">小会议室D（容纳10人）</option>
            <option value="小会议室E（容纳10人）">小会议室E（容纳10人）</option>
          </select>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>会议日期</span>
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
            <span>会议时间</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">开始时间</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">结束时间</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
            <span>参会人数</span>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="number"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
            placeholder="请输入参会人数"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>会议主题</span>
            <span className="text-red-500">*</span>
          </div>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="请简要描述会议主题和目的"
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg"
        >
          提交预定
        </button>
      </div>
    </div>
  );
}
