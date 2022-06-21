import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "./../redux/slices/filterSlice";

function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const activeCategory = useSelector(
    (state) => state.filterReducer.activeCategory
  );
  const dispatch = useDispatch();

  const categoriesList = categories.map((category, i) => {
    return (
      <li
        className={activeCategory === i ? "active" : ""}
        onClick={() => dispatch(setActiveCategory(i))}
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
