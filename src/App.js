import "./index.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/about";
import Services from "./pages/services";
import Menus from "./pages/menus";
import Orders from "./pages/orders";
import ContactMe from "./pages/contact_me";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LetsLogin";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalContextProvider from "./components/Context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <LoginPage />, // ⛔ Public route
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <AboutUs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/menus",
    element: (
      <ProtectedRoute>
        <Menus />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact_me",
    element: (
      <ProtectedRoute>
        <ContactMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <GlobalContextProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    </GlobalContextProvider>
  );
}

export default App;
