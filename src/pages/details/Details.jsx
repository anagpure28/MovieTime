import React from 'react';
import "./style.scss"
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';

export const Details = () => {
  // const {mediaType, id} = useParams();
  // const {data, loading} = useFetch(`/${mediaType}/${id}`)

  return (
    <div>
      <DetailsBanner />
    </div>
  )
}
