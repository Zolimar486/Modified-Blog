import styled from 'styled-components'

const Container = styled.div`

grid-area: header;

`
const Titles= styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
font-family:"Varela", sans-serif;
font-size:15px;
position:relative,
`

const Text1= styled.span`
position:absolute;
top:16%;
font-size:30px;
`

const Text2= styled.span`
position:absolute;
top:20%;
font-size:100px;
`

const Image = styled.img`
width:100%;
height:400px;

margin-top:80px;
`


export default function Header(){
    return(
        <Container>
            <Titles>
                <Text1>Oil & Field</Text1>
                <Text2>Blog</Text2>
            </Titles>
           <Image src="https://media.istockphoto.com/photos/engineer-behind-with-overload-tool-picture-id1136994503?k=20&m=1136994503&s=612x612&w=0&h=sFYhAaJc5gScAzS6HRWJHyLDs5ehvir4lsspzA5QZeE="/>
        </Container>
    )
}