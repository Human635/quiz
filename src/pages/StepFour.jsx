import React, { useState, useEffect } from "react";
import { Indicator } from "../components/Indicator";
import { NumericAnswerItem } from "../components/NumericAnswerItem";
import { AppButton } from "../components/AppButton";
import { Header } from "../components/Header";

const StepFour = ({ onGoNextPage }) => {
  const [userAns, setUserAns] = useState('')

  useEffect(() => {
    const rawUserData = localStorage.getItem('userRateData')
    if (rawUserData) {
      const { userAns } = JSON.parse(rawUserData)
      if (userAns) {
        setUserAns(userAns)
      }
    } 
  }, [])

  
  const submitForm = () => {
    const userRateData = {
      userAns: userAns
    }
    if (userAns) {
      localStorage.setItem('userRateData', JSON.stringify(userRateData))
    }

    onGoNextPage()
  }

  const answerOption = [
    {
      id: 'numeric-answer-1',
      answerText: 1
    },
    {
      id: 'numeric-answer-2',
      answerText: 2
    },
    {
      id: 'numeric-answer-3',
      answerText: 3
    },
    {
      id: 'numeric-answer-4',
      answerText: 4
    },
    {
      id: 'numeric-answer-5',
      answerText: 5
    }
  ]

  return (
    <div className="container">
      <div className="wrapper">
        <div className="emoji-quiz">
          <Indicator progress={4}/>
          <div className="question">
            <Header type="h2" headerText="4. Занимательный вопрос" />
            <ul className="level-variants">
              {answerOption.map(answerItem => (
                <NumericAnswerItem 
                  key={answerItem.id} 
                  id={answerItem.id} 
                  answerText={answerItem.answerText} 
                  isChecked={userAns === answerItem.id}
                  onChange={() => setUserAns(answerItem.id)}
                />
              ))}
            </ul>
            <AppButton 
              isDisabled={!userAns} 
              id="next-btn"
              buttonText="Завершить"
              type="submit"
              onClick={submitForm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepFour;
