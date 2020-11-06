import React from "react";
//types
import {AnswerObject} from "../App"


type PropsType = {
    question : string;
    answers: string[];
    handleClickAnswer: (e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestion: number;

}

const QuestionCard: React.FC<PropsType> = ({question, answers, handleClickAnswer, userAnswer, questionNumber, totalQuestion}) =>  (
    <div>
        <p className="number">
            Question : {questionNumber} / {totalQuestion}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}}></p>
        {answers.map( answer =>(
            // no div here
            <div key={answer}>
            <button disabled={userAnswer? true: false} value={answer} onClick={handleClickAnswer}>
                <span dangerouslySetInnerHTML={{__html: answer}}></span>

            </button>
            </div>
        ))}

    </div>
    )
export default QuestionCard;