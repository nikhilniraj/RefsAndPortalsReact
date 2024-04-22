import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const timeRemaining = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  //Thid hook used to expose function,vaiable from one components to another. here dialog open() function is exposed
  //which is opening dialog from (dialog tag)
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost!</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{timeRemaining}</strong> seconds
        left.
      </p>
      <form>
        <button className="dialog" onSubmit={onReset}>
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
