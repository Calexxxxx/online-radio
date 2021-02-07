import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Drawer from "@material-ui/core/Drawer"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MoreIcon from "@material-ui/icons/MoreVert"
import { Link } from "gatsby-theme-material-ui"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff"
  },
  toolBar: {
    maxWidth: 1920,
    margin: "0 auto ",
    width: "100%"
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logo: {
    maxWidth: "200px"
  },
  menuItem: {
    padding: theme.spacing(2),
    minHeight: "62px",
    display: "flex",
    placeItems: "flex-end",
    borderBottom: "2px solid",
    borderWidth: "0%",
    transition: "all 300ms ease-in-out",
    borderBottomColor: "transparent",
    fontSize: "18px",
    textDecoration: "none !important",
    color: theme.palette.background.paper
  },
  menuItemActive: {
    borderWidth: "100%",
    borderBottomColor: "#caefff",
    color: "#caefff"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "block",
    paddingLeft: theme.spacing(2),
    color: "#ffffff"
  },
  inputRoot: {
    color: "inherit"
  },
  sectionDesktop: {
    display: "none",
    [ theme.breakpoints.up("md") ]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [ theme.breakpoints.up("md") ]: {
      display: "none"
    }
  },
  list: {
    width: 300
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
    width: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}))

export const Header = () => {
  const classes = useStyles()

  const [ state, setState ] = useState({
    right: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if ( event.type === "keydown" && (event.key === "Tab" || event.key === "Shift") ) {
      return
    }

    setState({ ...state, [ anchor ]: open })
  }


  const mobileMenuId = "mobile-menu"

  const list = (anchor) => (
    <nav
      className={ classes.drawer }
      role="presentation"
      onClick={ toggleDrawer(anchor, false) }
      onKeyDown={ toggleDrawer(anchor, false) }
      id={ mobileMenuId }
    >
      <Typography variant={ "body2" }>
        <Link to={ "/" } className={ classes.menuItem }
              activeClassName={ classes.menuItemActive }>{ `Home` }</Link>
      </Typography>
      <Typography variant={ "body2" }>
        <Link to={ "/countries" }
              className={ classes.menuItem }
              activeClassName={ classes.menuItemActive }>{ `Countries` }</Link>
      </Typography>
      <Typography variant={ "body2" }>
        <Link to={ "/genres" }
              className={ classes.menuItem }
              activeClassName={ classes.menuItemActive }>{ `Genres` }</Link>
      </Typography>
      <Typography variant={ "body2" }>
        <Link to={ "/podcasts" }
              className={ classes.menuItem }
              activeClassName={ classes.menuItemActive }>{ `Podcasts` }</Link>
      </Typography>
      <Typography variant={ "body2" }>
        <Link to={ "/favorites" }
              className={ classes.menuItem }
              activeClassName={ classes.menuItemActive }>{ `Favorites` }</Link>
      </Typography>
    </nav>

  )

  const renderMobileMenu = (
    <Drawer anchor={ "right" } open={ state[ "right" ] }
            onClose={ toggleDrawer("right", false) }>
      { list("right") }
    </Drawer>
  )

  return (
    <div className={ classes.grow }>
      <AppBar className={ classes.appBar } elevation={ 0 }>
        <Toolbar variant={ "dense" } className={ classes.toolBar }>
          <Typography variant={ "subtitle1" } component={ "h1" }>
            <Link to={ "/" }
                  className={ classes.title }>Online Radio Streams</Link>
          </Typography>
          <div className={ classes.grow }/>
          <div className={ classes.sectionDesktop }>
            <nav className={ classes.navBar }>
              <Typography variant={ "body2" }>
                <Link to={ "/" }
                      className={ classes.menuItem }
                      activeClassName={ classes.menuItemActive }>{ `Home` }</Link>
              </Typography>
              <Typography variant={ "body2" }>
                <Link to={ "/countries" }
                      className={ classes.menuItem }
                      activeClassName={ classes.menuItemActive }>{ "Countries" }</Link>
              </Typography>
              <Typography variant={ "body2" }>
                <Link to={ "/genres" }
                      className={ classes.menuItem }
                      activeClassName={ classes.menuItemActive }>{ "Genres" }</Link>
              </Typography>
              <Typography variant={ "body2" }>
                <Link to={ "/podcasts" }
                      className={ classes.menuItem }
                      activeClassName={ classes.menuItemActive }>{ `Podcasts` }</Link>
              </Typography>
              <Typography variant={ "body2" }>
                <Link to={ "/favorites" }
                      className={ classes.menuItem }
                      activeClassName={ classes.menuItemActive }>{ "Favorites" }</Link>
              </Typography>
            </nav>
          </div>
          <div className={ classes.sectionMobile }>
            <IconButton
              aria-label="menu"
              aria-controls={ mobileMenuId }
              aria-haspopup={ true }
              aria-expanded={ state.right !== false }
              onClick={ toggleDrawer("right", true) }
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu }
    </div>
  )
}