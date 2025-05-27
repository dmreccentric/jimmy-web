import "./index.css";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/about";
import Services from "./pages/services";
import Menus from "./pages/menus";
import Orders from "./pages/orders";
import ContactMe from "./pages/contact_me";
import "swiper/css";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/contact_me",
    element: <ContactMe />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
