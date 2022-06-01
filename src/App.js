import React from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://61fa2a3031f9c2001759668d.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const pizzasList = items.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{pizzasList}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
