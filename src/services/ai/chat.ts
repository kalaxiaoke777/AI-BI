import api from '../api';

// AI聊天API服务
export const aiChatService = {
  // 提问AI
  askAI: (prompt: string) => api.get('/ai/ask', { params: { prompt } }),
  
  // 获取AI助手信息
  getAIAssistantInfo: () => api.get('/ai/assistant'),
  
  // 获取AI聊天历史
  getChatHistory: (params?: any) => api.get('/ai/chat-history', { params }),
  
  // 清空聊天历史
  clearChatHistory: () => api.delete('/ai/chat-history'),
};

export default aiChatService;
