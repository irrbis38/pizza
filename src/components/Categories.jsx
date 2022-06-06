import React from "react";

function Categories({ activeCategory, changeCategoryHandler }) {
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
        onClick={() => changeCategoryHandler(i)}
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
