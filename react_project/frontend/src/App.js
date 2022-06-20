import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';
//import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  //const queryClient = new QueryClient();
  useEffect(() => {
    //console.log("App_effect!!!!");
  });
  return (
    // <QueryClientProvider client={queryClient}>
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
      <Routes>
        <Route element={<PostListPage />} path={'/@:username'} exact />
        <Route element={<PostListPage />} path={'/'} exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<WritePage />} path="/write" />
        <Route element={<PostPage />} path="/@:username/:postId" />
      </Routes>
      {/* </QueryClientProvider> */}
    </>
  );
};
export default App;
