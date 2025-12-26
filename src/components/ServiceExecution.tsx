import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Star, Clock, Camera, X, Image as ImageIcon } from 'lucide-react';
import type { WorkOrder } from '../App';
import type { User } from '../App';

interface ServiceExecutionProps {
  onBack: () => void;
  orders: WorkOrder[];
  onStart: (orderId: string, handler: string) => void;
  onComplete: (orderId: string, completionPhotos?: string[]) => void;
  currentUser: User | null;
}

export function ServiceExecution({ onBack, orders, onStart, onComplete, currentUser }: ServiceExecutionProps) {
  const [filter, setFilter] = useState<'approved' | 'in-progress' | 'completed' | 'rated'>('approved');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [completionPhotos, setCompletionPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // 筛选出已审核通过的工单
  const filteredOrders = orders.filter(order => {
    if (filter === 'approved') return order.status === 'approved';
    if (filter === 'in-progress') return order.status === 'in-progress';
    if (filter === 'completed') return order.status === 'completed';
    if (filter === 'rated') return order.status === 'rated';
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">待接单</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">进行中</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">待评价</span>;
      case 'rated':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">已评价</span>;
      default:
        return null;
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);

    // 处理多张照片
    const fileReaders: Promise<string>[] = [];
    
    for (let i = 0; i < Math.min(files.length, 6 - completionPhotos.length); i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const promise = new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            resolve(result);
          };
          reader.readAsDataURL(file);
        });
        fileReaders.push(promise);
      }
    }

    Promise.all(fileReaders).then((results) => {
      setCompletionPhotos([...completionPhotos, ...results]);
      setIsUploading(false);
    });
  };

  const removePhoto = (index: number) => {
    setCompletionPhotos(completionPhotos.filter((_, i) => i !== index));
  };

  const handleOpenCompletionModal = (order: WorkOrder) => {
    setSelectedOrder(order);
    setCompletionPhotos([]);
    setShowCompletionModal(true);
  };

  const handleSubmitCompletion = () => {
    if (completionPhotos.length === 0) {
      alert('请至少上传一张完成照片');
      return;
    }

    if (selectedOrder) {
      onComplete(selectedOrder.id, completionPhotos);
      setShowCompletionModal(false);
      setSelectedOrder(null);
      setCompletionPhotos([]);
      alert('✅ 服务已完成！\n\n完成照片已上传，等待用户评价。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">服务执行</h1>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[60px] z-10">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('approved')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            待接单 ({orders.filter(o => o.status === 'approved').length})
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
            待评价 ({orders.filter(o => o.status === 'completed').length})
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

              {/* 操作按钮 */}
              {order.status === 'approved' && (
                <button
                  onClick={() => onStart(order.id, currentUser?.name || '服务人员')}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Play className="w-4 h-4" />
                  接单并开始服务
                </button>
              )}

              {order.status === 'in-progress' && (
                <div>
                  <div className="text-sm text-blue-600 mb-3">
                    执行人：{order.handler}
                  </div>
                  <button
                    onClick={() => handleOpenCompletionModal(order)}
                    className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    完成服务（需拍照确认）
                  </button>
                </div>
              )}

              {order.status === 'completed' && (
                <div>
                  <div className="text-sm text-purple-600 flex items-center gap-1 mb-3">
                    <CheckCircle className="w-4 h-4" />
                    服务已完成，等待用户评价
                  </div>
                  {/* 显示完成照片 */}
                  {order.completionPhotos && order.completionPhotos.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-2">完成照片：</div>
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
                      <div className="text-xs text-gray-500 mb-2">完成照片：</div>
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
                            <Star 
                              key={star}
                              className={`w-4 h-4 ${star <= order.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
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

      {/* 完成确认弹窗 */}
      {showCompletionModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* 头部 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">完成服务确认</h3>
              <button 
                onClick={() => {
                  setShowCompletionModal(false);
                  setCompletionPhotos([]);
                }}
                className="p-1"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* 工单信息 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-gray-500 mb-1">完成工单</div>
              <div className="">{selectedOrder.title}</div>
              <div className="text-xs text-gray-500 mt-1">{selectedOrder.category}</div>
            </div>

            {/* 拍照提示 */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
              <div className="text-sm text-blue-800">
                📸 <span className="text-red-500">*</span> 请上传服务完成照片（1-6张）
              </div>
              <div className="text-xs text-blue-600 mt-1">
                • 拍摄服务完成后的现场情况<br />
                • 确保照片清晰、完整<br />
                • 支持多张照片上传
              </div>
            </div>

            {/* 照片上传区域 */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-3">
                {/* 已上传的照片 */}
                {completionPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={photo} 
                      alt={`完成照片${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-green-500"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}

                {/* 添加照片按钮 */}
                {completionPhotos.length < 6 && (
                  <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      multiple
                      onChange={handlePhotoCapture}
                      className="hidden"
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <div className="text-blue-500 text-xs">上传中...</div>
                    ) : (
                      <>
                        <Camera className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">拍照</span>
                      </>
                    )}
                  </label>
                )}
              </div>

              <div className="text-xs text-gray-500 mt-2 text-center">
                已上传 {completionPhotos.length} / 6 张
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleSubmitCompletion}
              disabled={completionPhotos.length === 0}
              className={`w-full py-3 rounded-xl text-white ${
                completionPhotos.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg'
              }`}
            >
              {completionPhotos.length === 0 ? '请先上传完成照片' : '确认完成服务'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
