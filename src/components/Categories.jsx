import React from "react";

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const categoriesList = categories.map((category, i) => {
    return (
      <li
        className={activeCategory === i ? "active" : ""}
        onClick={() => setActiveCategory(i)}
        key={i}
      >
        {category}
      </li>
    );
  });
  return (
    <div className="categories">
      <ul>{categoriesList}</ul>
    </div>
  );
}

export default Categories;
