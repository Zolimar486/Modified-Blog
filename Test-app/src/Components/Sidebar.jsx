import styled from 'styled-components'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillGithub} from  'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import profile from '../Assets/profile.jpg'

const Container = styled.div`
grid-area: side;
background-color:#fbfbfb;
display:flex;
align-items:center;
flex-direction:column;
margin:10px auto;
max-width:350px;
padding:10px;
`

const Side= styled.div`
display:flex;
align-items:center;
jutify-content:center;
flex-direction:column;
padding:10px;
`

const SideTitle= styled.span`
margin:10px;
    padding:5px;
    width:80%;
    border-top:1px solid #a7a4a4;
    border-bottom:1px solid #a7a4a4;
    font-family: 'Varela Round', sans-serif;
    font-size:12px;
    color:#222;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
`

const Image = styled.img`
width:50%;
margin:10px 0px;
border-radius:10px;
`

const Desc= styled.p`
margin:5px 0px;
line-height:20px;

`

const List= styled.ul`
display:flex;
flex-wrap:wrap;
list-style:none;
margin:10px 0px;
padding-left:25px;

`

const ListItems= styled.li`
width:100px;
`

const SideIcons = styled.div`
display:flex;
margin: 10px 0px;
`

const Icons = styled.div`
margin: 0px 8px ;
`

export default function Sidebar(){
    return(
        <Container>
            <Side>
                <SideTitle>About Me</SideTitle>
                <Image src={profile}/>
                <Desc>I'm a Petroleum Engineer who learned how to use Html, Css, Js, and React technology in order just to build and deploy this Blog, which is focused on the Life of an oil field, this blog contains suitable information to be used for new Engineers
                </Desc>
            </Side>
            <Side>
                <SideTitle>Categories</SideTitle>
                <List>
                    <ListItems>Uptreams</ListItems>
                    <ListItems>DownStream</ListItems>
                    <ListItems>Uptreams</ListItems>
                    <ListItems>DownStream</ListItems>
                </List>
            </Side>
            <Side>
                <SideTitle>Follow Me</SideTitle>
                <SideIcons>
                    <Icons><AiFillLinkedin/></Icons>
                    <Icons><AiFillGithub/></Icons>
                    <Icons><AiFillInstagram/></Icons>
                </SideIcons>
            </Side>
        </Container>
    )
}