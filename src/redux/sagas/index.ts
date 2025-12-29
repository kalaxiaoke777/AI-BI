import { all } from 'redux-saga/effects';

// 导入各个模块的saga
import userSaga from './userSaga';
import fundSaga from './fundSaga';
// 导入其他模块的saga（后续会添加）
// import queriesSaga from './queries';
// import favoritesSaga from './favorites';
// import holdingsSaga from './holdings';
// import transactionsSaga from './transactions';
// import profitSaga from './profit';
// import indicesSaga from './indices';

function* rootSaga() {
  yield all([
    userSaga(),
    fundSaga(),
    // queriesSaga(),
    // favoritesSaga(),
    // holdingsSaga(),
    // transactionsSaga(),
    // profitSaga(),
    // indicesSaga(),
  ]);
}

export default rootSaga;
