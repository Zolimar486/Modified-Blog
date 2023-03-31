import styled from 'styled-components'
import {BsGithub} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {CgMenuGridO} from 'react-icons/cg'
import {useState} from 'react'
import {Context} from '../Context/Context'
import {useContext} from 'react'
import {Link} from 'react-router-dom'


const Container = styled.div`
width:100%;
background-color:white;
padding:1rem;
height:50px;
display:flex;
justify-content:space-between;
align-items:center;
font-family: 'Varela', sans-serif;
font-size:17px;
z-index:999;

@media only screen and (min-width:768px){
    overflow:hidden;
    position:fixed;
    top:0px;

}
`

const Left = styled.div`
display:flex;
`

const Icons = styled.div`
margin:0px 5px;
`

const Right = styled.div`

margin-right:30px;

@media only screen and ( max-width:768px){
    width:100%;
    height:max-content;
    padding:1rem;
    position:absolute;
    top:0;
    left:${({isOpen}) => (isOpen ? "0px" : "-500%")};
    transition: .3s;
    background-color:#f5f5dc;
    z-index:999;

}
`

const List = styled.ul`
display:flex;
align-items:center;
justify-content:center;
list-style:none;

@media only screen and ( max-width:768px){
    display:flex;
    flex-direction:column;
    align-items:center;
   
}
`

const ListItems= styled.li`
margin:0px 10px;
cursor:pointer;

@media only screen and ( max-width:768p){
    margin:15px 0px;
}
`

const Btn = styled.div`

@media only screen and ( max-width:768px){
    margin:10px 0px;
}
`

const Image = styled.img`
width:30px;
height:30px;
border-radius:50%;
object-fit:cover;
`

const Close = styled.div`
display:none;

@media only screen and ( max-width:768px ){
    display:block;
    position:absolute;
    top:10px;
    right:15px;
    font-size:18px;
}
`

const Menu = styled.div`
display:none;

@media only screen and ( max-width:768px){
    display:block;
    font-size:24px;
    
}
`



export default function Navbar(){
    
    const [isOpen, setIsOpen] = useState(false) 

    const {user, dispatch} = useContext(Context)

    const handleLogout= ()=> {
        dispatch({type:"LOGOUT"})
    }

    return(
        <Container>
            <Left>
                <Icons><BsGithub/></Icons>
                <Icons><BsLinkedin/></Icons>
                <Icons><AiOutlineMail/></Icons>
            </Left>
            <Right isOpen = {isOpen}>
                <List>
                    <ListItems><Link style={{textDecoration:"none"}} to="/"  >Home</Link></ListItems>
                    <ListItems><Link style={{textDecoration:"none"}} to="/">About</Link></ListItems>
                    <ListItems><Link  style={{textDecoration:"none"}}  to="/write">Write</Link></ListItems>
                    <ListItems><Link  style={{textDecoration:"none"}}  to="/quiz">Quiz</Link></ListItems>
                    <ListItems onClick={handleLogout}>{user && "Logout"}</ListItems>
                    <ListItems>{user &&  "Welcome  " + ` ${user.username}`}</ListItems>


                    <Btn>
                      {user? ( <Link to="/settings"><Image src={user.profilePic.url}/></Link>) 
                      :(<List>
                        <ListItems><Link style={{textDecoration:"none"}} to="/register">Register</Link></ListItems>
                        <ListItems><Link style={{textDecoration:"none"}} to="/login">Login</Link></ListItems>

                      </List>)
                      }
                    </Btn>

                </List>

                <Close onClick ={() => setIsOpen(!isOpen)}><AiOutlineCloseCircle/></Close>
            </Right>

            <Menu onClick ={() => setIsOpen(!isOpen)}><CgMenuGridO/> </Menu>
        </Container>
    )
}