import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Typography } from "@material-ui/core"
import { Link } from "gatsby"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  link: {
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    width: "100%"
  },
  header: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderBottom: "1px solid #1e7fab",
    marginBottom: theme.spacing(2)
  }
}))

export const PodcastSection = ({ data, title }) => {
  const classes = useStyles()

  return (
    <List className={ classes.root }>
      <ListItem>
        <Typography variant={ "h5" } component={ "h2" } color={ "primary" }
                    className={ classes.header }>
          { title }
        </Typography>
      </ListItem>
      { data.edges.map(({ node }, index) => {
        const description = node.podcastDescription
        const maxLength = 100
        let trimmedString = ""

        if ( description.length > trimmedString.length ) {

          trimmedString = description.substr(0, maxLength)

          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        }
        return (
          <ListItem key={ index } button component={ "li" }>
            <Link to={ `/podcast/${ node.podcastSlug }` }
                  className={ classes.link }>
              <ListItemText
                primary={
                  <>
                    <Typography component={ "span" } variant={ "subtitle2" }
                                color={ "textPrimary" }>
                      { node.podcastTitle }
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography variant={ "body2" } component={ "span" }
                                color={ "textSecondary" }>
                      { trimmedString }
                    </Typography>
                  </>
                }/>
            </Link>
          </ListItem>
        )
      }) }
    </List>
  )
}