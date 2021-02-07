import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { PodcastSection } from "../components/PodcastSection"
import { Adsense } from "@ctrl/react-adsense"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(14, "auto")
  }
}))

const PodcastPage = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO
        title="Worldwide Online Podcast Streams Sorted On Genres"
        lang={ "en" }
        description="Listen to live to your favorite podcast online from all over the world."
        keywords="podcast free, online podcast, internet radio, online radio, music, radio stations, online radio stations, internet radio stations, online music, net radio, radio internet, internetradio, internet-radio"
      />

      <Container maxWidth={ "xl" } className={ classes.root }>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "center" }>
          <Grid item xs={ 12 } sm={ 8 }>
            <Adsense
              client="ca-pub-1191732033422907"
              slot="9324428311"
              format="fluid"
            />
          </Grid>
        </Grid>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "center" }>
          { data.allContentfulPodcast.group.map((node, index) => {
            const cat = node.edges[ 0 ].node.podcastCategory.title
            return (
              <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ index }>
                <PodcastSection data={ node } title={ cat }/>
              </Grid>
            )
          }) }
        </Grid>
      </Container>

    </Layout>
  )
}

export default PodcastPage

export const PodcastSingleQuery = graphql`
    query {
        allContentfulPodcast(filter: {node_locale: {eq: "en"}}) {
            group(field: podcastCategory___id) {
                edges {
                    node {
                        podcastTitle
                        podcastSlug
                        podcastDescription
                        podcastCategory {
                            title
                        }
                    }
                }
            }
        }
    }
`