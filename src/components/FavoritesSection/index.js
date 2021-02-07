import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Typography } from "@material-ui/core"
import Img from "gatsby-image"
import Divider from "@material-ui/core/Divider"
import { Link } from "gatsby"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  logo: {
    maxWidth: "75px",
    minWidth: "75px",
    maxHeight: "75px",
    width: "100%",
    marginRight: theme.spacing(2),
    flexGrow: 1
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

export const FavoritesSection = ({ favorites }) => {
  const classes = useStyles()

  return (
    <List className={ classes.root }>
      <ListItem className={ classes.header }>
        <Typography variant={ "h5" } component={ "h2" } color={ "primary" }>
          Favorites
        </Typography>
      </ListItem>
      { favorites.length ? favorites.map((fav, index) => {

        return (
          <ListItem key={ index } button component={ "li" }>
            <Link to={ `/station/${ fav.slug }` } className={ classes.link }>
              <Img fluid={ fav.logo } className={ classes.logo }/>
              <ListItemText primary={ fav.title }
                            secondary={ fav.country }/>
            </Link>
          </ListItem>
        )
      }) : (
        <ListItem>
          <ListItemText primary={ "No Favorites" }
                        secondary={ "Add some to your list" }/>
        </ListItem>
      ) }
    </List>
  )
}