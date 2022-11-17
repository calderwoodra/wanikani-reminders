import React, { useState } from "react";
import App from "next/app";
import Head from "next/head";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import "/styles/index.css";
import "/styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const description = "Get regular reminders about your WaniKani queue, sent to you via WhatsApp.";
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Standard Metadata */}
        <title>WaniKani Reminders</title>
        <meta name="description" content={description} />
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </React.Fragment>
  );
}

export default MyApp;
