import React from "react";
import "./homepage.styles.scss";
import PlaylistCategory from "../../components/category-holder/category.component.jsx";
const Homepage = () => {
  const colors = ["#21D19F", "#FF499E", "#85C7F2"];
  return (
    <div className="homepage">
      <PlaylistCategory
        color={{ color: colors[Math.floor(Math.random() * 3)] }}
        category="new"
      />
    </div>
  );
};

export default Homepage;
