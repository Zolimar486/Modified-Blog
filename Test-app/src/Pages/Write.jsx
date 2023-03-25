import styled from 'styled-components'
import {BsCloudPlus} from 'react-icons/bs'
import {useState} from 'react'
import {Context} from '../Context/Context'
import {useContext} from 'react'
import {publicRequest} from '../apiRequest'
import axios from 'axios'

const Container = styled.div`
margin:20px auto;
max-width:400px;
padding:15px;

@media only screen and (min-width:600px){
    margin:20px 50px;
    max-width:100%;
}

`

const Image= styled.img`
width:100%;
height:250px;
border-radius:6px;
object-fit:cover;
`

const Form = styled.form``

const Section1 = styled.div`
display:flex;
align-items:center;

`

const Label = styled.label``

const Input = styled.input`
border:none;
border-bottom:1px solid gray;
padding:10px;
font-size:18px;
color:#333;
outline:none;
width:100%;

@media only screen and (min-width:600px){
    width:50%;
}
`

const Section = styled.div`
margin-top:15px;
`

const TextArea= styled.textarea`
border:none;
border-bottom:1px solid gray;
padding:10px;
font-size:18px;
color:#333;
outline:none;
width:100%;


@media only screen and (min-width:600px){
    width:50%;
}
`

const Box= styled.div`
display:flex;
justify-content:flex-end;

`

const Button = styled.button`
padding:.4rem 1.4rem;
background-color:teal;
color:white;
border:none;
cursor:pointer;
border-radius:8px;
margin-top:10px;


`

export default function Write(){

     const [title, setTitle]= useState("")
     const [desc, setDesc] = useState("")
     const [image, setImage]= useState("")
     const {user} = useContext(Context)

     const handleUpload= (e)=> {
        const file = e.target.files[0]

        TransformFile(file)
     }

     const TransformFile = (file)=> {
        const reader = new FileReader()

        if(file){

            reader.readAsDataURL(file)
            reader.onloadend= ()=> {
                setImage(reader.result)
            }

        }else{
            setImage("")
        }
     }

     

     const handleSubmit= async(e) => {
        
        e.preventDefault()

        try{
            const res = await publicRequest.post('/posts/', {
                username:  user.username,
                title,
                desc,
                photo: image,
            })

           window.location.replace('/')

        }catch(err){
            console.log(err)
        }

     }

    return(
        <Container>
         {image &&
           <Image src={image}/>
         }
         <Form  onSubmit={handleSubmit}>
            <Section1>
                <Label htmlFor="file">
                    <BsCloudPlus style={{fontSize:"25px", marginTop:"9px", cursor:"pointer"}}/>
                </Label>
                <Input type="file" id="file" style={{display:"none"}} onChange={handleUpload}/>
                <Input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
             </Section1>
             <Section>
                <TextArea type="text" placeholder="Share your Knowledge..." onChange={(e)=> setDesc(e.target.value)}/>
             </Section>

              <Box>
               <Button type="submit">Publish</Button>
              </Box>
         </Form>
         
        </Container>
    )
}