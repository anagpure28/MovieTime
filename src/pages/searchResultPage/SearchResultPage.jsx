import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';

import "./style.scss"
import MovieCard from '../../components/movieCard/MovieCard';

export const SearchResultPage = () => {
  const [data, setData] = useState(null);
  const [PageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${PageNum}`)
    .then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${PageNum}`)
    .then((res) => {
      if(data?.results) {
        setData({...data, results: [...data?.results, ...res.results]})
      }else{
        setData(res)
      }
      setPageNum((prev) => prev + 1);
    })
  }

  useEffect(() => {
    // For every query change set page to 1
    setPageNum(1)
    fetchInitialData()
  },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className='pageTitle'>
                {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
              </div>
              <InfiniteScroll 
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={PageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if(item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}
