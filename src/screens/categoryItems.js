import { useState } from 'react';

// FOR LIFTING STATE TO PASS CATEGORIES LIST TO EXPENDITURES CATEGORY PICKER
const useCategoryItems = () => {
  const [categoryItems, setCategoryItems] = useState([]);

  // console.log("useCategoryItemsHook: ", categoryItems);

  return { categoryItems, setCategoryItems };
};

export default useCategoryItems;