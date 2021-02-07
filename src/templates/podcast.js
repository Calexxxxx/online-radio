import React from "react"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0)
  },
  img: {
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
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

const Podcast = ({ data }) => {
  const classes = useStyles()
  const { podcastUrl, podcastTitle, podcastDescription, podcastCategory } = data.contentfulPodcast

  return (
    <Layout>
      <SEO title={ ` | Online Radio` } lang={ "en" }/>
      <Container maxWidth={ "xl" } className={ classes.root }>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "center" } alignItems={ "center" }>
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Card className={ classes.root }>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    You are listening to { podcastTitle }
                  </Typography>
                  <Typography variant="body1" color="textSecondary"
                              component="p" gutterBottom>
                    Genre: { podcastCategory.title }
                  </Typography>
                  <Typography variant="body1" color="textSecondary"
                              component="p" gutterBottom>
                    { podcastDescription }
                  </Typography>
                  <audio controls autoPlay
                         className={ classes.audio }
                         crossOrigin={ "anonymous" }>
                    <source
                      src={ podcastUrl }/>
                    <track default
                           kind="captions"
                           srcLang="en"
                           src={ podcastUrl }/>
                  </audio>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Podcast

export const PodcastQuery = graphql`
    query($slug: String!) {
        contentfulPodcast(podcastSlug: {eq: $slug}) {
            podcastUrl
            podcastTitle
            podcastSlug
            podcastDescription
            podcastCategory {
                title
            }
        }
    }
`