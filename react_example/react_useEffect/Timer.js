import React, { useEffect } from 'react';

function Timer() {
  useEffect(() => {
    console.log('한번만 렌더링!!!!');

    const timer = setInterval(() => {
      console.log('타이머가 돌아가는 중...');
    }, 1000);

    // 컴포넌트가 언마운트(사라질때)시 실행
    return () => {
      clearInterval(timer);
      console.log('타이머가 종료되었습니다.');
    };
  }, []);

  return (
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요!!!</span>
    </div>
  );
}

export default Timer;
