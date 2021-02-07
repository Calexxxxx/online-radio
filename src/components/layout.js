import React from "react"
import PropTypes from "prop-types"
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles"
import { Header } from "./Header"
import CssBaseline from "@material-ui/core/CssBaseline"
import { UpdateButton } from "./UpdateButton"

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e7fab",
      light: "#5daedd",
      dark: "#00537c"
    },
    secondary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b"
    }
  },
  typography: {
    body1: {
      fontFamily: "\"Roboto\", sans-serif",
      fontWeight: 300,
      fontSize: 18
    },
    body2: {
      fontFamily: "\"Roboto\", sans-serif",
      fontWeight: 200,
      fontSize: 14
    },
    subtitle1: {
      fontFamily: "\"Roboto\", sans-serif",
      fontWeight: 300,
      fontSize: 22
    },
    subtitle2: {
      fontFamily: "\"Roboto\", sans-serif",
      fontWeight: 200,
      fontSize: 20
    },
    button: {
      fontFamily: "\"Roboto\", sans-serif",
      fontWeight: 300,
      fontSize: 18
    },
    h1: {
      fontFamily: "\"Source Sans Pro\", sans-serif",
      fontWeight: 400
    },
    h2: {
      fontFamily: "\"Source Sans Pro\", sans-serif",
      fontWeight: 400
    },
    h3: {
      fontFamily: "\"Source Sans Pro\", sans-serif",
      fontWeight: 400
    },
    h4: {
      fontFamily: "\"Source Sans Pro\", sans-serif",
      fontWeight: 400
    },
    h5: {
      fontFamily: "\"Source Sans Pro\", sans-serif",
      fontWeight: 400
    },
    h6: {
      fontFamily: "\"Source Sans Pro\", sans-serif",
      fontWeight: 400
    }
  },
  props: {
    MuiToolbar: {
      variant: "regular"
    }
  }
})
theme = responsiveFontSizes(theme)

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <UpdateButton/>
      <Header/>
      <main>{ children }</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
