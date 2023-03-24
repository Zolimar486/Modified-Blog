import styled from 'styled-components'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Posts from '../Components/Posts'
import Footer from '../Components/Footer'
import Comment from '../Components/Comment'
import { publicRequest } from '../apiRequest'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const Container = styled.div`
height:100vh;
margin: 20px 0px;
display:grid;
gap:20px;
grid-template-areas: 
 
 "header"
  "main" 
  
  "side"
  "comment"
  "footer";

grid-template-rows: auto auto auto auto 100px;


@media only screen and (min-width:600px){
    grid-template-areas:
     "header header"
     "main side"
     "comment comment"
     "footer footer";

    
     grid-template-rows: auto auto auto  100px;
     
     grid-template-columns: auto auto ;


}


@media only screen and ( min-width:900px){
    grid-template-areas: 
    "header header header"
    "main  side"
    "comment comment comment"
    "footer footer footer";

    grid-template-columns: auto 300px;
    grid-template-rows: auto auto  auto 100px;
}

`

export default function Home(){
    
    const [post, setPost] = useState([])
    const {search}= useLocation()
    
    

    useEffect(() => {
        const getPost = async()=> {
            try{

                const res  = await publicRequest.get('/posts' + search )
                setPost(res.data)
            }catch(err){
                console.log(err)
            }
        }

        getPost()
    },[search])

    return(
        <Container>
            <Header/>
            <Sidebar/>
            <Posts post={post}/>
            <Comment/>
            <Footer/>
        </Container>
    )
}