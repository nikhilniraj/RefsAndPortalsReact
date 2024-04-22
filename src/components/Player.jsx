import { useState, useRef } from "react";

export default function Player() {
  const playrName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playrName.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playrName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
