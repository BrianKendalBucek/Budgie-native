import { useState } from 'react';

// LIFTING STATE FOR CASH CHART
function useChartUpdater() {
  const [cashChart, setCashChart] = useState(0);

  return { cashChart, setCashChart };
}

export default useChartUpdater;
