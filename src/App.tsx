import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/global.scss';

import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import FundList from './pages/FundList';
import FundDetail from './pages/FundDetail';
import IndexAnalysis from './pages/IndexAnalysis';
// import FundCompanyList from './pages/FundCompanyList';
// import FundCompanyDetail from './pages/FundCompanyDetail';
// import FundQuery from './pages/FundQuery';
// import FundRank from './pages/FundRank';
// import UserProfile from './pages/UserProfile';
// import FavoriteFunds from './pages/FavoriteFunds';
// import Holdings from './pages/Holdings';
// import TransactionHistory from './pages/TransactionHistory';
// import ProfitAnalysis from './pages/ProfitAnalysis';
// import ScrapeTask from './pages/ScrapeTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/index" replace />} />
            <Route path="/index" element={<IndexAnalysis />} />
            <Route path="/funds" element={<FundList />} />
            <Route path="/funds/:fundId" element={<FundDetail />} />
            <Route path="/companies" element={<div>基金公司列表页面</div>} />
            <Route path="/companies/:companyId" element={<div>基金公司详情页面</div>} />
            <Route path="/query" element={<div>基金查询页面</div>} />
            <Route path="/rank" element={<div>基金排行页面</div>} />

            <Route path="/user/profile" element={<div>个人信息页面</div>} />
            <Route path="/user/favorites" element={<div>自选基金页面</div>} />
            <Route path="/user/holdings" element={<div>持有基金页面</div>} />
            <Route path="/user/transactions" element={<div>交易记录页面</div>} />
            <Route path="/user/profit" element={<div>收益分析页面</div>} />
            <Route path="/admin/scrape" element={<div>数据采集管理页面</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/index" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
