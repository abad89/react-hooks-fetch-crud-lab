import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() =>{
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data) => setQuestions(data))
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {method: "DELETE"})
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions)
      })
  }

  function handleCorrectAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((quest) => {
          if (quest.id === updatedQuestion.id) return updatedQuestion;
          return quest
        })
        setQuestions(updatedQuestions)
      })
  }

  const questionItems = questions.map((question) => 
    <QuestionItem 
    question={question}
    key={question.id}
    onDeleteClick={handleDeleteClick}
    onCorrectAnswerChange={handleCorrectAnswerChange}
    />
  )

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
