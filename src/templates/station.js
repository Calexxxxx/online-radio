import React, { useEffect, useState } from "react"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Img from "gatsby-image"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Fab from "@material-ui/core/Fab"
import FavoriteIcon from "@material-ui/icons/Favorite"
import Share from "../components/share"
import { Adsense } from "@ctrl/react-adsense"
import { FavoritesSection } from "../components/FavoritesSection"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, "auto"),
    [ theme.breakpoints.up("sm") ]: {
      margin: theme.spacing(16, "auto", 2, "auto")
    }
  },
  favoriteList: {
    margin: theme.spacing(2, "auto", 6, "auto"),
    [ theme.breakpoints.up("sm") ]: {
      margin: theme.spacing(2, "auto", 10, "auto")
    }
  },
  card: {
    position: "relevant"
  },
  img: {
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  favorite: {
    position: "absolute",
    right: "20px",
    top: "20px",
    zIndex: 1000
  },
  share: {
    padding: "10px 15px"
  },
  audio: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(4),
    "&::-webkit-media-controls-current-time-display": {
      color: "#ffffff"
    },
    "&::-webkit-media-controls-enclosure": {
      backgroundColor: "rgb(30 127 171)",
      borderColor: theme.palette.primary.main,
      borderRadius: 0
    },
    "&::-webkit-media-controls-play-button": {
      backgroundColor: "#ffffff",
      borderRadius: "50%"
    },
    "&::-webkit-media-controls-volume-control-container": {
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      transition: "all 600ms ease-in-out",
      "&:hover": {
        borderRadius: "50px"
      }
    },
    "&:focus": {
      outline: "none"
    }
  }
}))


const Station = ({ data }) => {
  const [ favorite, setFavorite ] = useState([])
  const [ isFav, setIsFav ] = useState(false)

  const { stationStreamUrl, stationTitle, stationLogo, stationCountry, stationCategory, stationSlug } = data.contentfulRadioStation
  const classes = useStyles()

  const addFavorite = () => {
    let stations = []
    let storedStations = localStorage.getItem("stationFavorites") ? localStorage.getItem("stationFavorites") : []


    if ( storedStations.length > 1 ) {
      stations = JSON.parse(storedStations)
    }

    if ( stations.find(station => station.title === stationTitle) ) {
      return
    } else {
      stations.push({
        title: stationTitle,
        type: "station",
        country: stationCountry.countryTitle,
        slug: stationSlug,
        logo: stationLogo.fluid
      })
    }

    localStorage.setItem("stationFavorites", JSON.stringify(stations))
    setFavorite(stations)
  }

  const removeFavorite = () => {
    let stations = JSON.parse(localStorage.getItem("stationFavorites"))

    stations = stations.filter(station => station.title !== stationTitle)

    localStorage.setItem("stationFavorites", JSON.stringify(stations))
    setFavorite(stations)
    setIsFav(false)
  }

  useEffect(() => {
    let stations = []
    let storedStations = localStorage.getItem("stationFavorites") ? localStorage.getItem("stationFavorites") : []
    if ( storedStations.length > 1 ) {
      stations = JSON.parse(storedStations)
    }
    setFavorite(stations)

  }, [])

  useEffect(() => {
    if ( favorite.find(station => station.title === stationTitle) ) {
      setIsFav(true)
    }

  }, [ favorite, stationTitle ])

  if ( !data ) return null

  return (
    <Layout>
      <SEO
        title={ `${ stationTitle } Live Stream` }
        lang={ "en" }
        description={ `Listen to the ${ stationTitle } live stream or choose from thousands of radio stations worldwide.  Listen to your favorite music online for free.` }
        keywords={ `${ stationTitle }, ${ stationCountry.countryTitle } Online Radio Station, ${ stationCategory.categoryTitle } Music Live streams,  internet radio, online radio, music, radio stations, online radio stations, internet radio stations, online music, net radio, radio internet, internetradio, internet-radio` }
      />
      <Container maxWidth={ "xl" } className={ classes.root }>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "center" } alignItems={ "center" }>
          <Grid item xs={ 12 } sm={ 3 }>
            <Adsense
              client="ca-pub-1191732033422907"
              slot="1972399944"
              format="auto"
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Card className={ classes.card }>
              <CardActionArea component={ "div" }>
                <CardMedia
                  component={ Img }
                  alt={ stationTitle + " logo" }
                  height="140"
                  fluid={ stationLogo.fluid }
                  title={ stationTitle }
                />

                <CardContent>
                  <Fab aria-label="favorite" className={ classes.favorite }
                       onClick={ isFav ? removeFavorite : addFavorite }
                       component={ "button" }
                       color={ isFav ? "primary" : "secondary" }
                  >
                    <FavoriteIcon/>
                  </Fab>
                  <Typography gutterBottom variant="h4" component="h2">
                    You are listening to { stationTitle }
                  </Typography>
                  <Typography variant="body1" color="textSecondary"
                              component="p" gutterBottom>
                    Genre: { stationCategory.categoryTitle }
                  </Typography>
                  <Typography variant="body1" color="textSecondary"
                              component="p" gutterBottom>
                    Country: { stationCountry.countryTitle }
                  </Typography>
                  <audio controls autoPlay
                         className={ classes.audio }>
                    <source src={ stationStreamUrl } type={ "audio/mpeg" }/>
                  </audio>
                </CardContent>
              </CardActionArea>
              <CardActions className={ classes.share }>
                <Share
                  socialConfig={ {
                    config: {
                      url: `https://onlineradiostreams.net/station/${ stationSlug }`,
                      stationTitle
                    }
                  } }
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={ 12 } sm={ 3 }>
            <Adsense
              client="ca-pub-1191732033422907"
              slot="9860014313"
              format="auto"
            />
          </Grid>
        </Grid>
      </Container>
      { favorite && (
        <Container maxWidth={ "xl" } className={ classes.favoriteList }>
          <Grid container={ true } spacing={ 4 } direction={ "row" }
                justify={ "center" }>
            <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
              <FavoritesSection favorites={ favorite }/>
            </Grid>
          </Grid>
        </Container>
      ) }
    </Layout>
  )
}

export default Station

export const StationQuery = graphql`
    query($slug: String!) {
        contentfulRadioStation(node_locale: {eq: "en"}, stationSlug: {eq: $slug}) {
            stationStreamUrl
            stationTitle
            stationSlug
            stationLogo {
                fluid {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
            stationCountry {
                countryTitle
            }
            stationCategory {
                categoryTitle
            }
        }
    }
`