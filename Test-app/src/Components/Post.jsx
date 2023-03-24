import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Container = styled.div`
padding:10px;
font-size:'Varela', sans-serif;

@media only screen and (min-width:600px){
    
}

`

const Image = styled.img`
width:100%;
height:200px;
border-radius:6px ;
object-fit:cover;
`

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`

const Categories= styled.div``

const Name = styled.span`
margin:0px 5px;
font-family: 'Varela Round', sans-serif;
 font-size:13px;
 color:#be9656;
 line-height:20px;
`

const Title = styled.div`
margin-top:15px;
font-family: 'Josefin Sans', sans-serif;
font-size:20px;
font-weight:700;
cursor:pointer;
`

const Date =  styled.div`

color:#333;
margin-top:15px; 

`

const Desc  = styled.p`
line-height:24px;
overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-line-clamp:4;
-webkit-box-orient: vertical;
font-size:17px;
line-height:24px;

`

export default function Post({post}){
    return(
        <Container>
            {post.photo &&
             <Image src={post.photo.url}/>
            }
            <Wrapper>
                <Categories>
                    <Name>Upstream</Name>
                    <Name>Process</Name>
                </Categories>
                <Link to={`/single/${post._id}`} style={{textDecoration:"none"}}>
                <Title>{post.title}</Title>
                </Link>
                <Date> { new window.Date(post.createdAt).toDateString()}</Date>
                <Desc>{post.desc}</Desc>
            </Wrapper>
        </Container>
    )
}