import { useState } from 'react';

export default function ErrorButton() {
  const [shouldCrash, setShouldCrash] = useState(false);

  const handleClick = () => {
    setShouldCrash(true);
  };

  if (shouldCrash) {
    throw new Error('Test crash from ErrorButton');
  }
  return (
    <button className="error-btn" onClick={handleClick}>
      Test Error
    </button>
  );
}
