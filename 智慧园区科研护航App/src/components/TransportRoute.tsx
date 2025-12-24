import React, { useState } from 'react';
import { ArrowLeft, Box, MapPin, Ruler, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';

interface TransportRouteProps {
  onBack: () => void;
}

export function TransportRoute({ onBack }: TransportRouteProps) {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [avoidElevator, setAvoidElevator] = useState(false);
  const [maxHeight, setMaxHeight] = useState('');
  const [routeGenerated, setRouteGenerated] = useState(false);

  const handleGenerateRoute = () => {
    if (!length || !width || !height || !startPoint || !endPoint) {
      alert('请填写完整信息');
      return;
    }
    setRouteGenerated(true);
  };

  const locations = [
    '仓库A',
    '仓库B',
    '实验室501',
    '实验室502',
    '实验室503',
    '实验组团I',
    '实验组团II',
    '办公区A座',
    '办公区B座',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">大件搬运规划</h1>
        </div>
      </div>

      {!routeGenerated ? (
        <div className="p-4 space-y-4">
          {/* 物品尺寸 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-5 h-5 text-blue-500" />
              <span>物品尺寸</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">长(cm)</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="长度"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">宽(cm)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="宽度"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">高(cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="高度"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            {length && width && height && (
              <div className="mt-3 p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
                体积：{((parseFloat(length) * parseFloat(width) * parseFloat(height)) / 1000000).toFixed(2)} m³
              </div>
            )}
          </div>

          {/* 起点 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-green-500" />
              <span>搬运起点</span>
              <span className="text-red-500">*</span>
            </div>
            <select
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择起点</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* 终点 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>搬运终点</span>
              <span className="text-red-500">*</span>
            </div>
            <select
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择终点</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* 限制条件 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-blue-500" />
              <span>限制条件</span>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={avoidElevator}
                  onChange={(e) => setAvoidElevator(e.target.checked)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex-1">避开客梯</span>
                <span className="text-xs text-gray-500">仅使用货梯</span>
              </label>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">限高(米)</label>
                <input
                  type="number"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                  placeholder="例如：2.2"
                  step="0.1"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 生成按钮 */}
          <button
            onClick={handleGenerateRoute}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            生成路线图
          </button>

          {/* 提示 */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <span>💡 温馨提示：</span>
              <br />
              • 系统将根据物品尺寸自动选择合适的通道
              <br />
              • 推荐使用货梯搬运大型设备
              <br />
              • 路线规划会考虑门宽、电梯尺寸等因素
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* 路线概览 */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-6 h-6" />
              <span className="text-lg">最优路线</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="opacity-90">起点</span>
                <span>{startPoint}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">终点</span>
                <span>{endPoint}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">预计距离</span>
                <span>约 380米</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">预计时间</span>
                <span>约 15分钟</span>
              </div>
            </div>
          </div>

          {/* 路线详情 */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2">
              <span>📍</span>
              详细路线
            </h3>
            <div className="space-y-4">
              {/* 步骤1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                    1
                  </div>
                  <div className="w-0.5 h-16 bg-gray-200"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="mb-1">从{startPoint}出发</div>
                  <div className="text-sm text-gray-500">使用1号门，门宽1.5米</div>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded">✓ 通行无障碍</span>
                  </div>
                </div>
              </div>

              {/* 步骤2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    2
                  </div>
                  <div className="w-0.5 h-16 bg-gray-200"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="mb-1">前往货梯区域</div>
                  <div className="text-sm text-gray-500">直行120米，右转至货梯厅</div>
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    注意避开右侧消防栓
                  </div>
                </div>
              </div>

              {/* 步骤3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                    3
                  </div>
                  <div className="w-0.5 h-16 bg-gray-200"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="mb-1">搭乘3号货梯</div>
                  <div className="text-sm text-gray-500">货梯尺寸：2.0m × 2.2m × 2.5m（高）</div>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded">✓ 尺寸匹配</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">载重2吨</span>
                  </div>
                </div>
              </div>

              {/* 步骤4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    4
                  </div>
                  <div className="w-0.5 h-16 bg-gray-200"></div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="mb-1">到达5楼货梯厅</div>
                  <div className="text-sm text-gray-500">出电梯左转，前行80米</div>
                </div>
              </div>

              {/* 步骤5 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="mb-1">到达{endPoint}</div>
                  <div className="text-sm text-gray-500">使用双开门进入，门宽1.8米</div>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded">✓ 搬运完成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 设施信息 */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2">
              <span>🏢</span>
              涉及设施
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-sm text-gray-500">使用门</div>
                <div className="">1号门、5楼双开门</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="text-sm text-gray-500">使用电梯</div>
                <div className="">3号货梯</div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={() => setRouteGenerated(false)}
              className="flex-1 py-3 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
            >
              重新规划
            </button>
            <button
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg"
            >
              保存路线
            </button>
          </div>
        </div>
      )}
    </div>
  );
}