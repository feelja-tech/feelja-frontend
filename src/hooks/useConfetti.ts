import confetti from "canvas-confetti";
import { useEffect } from "react";

function fireConfetti(particleRatio, opts) {
  confetti({
    origin: { y: 0.7 },
    ...opts,
    particleCount: Math.floor(200 * particleRatio),
  });
}

export function useConfetti(disabled?: boolean): void {
  useEffect(() => {
    if (!disabled) {
      fireConfetti(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fireConfetti(0.2, {
        spread: 60,
      });
      fireConfetti(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fireConfetti(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fireConfetti(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [disabled]);
}

export default useConfetti;
