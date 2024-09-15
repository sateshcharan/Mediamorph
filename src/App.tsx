import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";
import { FileContextProvider } from "./store/FileContext";
import { Toaster } from "./components/ui/toaster"; // Import Toaster component

import Home from "./pages/Home";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NavLayout from "./routes/NavLayout";

const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FileContextProvider>
        <RouterProvider router={router} />
        <Toaster /> {/* Ensure this is placed at the root level */}
      </FileContextProvider>
    </ThemeProvider>
  );
}

export default App;
