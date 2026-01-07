// 统一导出所有服务
import api from './api';
import fundService from './fund';
import favoriteService from './favorite';
import holdingsService from './holdings';
import aiChatService from './ai/chat';
import userService from './user';

// 导出基础API实例
export { api };

// 导出各业务模块服务
export {
  fundService,
  favoriteService,
  holdingsService,
  aiChatService,
  userService,
};

// 默认导出所有服务
export default {
  api,
  fundService,
  favoriteService,
  holdingsService,
  aiChatService,
  userService,
};
