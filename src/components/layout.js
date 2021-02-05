import React from "react"
import PropTypes from "prop-types"
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles"

let theme = createMuiTheme({})
theme = responsiveFontSizes(theme)

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={ theme }>
      <main>{ children }</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
