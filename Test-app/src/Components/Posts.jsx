import styled from 'styled-components'
import Post from './Post'

const Container = styled.div`
grid-area: main;
margin:0px auto;
max-width:350px;


@media only screen and ( min-width:600px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    gap:10px;
    margin: 0px;
    max-width:100%;
    

}

`

export default function Posts({post}){
    return(
        <Container>
            
           {post.map((c) => (
             <Post post={c}/>
           ))}
            
            
        </Container>
    )
}