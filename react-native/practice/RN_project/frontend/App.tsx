import * as React from 'react';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
//import {ReactQueryDevtools} from 'react-query/devtools';
import RootStack from './screens/RootStack';
import reducers from './redux';

const store = createStore(reducers);
const queryClient = new QueryClient();

const App = () => {
  {
    /* reactQuery를 프로젝트 에서 사용하기 위해 컴포넌트를 QueryClientProvider로 감싸줘야 한다. 
      QueryClientProvider는 리액트 쿼리에서 캐시를 관리할 때 사용하는 QueryClient 인스턴스를 자식 컴포넌트에서 사용할 수 있게 해준다.*/
  }
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
