import React from "react";
//types
import {AnswerObject} from "../App"
import {Wrapper, ButtonWrapper} from "./QuestionCardComponent.styles"


type PropsType = {
    question : string;
    answers: string[];
    handleClickAnswer: (e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestion: number;

}

const QuestionCard: React.FC<PropsType> = ({question, answers, handleClickAnswer, userAnswer, questionNumber, totalQuestion}) =>  (
    <Wrapper>
        <p className="number">
            Question : {questionNumber} / {totalQuestion}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}}></p>
        {answers.map( answer =>(
            <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
            <button disabled={userAnswer? true: false} value={answer} onClick={handleClickAnswer}>
                <span dangerouslySetInnerHTML={{__html: answer}}></span>

            </button>
            </ButtonWrapper>
        ))}

    </Wrapper>
    )
export default QuestionCard;