import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { FavoritesSection } from "../components/FavoritesSection"
import { Adsense } from "@ctrl/react-adsense"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(14, "auto")
  }
}))

const FavoritesPage = () => {
  const [ favorites, setFavorites ] = useState([])
  const classes = useStyles()

  useEffect(() => {
    let stations = []
    let storedStations = localStorage.getItem("stationFavorites") ? localStorage.getItem("stationFavorites") : []
    if ( storedStations.length > 1 ) {
      stations = JSON.parse(storedStations)
    }

    setFavorites(stations)
  }, [])

  return (
    <Layout>
      <SEO
        title="Create Your Own Radio Live Stream Playlist"
        lang={ "en" }
        description="Listen to live online radio streams from thousands of radio stations worldwide.  Listen to your favorite music online for free and safe them to your favorites."
        keywords="internet radio, online radio, music, radio stations, online radio stations, internet radio stations, online music, net radio, radio internet, internetradio, internet-radio"
      />

      <Container maxWidth={ "xl" } className={ classes.root }>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "center" }>
          <Grid item xs={ 12 } sm={ 3 }>
            <Adsense
              client="ca-pub-1191732033422907"
              slot="9324428311"
              format="fluid"
            />
          </Grid>

          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <FavoritesSection favorites={ favorites }/>
          </Grid>

          <Grid item xs={ 12 } sm={ 3 }>
            <Adsense
              client="ca-pub-1191732033422907"
              slot="9324428311"
              format="fluid"
            />
          </Grid>
        </Grid>
      </Container>

    </Layout>
  )
}

export default FavoritesPage