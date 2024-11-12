
import React, {useState} from 'react';

const Counter = () => {
  const [likes, setState] = React.useState(0)
  const  ink = () => {setState(likes + 1)   }
  const  dekr = () => {setState(likes - 1)   }
  
  return (
    <div className="counter">
      <h2>{likes}</h2>
      <button onClick={ink}>Inkrement</button>
      <button onClick={dekr}>Decrement</button>
    </div>
  );
};
export default Counter;
  