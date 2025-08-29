import React,{ StrictMode } from "react"
import { createRoot } from "react-dom/client";
import './index.css';
import App from "./App.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
import { ClerkProvider } from "@clerk/clerk-react";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClient,QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider.jsx";
import * as Sentry from "@sentry/react";

const queryClient = new QueryClient();
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
Sentry.init({
  dsn: "https://84c1c2dc5f351aa171b3b8c73e08bc07@o4509891988029440.ingest.us.sentry.io/4509927527415808",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <App />
        </AuthProvider>
        <Toaster position="top-right"/ >
        </QueryClientProvider>
        </BrowserRouter>
      </ClerkProvider>
  </StrictMode>,
)
