import React from "react";

import PlaylistCategory from "../../components/category-holder/category.component.jsx";
const Homepage = () => {
  const colors = ["#21D19F", "#FF499E", "#85C7F2"];
  return (
    <div className="homepage">
      <PlaylistCategory
        color={{ color: colors[Math.floor(Math.random() * 3)] }}
      />
      <PlaylistCategory
        color={{
          color: colors[Math.floor(Math.random() * 3)],
        }}
      />
    </div>
  );
};

export default Homepage;
