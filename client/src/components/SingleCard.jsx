import { useEffect } from "react";

const FlipCard = ({ question, answer, flipped, setFlipped }) => {
  useEffect(() => {
    setFlipped(false);
  }, [question, answer, setFlipped]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="w-96 h-[30rem] cursor-pointer" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute text-center w-full h-full flex flex-col gap-2 items-center text-white text-2xl justify-center rounded-lg p-4 backface-hidden"
          style={{
            background: "linear-gradient(135deg, #00008B 30%, #021526 70%)",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
            border: "4px solid #ffffff",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
          }}
        >
          {question}
          <h2 className="text-sm text-gray-200">(Click for answer)</h2>
        </div>
        {/* Back Side */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded-lg p-4 transform rotate-y-180 backface-hidden"
          style={{
            background: "linear-gradient(315deg, #00008B 30%, #021526 70%)",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
            border: "4px solid #ffffff",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            className="whitespace-pre-wrap text-white text-xl font-sans"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
