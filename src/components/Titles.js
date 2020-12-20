import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
const Titles = (props) => (
  <div style={{ border: "2px solid", padding: "10px" }}>
    <div className="row QuoteText">
      <p className="">
        <b>Quote of the Day</b>
      </p>
      <div>
        <h3 className="title-container__subtitle">
          {props.quote ? props.quote : "Loading..."}
        </h3>
        <p className="float-right">
          <b> - {props.author}</b>
        </p>
      </div>
    </div>
    <div className="row float-right">
      <FacebookShareButton
        url={"https://api.quotable.io/"}
        hashtag="#QuoteOfTheDay"
        quote={props.quote ? props.quote : ""}
      >
        <FacebookIcon size={36} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={"https://api.quotable.io/"}
        separator=":: "
        title={props.quote ? props.quote : ""}
      >
        <WhatsappIcon size={36} round />
      </WhatsappShareButton>
      <TwitterShareButton
        url={"https://api.quotable.io/"}
        title={props.quote ? props.quote : ""}
        hashtag="#QuoteOfTheDay"
      >
        <TwitterIcon size={36} round />
      </TwitterShareButton>
    </div>
  </div>
);

export default Titles;
