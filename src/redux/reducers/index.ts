import { combineReducers } from "redux";

// 导入各个模块的reducer
import userReducer from "./userReducer";
import fundsReducer from "./fundsReducer";
import companiesReducer from "./companiesReducer";
import favoriteFundsReducer from "./favoriteFundsReducer";
import holdingsReducer from "./holdingsReducer";
// 导入其他模块的reducer（后续会添加）
// import queriesReducer from './queries';
// import transactionsReducer from './transactions';
// import profitReducer from './profit';
// import indicesReducer from './indices';

// 组合所有reducer
const rootReducer = combineReducers({
  user: userReducer,
  funds: fundsReducer,
  companies: companiesReducer,
  favoriteFunds: favoriteFundsReducer,
  holdings: holdingsReducer,
  // 其他模块的reducer（后续会添加）
  // queries: queriesReducer,
  // transactions: transactionsReducer,
  // profit: profitReducer,
  // indices: indicesReducer,
});

export default rootReducer;
