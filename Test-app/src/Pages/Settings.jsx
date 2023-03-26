import styled from 'styled-components'
import {BiCloudUpload} from 'react-icons/bi'
import Sidebar from '../Components/Sidebar'
import {Context} from '../Context/Context'
import {useContext} from 'react'
import {useState} from 'react'
import {publicRequest} from '../apiRequest'

const Container = styled.div`
margin:10px auto;
max-width:400px;

@media only screen and (min-width:600px){
    margin:0px;
    max-width:100%;
    display:flex;
    padding:20px;
}
`

const Wrapper = styled.div`
padding:20px;


@media only screen and (min-width:600px){
    flex:9;
    padding:5px;
    margin-top:25px;
}
`
const Div = styled.div`
padding:20px;
`

const Section = styled.div`
display:flex;
justify-content:space-between;

`

const Span = styled.span`
color:lightCoral;
font-size:15px;
`

const Form= styled.form``

const Title= styled.h3`
color:lightCoral;
margin-top:20px;
`

const Profile= styled.div`
margin-top:10px;
`

const Image = styled.img`
width:70px;
height:70px;
border-radius:10px;
object-fit:over;
`

const Label  = styled.label`
margin:0px 5px;
font-size:25px;

`

const Input = styled.input``

const InfoContainer = styled.div`
display:flex;
flex-direction:column;

`

const Label1= styled.label`
margin:8px 0px;
`

const Input1= styled.input`
border:none;
border-bottom:1px solid gray;
padding:5px;
font-size:14px;
outline:none;
@media only screen and (min-width:600px){
    width:50%;
} 
`

const Button = styled.button`
margin-top:10px;
border:none;
padding:.4rem 1.3rem;
background-color:lightCoral;
color:white;
cursor:pointer;
border-radius:10px;
`

const Photo = styled.img`
width:40px;
height:40px;
border-radius:10px;
object-fit:over;
`
const Span1 = styled.span`

color:green;
`
const Message = styled.div`
margin-top:10px;
`


export default function Settings(){

    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("");
    const [photo, setPhoto]= useState("")
    const {user, dispatch} = useContext(Context)
    const [message, setMessage] = useState(false)

    const handleUpload= (e)=> {
     const file = e.target.files[0];

     TransformFile(file)
    }

    const TransformFile = (file)=> {
        const reader = new FileReader()

        if(file){
            reader.readAsDataURL(file)
            reader.onloadend= ()=> {
                setPhoto(reader.result)
            }
        }else{
            setPhoto("")
        }
    }

    

    

    const handleSubmit= async(e) =>{
       e.preventDefault()

       dispatch({type:"UPDATE_START"})

       try{
        const res = await publicRequest.put(`/users/${user._id}`, {
           
            userId: user._id,
            email,
            password,
            profilePic: photo,
        })

         

        dispatch({type:"UPDATE_SUCCESS", payload:res.data})
        setMessage(true)

       }catch(err){
        
        dispatch({type:"UPDATE_FAILURE"})
        console.log(err)
       }
    }

    
    

    return(
        <Container>
           <Wrapper>
            <Section>
                <Span>Update your Account</Span>
                
            </Section>

            <Form onSubmit={handleSubmit}>
                <Title>Profile Picture</Title>
                <Profile>
                    {photo ? <Photo src={photo}/>
                     :(
                        <Image src={user.profilePic.url}/>
                     )}
                    <Label htmlFor="file" style={{cursor:"pointer"}}>
                    <BiCloudUpload/>
                    </Label>
                    <Input type="file" id="file" style={{display:"none"}} onChange={handleUpload}/>
                </Profile>
                <InfoContainer>
                    <Label1>Email</Label1>
                    <Input1 type="text" placeholder={user.email} onChange={(e)=> setEmail(e.target.value)}/>
                    <Label1>Password</Label1>
                    <Input1 type="text" onChange={(e)=> setPassword(e.target.value)}/>
                </InfoContainer>
                <Button type="submit">Update</Button>
                {message &&  
                   <Message> <Span1>Profile has been Updated </Span1></Message>
                }
            </Form>
           </Wrapper>
          <Div>
          <Sidebar/>
          </Div>
        </Container>
    )
}