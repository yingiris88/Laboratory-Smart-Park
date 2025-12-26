import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle2, User, Star, X } from 'lucide-react';
import type { RepairOrder } from '../App';

interface RepairProcessProps {
  onBack: () => void;
  orders: RepairOrder[];
  currentUserName?: string;
  onRate?: (orderId: string, rating: number, comment: string) => void;
}

export function RepairProcess({ onBack, orders, currentUserName, onRate }: RepairProcessProps) {
  const [selectedOrder, setSelectedOrder] = useState<RepairOrder | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'rated'>('all');

  // 调试信息
  console.log('RepairProcess接收到的orders数量:', orders.length);
  console.log('当前用户:', currentUserName);

  // 筛选当前用户的工单
  const myOrders = orders.filter(order => order.submitter === currentUserName);
  
  console.log('筛选后我的工单数量:', myOrders.length);
  console.log('我的工单详情:', myOrders.map(o => ({ id: o.id, status: o.status, submitter: o.submitter })));
  
  // 根据筛选条件过滤
  const filteredOrders = filter === 'all' 
    ? myOrders 
    : myOrders.filter(order => {
        if (filter === 'pending') return order.status === 'pending' || order.status === 'approved';
        if (filter === 'in-progress') return order.status === 'in-progress';
        if (filter === 'completed') return order.status === 'completed';
        if (filter === 'rated') return order.status === 'rated';
        return true;
      });
  
  console.log('当前筛选:', filter, '筛选后数量:', filteredOrders.length);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: '待审核', color: 'bg-yellow-500', icon: '⏳', textColor: 'text-yellow-600', bgOpacity: 'bg-opacity-10' };
      case 'approved':
        return { text: '已审核', color: 'bg-blue-500', icon: '✓', textColor: 'text-blue-600', bgOpacity: 'bg-opacity-10' };
      case 'assigned':
        return { text: '已派单', color: 'bg-purple-500', icon: '📋', textColor: 'text-purple-600', bgOpacity: 'bg-opacity-10' };
      case 'in-progress':
        return { text: '维修中', color: 'bg-orange-500', icon: '🔧', textColor: 'text-orange-600', bgOpacity: 'bg-opacity-10' };
      case 'completed':
        return { text: '待评价', color: 'bg-green-500', icon: '✓', textColor: 'text-green-600', bgOpacity: 'bg-opacity-10' };
      case 'rated':
        return { text: '已完成', color: 'bg-gray-500', icon: '⭐', textColor: 'text-gray-600', bgOpacity: 'bg-opacity-10' };
      case 'rejected':
        return { text: '已拒绝', color: 'bg-red-500', icon: '✗', textColor: 'text-red-600', bgOpacity: 'bg-opacity-10' };
      default:
        return { text: '未知', color: 'bg-gray-500', icon: '?', textColor: 'text-gray-600', bgOpacity: 'bg-opacity-10' };
    }
  };

  const handleRate = (order: RepairOrder) => {
    setSelectedOrder(order);
    setRating(0);
    setComment('');
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert('请选择评分');
      return;
    }
    if (selectedOrder && onRate) {
      onRate(selectedOrder.id, rating, comment);
    }
    setShowRatingModal(false);
    setSelectedOrder(null);
  };

  if (!myOrders.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">我的报修</h1>
          </div>
        </div>
        <div className="p-4 text-center text-gray-500 mt-20">
          暂无报修记录
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(myOrders[0].status);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg">我的报修</h1>
            <div className="text-xs opacity-80">共 {myOrders.length} 条记录</div>
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[68px] z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            全部 ({myOrders.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            待处理 ({myOrders.filter(o => o.status === 'pending' || o.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            进行中 ({myOrders.filter(o => o.status === 'in-progress').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            待评价 ({myOrders.filter(o => o.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('rated')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'rated' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            已完成 ({myOrders.filter(o => o.status === 'rated').length})
          </button>
        </div>
      </div>

      {myOrders.length === 0 ? (
        <div className="p-4 text-center text-gray-500 mt-20">
          暂无报修记录
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="p-4 text-center text-gray-500 mt-20">
          <div className="text-5xl mb-3">🔍</div>
          <div>该状态下暂无工单</div>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {/* 调试信息面板 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-xs text-amber-800 mb-2">🔧 调试信息（生产环境请移除）</div>
            <div className="text-xs text-amber-600 space-y-1">
              <div>总工单数: {orders.length}</div>
              <div>当前用户: {currentUserName}</div>
              <div>我的工单数: {myOrders.length}</div>
              <div>当前筛选: {filter}</div>
              <div>显示数量: {filteredOrders.length}</div>
              <div className="pt-1 border-t border-amber-200 mt-2">
                各状态工单数:
                <div className="pl-2">
                  • pending: {myOrders.filter(o => o.status === 'pending').length}
                  • approved: {myOrders.filter(o => o.status === 'approved').length}
                  • in-progress: {myOrders.filter(o => o.status === 'in-progress').length}
                  • completed: {myOrders.filter(o => o.status === 'completed').length}
                  • rated: {myOrders.filter(o => o.status === 'rated').length}
                </div>
              </div>
              <button 
                onClick={() => {
                  console.log('=== 完整调试信息 ===');
                  console.log('所有工单:', orders);
                  console.log('我的工单:', myOrders);
                  console.log('筛选后:', filteredOrders);
                }}
                className="mt-2 px-3 py-1 bg-amber-500 text-white rounded text-xs hover:bg-amber-600"
              >
                打印详细信息到控制台
              </button>
            </div>
          </div>

          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                {/* 工单头部 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{order.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.color} bg-opacity-10 text-white`}>
                        {statusInfo.text}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">📍 {order.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">工单号</div>
                    <div className="text-sm text-blue-600">#{order.id.slice(-6)}</div>
                  </div>
                </div>

                {/* 故障描述 */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-xs text-gray-500 mb-1">故障描述</div>
                  <div className="text-sm">{order.description}</div>
                </div>

                {/* 工程师信息 */}
                {order.engineer && (
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-500">工程师：</span>
                    <span>{order.engineer}</span>
                    {order.eta && <span className="text-gray-400">· 预计{order.eta}到达</span>}
                  </div>
                )}

                {/* 评价信息 */}
                {order.status === 'rated' && order.rating && (
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-4 h-4 ${star <= order.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    {order.comment && (
                      <div className="text-sm text-gray-600 mt-2">{order.comment}</div>
                    )}
                  </div>
                )}

                {/* 操作按钮 */}
                {order.status === 'completed' && (
                  <button
                    onClick={() => handleRate(order)}
                    className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg text-sm"
                  >
                    立即评价
                  </button>
                )}

                {/* 提交时间 */}
                <div className="text-xs text-gray-400 mt-3">
                  提交时间：{new Date(order.timestamp).toLocaleString('zh-CN')}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 评价弹窗 */}
      {showRatingModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            {/* 关闭按钮 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">服务评价</h3>
              <button onClick={() => setShowRatingModal(false)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* 工单信息 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-gray-500 mb-1">评价工单</div>
              <div className="">{selectedOrder.type} - {selectedOrder.location}</div>
              {selectedOrder.engineer && (
                <div className="text-sm text-gray-600 mt-1">工程师：{selectedOrder.engineer}</div>
              )}
            </div>

            {/* 星级评分 */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">服务评分</div>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-10 h-10 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center text-gray-500 text-sm">
                {rating === 0 && '请为本次服务打分'}
                {rating === 1 && '非常不满意'}
                {rating === 2 && '不满意'}
                {rating === 3 && '一般'}
                {rating === 4 && '满意'}
                {rating === 5 && '非常满意'}
              </div>
            </div>

            {/* 评价内容 */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">评价内容（选填）</div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="请分享您的服务体验..."
                className="w-full border border-gray-200 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 提交按钮 */}
            <button 
              onClick={handleSubmitRating}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl"
            >
              提交评价
            </button>
          </div>
        </div>
      )}
    </div>
  );
}