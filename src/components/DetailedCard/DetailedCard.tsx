import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCardDetails } from "../../api/api.tsx";
import style from "./DetailedCard.module.css";
import { Card } from "../../types.ts";

const DetailedCard: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = cardId ? parseInt(cardId, 10) : null;

    if (id && !isNaN(id)) {
      setIsLoading(true);
      fetchCardDetails(id)
        .then((data) => {
          setCard(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching details:", error);
          setIsLoading(false);
          // Опціонально, обробіть стан помилки або перенаправлення тут
        });
    } else {
      console.error("Invalid or missing card ID:", cardId);
      setIsLoading(false);
    }
  }, [cardId]);

  const handleClose = () => {
    setCard(null); // Очищення стану картки перед закриттям
    navigate("/"); // Повернення на попередню сторінку
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!card) {
    return <p>No details available.</p>;
  }

  return (
    <div className={style.detailedCard}>
      <button className={style.closeButton} onClick={handleClose}>
        Close
      </button>
      <img src={card.image} alt={card.name} className={style.image} />
      <h2>{card.name}</h2>
      <p>Status: {card.status}</p>
      <p>Species: {card.species}</p>
      <p>Origin: {card.origin}</p>
      <p>Location: {card.location}</p>
      <p>Gender: {card.gender}</p>
    </div>
  );
};

export default DetailedCard;
