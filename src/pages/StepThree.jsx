import React, { useState, useEffect } from "react";
import { Indicator } from "../components/Indicator";
import { Header } from "../components/Header";
import { ListedAnswerEmoji } from "../components/ListedAnswerEmoji";
import { AppButton } from "../components/AppButton";

const StepThree = ({ onGoNextPage }) => {
  const [checkedEmoji, setCheckedEmoji] = useState('')

  useEffect(() => {
    const rawUserData = localStorage.getItem('userEmojiData')
    if (rawUserData) {
      const { checkedEmoji } = JSON.parse(rawUserData)
      if (checkedEmoji) {
        setCheckedEmoji(checkedEmoji)
      }
    } 
  }, [])

  
  const submitForm = () => {
    const userEmojiData = {
      checkedEmoji: checkedEmoji
    }
    if (checkedEmoji) {
      localStorage.setItem('userEmojiData', JSON.stringify(userEmojiData))
    }

    onGoNextPage()
  }

  const id  = [
    {
      id: 'variant-1',
      src: "./img/laugh.png",
      alt: "laugh",
      text: 'Ваш ответ 1'
    },
    {
      id: 'variant-2',
      src: "./img/hearts.png",
      alt: "hearts",
      text: 'Ваш ответ 2'
    },
    {
      id: 'variant-3',
      src: "./img/smirk.png",
      alt: "smirk",
      text: 'Ваш ответ 3'
    },
    {
      id: 'variant-4',
      src: "./img/fright.png",
      alt: "fright",
      text: 'Ваш ответ 4'
    }
  ]

  return (
    <div className="container">
      <div className="wrapper">
        <div className="emoji-quiz">
        <Indicator progress={3}/>  
          <div className="question">
          <Header type="h2" headerText="3. Занимательный вопрос" />
            <ul className="emoji-variants">
              {
                id.map(answerItem => (
                  <ListedAnswerEmoji 
                    key={answerItem.id}
                    id={answerItem.id}
                    src={answerItem.src}
                    alt={answerItem.alt}
                    PPP={answerItem.text} 
                    isChecked={checkedEmoji === answerItem.id}
                    onChange={() => setCheckedEmoji(answerItem.id)}
                  />
                ))
              }
            </ul>
            <AppButton 
              isDisabled={!checkedEmoji} 
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

export default StepThree;
