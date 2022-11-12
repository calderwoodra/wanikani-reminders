import React from "react";
import App from "next/app";
import Head from "next/head";

import "/styles/index.css";
import "/styles/tailwind.css";

export default class MyApp extends App {
  componentDidMount() {
    const comment = document.createComment("");
    document.insertBefore(comment, document.documentElement);
  }

  render() {
    const { Component, pageProps } = this.props;
    const description = "Get regular reminders about your WaniKani queue, sent to you via WhatsApp.";
    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          {/* Standard Metadata */}
          <title>WaniKani Reminders</title>
          <meta name="description" content={description} />
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
