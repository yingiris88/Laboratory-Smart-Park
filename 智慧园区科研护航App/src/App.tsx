import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RepairRequest } from './components/RepairRequest';
import { RepairProcess } from './components/RepairProcess';
import { SpaceRenovation } from './components/SpaceRenovation';
import { KnowledgeBase } from './components/KnowledgeBase';
import { TransportRoute } from './components/TransportRoute';
import { Dining } from './components/Dining';
import { MeetingRoom } from './components/MeetingRoom';
import { Recreation } from './components/Recreation';
import { Accommodation } from './components/Accommodation';
import { VisitorAppointment } from './components/VisitorAppointment';
import { OrderManagement } from './components/OrderManagement';
import { ServiceExecution } from './components/ServiceExecution';
import { MyOrders } from './components/MyOrders';

export type Page = 'login' | 'register' | 'home' | 'repair-request' | 'repair-process' | 'space-renovation' | 'knowledge-base' | 'transport-route' | 'dining' | 'meeting-room' | 'recreation' | 'accommodation' | 'visitor-appointment' | 'order-management' | 'service-execution' | 'my-orders';

export type UserRole = 'researcher' | 'admin' | 'service';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department?: string;
  phone: string;
}

export interface RepairOrder {
  id: string;
  type: string;
  location: string;
  description: string;
  photo: string;
  status: 'pending' | 'approved' | 'rejected' | 'assigned' | 'in-progress' | 'completed' | 'rated';
  engineer?: string;
  eta?: string;
  timestamp: string;
  submitter?: string;
  rating?: number;
  comment?: string;
}

export interface WorkOrder {
  id: string;
  category: string;
  title: string;
  description: string;
  location?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed' | 'rated';
  submitter: string;
  submitTime: string;
  handler?: string;
  completeTime?: string;
  completionPhotos?: string[];  // 服务完成照片
  rating?: number;
  comment?: string;
}

export default function App() {
  const [hasError, setHasError] = useState(false);
  
  // 从 localStorage 初始化当前用户
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (!savedUser) return null;
      const parsed = JSON.parse(savedUser);
      return parsed;
    } catch (error) {
      console.error('Error loading currentUser:', error);
      localStorage.removeItem('currentUser');
      return null;
    }
  });
  
  // 根据用户登录状态初始化页面
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? 'home' : 'login';
    } catch (error) {
      return 'login';
    }
  });
  
  // 从 localStorage 初始化数据
  const [repairOrders, setRepairOrders] = useState<RepairOrder[]>(() => {
    try {
      const saved = localStorage.getItem('repairOrders');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading repairOrders:', error);
      localStorage.removeItem('repairOrders');
      return [];
    }
  });
  
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    try {
      const saved = localStorage.getItem('workOrders');
      console.log('🔍 初始化加载workOrders from localStorage:', saved);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      console.log('✅ 解析workOrders成功:', parsed.length, '条');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('❌ Error loading workOrders:', error);
      localStorage.removeItem('workOrders');
      return [];
    }
  });

  // 保存 repairOrders 到 localStorage
  useEffect(() => {
    try {
      // 清理策略：只保留最近的20条记录，且对已完成的订单移除照片
      const cleanedOrders = repairOrders.slice(0, 20).map((order, index) => {
        // 对于已完成或已评价的订单，移除照片以节省空间
        if (order.status === 'rated' || order.status === 'completed' || order.status === 'rejected') {
          return { ...order, photo: '' };
        }
        // 对于进行中的订单，也移除照片（照片已经提交过了）
        if (index > 10) {
          return { ...order, photo: '' };
        }
        return order;
      });
      
      // 尝试保存
      const dataToSave = JSON.stringify(cleanedOrders);
      
      // 检查数据大小（localStorage 通常限制5MB）
      const sizeInBytes = new Blob([dataToSave]).size;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      
      if (sizeInMB > 4) {
        // 如果超过4MB，进一步清理：移除所有照片
        const ordersWithoutPhotos = cleanedOrders.map(order => ({ ...order, photo: '' }));
        localStorage.setItem('repairOrders', JSON.stringify(ordersWithoutPhotos));
      } else {
        localStorage.setItem('repairOrders', dataToSave);
      }
    } catch (error) {
      console.error('Error saving repairOrders:', error);
      
      // 终极方案：清空现有数据，只保存最基础的订单信息
      try {
        // 先清空
        localStorage.removeItem('repairOrders');
        
        // 只保留最近10条，且移除所有照片和额外信息
        const minimalOrders = repairOrders.slice(0, 10).map(order => ({
          id: order.id,
          type: order.type,
          location: order.location,
          description: order.description.slice(0, 100), // 限制描述长度
          photo: '', // 移除照片
          status: order.status,
          timestamp: order.timestamp,
          submitter: order.submitter,
          engineer: order.engineer,
          rating: order.rating,
          comment: order.comment ? order.comment.slice(0, 50) : '' // 限制评论长度
        }));
        
        localStorage.setItem('repairOrders', JSON.stringify(minimalOrders));
      } catch (finalError) {
        console.error('Failed to save minimal repairOrders:', finalError);
        // 完全失败时，清空localStorage中的旧数据
        localStorage.removeItem('repairOrders');
      }
    }
  }, [repairOrders]);

  // 保存 workOrders 到 localStorage
  useEffect(() => {
    try {
      // 保留所有工单，但对描述和评论进行适当限制
      const cleanedOrders = workOrders.map(order => ({
        ...order,
        description: order.description || '', // 保留完整描述
        comment: order.comment || undefined
      }));
      
      const dataToSave = JSON.stringify(cleanedOrders);
      const sizeInBytes = new Blob([dataToSave]).size;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      
      if (sizeInMB > 4) {
        // 如果超过4MB，限制描述长度但保留所有记录
        const compressedOrders = workOrders.map(order => ({
          ...order,
          description: order.description.slice(0, 300), // 增加到300字符
          comment: order.comment ? order.comment.slice(0, 150) : undefined
        }));
        localStorage.setItem('workOrders', JSON.stringify(compressedOrders));
      } else {
        localStorage.setItem('workOrders', dataToSave);
      }
    } catch (error) {
      console.error('Error saving workOrders:', error);
      
      // 备选方案：压缩数据但保留所有记录
      try {
        localStorage.removeItem('workOrders');
        const compressedOrders = workOrders.map(order => ({
          id: order.id,
          category: order.category,
          title: order.title.slice(0, 100),
          description: order.description.slice(0, 200),
          location: order.location,
          status: order.status,
          submitter: order.submitter,
          submitTime: order.submitTime,
          handler: order.handler,
          completeTime: order.completeTime,
          rating: order.rating,
          comment: order.comment ? order.comment.slice(0, 100) : undefined
        }));
        localStorage.setItem('workOrders', JSON.stringify(compressedOrders));
      } catch (retryError) {
        console.error('Failed to save compressed workOrders:', retryError);
        // 最后尝试：只在描述超长时才截断
        try {
          localStorage.removeItem('workOrders');
          const minimalOrders = workOrders.map(order => ({
            ...order,
            description: order.description.length > 150 ? order.description.slice(0, 150) + '...' : order.description,
            comment: order.comment && order.comment.length > 80 ? order.comment.slice(0, 80) + '...' : order.comment
          }));
          localStorage.setItem('workOrders', JSON.stringify(minimalOrders));
        } catch (finalError) {
          console.error('Failed to save minimal workOrders:', finalError);
        }
      }
    }
  }, [workOrders]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('home');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    localStorage.removeItem('currentUser');
  };

  const handleSubmitRepair = (order: Omit<RepairOrder, 'id' | 'status' | 'timestamp' | 'submitter'>) => {
    const newOrder: RepairOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      timestamp: new Date().toISOString(),
      submitter: currentUser?.name,
    };
    setRepairOrders([newOrder, ...repairOrders]);
    
    // 同时生成工单供管理员审核
    const workOrder: WorkOrder = {
      id: newOrder.id,
      category: '报修申请',
      title: `${order.type} - ${order.location}`,
      description: `故障描述：${order.description}\n报修照片：已上传`,
      location: order.location,
      status: 'pending',
      submitter: currentUser?.name || '未知',
      submitTime: new Date().toISOString(),
    };
    setWorkOrders([workOrder, ...workOrders]);
    
    console.log('创建报修工单:', workOrder);
    console.log('当前workOrders数量:', workOrders.length + 1);
    
    setCurrentPage('repair-process');
  };

  const handleSubmitWorkOrder = (order: Omit<WorkOrder, 'id' | 'status' | 'submitter' | 'submitTime'>) => {
    const newOrder: WorkOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      submitter: currentUser?.name || '未知',
      submitTime: new Date().toISOString(),
    };
    setWorkOrders([newOrder, ...workOrders]);
  };

  const handleApproveOrder = (orderId: string) => {
    setWorkOrders(workOrders.map(order =>
      order.id === orderId ? { ...order, status: 'approved' } : order
    ));
    // 同更新报修工单状态
    setRepairOrders(repairOrders.map(order =>
      order.id === orderId ? { ...order, status: 'approved' } : order
    ));
  };

  const handleRejectOrder = (orderId: string) => {
    setWorkOrders(workOrders.map(order =>
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    // 同步更新报修工单状态
    setRepairOrders(repairOrders.map(order =>
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
  };

  const handleStartService = (orderId: string, handler: string) => {
    setWorkOrders(workOrders.map(order =>
      order.id === orderId ? { ...order, status: 'in-progress', handler } : order
    ));
    // 同步更新报修工单状态
    setRepairOrders(repairOrders.map(order =>
      order.id === orderId ? { ...order, status: 'in-progress' } : order
    ));
  };

  const handleCompleteService = (orderId: string, completionPhotos?: string[]) => {
    setWorkOrders(workOrders.map(order =>
      order.id === orderId ? { 
        ...order, 
        status: 'completed', 
        completeTime: new Date().toISOString(),
        completionPhotos: completionPhotos || []
      } : order
    ));
    // 同步更新报修工单状态
    setRepairOrders(repairOrders.map(order =>
      order.id === orderId ? { ...order, status: 'completed' } : order
    ));
  };

  const handleRateOrder = (orderId: string, rating: number, comment: string) => {
    console.log('📝 评价工单:', orderId, '评分:', rating, '评论:', comment);
    
    setWorkOrders(workOrders.map(order =>
      order.id === orderId ? { ...order, status: 'rated', rating, comment } : order
    ));
    // 同步更新报修工单状态
    setRepairOrders(repairOrders.map(order =>
      order.id === orderId ? { ...order, status: 'rated', rating, comment } : order
    ));
    
    console.log('✅ 工单状态已更新为 rated');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <Register onRegister={handleLogin} onNavigateToLogin={() => setCurrentPage('login')} />;
      case 'home':
        return <HomePage onNavigate={setCurrentPage} user={currentUser} onLogout={handleLogout} />;
      case 'repair-request':
        return <RepairRequest onBack={() => setCurrentPage('home')} onSubmit={handleSubmitRepair} />;
      case 'repair-process':
        return <RepairProcess onBack={() => setCurrentPage('home')} orders={repairOrders} currentUserName={currentUser?.name} onRate={handleRateOrder} />;
      case 'space-renovation':
        return <SpaceRenovation onBack={() => setCurrentPage('home')} onSubmitOrder={handleSubmitWorkOrder} />;
      case 'knowledge-base':
        return <KnowledgeBase onBack={() => setCurrentPage('home')} />;
      case 'transport-route':
        return <TransportRoute onBack={() => setCurrentPage('home')} />;
      case 'dining':
        return <Dining onBack={() => setCurrentPage('home')} onSubmitOrder={handleSubmitWorkOrder} />;
      case 'meeting-room':
        return <MeetingRoom onBack={() => setCurrentPage('home')} onSubmitOrder={handleSubmitWorkOrder} />;
      case 'recreation':
        return <Recreation onBack={() => setCurrentPage('home')} onSubmitOrder={handleSubmitWorkOrder} />;
      case 'accommodation':
        return <Accommodation onBack={() => setCurrentPage('home')} onSubmitOrder={handleSubmitWorkOrder} />;
      case 'visitor-appointment':
        return <VisitorAppointment onBack={() => setCurrentPage('home')} onSubmitOrder={handleSubmitWorkOrder} />;
      case 'order-management':
        return <OrderManagement 
          onBack={() => setCurrentPage('home')} 
          orders={workOrders}
          onApprove={handleApproveOrder}
          onReject={handleRejectOrder}
          onRate={handleRateOrder}
        />;
      case 'service-execution':
        return <ServiceExecution 
          onBack={() => setCurrentPage('home')} 
          orders={workOrders}
          onStart={handleStartService}
          onComplete={handleCompleteService}
          currentUser={currentUser}
        />;
      case 'my-orders':
        return <MyOrders 
          onBack={() => setCurrentPage('home')} 
          orders={workOrders}
          currentUserName={currentUser?.name}
          onRate={handleRateOrder}
        />;
      default:
        return <Login onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}