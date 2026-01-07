import api from '../api';

// 自选基金API服务
export const favoriteService = {
  // 获取自选基金列表
  getFavoriteFunds: () => api.get('/ss-fund/favorite-funds'),
  
  // 添加基金到自选
  addToFavorites: (fundCode: string) => api.post('/ss-fund/favorite-funds', { fund_code: fundCode }),
  
  // 从自选移除基金
  removeFromFavorites: (fundCode: string) => api.delete(`/ss-fund/favorite-funds/${fundCode}`),
};

export default favoriteService;
