import styled from 'styled-components'
import Sidebar from '../Components/Sidebar'
import {useLocation}from 'react-router-dom'
import {useEffect, useState} from 'react'
import {publicRequest} from '../apiRequest'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {Context} from  '../Context/Context'


const Container = styled.div`
margin:10px auto;
max-width:400px;
padding:10px;

@media only screen and (min-width:600px){
    margin:0px;
    max-width:100%;
    display:flex;

}
`

const Wrapper = styled.div`
flex:9;
margin:8px 10px;

`

const Image= styled.img`
width:100%;
height:280px;
object-fit:cover;
border-radius:6px;
`

const H1= styled.h3`
text-align:center;
margin-top:15px;
font-family: 'lora', serif;
`

const Section = styled.div`
float:right;
`

const InfoContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
color:#333;
margin-top:15px;
`

const Author= styled.div`
color:#b39656;
`

const Date= styled.div`
color:#b39656;
`

const Desc= styled.p`
margin-top:15px;
color:#666;
font-size: 15px;
line-height:24px;
`

const EditInput = styled.input`
border:none;
border-bottom:1px solid gray;
padding:10px;
outline:none;
width:50%;
`

const EditText= styled.textarea`
border:none;
border-bottom:1px solid gray;
padding:5px;
outline:none;
margin-top:10px;
width:50%;
`

const Edit = styled.div``

const Button = styled.button`
margin-top:10px;
border:none;
border-radius:8px;
padding:.4rem 1.3rem;
background-color:teal;
color:white;
cursor:pointer;

`




export default function Single(){

    const location= useLocation()
    const id= location.pathname.split("/")[2]
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode]= useState(false)
    const {user}= useContext(Context)

    useEffect(()=> {
      const getData= async()=> {
        try{
            const res = await publicRequest.get(`/posts/${id}`)
            setPost(res.data);
          setTitle(res.data.title)
           setDesc(res.data.desc)
            

        }catch(err){
            console.log(err)
        }
      }

      getData()
    },[id])

    const handleClick= async()=> {
        
        try{
             await publicRequest.put(`/posts/${post._id}`, {
                username:user.username,
                title,
                desc,

            })

            setUpdateMode(false)
            
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete= async ()=> {
        try{

            await publicRequest.delete(`/posts/${post._id}`, {
                data:{username: user.username}
            })
                

            window.location.replace('/')

        }catch(err){
            console.log(err)
        }
    }

    return(
        <Container>
        <Wrapper>
           {post.photo && 
              <Image src={post.photo.url}/>
           }
            {updateMode ? <EditInput type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            
              :(

                <H1>{title}
                  { post.username === user?.username &&
                   <Section>
                   <i className=' far fa-edit'  style={{color:"teal", margin:"0px 5px", cursor:"pointer"}} onClick={() => setUpdateMode(true)} ></i>
                   <i className=' far fa-trash-alt' style={{color:"tomato", cursor:"pointer"}}  onClick={handleDelete}></i>
                   </Section>
                 }
            </H1>
              )}
            <InfoContainer>
                
                <Author>Author: <Link style={{textDecoration:"none", color:"#b39656"}} to={`/?user=${post.username}`}>{post.username}</Link></Author>
                
                <Date>{ new window.Date(post.createdAt).toDateString()}</Date>
            </InfoContainer>

           {updateMode ? <EditText type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
            :(
                <Desc>
                {desc}
             </Desc>
            )}

         {updateMode  && 
          <Edit>
            <Button onClick ={handleClick}>Update</Button>
          </Edit>

          
         }
        </Wrapper>
        <Sidebar/>
        </Container>

    )
}