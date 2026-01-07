import { all } from 'redux-saga/effects';

// 导入各个模块的saga
import userSaga from './userSaga';
import fundSaga from './fundSaga';
import favoriteFundsSaga from './favoriteFundsSaga';
import holdingsSaga from './holdingsSaga';
// import queriesSaga from './queries';
// import transactionsSaga from './transactions';
// import profitSaga from './profit';
// import indicesSaga from './indices';

function* rootSaga() {
  yield all([
    userSaga(),
    fundSaga(),
    favoriteFundsSaga(),
    holdingsSaga(),
    // queriesSaga(),
    // transactionsSaga(),
    // profitSaga(),
    // indicesSaga(),
  ]);
}

export default rootSaga;
