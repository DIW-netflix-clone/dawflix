import { Suspense } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";
import Profiles from "@/pages/Profiles";
import Detalles from "@/pages/Detalles";
import DiscoverLayout from "./layouts/DiscoverLayout";
import VideoPlayer from "@/components/video/VideoPlayer";
import Generos from "./pages/Generos";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Client */}
          <Route index element={<Home />} />
          <Route element={<DiscoverLayout />}>
            <Route path="/films" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/categories" element={<Generos />} />
            <Route path="/categories/:id" element={<div>Categories</div>} />
            <Route path="/detalles" element={<Detalles/>} />
          </Route>
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/video" element={<VideoPlayer />} />
          {/* Auth */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
