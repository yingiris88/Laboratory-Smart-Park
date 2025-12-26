import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, Download, Eye, Star, Filter, Folder } from 'lucide-react';

interface KnowledgeBaseProps {
  onBack: () => void;
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  views: number;
  saved: boolean;
}

export function KnowledgeBase({ onBack }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', title: '实验组团I-501室竣工图', category: '竣工图', date: '2024-03-15', views: 128, saved: false },
    { id: '2', title: '空调设备操作手册', category: '设备资料', date: '2024-03-10', views: 256, saved: true },
    { id: '3', title: '实验室安全操作规范', category: '作业规范', date: '2024-03-08', views: 342, saved: false },
    { id: '4', title: '电气系统维护指南', category: '操作手册', date: '2024-03-05', views: 189, saved: false },
    { id: '5', title: '物业维修人员花名册', category: '检修人员', date: '2024-03-01', views: 95, saved: false },
    { id: '6', title: '空调故障排查案例集', category: '维修案例', date: '2024-02-28', views: 421, saved: true },
    { id: '7', title: '弱电系统布线图纸', category: '竣工图', date: '2024-02-25', views: 167, saved: false },
    { id: '8', title: '实验设备日常保养规程', category: '作业规范', date: '2024-02-20', views: 234, saved: false },
  ]);

  const categories = [
    { id: 'all', name: '全部', icon: '📚' },
    { id: '竣工图', name: '竣工图', icon: '📐' },
    { id: '设备资料', name: '设备资料', icon: '🔧' },
    { id: '操作手册', name: '操作手册', icon: '📖' },
    { id: '检修人员', name: '检修人员', icon: '👷' },
    { id: '维修案例', name: '维修案例', icon: '💡' },
    { id: '作业规范', name: '作业规范', icon: '📋' },
  ];

  const toggleSave = (id: string) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, saved: !article.saved } : article
    ));
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">知识库</h1>
        </div>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文档、案例、规范..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[140px] z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-50">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            找到 <span className="text-blue-600">{filteredArticles.length}</span> 条结果
          </span>
          <button className="flex items-center gap-1 text-blue-600">
            <Filter className="w-4 h-4" />
            <span>筛选</span>
          </button>
        </div>
      </div>

      {/* 文档列表 */}
      <div className="p-4 space-y-3">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <h3 className="text-sm">{article.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleSave(article.id)}
                className="ml-2 p-2"
              >
                <Star
                  className={`w-5 h-5 ${
                    article.saved ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 border border-blue-200 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
                <Eye className="w-4 h-4" />
                预览
              </button>
              <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                <Download className="w-4 h-4" />
                下载
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 我的收藏快捷入口 */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <Folder className="w-6 h-6" />
        </button>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {articles.filter(a => a.saved).length}
        </div>
      </div>

      {/* 空状态 */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500">未找到相关文档</p>
          <p className="text-sm text-gray-400 mt-2">试试其他关键词</p>
        </div>
      )}
    </div>
  );
}