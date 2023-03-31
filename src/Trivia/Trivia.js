import React, { useState } from 'react';
import useTrivia from './useTrivia';
import './Trivia.css'
import loadingLogo from'./loading-gif.gif'



function Trivia() {
  const {data, loading} = useTrivia();
  const [count, setCount] = useState(1); 
  const [score, setScore] = useState(0);
  const [testOver, setTestOver] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  let btnClick = () => {
    setTestOver(false)
    setCount(1)
    setCurrentQuestionIndex(1)
    setScore(0)
  }
  const Barchasi = () => {
    
    let answer = data.results[count].incorrect_answers;
    let answers = Object.assign([], answer)
    answers.push(data.results[count].correct_answer)

    function handleAnswerClick(answer) {
      setCount((count) => count + 1)
      if (answer === data.results[count].correct_answer) {
        setScore(score + 1);
      }
  
      if (currentQuestionIndex === data.results.length -2) {
        setTestOver(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      console.log(currentQuestionIndex);
      console.log(data.results.length-1);
      console.log(testOver);
    }

    const shuffleAnswer = shuffle(answers);

    if (testOver) {
      return (
        <div className='over'>
          <div className='question'><h1>Test Over!</h1></div>
          <p>Your score: {score}</p>
          <button onClick={btnClick}> Try again</button>
        </div>
      );
    }

    return (
      <div>
      <div className='question'>
      <h1> {count} : {data.results[count].question}</h1>
      </div>
      <ul>
        {shuffleAnswer.map((item) => {
          return <li>
                    <button  onClick={() => handleAnswerClick(item)}>{item}</button> 
                 </li>
        })}
      </ul>
      <p className='score'>score: {score}</p>
    </div>
    )

  }


  
  return (
    
    <div>
       { loading ? <div className='loading'><img src={loadingLogo} alt="loading"/></div> 
                 : Barchasi()
       }
    </div>
   
  );

  function shuffle(arr) {
    let currentIndex = arr.length;
    let a;
    let b;
  
    while (currentIndex !== 0) {
      b = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      a = arr[currentIndex];
      arr[currentIndex] = arr[b];
      arr[b] = a;
    }
    return arr;
  }

}

export default Trivia;