let show = false
let currentScore = 0
let questions = []
let number = 0
const container = document.getElementById('App')
const start = document.querySelector('.start')
const levelButtons = document.getElementById('level-buttons')
const score = document.getElementById('score')
const levelItems = document.querySelectorAll(".level")
const questionWrapper = document.querySelector(".question-wrapper")
const questionNumber = document.querySelector(".number")
const questionText = document.querySelector(".question-text")
const answerButtons = document.querySelectorAll(".answer-button")
const firstAnswer = document.querySelector(".first-answer")
const secondAnswer = document.querySelector(".second-answer")
const thirdAnswer = document.querySelector(".third-answer")
const fourthAnswer = document.querySelector(".fourth-answer")
const nextQuestion = document.querySelector(".next")
const loading = document.getElementById("loading")

levelButtons.style.display = "none"
score.style.display = "none"
questionWrapper.style.display ="none"
score.innerHTML = `Score: ${currentScore}`

//start quiz
start.addEventListener('click', () => {
    show = true;
    levelButtons.style.display = "block"
    document.getElementById('easy').style.marginRight = '20px'
    document.getElementById('medium').style.marginRight = '20px'
})


//choose level
levelItems.forEach(button => button.addEventListener('click', () => {
    start.style.display = "none"
    levelButtons.style.display = "none"
    show = false
    score.style.display = "block"
    questionWrapper.style.display ="block"
    nextQuestion.style.display = "none"
    loading.innerHTML = "Loading.."
    fetch(`https://opentdb.com/api.php?amount=10&difficulty=${button.id}&type=multiple`).then(res => res.json())
    .then(data => {
        loading.innerHTML = ""
        const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
        questions = data.results.map(question => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }))
        //begin quiz
        questions.map((q, index) => {
            if (index === number) {
                questionNumber.innerHTML = `Question: ${number + 1} / 10`
                questionText.innerHTML = q.question
                firstAnswer.innerHTML = q.answers[0]
                secondAnswer.innerHTML = q.answers[1]
                thirdAnswer.innerHTML = q.answers[2]
                fourthAnswer.innerHTML = q.answers[3]
                answerButtons.forEach(button => button.addEventListener('click' , () => {
                    if(button.children[0].innerHTML ===  questions[number].correct_answer) {
                        currentScore+=1
                        button.style.backgroundColor = "green"
                    } else {
                        button.style.backgroundColor = "red"
                        answerButtons.forEach(button => {
                            if(button.children[0].innerHTML ===  questions[number].correct_answer) {
                                button.style.backgroundColor = "green"
                            }
                        })
                    }
                    score.innerHTML = `Score: ${currentScore}`
                    nextQuestion.style.display = "block"
                }))
                nextQuestion.addEventListener('click', () => {
                    if(number < 9) {
                        number +=1
                        nextQuestion.style.display = "none"
                        answerButtons.forEach(button => button.style.backgroundColor = "lightblue")
                        questionNumber.innerHTML = `Question: ${number + 1} / 10`
                        questionText.innerHTML = questions[number].question
                        firstAnswer.innerHTML = questions[number].answers[0]
                        secondAnswer.innerHTML = questions[number].answers[1]
                        thirdAnswer.innerHTML = questions[number].answers[2]
                        fourthAnswer.innerHTML = questions[number].answers[3]
                    } else {
                        nextQuestion.style.display = "none"
                        questionWrapper.style.display ="none"
                        score.innerHTML = `Final Score: ${currentScore}`
                    }
                })
            }
        })
    }).catch(err => {
        loading.innerHTML = ""
        console.log(err)
    });
}))












