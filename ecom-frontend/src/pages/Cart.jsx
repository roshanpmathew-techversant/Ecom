import React from "react";
import { useState, useEffect } from "react";
import {
  currentUser,
  RemoveFromCart,
  AddtoCart,
} from "../services/api/services";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";
const Cart = () => {
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState();
  const logged = Boolean(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await currentUser();
        if (fetchedUser) setUser(fetchedUser);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const cartitems = user?.cart || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full items-center justify-center flex flex-col mt-10">
        {" "}
        {cartitems.length === 0 ? (
          <h1>No items In Cart</h1>
        ) : (
          cartitems.map((item) => (
            <div
              key={item.product}
              className="w-[50%] flex flex-col gap-2 items-center justify-center "
            >
              <CartItem product={item.product} quantity={item.quantity} />
            </div>
          ))
        )}
      </div>
      <Checkout items={cartitems} />
    </div>
  );
};

export default Cart;
