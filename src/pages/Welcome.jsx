import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";

const Welcome = ({ onGoNextPage }) => {
  const [userName, setUsername] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const [userNameError, setUsernameError] = useState(false)
  const [userPhoneError, setUserPhoneError] = useState(false)

  useEffect(() => {
    const rawUserData = localStorage.getItem("userData");
    if (rawUserData) {
      const { userName, userPhone } = JSON.parse(rawUserData);
      if (userName) {
        setUsername(userName);
      }

      if (userPhone) {
        setUserPhone(userPhone);
      }
    }
  }, []);



  const hasErrors = userNameError || userPhoneError
  const isNextButtonDisabled = !userName || !userPhone || hasErrors

  const validateUsername = (e) => {
    const regex = /^[a-zA-Zа-яА-Я]+$/

    if (regex.test(e.target.value)) {
      if(userNameError) {
        setUsernameError(false)
      }
      
    } else {
      setUsernameError(true)
    }

    setUsername(e.target.value)
  }

  const validateUserphone = (e) => {
    const regex = /^(?:\+998)?(?:\d{2})?(?:\d{7})$/

    if (regex.test(e.target.value)) {
      if(userPhoneError) {
        setUserPhoneError(false)
      }
      
    }else{
      setUserPhoneError(true)
    }

    setUserPhone(e.target.value)
  }

  const submitForm = () => {
    const userData = {
      userName: userName,
      userPhone: userPhone
    }
    if (userName && userPhone) {
      localStorage.setItem('userData', JSON.stringify(userData))
    }

    onGoNextPage()
  }

  return (
      <div className="container">
        <div className="wrapper">
          <div className="welcome">
            <Header type="h1" headerText="Добро пожаловать в квиз от лучшего учебного центра"/>
            <form className="welcome__form">
              <AppInput 
                id="username"
                isRequired={true}
                name="username"
                type="text"
                labelText="Ваше имя"
                placeholderText="Ваш ответ"
                errorText="Введите имя корректно"
                onChange={validateUsername}
                hasError={userNameError}
                value={userName}
              />
              <AppInput    
                id="phone"
                isRequired={true}
                name="phone"
                type="tel"
                labelText="Ваш номер"
                placeholderText="+998 9- --- -- -- "
                errorText="Введите номер в правильном формате"
                onChange={validateUserphone}
                hasError={userPhoneError}
                value={userPhone}
              />
              <AppButton 
                isDisabled={isNextButtonDisabled}
                type="submit"
                id="next-btn"
                buttonText="Далее"
                onClick={submitForm}                

              />
            </form>
          </div>
        </div>
      </div>
  )
}

export default Welcome;
