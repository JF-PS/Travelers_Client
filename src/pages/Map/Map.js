import React from 'react'
import Layout from '../../components/Layout/Layout'
import Map from '../../components/Map/Map'
import SearchBar from '../../components/SearchBar/SearchBar'
import SlideButton from '../../components/SlideButton/SlideButton'
// import Grid from '@mui/material/Grid';


const PageMap = () => {
    return (
      <Layout>
        <Map>
          {/* <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          > */}
            <SearchBar></SearchBar>
            <SlideButton></SlideButton>
        </Map>
      </Layout>
    )
}

export default PageMap