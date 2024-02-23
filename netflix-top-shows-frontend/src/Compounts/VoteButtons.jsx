import React from "react";
import { useSpring, animated } from 'react-spring';
import "./VoteButton.css";


function VoteButtons({ onVote, onRemoveVote, title, votes }) {
  const voteSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
  const removeVoteSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

  return (
    <div>
      <animated.button 
        style={voteSpring}
        onClick={() => onVote(title)}
        className="vote-button"
      >
        Add Vote
      </animated.button>
      <animated.button 
        style={removeVoteSpring}
        onClick={() => onRemoveVote(title)}
        className="remove-vote-button"
      >
        Remove Vote
      </animated.button>
      <p>Votes: {votes}</p>
    </div>
  );
}

export default VoteButtons;
