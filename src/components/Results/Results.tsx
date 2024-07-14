import React from "react";
import style from "./Results.module.css";
import { Card } from "../../types.ts";

interface Props {
  results: Card[];
  noResults: boolean;
  onCardClick: (card: Card) => void;
}

const Results: React.FC<Props> = ({ results, noResults, onCardClick }) => {
  return (
    <div className={style.results}>
      {noResults ? (
        <p className={style.noResult}>No characters found.</p>
      ) : (
        results.map((result, index) => (
          <div
            className={style.card}
            key={index}
            onClick={() => onCardClick(result)}
          >
            <img src={result.image} alt={result.name} />
            <h3>{result.name}</h3>
            <p>Status: {result.status}</p>
            <p>Species: {result.species}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
