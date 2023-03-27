import { useState } from 'react';

// LIFTING STATE FOR CASH CHART
function useBudget() {
  const [budget, setBudget] = useState(0);
  const [primaryDefault, setPrimaryDefault] = useState(0);
  const [secondaryDefault, setSecondaryDefault] = useState(0);

  return { budget, setBudget, primaryDefault, setPrimaryDefault, secondaryDefault, setSecondaryDefault };
}

export default useBudget;
