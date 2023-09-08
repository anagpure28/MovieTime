import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';
import { Home } from './pages/home/Home';
import { Details } from './pages/details/Details';
import { SearchResultPage } from './pages/searchResultPage/SearchResultPage';
import { PageNotFound } from './pages/404/pageNotFound';
import { Explore } from './pages/explore/Explore';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home);
  console.log(url);

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular")
    .then((res)=> {
      console.log(res);
      dispatch(getApiConfiguration(res))
    })
  }

  useEffect(()=> {
    apiTesting();
  },[]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResultPage />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
