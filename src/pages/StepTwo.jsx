import React, { useState, useEffect } from "react";
import { Indicator } from "../components/Indicator";
import { Header } from "../components/Header";
import { ListedAnswerItem } from "../components/ListedAnswerItem";
import { AppButton } from "../components/AppButton";

const StepTwo = ({ onGoNextPage }) => {
  const [checkedItem, setCheckedItem] = useState('')

  useEffect(() => {
    const rawUserData = localStorage.getItem('userVariantData')
    if (rawUserData) {
      const { checkedItem } = JSON.parse(rawUserData)
      if (checkedItem) {
        setCheckedItem(checkedItem)
      }
    } 
  }, [])

  
  const submitForm = () => {
    const userVariantData = {
      checkedItem: checkedItem
    }
    if (checkedItem) {
      localStorage.setItem('userVariantData', JSON.stringify(userVariantData))
    }

    onGoNextPage()
  }

  const answerTypes = [
    {
      id: 'variant=1',
      text: 'Ваш ответ 1'
    },
    {
      id: 'variant=2',
      text: 'Ваш ответ 2'
    },
    {
      id: 'variant=3',
      text: 'Ваш ответ 3'
    },
    {
      id: 'variant=4',
      text: 'Ваш ответ 4'
    }
  ]


  return (
    <div className="container">
      <div className="wrapper">
        <div className="variants-quiz">
          <Indicator progress={2}/>
          <div className="question">
            <Header type="h2" headerText="2. Занимательный вопрос" />
            <ul className="variants">
              {
                answerTypes.map(answerItem => (
                  <ListedAnswerItem 
                    key={answerItem.id}
                    id={answerItem.id}
                    answerText={answerItem.text} 
                    isChecked={checkedItem === answerItem.id}
                    onChange={() => setCheckedItem(answerItem.id)}
                  />
                ))
              }
            </ul>
            <AppButton 
              isDisabled={!checkedItem} 
              id="next-btn"
              buttonText="Далее"
              type="submit"
              onClick={submitForm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepTwo;
