import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {selectSelected, setSelectAll} from './pictureSlice';
import Overlay from "./Overlay";
import useDownload from "./useDownload";

const StyledFrame = styled.div`
    // width: 300px;
    // height: 300px;
    
    border-radius: 5px;
    margin: 10px;
    overflow: hidden;
    position: relative;
    border: 5px ${props => props.selected ? "dashed #FFB1B8;" : "solid #FFFFC5;"}
    transition: border 0.2s;
    display: inline-block;

    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid-column;

    img{
        border-radius: 5px;
        width: 100%;
        height: auto;
    }
`
const FrameCover = styled.div`
    position: absolute;
    width: 100%;
    height: calc(100% - 3px);
    background: rgba(0, 0, 0, 0);
    border-radius: 5px;
    transition: background 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    // overflow: overlay;
    &:hover{
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        div{
            opacity: 1;
        }
        .fa-info-circle{
            opacity: 1;
        }
    }
    .info{
        position: relative;
        width: 90%;
        color: lightgrey;
        padding-top:10px;
        padding-right:10px;
        opacity: 0;
        transition: opacity 0.5s;
        i{
            &:hover{
                color: #FFFFC5;
                cursor: pointer;
            }
        }
        .description{
            opacity: 0;
            transition: opacity 0.5s;
            color: #FFFFC5;
            position: absolute;
            width: calc(100%-15px);
            margin: 5%;
            left: -10px;
            padding: 10px;
            font-size: 0.9em;
            border-radius: 5px;
            background: rgb(0,0,0,0.6);
            z-index:1;
            pointer-events: none;
            .date{
                font-size: 0.6em;
            }
        }
    }
    .footer{
        transition: opacity 0.5s;
        position:relative;
        color: lightgrey;
        width: 90%;
        padding: 5%;
        opacity: 0;
        pointer-events: auto;
        .title{
            &:hover{
                color: #FFFFC5;
            }
        }
        .fa-download{
            position:absolute;
            right: 15px;
            &:hover{
                color: #FFFFC5;
                cursor: pointer;
            }
        }
        .fa-expand{
            position:absolute;
            right: 45px;
            &:hover{
                color: #FFFFC5;
                cursor: pointer;
            }
        }
    }
`

function Frame({title, url, descr, created, selectPicture, id}) {
    const descriptionRef = React.useRef(null);
    const dispatch = useDispatch();
    const selected = useSelector(selectSelected);
    const download = useDownload();
    const [enlarge, setEnlarge] = React.useState(false);

    return(
        <StyledFrame selected={selected[id]}>
            <FrameCover onClick={(e) => {
                e.stopPropagation();
                if(selected[id]){
                    dispatch(selectPicture(0,id));
                    dispatch(setSelectAll(false));
                }
                else{
                    dispatch(selectPicture(1,id));
                }
                }}>
                <div className="info">
                    <i className="fas fa-info-circle"
                        onMouseOver={() => {
                            // descriptionRef.current.zIndex = "1";
                            descriptionRef.current.style.opacity = 1;
                        }}
                        onMouseOut={() => {
                            // descriptionRef.current.zIndex = "0";
                            descriptionRef.current.style.opacity = 0;
                        }}
                    ></i>
                    <div ref={descriptionRef} className="description">
                        <span>{descr}</span>
                        <br></br>
                        <span className="date">{created}</span>
                    </div>
                </div>
                <div className="footer">
                    <span className="title">{title}</span>
                    <i className="fas fa-expand" 
                        onClick={(e) =>{ 
                                e.stopPropagation();
                                setEnlarge(true)}}></i>
                    <i className="fas fa-download" onClick={e => download(e,[url],[title])}></i>
                </div>
            </FrameCover>
            <img src={url} alt={title}></img>
            {
                enlarge
                ?
                <Overlay 
                    setEnlarge={setEnlarge} 
                    url={url} 
                    title={title} 
                    descr={descr} 
                    created={created}>
                </Overlay>
                :
                null
            }
            
        </StyledFrame>
    );
}

export default Frame;