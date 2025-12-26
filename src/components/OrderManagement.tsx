import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Filter, Star } from 'lucide-react';
import type { WorkOrder } from '../App';

interface OrderManagementProps {
  onBack: () => void;
  orders: WorkOrder[];
  onApprove: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onRate?: (orderId: string, rating: number, comment: string) => void;
}

export function OrderManagement({ onBack, orders, onApprove, onReject, onRate }: OrderManagementProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'in-progress' | 'completed' | 'rated'>('all');
  const [ratingOrderId, setRatingOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // 调试信息
  console.log('OrderManagement接收到的orders数量:', orders.length);
  console.log('Orders详情:', orders);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'pending') return order.status === 'pending';
    if (filter === 'approved') return order.status === 'approved';
    if (filter === 'in-progress') return order.status === 'in-progress';
    if (filter === 'completed') return order.status === 'completed';
    if (filter === 'rated') return order.status === 'rated';
    return false;
  });

  const handleSubmitRating = () => {
    if (ratingOrderId && rating > 0 && onRate) {
      onRate(ratingOrderId, rating, comment);
      setRatingOrderId(null);
      setRating(0);
      setComment('');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">待审核</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">已通过</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">已拒绝</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">进行中</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">已完成</span>;
      case 'rated':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">已评价</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg">工单管理</h1>
            <div className="text-xs opacity-80">共 {orders.length} 条工单</div>
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[60px] z-10">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            全部 ({orders.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            待审核 ({orders.filter(o => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            已通过 ({orders.filter(o => o.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            进行中 ({orders.filter(o => o.status === 'in-progress').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            已完成 ({orders.filter(o => o.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('rated')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'rated' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            已评价 ({orders.filter(o => o.status === 'rated').length})
          </button>
        </div>
      </div>

      {/* 工单列表 */}
      <div className="p-4 space-y-3">
        {/* 调试信息面板 - 开发时使用 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="text-xs text-blue-800 mb-2">🔧 调试信息（生产环境请移除）</div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>接收到的工单数: {orders.length}</div>
            <div>待审核: {orders.filter(o => o.status === 'pending').length}</div>
            <div>已通过: {orders.filter(o => o.status === 'approved').length}</div>
            <div>进行中: {orders.filter(o => o.status === 'in-progress').length}</div>
            <button 
              onClick={() => {
                const stored = localStorage.getItem('workOrders');
                console.log('📦 localStorage中的workOrders:', stored);
                alert(`localStorage中有 ${stored ? JSON.parse(stored).length : 0} 条工单`);
              }}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              查看localStorage
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500">暂无工单</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                      {order.category}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <h3 className="mb-1">{order.title}</h3>
                  <div className="text-sm text-gray-500 mb-2">
                    提交人：{order.submitter}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="text-sm text-gray-700 whitespace-pre-line">
                  {order.description}
                </div>
                {order.location && (
                  <div className="text-sm text-gray-500 mt-2">
                    📍 {order.location}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(order.submitTime).toLocaleString('zh-CN')}
                </span>
                <span>#{order.id.slice(-6)}</span>
              </div>

              {/* 审核按钮 */}
              {order.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onReject(order.id)}
                    className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    拒绝
                  </button>
                  <button
                    onClick={() => onApprove(order.id)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    通过
                  </button>
                </div>
              )}

              {/* 已处理状态 */}
              {order.status === 'approved' && (
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  已审核通过，等待服务人员接单
                </div>
              )}

              {order.status === 'in-progress' && (
                <div className="text-sm text-blue-600">
                  服务中 · 执行人：{order.handler}
                </div>
              )}

              {order.status === 'completed' && (
                <div>
                  <div className="text-sm text-purple-600 mb-3">
                    已完成 · 等待用户评价
                  </div>
                  {/* 完成照片 */}
                  {order.completionPhotos && order.completionPhotos.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-2">✅ 服务完成照片</div>
                      <div className="grid grid-cols-3 gap-2">
                        {order.completionPhotos.map((photo, idx) => (
                          <img 
                            key={idx}
                            src={photo} 
                            alt={`完成照片${idx + 1}`} 
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {order.status === 'rated' && (
                <div>
                  {/* 完成照片 */}
                  {order.completionPhotos && order.completionPhotos.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="text-xs text-gray-500 mb-2">✅ 服务完成照片</div>
                      <div className="grid grid-cols-3 gap-2">
                        {order.completionPhotos.map((photo, idx) => (
                          <img 
                            key={idx}
                            src={photo} 
                            alt={`完成照片${idx + 1}`} 
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 用户评价 */}
                  {order.rating && (
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm text-gray-600">用户评分：</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= order.rating! ? 'text-yellow-400' : 'text-gray-300'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      {order.comment && (
                        <div className="text-sm text-gray-600">评价：{order.comment}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}