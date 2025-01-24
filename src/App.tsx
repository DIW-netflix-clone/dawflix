import { Suspense } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Client */}
          <Route index element={<Home />} />
          <Route path="/films" element={<div>Films</div>} />
          <Route path="/series" element={<div>Series</div>} />
          <Route path="/categories" element={<div>Categories</div>} />

          {/* Auth */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
