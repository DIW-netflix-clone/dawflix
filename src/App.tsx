import { Suspense } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";
import Profiles from "@/pages/Profiles";
import DiscoverLayout from "./layouts/DiscoverLayout";

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
            <Route path="/categories" element={<div>Categories</div>} />
          </Route>
          <Route path="/profiles" element={<Profiles />} />
          {/* Auth */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
