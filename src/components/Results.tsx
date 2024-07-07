import { Component } from "react";
import style from "./Results.module.css";

interface Props {
  results: Array<{
    name: string;
    status: string;
    species: string;
    image: string;
  }>;
  noResults: boolean;
}

class Results extends Component<Props> {
  render() {
    return (
      <div className={style.results}>
        {this.props.noResults ? (
          <p className={style.noResult}>No characters found.</p>
        ) : (
          this.props.results.map((result, index) => (
            <div className={style.card} key={index}>
              <img src={result.image} alt={result.name} />

              <h3>{result.name}</h3>
              <p>Status: {result.status}</p>
              <p>Species: {result.species}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Results;
