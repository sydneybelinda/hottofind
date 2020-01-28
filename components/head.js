import NextHead from "next/head";
import { string } from "prop-types";
import React from "react";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

function Head(props) {
  const meta = props.meta || "";

  const title = meta.title || "";
  const description = meta.description || "";

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:600,700,800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Calistoga&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Lora&display=swap"
        rel="stylesheet"
      ></link>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />

      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ""} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  );
}

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
