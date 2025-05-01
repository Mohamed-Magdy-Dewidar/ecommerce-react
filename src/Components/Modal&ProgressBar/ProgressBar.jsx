import  { useEffect, useState } from 'react'
let timeUntilErase = 3000;
const ProgressBar = () => {
  const [remainingTime, setremainingTime] = useState(timeUntilErase);
  useEffect(() => {
    const interval = setInterval(()=>{
       setremainingTime(prevTime => prevTime -10);
    },10);


    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);


  return (
    <progress className="progress-bar" value={remainingTime} max={timeUntilErase} />
  )
}

export default ProgressBar