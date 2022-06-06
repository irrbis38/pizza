import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

function HomePage() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);

  const changeCategoryHandler = (i) => {
    setActiveCategory(i);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://61fa2a3031f9c2001759668d.mockapi.io/items${
        activeCategory > 0 ? `?category=${activeCategory}` : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory]);

  const pizzasList = items.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletonList = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          changeCategoryHandler={changeCategoryHandler}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonList : pizzasList}
      </div>
    </>
  );
}

export default HomePage;
