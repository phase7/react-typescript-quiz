import React, {useState} from 'react';
import {fetchQuizQuestions} from './API'
//components
import QuestionCard from "./components/QuestionCardComponent"; 
//types
import {Difficulty, QuestionState} from "./API"

export type AnswerObject = {
  question : string;
  answer : string;
  correct: boolean;
  correctAnswer: string;
}
function App() {

  let TOTAL_QUESTIONS = 10;


  // states and setStates
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score,  setScore] = useState(0)
  const [gameover, setGameover] = useState(true)

  
  

  const startTrivia = async () => {
    //after clicking, let's start loading
    setLoading(true)
    setGameover(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM)
    setQuestions(newQuestions)

    // will error handle here, later
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    
    //stop loading
    setLoading(false)
  }
  
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement> ) => {
    if (!gameover) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () =>{
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameover(true)
    }
    else{
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <h1> Quick Quiz </h1>
      {gameover || userAnswers.length === TOTAL_QUESTIONS? <button className="start" onClick={startTrivia}>Start</button> : null}
      {!gameover && <p className="score">You've Scored: </p> }
      {loading && <p className="loading">Loading questions, please wait...</p>}

      {!loading && !gameover &&

      <QuestionCard questionNumber={number + 1} 
      totalQuestion={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers? userAnswers[number]:undefined}
      handleClickAnswer={checkAnswer}
      /> }
      {!gameover && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
    </div>
  );
}

export default App;
