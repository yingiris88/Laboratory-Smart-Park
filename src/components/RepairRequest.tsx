import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Tag, FileText } from 'lucide-react';

interface RepairRequestProps {
  onBack: () => void;
  onSubmit: (order: { type: string; location: string; description: string; photo: string }) => void;
}

export function RepairRequest({ onBack, onSubmit }: RepairRequestProps) {
  const [photo, setPhoto] = useState<string>('');
  const [deviceType, setDeviceType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!deviceType || !location || !description) {
      alert('请填写完整信息');
      return;
    }
    
    // 提交工单
    onSubmit({ type: deviceType, location, description, photo });
    
    // 显示成功提示
    alert('✅ 报修申请已提交成功！\n\n您的报修申请已发送至管理员审核，请在"我的报修"中查看进度。');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">设备报修</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 拍照上传 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-blue-500" />
            <span>故障照片</span>
            <span className="text-red-500">*</span>
          </div>
          
          {photo ? (
            <div className="relative">
              <img src={photo} alt="故障照片" className="w-full h-48 object-cover rounded-lg" />
              <button 
                onClick={() => setPhoto('')}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="block">
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                <Camera className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-500">点击拍摄故障照片</span>
              </div>
            </label>
          )}
        </div>

        {/* 设备类型 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-blue-500" />
            <span>设备类型</span>
            <span className="text-red-500">*</span>
          </div>
          <select 
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择设备类型</option>
            <option value="空调">空调</option>
            <option value="照明">照明设备</option>
            <option value="水电">水电设施</option>
            <option value="门窗">门窗</option>
            <option value="实验设备">实验设备</option>
            <option value="网络设备">网络设备</option>
            <option value="其他">其他</option>
          </select>
        </div>

        {/* 详细位置 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span>详细位置</span>
            <span className="text-red-500">*</span>
          </div>
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="例如：实验组团I，501实验室"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 故障描述 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>故障描述</span>
            <span className="text-red-500">*</span>
          </div>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请清晰描述故障情况，例如：空调开启后无法制热"
            rows={4}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* 提交按钮 */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          提交报修申请
        </button>

        {/* 温馨提示 */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <span>💡 温馨提示：</span>
            <br />
            • 请准确填写设备类型和位置信息
            <br />
            • 上传清晰的故障照片有助于快速定位问题
            <br />
            • 提交后您将收到工单编号和处理进度通知
          </p>
        </div>
      </div>
    </div>
  );
}