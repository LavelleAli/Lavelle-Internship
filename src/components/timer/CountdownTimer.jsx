import React from 'react'

const CountdownTimer = () => {


    function getTimeLeft(expiryDate) {
  const diff = expiryDate - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  const { hours, minutes, seconds } = timeLeft;
  return (
    <div className="de_countdown">
      {String(hours).padStart(2, "0")}h &nbsp;
      {String(minutes).padStart(2, "0")}m &nbsp;
      {String(seconds).padStart(2, "0")}s
    </div>
  );
}

  return (
    <div>
      
    </div>
  )
}

export default CountdownTimer
