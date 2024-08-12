import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import { store } from "./state/store.ts";

import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./index.css";

Sentry.init({
	dsn: "https://07ebd0ed2ade41990b8923ee3a632594@o4507731807698944.ingest.us.sentry.io/4507731811172352",
	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.browserProfilingIntegration(),
		Sentry.replayIntegration(),
	],
	// Performance Monitoring
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: [
		"localhost",
		/^https:\/\/predictbeta\.com/,
		/^https:\/\/predict-hrded74ysa-uc.a.run.app/,
	],
	// Set profilesSampleRate to 1.0 to profile every transaction.
	// Since profilesSampleRate is relative to tracesSampleRate,
	// the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
	// For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
	// results in 25% of transactions being profiled (0.5*0.5=0.25)
	profilesSampleRate: 1.0,
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
		<ToastContainer limit={3} theme="colored" hideProgressBar />
	</React.StrictMode>
);
