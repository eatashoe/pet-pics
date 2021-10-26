import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'

const LargeImg = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgb(0,0,0,0.5);
    z-index: 10;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    img{
        align-self: center;
        max-width: 80%;
        max-height: 80%;
        height: auto;
        outline: none;
    }
`
const Info = styled.div`
    width:80%;
    align-self: center;
    color: #FFFFC5;
    background: rgb(0,0,0,0.8);
    padding-bottom: 5px;
    display: table;
    .title{
        padding: 20px;
    }
    span{
        line-height: 1.2;
        margin-left .5rem;
        margin-right: 1rem;
        margin-bottom: 0;
        display: table-cell;
        vertical-align: baseline;
    }
`
function Overlay({setEnlarge, url, title, descr, created}){
    const overlayRef = React.useRef(null);

    return(
        ReactDOM.createPortal(
            <LargeImg>
                <img
                ref={overlayRef}
                tabIndex="-1" 
                onLoad={() => overlayRef.current.focus()} 
                onBlur={() => setEnlarge(false)} 
                src={url} 
                alt={title}></img>
                <Info>
                    <span className="title"><b>{title}</b></span>
                    <br></br>
                    <span >{descr}</span>
                    <br></br>
                    <span style={{ fontSize: "0.8em" }}>{created}</span>
                </Info>
            </LargeImg>
            ,document.getElementById('root')
          )
    );
}

export default Overlay;