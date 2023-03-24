import styled from 'styled-components'
import questions from '../data/db'
import {useState, useEffect} from 'react'


const Container = styled.div`
background: url("https://media.istockphoto.com/photos/engineer-behind-with-overload-tool-picture-id1136994503?k=20&m=1136994503&s=612x612&w=0&h=sFYhAaJc5gScAzS6HRWJHyLDs5ehvir4lsspzA5QZeE=");
background-position:right center;
background-size:cover;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
`

const Wrapper = styled.div`
background-color:#252d4a;
border-radius:15px;
box-shadow: 10px 10px 42px 0px rgba(0,0,0,0.75);
max-width:500px;
min-width:300px;
height:min-content;
min-height:200px;
border-radius:8px;
color:white;
display:flex;

padding:5px;

@media only screen and ( min-width:600px){
    max-width:650px;
    min-width:450px;
    padding:10px;
}


`

const Left= styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;
width:100%;

`

const NumberQuestion = styled.div`
color:white;

`

const Question= styled.div`
color:white;
`

const Right = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
margin:0px 7px;
width:100%;

`

const Button = styled.button`
margin-bottom:10px;

  color:#ffffff;
  background-color: #252d4a;
  border-radius:15px;
  display: flex;
  padding:5px;
  justify-content: center;
  align-items: center;
  border:5px solid #234668;
  cursor:pointer;

`

const Over = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin-left:85px;

`

const Text= styled.span`
color:white;

`

const Retry = styled.button`
color:black;
 backgorund-color:#333;
  border-radius:8px;
  padding:.4rem 1.3rem;
  border:none;
  margin-top:10px;
`

const Time= styled.div`
color:yellow;

`
const Continue = styled.button`
color:black;
 backgorund-color:#333;
  border-radius:8px;
  padding:.4rem 1.3rem;
  border:none;
  margin-top:10px;
  cursor:pointer;
`


export default function Quiz(){
  
    const [actualQuestion, setActualQuestion] = useState(0)
    const [puntuation, setPuntuation]= useState(0);
    const [isFinished, setIsFinished]= useState(false)
    const [time, setTime]= useState(40)
    const [areDisabled, setAreDisabled]= useState(false)

    const handleClick = (isCorrect, e)=> {
       if(isCorrect){
        setPuntuation(puntuation + 1)
       }
        
       e.target.classList.add(isCorrect ? "correct" : "incorrect")


      setTimeout(()=> {

        if(actualQuestion === questions.length-1 ){
            setIsFinished(true)
           }else{
              setActualQuestion(actualQuestion + 1)
           }
      }, 1500)

       
    }



    useEffect(()=> {
        const interval = setInterval(()=> {
              if(time > 0 ){
                setTime((prev) => prev-1 )
              }else{
                if(time === 0){
                    setAreDisabled(true)
                }
              }
            
        }, 1000)

        return ()=> clearInterval(interval)
    })


    if(isFinished) return (

        <Container>
            <Wrapper>
                <Over>
                    <Text> you got {puntuation} of {questions.length} {""}</Text>
                    <Retry onClick={()=> window.location.replace('/quiz')}>Retry</Retry>
                </Over>
            </Wrapper>
        </Container>
    )


    return(
        <Container>
            <Wrapper>
                <Left>
                    <NumberQuestion>Question {actualQuestion + 1} of {questions.length}</NumberQuestion>
                    <Question>{questions[actualQuestion].title}</Question>
                    {!areDisabled ? (<Time>Remain Time : {time}</Time>)
                      :(
                        <Continue onClick={()=> {
                            setTime(40)
                            setAreDisabled(false)
                            setActualQuestion(actualQuestion + 1)
                            
                        }}>Continue</Continue>
                      )
                    }
                </Left>
                <Right>
                    {questions[actualQuestion].options.map((respond) => (
                        <Button onClick={(e)=> handleClick(respond.isCorrect, e)} disabled={areDisabled}>{respond.responseText}</Button>
                    ))}
                </Right>
            </Wrapper>
        </Container>
    )
}