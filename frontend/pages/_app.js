import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#f0f0f0",
            border: "1px solid #2e2e2e",
            fontFamily: "DM Sans, sans-serif",
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
