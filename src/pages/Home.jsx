import React from "react";
import { useNavigate } from "react-router-dom";
import BannerHome from "../components/home/BannerHome";
import HomeCategoryList from "../containers/home/HomeCategoryList";
import HomeFeaturedProductList from "../containers/home/HomeFeaturedProductList";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <main>
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-primary/10 to-primary/40 gap-4">
          <BannerHome />
          <HomeCategoryList />
          <HomeFeaturedProductList />
        </div>
      </main>
    </div>
  );
}
