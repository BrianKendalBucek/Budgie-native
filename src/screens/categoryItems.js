import { useState } from 'react';

const useCategoryItems = () => {
  const [categoryItems, setCategoryItems] = useState([]);

  console.log("useCategoryItemsHook: ", categoryItems);
  return { categoryItems, setCategoryItems };
};


export default useCategoryItems;