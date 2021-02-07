import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles } from "@material-ui/styles"

const UPDATE_CHECKING_INTERVAL = 30 * 60 * 1000 // Check for updates every 30
                                                // minutes

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}))

export const UpdateButton = () => {
  const [ buttonState, setButtonState ] = useState({
    showButton: false,
    updateHandler: ""
  })

  useEffect(() => {
    registerServiceWorker()
  })

  const registerServiceWorker = () => {
    if (
      typeof window === "undefined" ||
      typeof navigator === "undefined" ||
      !navigator.serviceWorker
    ) {
      return
    }

    navigator.serviceWorker.register("/sw.js").then(reg => {
      if ( !navigator.serviceWorker.controller ) {
        return
      }

      // Check for SW update every X ms
      setInterval(() => {
        reg.update()
      }, UPDATE_CHECKING_INTERVAL)

      if ( reg.waiting ) {
        updateReady(reg.waiting)
      } else if ( reg.installing ) {
        trackInstalling(reg.installing)
      } else {
        reg.addEventListener("updatefound", () => {
          trackInstalling(reg.installing)
        })
      }
    })

    navigator.serviceWorker.addEventListener("controllerchange", (event) => {
      if ( event.refreshing ) return
      event.refreshing = true
      window.location.reload()
    })
  }

  const trackInstalling = worker => {
    worker.addEventListener("statechange", () => {
      if ( worker.state === "installed" ) {
        updateReady(worker)
      }
    })
  }

  const updateReady = worker => {
    setButtonState({
      showButton: true,
      updateHandler: () => {
        setButtonState({ showButton: false })
        // Tell the service worker to skipWaiting
        worker.postMessage({ action: "skipWaiting" })
      }
    })
  }

  const handleUpdate = () => {
    if ( typeof buttonState.updateHandler === "function" ) {
      buttonState.updateHandler()
    }
  }

  const handleClose = (event, reason) => {
    if ( reason === "clickaway" ) {
      return
    }

    setButtonState({ showButton: false })
  }

  if ( !buttonState.showButton ) return null

  const classes = useStyles()
  return (
    <Snackbar
      anchorOrigin={ {
        vertical: "bottom",
        horizontal: "left"
      } }
      open={ buttonState.showButton }
      onClose={ handleClose }
      message="There is a new version of Online Radio Streams"
      className={ classes.root }
      action={
        <React.Fragment>
          <Button onClick={ handleUpdate } type='button' variant={ "outlined" }
                  color={ "primary" } className={ classes.button }>
            Update
          </Button>
          <IconButton size="small" aria-label="close" color="inherit"
                      onClick={ handleClose }>
            <CloseIcon fontSize="small"/>
          </IconButton>
        </React.Fragment>
      }
    />

  )
}