import React from 'react';
import styled from 'styled-components';

const StyledAbout = styled.div`
    width: 70vw;
    height: calc(100vh - 100px);
    margin: 0 auto;
    color: #ff808a;
    span{
        font-size: 30px;
        color: #ff808a;
    }
    a{
        color: #ff808a;
        &:hover{
            color: #FFB1B8;
        }
    }
`
function About() {
    return(
        <StyledAbout>
            <h1>Pet Pics</h1>
            <br></br>
            <span>This is a pet pictures gallery with many different animals and description of each of them.</span>
            <br></br>
            <br></br>
            <br></br>
            <span>Feel free to download the pet pics. :)</span>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <span>By Winston Gong</span>
            <br></br>
            <br></br>
            <div style={{textAlign: "center", fontSize: "30px", textDecoration: "none"}}>
                <a 
                    href="https://github.com/eatashoe" 
                    target="_blank" 
                    rel="noreferrer">
                    <i className="fab fa-github-square fa-2x"></i>
                </a>
            </div>
        </StyledAbout>
    );
}

export default About;