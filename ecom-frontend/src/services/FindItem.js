import items from "../SampleDb/items";
import React from "react";

const FindItem = (id) => {
  const item = items.find((i) => i.id === Number(id));
  return item;
};

export default FindItem;
