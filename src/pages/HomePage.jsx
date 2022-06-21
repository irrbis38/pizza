import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "./../components/Pagination/Pagination";
import { SearchContext } from "./../App";
import { useSelector } from "react-redux";

const sortList = [
  { name: "популярные", sortType: "range", direction: "desc" },
  { name: "дешёвые", sortType: "price", direction: "asc" },
  { name: "дорогие", sortType: "price", direction: "desc" },
  { name: "по алфавиту", sortType: "title", direction: "asc" },
];

function HomePage() {
  const { activeCategory, selectedSortType } = useSelector(
    (state) => state.filterReducer
  );

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pageNumber, setPageNumber] = React.useState(1);

  const pizzasPerPage = `page=${pageNumber}&limit=4`;
  const changePage = (number) => {
    setPageNumber(number);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://61fa2a3031f9c2001759668d.mockapi.io/items?${pizzasPerPage}${
        activeCategory > 0 ? `&filter=category${activeCategory}` : ""
      }&sortBy=${sortList[selectedSortType].sortType}&order=${
        sortList[selectedSortType].direction
      }`
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
        <Categories />
        <Sort sortList={sortList} />
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
