import { useState } from 'react';

// LIFTING STATE FOR CASH CHART
function useChartUpdater() {
  const [cashChart, setCashChart] = useState(0);
  const [expenseChart, setExpenseChart] = useState(0);
  const [primaryChart, setPrimaryChart] = useState(0);

  return { cashChart, setCashChart, expenseChart, setExpenseChart, primaryChart, setPrimaryChart };
}

export default useChartUpdater;
