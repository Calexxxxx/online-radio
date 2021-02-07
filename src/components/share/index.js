import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon
} from "react-share"
import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
}))

const Share = ({ socialConfig }) => {
  const classes = useStyles()
  return (
    <div className={ classes.wrapper }>
      <FacebookShareButton url={ socialConfig.config.url }
                           className="button is-outlined is-rounded facebook">
        <FacebookIcon size={ 30 }/>
      </FacebookShareButton>
      <TwitterShareButton url={ socialConfig.config.url }
                          className="button is-outlined is-rounded twitter"
                          title={ socialConfig.config.title }>
        <TwitterIcon size={ 30 }/>
      </TwitterShareButton>
      <LinkedinShareButton url={ socialConfig.config.url }
                           className="button is-outlined is-rounded linkedin"
                           title={ socialConfig.config.title }>
        <LinkedinIcon size={ 30 }/>
      </LinkedinShareButton>
      <RedditShareButton url={ socialConfig.config.url }
                         className="button is-outlined is-rounded reddit"
                         title={ socialConfig.config.title }>
        <RedditIcon size={ 30 }/>
      </RedditShareButton>
      <WhatsappShareButton url={ socialConfig.config.url }
                           className="button is-outlined is-rounded whatsapp"
                           title={ socialConfig.config.title }>
        <WhatsappIcon size={ 30 }/>
      </WhatsappShareButton>
    </div>
  )
}
export default Share