import { useEffect, useState } from "react";
import axios from "axios";
import FlipCard from "./SingleCard";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    axios.get("/get-all-cards").then(({ data }) => {
      setCards(data);
    });
  }, []);

  const handleNext = () => {
    setFlipped(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  return (
    <div className="flex flex-col items-center">
      {cards.length > 0 && (
        <>
          <div className="relative w-full max-w-md overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${-currentIndex * 100}%)`,
                width: `${cards.length * 100}%`,
              }}
            >
              {cards.map((card, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <FlipCard
                    question={card.question}
                    answer={card.answer}
                    flipped={currentIndex === index && flipped}
                    setFlipped={setFlipped}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-4 mr-16">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
