import styled from 'styled-components'
import {useContext} from 'react'
import {Context} from '../Context/Context'
import {useState} from 'react'
import {publicRequest} from '../apiRequest'
import axios from 'axios'

const Container = styled.div`
background:linear-gradient(rgba(255,255,255, 0.5),
    rgba(255,255,255,0.5)), 
    url('https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500');
    background-size:cover;
    height:100vh;

    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const Title = styled.h2`
margin-top:10px;
font-size:40px;
text-align:center;
`

const Form= styled.form`
display:flex;
flex-direction:column;
`

const Label = styled.label`
margin:10px 0px;
`

const Input = styled.input`
border:none;
background-color:white;
padding:8px;
outline:none;
`

const Create= styled.div`

`

const Button = styled.button`
border:none;
border-radius:8px;
padding:.4rem 1.4rem;
background-color:lightCoral;
color:white;
cursor:pointer;
margin-top:15px;

`

export default function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {dispatch, isFetching} = useContext(Context)

    const handleSubmit= async(e)=> {
       e.preventDefault()

       dispatch({type:"LOGIN_START"})
       try{
          const res= await axios.post('https://api-blog-2c7d.onrender.com/api/auth/login', {
            username,
            password,
          })
         
        
          dispatch({type:"LOGIN_SUCCESS", payload:res.data})
        
          window.location.replace('/')
    
        
       }catch(err){
        dispatch({type:"LOGIN_FAILURE"})

        
       }

      
    }

    
    

    return(
        <Container>
            <Title>
                Login
            </Title>
            <Form onSubmit={handleSubmit}>
                <Label>Username</Label>
                <Input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <Label>Password</Label>
                <Input type="text" onChange={(e)=> setPassword(e.target.value)}/>
                
              
               <Button type="submit" disabled={isFetching}>Login</Button>
             
            </Form>
            
        </Container>
    )
}