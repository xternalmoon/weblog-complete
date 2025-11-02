import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiEffect = () => {
  const { width, height } = useWindowSize();

  const numberOfPieces = width > 768 ? 400 : 300; // Fewer pieces on smaller screens
  const gravity = width > 768 ? 0.2 : 0.1;        // Adjust gravity for smaller screens

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={numberOfPieces}
      gravity={gravity}
      wind={0.03}
      tweenDuration={2500}
    />
  );
};

export default ConfettiEffect;
