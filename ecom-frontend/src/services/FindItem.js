import React from "react";
import { useState, useEffect } from "react";
import { getProducts, GetProductById } from "./api/services";

const FindItem = (id) => {
  const item = GetProductById(id);
  console.log(item);
  return item;
};

export default FindItem;
