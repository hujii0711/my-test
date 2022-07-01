import React, { useState, useEffect } from 'react';
import Timer from './Timer';

//useEffect cleanUp 기능
function App() {
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    console.log('showTimer====', showTimer);
  }, [showTimer]);

  return (
    <div>
      {/* Timer 컴포넌트가 마운트 언마운트 토글 기능 */}
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
  );
}

export default App;
