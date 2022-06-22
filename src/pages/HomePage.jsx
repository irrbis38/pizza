import React from "react";

import axios from "axios";

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
  const [totalItemsAmount, setTotalItemsAmount] = React.useState(0);

  const pizzasPerPage = `page=${pageNumber}&limit=6`;
  const changePage = (number) => {
    setPageNumber(number);
  };

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://61fa2a3031f9c2001759668d.mockapi.io/items?${
          searchValue ? `&search=${searchValue}` : ""
        }${
          activeCategory > 0 ? `&filter=category${activeCategory}` : ""
        }&sortBy=${sortList[selectedSortType].sortType}&order=${
          sortList[selectedSortType].direction
        }`
      )
      .then((res) => {
        setTotalItemsAmount(res.data.length);
      });

    axios
      .get(
        `https://61fa2a3031f9c2001759668d.mockapi.io/items?${pizzasPerPage}${
          searchValue ? `&search=${searchValue}` : ""
        }${
          activeCategory > 0 ? `&filter=category${activeCategory}` : ""
        }&sortBy=${sortList[selectedSortType].sortType}&order=${
          sortList[selectedSortType].direction
        }`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, selectedSortType, pizzasPerPage, searchValue]);

  const pizzasList = items.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletonList = [...new Array(4)].map((_, index) => (
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
        <Pagination
          itemsPerPage={6}
          amount={totalItemsAmount}
          changePage={changePage}
        />
      </div>
    </>
  );
}

export default HomePage;
