import styled from 'styled-components'
import DisplayC from './DisplayC'
import {useState, useEffect} from 'react'
import {publicRequest} from '../apiRequest'
import axios from 'axios'
import {Context} from '../Context/Context'
import {useContext} from 'react'
import { useCallback } from 'react'

const Container = styled.div`
grid-area:comment;
margin:10px auto;

padding:10px;

@media only screen and (min-width:600px){
    margin:10px 10px;
    padding:4px;
}
`

const Wrapper = styled.div`

`

const H3= styled.h3`
margin-bottom:10px;

`

const Form = styled.form``

const TextArea= styled.textarea`
width:320px;
height:200px;
border-radius:10px;
outline:none;
padding:10px;

@media only screen and (min-width:600px){
    width:450px;
}

`

const Button = styled.button`
padding:.4rem 1.4rem;
border-radius:7px;
border:none;
background-color:teal;
color:white;
cursor:pointer;
margin-top:10px;
`

const Create= styled.div``

export default function Comment(){

    const [comment, setComment]= useState([])
    const [desc, setDesc]= useState("");
    const [fetchPost, setFetchPost]= useState(false)

    const {user}= useContext(Context);

    const clear= ()=> {
        setDesc("")
    }
    

    useEffect(()=> {
      
        const getData= async()=> {
            
           try{
               const res= await publicRequest.get('/comments')
               setComment(res.data)
               
           }catch(err){
               console.log(err)
           }
        }
   
         
        getData()
       
   
       },[fetchPost])
   
    

    const handleSubmit= async(e) => {
        e.preventDefault()

        try{

            const res = await publicRequest.post('/comments/', {
                username: user.username,
                profilePic: user.profilePic,
                desc,
            })

           

            res.data && clear()
 
            setFetchPost(!fetchPost)
          

        }catch(err){
            console.log(err)
        }
    }

    const handleDelete= async(id)=> {
        try{
          const res = await publicRequest.delete(`/comments/${id}`, {
             data:{username: user.username}
             
         })

         setComment(comment.filter((item)=> item._id !== id))
 
        
 
        }catch(err){
         console.log(err)
        }
     }

  
    
   

    return(
        <Container>
            <Wrapper>
                <H3>Leave A Comment</H3>
                <Form onSubmit={handleSubmit}>
                    <TextArea type="text" value={desc} onChange={(e)=> setDesc(e.target.value)}/>
                    <Create>
                    <Button type="submit" >Submit</Button>
                    </Create>
                </Form>
                
            </Wrapper>
            <>
            {comment.map((comment) => (
             <DisplayC comment={comment}  key={comment._id} onDelete={handleDelete}/>
            ))}
            </>
        </Container>
    )
}