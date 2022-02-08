import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";


// Data Menus

const App = () => {
  const [carts, setCarts] = useState([]);
  const addToCart = (menu) => {
    setCarts((oldCart)=>{
      return[...oldCart, menu]
    });
  }
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    alanBtn({
      key: '292458f0490a1262656ffc5d0a5405182e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getMenu') {
          // Call the client code that will react to the received command
          setMenus(commandData.data);
        }
        else if (commandData.command === 'addToCart') {
          if (commandData.data !== 'undefinied') {
            addToCart(commandData.data)
          }
        }
      }
    });
  }, [])
  return (
    <div>
      <h2>Menus</h2>
      {menus.length > 0 && (
        menus.map((menu, i) => (
          <li key={i}> {menu.name} - ${menu.price} - {menu.category} <button onClick={(e) => {
            e.preventDefault();
            addToCart(menu)
          }}>add to cart</button> </li>
        ))
      )}
      <h2>Cart</h2>
      {carts.length > 0 && (
        carts.map((cart, i) => (
          <li key={i}> {cart.name} - ${cart.price} - {cart.category} </li>
        ))
      )}
    </div>
  )
}
export default App;