import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledHeader = styled.section`
    font-size: 24px;
    width: calc(100vw - 3% - 10px);
    // border: black 1px solid;
    // font-family: 'Zen Kurenaido', sans-serif;
    display: flex;
    padding: 10px;
    padding-left: 3%;
    background: #FFFFC5;
`;

const StyledLink = styled(Link)`
    padding: 10px 10px 10px 10px;   
    text-decoration: none;
    color: #FFB1B8;
    &:hover{
        color: #ffccd0;
    }
`
function click(){
    fetch('http://eulerity-hackathon.appspot.com/pets')
        .then(response => response.json())
        .then(data => console.log(data));
}
function Header() {
    return( 
        <StyledHeader>
            <StyledLink to="/">
                <i className="fas fa-paw fa-lg"></i>
            </StyledLink>
            <StyledLink style={{ 
                fontSize: "32px",
                padding: "3px 10px 0px 10px",
            }} to="/about" 
            onClick={click}
            ><b>About</b></StyledLink>
        </StyledHeader>
    );
}

export default Header;
