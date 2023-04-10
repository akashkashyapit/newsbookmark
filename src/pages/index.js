import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment , incrementByAmount} from '../redux/reducer/news'
import axios from 'axios';
import Cards from '@/component/card';
import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import {newsData} from "../static"

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  useEffect(()=>{
    setData(newsData.articles)
    axios.get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=e78cdcdb027449f081377c433619e7a6')
      .then(function (response) {
        setData(newsData.articles)
      })
      .catch(function (error) {
        console.log(error);
      })
  },[])

  return (
    <main >
      <Head>
        <title>News</title>
      </Head>
      <Box sx={{margin:1, fontWeight:"bold", textAlign:"center", fontSize:28, color:"#1976d2"}}>News</Box>
      <Grid container spacing={2} justifyContent="space-between" direction="row">
        {data.map((el,i) => {
          return <Grid item xs={12} md={4} lg={3} xl={2} key={`${i}${el?.source?.id}`}><Cards item={el} /></Grid>
        })}
      </Grid>

    </main>
  )
}






