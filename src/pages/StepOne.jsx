import React, { useState, useEffect } from "react";
import { Indicator } from "../components/Indicator";
import { Header } from "../components/Header";
import { AppInput } from "../components/AppInput";
import { AppButton } from "../components/AppButton";

const StepOne = ({ onGoNextPage }) => {
  const [userAns, setUserAns] = useState(null)

  const [userAnsError, setUsernamAnsError] = useState(false)

  useEffect(() => {
    const rawUserData = localStorage.getItem('userAnsData')
    if (rawUserData) {
      const { userAns } = JSON.parse(rawUserData)
      if (userAns) {
        setUserAns(userAns)
      }
    } 
  }, [])

  const hasErrors = userAnsError
  const btnActive = !userAns || hasErrors

  const validateUserAns  = (e) => {
    const regex = /^[a-zA-Zа-яА-Я]+$/

    if (regex.test(e.target.value)) {
      if(userAnsError) {
        setUsernamAnsError(false)
      }
      
    } else {
      setUsernamAnsError(true)
    }

    setUserAns(e.target.value)
  }
  
  const submitForm = () => {
    const userAnsData = {
      userAns: userAns
    }
    if (userAns) {
      localStorage.setItem('userAnsData', JSON.stringify(userAnsData))
    }

    onGoNextPage()
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="single-input-quiz">
          <Indicator progress={1} />
          <div className="question">
            <Header type="h2" headerText="1. Занимательный вопрос" />
            <AppInput
              isRequired={true}
              type="text"
              name="answer"
              placeholder="Ваш ответ"
              errorText="Введите номер в правильном формате например"
              onChange={validateUserAns}
              hasError={userAnsError}
              value={userAns}
            />
            <AppButton 
              isDisabled={btnActive}
              type="submit"
              id="next-btn"
              buttonText="Далее"
              onClick={submitForm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepOne;
