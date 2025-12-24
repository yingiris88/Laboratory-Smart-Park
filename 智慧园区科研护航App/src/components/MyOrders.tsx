import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, User, Star, X, Calendar, MapPin, Users, Utensils, Hotel, UserPlus } from 'lucide-react';
import type { WorkOrder } from '../App';

interface MyOrdersProps {
  onBack: () => void;
  orders: WorkOrder[];
  currentUserName?: string;
  onRate?: (orderId: string, rating: number, comment: string) => void;
}

export function MyOrders({ onBack, orders, currentUserName, onRate }: MyOrdersProps) {
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'rated'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');

  // 调试信息
  console.log('MyOrders接收到的orders数量:', orders.length);
  console.log('当前用户:', currentUserName);

  // 筛选当前用户的工单
  const myOrders = orders.filter(order => order.submitter === currentUserName);
  
  console.log('筛选后我的工单数量:', myOrders.length);
  console.log('我的工单详情:', myOrders.map(o => ({ id: o.id, category: o.category, status: o.status, submitter: o.submitter })));
  
  // 根据筛选条件过滤
  let filteredOrders = filter === 'all' 
    ? myOrders 
    : myOrders.filter(order => {
        if (filter === 'pending') return order.status === 'pending' || order.status === 'approved';
        if (filter === 'in-progress') return order.status === 'in-progress';
        if (filter === 'completed') return order.status === 'completed';
        if (filter === 'rated') return order.status === 'rated';
        return true;
      });
  
  // 按分类过滤
  if (categoryFilter !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.category === categoryFilter);
  }
  
  console.log('当前筛选:', filter, '分类:', categoryFilter, '筛选后数量:', filteredOrders.length);

  // 获取所有分类
  const categories = Array.from(new Set(myOrders.map(o => o.category)));

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: '待审核', color: 'bg-yellow-500', icon: '⏳', textColor: 'text-yellow-600', bgOpacity: 'bg-opacity-10' };
      case 'approved':
        return { text: '已审核', color: 'bg-blue-500', icon: '✓', textColor: 'text-blue-600', bgOpacity: 'bg-opacity-10' };
      case 'assigned':
        return { text: '已派单', color: 'bg-purple-500', icon: '📋', textColor: 'text-purple-600', bgOpacity: 'bg-opacity-10' };
      case 'in-progress':
        return { text: '进行中', color: 'bg-orange-500', icon: '🔧', textColor: 'text-orange-600', bgOpacity: 'bg-opacity-10' };
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '空间改造': return '🏗️';
      case '智慧餐饮': return '🍽️';
      case '会议预定': return '📅';
      case '智慧休闲': return '🎮';
      case '智慧住宿': return '🏨';
      case '访客预约': return '👥';
      case '搬运路线': return '🚚';
      default: return '📋';
    }
  };

  const handleRate = (order: WorkOrder) => {
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
            <h1 className="text-lg">我的服务订单</h1>
          </div>
        </div>
        <div className="p-4 text-center text-gray-500 mt-20">
          <div className="text-6xl mb-4">📦</div>
          <div>暂无服务订单</div>
          <div className="text-sm mt-2">快去体验园区服务吧~</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg">我的服务订单</h1>
            <div className="text-xs opacity-80">共 {myOrders.length} 条订单</div>
          </div>
        </div>
      </div>

      {/* 分类筛选栏 */}
      {categories.length > 1 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[68px] z-10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                categoryFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              全部分类 ({myOrders.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                  categoryFilter === cat ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {getCategoryIcon(cat)} {cat} ({myOrders.filter(o => o.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 状态筛选栏 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[120px] z-10">
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

      {filteredOrders.length === 0 ? (
        <div className="p-4 text-center text-gray-500 mt-20">
          <div className="text-5xl mb-3">🔍</div>
          <div>该筛选条件下暂无订单</div>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {/* 调试信息面板 */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="text-xs text-purple-800 mb-2">🔧 调试信息（生产环境请移除）</div>
            <div className="text-xs text-purple-600 space-y-1">
              <div>总订单数: {orders.length}</div>
              <div>当前用户: {currentUserName}</div>
              <div>我的订单数: {myOrders.length}</div>
              <div>当前筛选: 状态={filter}, 分类={categoryFilter}</div>
              <div>显示数量: {filteredOrders.length}</div>
              <div className="pt-1 border-t border-purple-200 mt-2">
                各状态订单数:
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
                  console.log('所有订单:', orders);
                  console.log('我的订单:', myOrders);
                  console.log('筛选后:', filteredOrders);
                }}
                className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
              >
                打印详细信息到控制台
              </button>
            </div>
          </div>

          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                {/* 订单头部 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getCategoryIcon(order.category)} {order.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.color} bg-opacity-10 text-white`}>
                        {statusInfo.text}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{order.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">订单号</div>
                    <div className="text-sm text-blue-600">#{order.id.slice(-6)}</div>
                  </div>
                </div>

                {/* 订单描述 */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-xs text-gray-500 mb-1">订单详情</div>
                  <div className="text-sm whitespace-pre-wrap">{order.description}</div>
                </div>

                {/* 处理人信息 */}
                {order.handler && (
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-500">处理人：</span>
                    <span>{order.handler}</span>
                  </div>
                )}

                {/* 完成照片 */}
                {(order.status === 'completed' || order.status === 'rated') && order.completionPhotos && order.completionPhotos.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-500 mb-2">✅ 服务完成照片</div>
                    <div className="grid grid-cols-3 gap-2">
                      {order.completionPhotos.map((photo, idx) => (
                        <img 
                          key={idx}
                          src={photo} 
                          alt={`完成照片${idx + 1}`} 
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {
                            // 可以添加图片预览功能
                            window.open(photo, '_blank');
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 评���信息 */}
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
                <div className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  提交时间：{new Date(order.submitTime).toLocaleString('zh-CN')}
                </div>
              </div>
            );
          })}`
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

            {/* 订单信息 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-gray-500 mb-1">评价订单</div>
              <div className="">{getCategoryIcon(selectedOrder.category)} {selectedOrder.title}</div>
              <div className="text-xs text-gray-500 mt-1">{selectedOrder.category}</div>
              {selectedOrder.handler && (
                <div className="text-sm text-gray-600 mt-1">处理人：{selectedOrder.handler}</div>
              )}
            </div>

            {/* 星级评分 */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">服务评���</div>
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