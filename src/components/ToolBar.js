import React from 'react';
import styled from 'styled-components'
import { createAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelect,
    selectPics,
    selectIsAll,
    selectSelected, 
    selectFilterLoaded,
    selectFiltered } from './pictureSlice';
import useDownload from './useDownload';
import SearchBar from './SearchBar';


const StyledToolBar = styled.div`
    font-size: 24px;
    width: calc(100vw - 3%);
    // border: 1px solid black;
    display: flex;
    padding-left: 3%;
    position: relative;
    z-index: 1;
    color: #FFB1B8;
    background: #BBFFFF;
    border-top: #FFB1B8 4px solid;
    border-bottom: #FFB1B8 4px solid;
    // margin-bottom: 15px;
    i{
        margin: 10px;
        margin-left: 15px;
        cursor: pointer;
        &:hover{
            color: #ffccd0;
        }
    }
`

function ToolBar() {
    const downloadRef = React.useRef(null);
    const dispatch = useDispatch();
    const selected = useSelector(selectSelected);
    const pics = useSelector(selectPics);
    const isAllSelected = useSelector(selectIsAll);
    const isFilterLoaded = useSelector(selectFilterLoaded);
    const filtered = useSelector(selectFiltered);
    const download = useDownload();

    const selectAllAction = createAction('picture/selectAll', function prepare(selectAll) {
        return {
          payload: {
            selectAll, 
          },
        }
      });

    function selectAll(){
        if(isAllSelected){
            dispatch(selectAllAction(false));
        }
        else{
            dispatch(selectAllAction(true))
        }
    }   

    function downloadFiles(e){
        var links = []
        ,titles = [];
        if(isFilterLoaded){
            for(let i = 0; i < selected.length; i++){
                if(selected[i]){
                    links.push(filtered[i].url);
                    titles.push(filtered[i].title);
                }
            }
        }
        else{
            for(let i = 0; i < selected.length; i++){
                if(selected[i]){
                    links.push(pics[i].url);
                    titles.push(pics[i].title);
                }
            }
        }
        download(e,links,titles);
        dispatch(clearSelect());
    }
    return(
        <StyledToolBar>
            <div onClick={selectAll}>
                {
                    isAllSelected
                    ?
                    <i className="fas fa-check-square"></i>
                    :
                    <i className="far fa-square"></i>
                }
            </div>
            {
                selected.includes(1)
                ?
                <div>
                    <i style={{
                        color: "#FFB1B8"
                    }}  onClick={e => downloadFiles(e)}
                        onMouseOver={()=>{downloadRef.current.style.color = "#ffccd0";}}
                        onMouseOut={()=>{downloadRef.current.style.color = "#FFB1B8";}}
                        ref={downloadRef}
                        className="fas fa-download"
                    ></i>   
                    <span style={{ pointerEvents: "none"}}>{selected.filter(x => x === 1).length}</span>
                </div>
                :
                <i style={{
                    color: "#C8E4FF",
                    pointerEvents: "none",
                }} className="fas fa-download"></i>   
            }
            <SearchBar></SearchBar>
        </StyledToolBar>
    );
}

export default ToolBar;