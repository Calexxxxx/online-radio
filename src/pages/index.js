import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { Grid } from "@material-ui/core"
import { CategorySection } from "../components/CategorySection"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Adsense } from "@ctrl/react-adsense"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(14, "auto")
  },
  button: {
    marginLeft: "10px",
    marginBottom: "10px"
  },
  paper: {
    position: "absolute",
    left: "2%",
    width: 320,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[ 5 ],
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none"
    },
    [ theme.breakpoints.up("sm") ]: {
      width: 420
    },
    [ theme.breakpoints.up("md") ]: {
      width: 720
    },
    [ theme.breakpoints.up("lg") ]: {
      width: 1200
    }
  }
}))

const IndexPage = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO
        title="Worldwide Online Radio Streams On Alphabetical Order"
        lang={ "en" }
        description="Listen to live online radio streams from thousands of radio stations worldwide.  Listen to your favorite music online for free."
        keywords="internet radio, online radio, music, radio stations, online radio stations, internet radio stations, online music, net radio, radio internet, internetradio, internet-radio"
      />
      <Container maxWidth={ "xl" } className={ classes.root }>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "center" } alignItems={ "flex-start" }>
          <Grid item xs={ 12 } sm={ 8 }>
            <Adsense
              client="ca-pub-1191732033422907"
              slot="9324428311"
              format="fluid"
            />
          </Grid>
        </Grid>
        <Grid container={ true } spacing={ 4 } direction={ "row" }
              justify={ "flex-start" } alignItems={ "flex-start" }>
          { data.allContentfulRadioStation.group.map((node, index) => {
            const alphabetic = node.edges[ 0 ].node.stationAlphabetic.title
            return (
              <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ index }>
                <CategorySection data={ node } title={ alphabetic }/>
              </Grid>
            )
          }) }
        </Grid>
      </Container>

    </Layout>
  )
}

export default IndexPage

export const IndexQuery = graphql`
    query {
        allContentfulRadioStation(sort: {fields: stationTitle, order: ASC}, filter: {node_locale: {eq: "en"}}) {
            group(field: stationAlphabetic___title) {
                edges {
                    node {
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
                        stationAlphabetic {
                            title
                        }
                    }
                }
                fieldValue
            }
        }
    }
`