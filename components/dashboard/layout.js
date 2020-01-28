import Head from 'next/head'
import React from 'react'

function Layout(props) {
  const meta = props.meta || "";

  const title = meta.title || "HotToFind Local Classifieds";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: #333;
          background-color: #f3f3f3 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }

        .fine-uploader-dropzone-container {
          background: transparent !important;
        }

        span.react-fine-uploader-gallery-dropzone-content {
          display: none;
        }
        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
