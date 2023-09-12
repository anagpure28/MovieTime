import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, genGenres } from './store/homeSlice';
import { Home } from './pages/home/Home';
import { Details } from './pages/details/Details';
import { SearchResultPage } from './pages/searchResultPage/SearchResultPage';
import { PageNotFound } from './pages/404/pageNotFound';
import { Explore } from './pages/explore/Explore';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home);
  // console.log(url);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
    .then((res)=> {
      // console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url))
    })
  }

  // Adding genres
  const genresCall = async() => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    // Returns all promises at the same time
    endPoints.forEach((url)=> {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres}) => {
      // Returning genres with id as a key and whole genre as a value
      return genres.map((item)=> (allGenres[item.id] = item));
    });

    dispatch(genGenres(allGenres))
  }

  useEffect(()=> {
    fetchApiConfig();
    genresCall()
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
