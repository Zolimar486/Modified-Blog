import styled from 'styled-components'
import {useState, useEffect} from 'react'

const Container = styled.div`

grid-area:footer;
background-color:black;
display:flex;
align-items:center;
justify-content:center;
padding:20px;
`

const FooterT = styled.div`
color:white;
font-size:18px;
`

export default function Footer(){
    
    const [year, setYear] = useState("")

    const data = ()=> {
        setYear( new Date().getFullYear())
    }
     
    useEffect(() => {
      data()
    },[])

    return(
        <Container>
            <FooterT>
            ⓒ {year} Created by Zolimar Carrasquero | All Reights Reserved|
            </FooterT>
        </Container>
    )
}