import styled from 'styled-components'
import {useState} from 'react'
import {useContext} from 'react'
import {Context} from '../Context/Context'
import { publicRequest } from '../apiRequest'

const Container = styled.div`
margin-top:30px;
font-family:"Varela", sans-serif;
padding:10px;
max-width:320px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);

@media only screen and ( min-width:600px){
    max-width:450px;
}
`

const Wrapper = styled.div`
display:flex;
justify-content:space-between;

`

const Section= styled.div`
display:flex;
align-items:center;
justify-content:center;
`

const Image = styled.img`
width:30px;
height:30px;
border-radius:50%;
object-fit:cover;
margin: 10px 5px;
`

const Span = styled.span``

const Date= styled.span``

const Desc= styled.div`
margin-top:8px;
`

const Buttons = styled.div`
margin-top:10px;
display:flex;
justify-content:flex-end;

`

const Edit = styled.a`


color:blue;
border:none;
margin:0px 5px;
cursor:pointer;
`

const Delete= styled.a`
color:red;
margin:0px 5px;
cursor:pointer;
`

const Div = styled.div`

`


const TextArea= styled.textarea`
border:none;
border-bottom:1px solid gray;
padding:5px;
outline:none;
width:80%;
`

const Update = styled.button`
margin:8px 0px;
padding:.4rem 1.2rem;
border-radius:7px;
background-color:teal;
color:white;
border:none;
cursor:pointer;

`

export default function DisplayC({comment, onDelete}){

    const [desc, setDesc]= useState("")
    const [updateMode, setUpdateMode]= useState(false)
    const [dataDeleted, setDataDeleted]= useState(false)
    const {user}= useContext(Context)
    

    const handleUpdate= async (id)=> {
        try{
            const res = await publicRequest.put(`/comments/${id}`, {
                username: user.username,
                desc,
            })

            setUpdateMode(false)
            
        }catch(err){
            console.log(err)
        }
    }
     
    

   const handleDelete= ()=> onDelete(comment._id)

    return  (
        <Container>
            <Wrapper>
                <Section>
                    {comment.profilePic && 
                      <Image src={comment.profilePic.url}/>
                    }
                    <Span>{comment.username}</Span>
                </Section>
                <Section>
                    <Date>{ new window.Date(comment.createdAt).toDateString()}</Date>
                </Section>
            </Wrapper>
           {updateMode ?  <><Div> <TextArea type="text" onChange={(e)=> setDesc(e.target.value)}/> </Div>
              <Update onClick={()=> handleUpdate(comment._id)}>Update</Update>
             
               </>
              : (<>
                {desc ? (<Desc>{desc} </Desc>)
                   :(
                    <Desc>{comment.desc} </Desc>
                   )
               }
                </>
              )
            }

            {comment.username === user?.username  && 
           
           <Buttons>
           <Edit onClick={()=>  setUpdateMode(true)}>(Edit)</Edit>
           <Delete onClick={()=> handleDelete(comment._id)}>(Delete)</Delete>
           </Buttons>
           }
    
        </Container>
    )
}