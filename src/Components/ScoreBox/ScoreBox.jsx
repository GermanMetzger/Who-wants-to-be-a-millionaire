import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ScoreBox.css";

export default function ScoreBox({ score }) {
  const numberRef = useRef(null);

  return (
    <div className="score-box-big"><div className="score-number" ref={numberRef}>Score: {score}</div></div>
  );
}