import styled from 'styled-components'
import {BsCloudPlus} from 'react-icons/bs'
import {useState, useEffect}from 'react'
import { publicRequest} from '../apiRequest'
import axios from 'axios'
import { validateEmail, validateUsername , validatePassword} from '../validate'

const Container = styled.div`
background:linear-gradient(rgba(255,255,255,0.5),
rgba(255,255,255,0.5)),
 url('https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');

 
 background-size:cover;
 height:100vh;
 display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;
`


const Title = styled.h2`
margin-bottom:10px;
font-size:40px;
text-align:center;
`

const Form= styled.form`

@media only screen and (min-width:600px){
  display:flex;
    
  align-items:center;
    
}

`

const Left= styled.div`
display:flex;
flex-direction:column;

@media only screen and (min-width:600px){
  
}

`

const Label = styled.label`
margin:5px 0px;
`

const Input = styled.input`
border:none;
outline:none;
background-color:white;
padding:10px;
`

const Button = styled.button`
border:none;
border-radius:10px;
background-color:teal;
color:white;
cursor:pointer;
margin-top:10px;
padding:10px;;

`

const Right= styled.div`

margin-top:30px;

@media only screen and ( min-width:600px){
     margin-left:30px;
     
      
     
}

`

const Div= styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
`

const Section= styled.div`
width:100px;
height:110px;
border-radius:8px;
background-color:white;
padding:20px;
`

const Span = styled.span`
text-aling:center;
`

const LabelFile = styled.label`
margin:0px 10px;
font-size:24px;
`

const InputFile= styled.input``

const Image = styled.img`
width:100px;
height:100px;
border-radius:8px;
object-fit:cover;
`

const Create = styled.div`
@media only screen and (min-width:600px){
    margin-top:10px;
}
`

const ContainerError = styled.div`
margin-top:10px;
color:red;
`


function InlineError({error}){
  return(
      <ContainerError>{error}</ContainerError>
  )
}

export default function Register(){


    const [image, setImage]= useState("");
    const [username, setUsername]=useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError]= useState("")
    const [emailError, setEmailError]= useState("")
    const [passwordError, setPasswordError]= useState("")

    const handleUpload = (e)=> {
      const file = e.target.files[0];

      TransformFile(file)
    }

    const TransformFile= (file)=>{
      const reader = new FileReader()

      if(file){

        reader.readAsDataURL(file)
        reader.onloadend= () => {
            setImage(reader.result)
        }

      }else{
        setImage("")
      }
    }

   

   


    const handleSubmit= async(e)=> {
     e.preventDefault()

     try{
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            username,
            email,
            password,
            profilePic: image,
        })

      res.data && window.location.replace('/login')
       

     }catch(err){
        console.log(err)
     }

    }

    useEffect(()=> {
      validateUsername({username, setUsernameError})

      validatePassword({password, setPasswordError})

      validateEmail({email, setEmailError})
    },[username, email,password])

    return(
        <Container>

            <Title>Register</Title>
            <Form onSubmit={handleSubmit}>
                <Left>
                <Label>Username</Label>
                <Input type="text"  onChange={(e)=> setUsername(e.target.value)}/>
                {usernameError && <InlineError error={usernameError}/>}
                <Label>Email</Label>
                <Input type="text" onChange={(e)=> setEmail(e.target.value)} />
                {emailError && <InlineError error={emailError}/>}
                <Label>Password</Label>
                <Input type="text"  onChange={(e) => setPassword(e.target.value)}/>
                {passwordError && <InlineError error={passwordError}/>}
                </Left>

                <Right>
                 <Div>

                 {image ? (
                    <Image src={image}/>
                 ):(
                    <Section>
                    <Span>Preview will Appear</Span>
                 </Section>
                 )
                }
                 <LabelFile htmlFor="file">
                    <BsCloudPlus style={{cursor:"pointer"}}/>
                 </LabelFile>
                 <InputFile type="file" id="file" style={{display:"none"}} onChange={handleUpload}/>
                 
                 </Div>
                
                 <Create>
                 <Button type="submit">Create User</Button>
                </Create>
                </Right>
                
            </Form>
           
            
        </Container>
    )
}