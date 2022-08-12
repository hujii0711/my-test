import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import withReduxStore from './withReduxStore';
import store from './redux';

const queryClient = new QueryClient();

const App = () => {
  {
    /* reactQuery를 프로젝트 에서 사용하기 위해 컴포넌트를 QueryClientProvider로 감싸줘야 한다. 
      QueryClientProvider는 리액트 쿼리에서 캐시를 관리할 때 사용하는 QueryClient 인스턴스를 자식 컴포넌트에서 사용할 수 있게 해준다.*/
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default withReduxStore(App, store);
