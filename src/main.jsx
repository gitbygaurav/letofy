import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LetterRouter from "./components/LetterRouter";
import SendLetter from "./components/SendLetter.jsx";
import Terms from "./pages/Terms.jsx";
import LetterSended from "./pages/LetterSended.jsx";
import ReceiveLetter from "./pages/ReceiveLetter.jsx";
// import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        // Check for updates when the page loads
        registration.update();

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * 60); // Check every hour

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, reload the page
              window.location.reload();
            }
          });
        });
      })
      .catch((error) => {
        console.log("SW registration failed:", error);
      });
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/send/:id",
        element: <SendLetter />,
      },
      {
        path : "/letter-sended",
        element : <LetterSended/>
      },
      {
        path : "/receive-letter",
        element : <ReceiveLetter/>
      },
      {
        path: "/:id",
        loader: ({ params }) => {
          if (params.id.endsWith("re")) {
            return { type: "receive" };
          }
          if (params.id.endsWith("sd")) {
            return { type: "send" };
          }
          throw new Error("Invalid letter ID");
        },
        element: <LetterRouter />,
        errorElement: <Navigate to="/" replace />,
      },
      // {
      //   path: "/privacy-policy",
      //   element: <PrivacyPolicy />,
      // },
      {
        path: "/terms",
        element: <Terms />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
