import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "./../components/Pagination/Pagination";
import { SearchContext } from "./../App";

const sortList = [
  { name: "популярности", sortType: "range" },
  { name: "цене", sortType: "price" },
  { name: "алфавиту", sortType: "title" },
];

function HomePage() {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [selectedSortType, setSelectedSortType] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  const changeCategoryHandler = (i) => {
    setActiveCategory(i);
  };

  const changeSortTypeHandler = (i) => {
    setSelectedSortType(i);
  };

  const pizzasPerPage = `page=${pageNumber}&limit=4`;
  const changePage = (number) => {
    setPageNumber(number);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://61fa2a3031f9c2001759668d.mockapi.io/items?${pizzasPerPage}${
        activeCategory > 0 ? `&filter=category${activeCategory}` : ""
      }&sortBy=${sortList[selectedSortType].sortType}&order=desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, selectedSortType, pizzasPerPage]);

  const pizzasList = items
    .filter((pizza) => {
      if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

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
        <Sort
          selectedSortType={selectedSortType}
          changeSortTypeHandler={changeSortTypeHandler}
          sortList={sortList}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonList : pizzasList}
      </div>
      <div className="pagination">
        <Pagination itemsPerPage={4} amount={10} changePage={changePage} />
      </div>
    </>
  );
}

export default HomePage;
