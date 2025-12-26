import React, { useState } from 'react';
import { ArrowLeft, FileText, Calendar, MessageSquare, Send, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import type { WorkOrder } from '../App';

interface SpaceRenovationProps {
  onBack: () => void;
  onSubmitOrder: (order: Omit<WorkOrder, 'id' | 'status' | 'submitter' | 'submitTime'>) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'engineer';
  content: string;
  timestamp: string;
}

export function SpaceRenovation({ onBack, onSubmitOrder }: SpaceRenovationProps) {
  const [step, setStep] = useState<'form' | 'chat' | 'submitted'>('form');
  const [projectName, setProjectName] = useState('');
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'engineer',
      content: '您好！我是重建工程师小李，请问有什么可以帮您？',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleNext = () => {
    if (!projectName || !content || !duration) {
      alert('请填写完整信息');
      return;
    }
    setStep('chat');
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');

    // 模拟工程师回复
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'engineer',
        content: '好的，我已经查看了该区域的机电图纸和软通图纸。这个空间的电力负荷可以满足新增空调的需求，建议安装位置在靠窗一侧。我会协助您完成相关施工配合。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleSubmit = () => {
    // 提交空间改造申请工单
    onSubmitOrder({
      category: '空间改造',
      title: projectName,
      description: `改造内容：${content}\n工期要求：${duration}`,
    });
    
    alert('✅ 空间改造申请已提交成功！\n\n您的申请已发送至管理员审核，请在"我的服务订单"中查看进度。');
    
    setStep('submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">空间改造保障</h1>
        </div>
      </div>

      {step === 'form' && (
        <div className="p-4 space-y-4">
          {/* 项目名称 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>项目名称</span>
              <span className="text-red-500">*</span>
            </div>
            <input 
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="例如：501实验室空调安装"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 改造内容 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>改造施工内容</span>
              <span className="text-red-500">*</span>
            </div>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请详细描述改造内容，包括施工范围、技术要求等"
              rows={6}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* 工期要求 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>工期要求</span>
              <span className="text-red-500">*</span>
            </div>
            <input 
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="例如：7个工作日内完成"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 下一步按钮 */}
          <button 
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg"
          >
            下一步：与重建工程师沟通
          </button>

          {/* 提示信息 */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <span>💡 流程说明：</span>
              <br />
              • 填写改造申请信息
              <br />
              • 与重建工程师沟通，了解图纸及技术细节
              <br />
              • 提交申请，等待主管审核
              <br />
              • 审核通过后自动生成保障工单
            </p>
          </div>
        </div>
      )}

      {step === 'chat' && (
        <div className="flex flex-col h-[calc(100vh-64px)]">
          {/* 聊天提示 */}
          <div className="bg-blue-50 border-b border-blue-100 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <MessageSquare className="w-4 h-4" />
              <span>与重建工程师沟通中，可查看图纸资料</span>
            </div>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-tr-sm'
                        : 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* 图纸资料卡片 */}
            <div className="flex justify-start">
              <div className="max-w-[75%] bg-white rounded-xl shadow-sm p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">技术资料</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded p-2 text-sm flex items-center justify-between">
                    <span>📄 501室机电图纸.pdf</span>
                    <button className="text-blue-500 text-xs">查看</button>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-sm flex items-center justify-between">
                    <span>📄 弱电布线图.pdf</span>
                    <button className="text-blue-500 text-xs">查看</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 输入框 */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入消息..."
                className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleSubmit}
              className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl"
            >
              确认提交改造申请
            </button>
          </div>
        </div>
      )}

      {step === 'submitted' && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm w-full">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="mb-2">提交成功</h2>
            <p className="text-gray-600 mb-6">
              您的空间改造申请已提交
              <br />
              等待基建科主管审核
            </p>
            <div className="space-y-2 text-sm text-left bg-blue-50 rounded-xl p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">项目名称：</span>
                <span>{projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">预计工期：</span>
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}