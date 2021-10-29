import React from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import Frame from './Frame';
import {
    updateAsync,
    selectFiltered,
    clearSelect,
    selectPics,
    // selectFilterValue,
    selectFilterLoaded
} from './pictureSlice';
const StyledContainer = styled.div`
    // width: 100vw;
    // height: calc(100vh - 68px);
    // border: black solid 1px;
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 15px;
    column-count: 4;
    position: relative;
    z-index: 0;
    @media (max-width: 1200px) {
        -moz-column-count:    4;
        -webkit-column-count: 4;
        column-count:         4;
      }
    @media (max-width: 1000px) {
        -moz-column-count:    3;
        -webkit-column-count: 3;
        column-count:         3;
    }
    @media (max-width: 800px) {
        -moz-column-count:    2;
        -webkit-column-count: 2;
        column-count:         2;
    }
    @media (max-width: 400px) {
        -moz-column-count:    1;
        -webkit-column-count: 1;
        column-count:         1;
    }
`

function Pictures(){
    const dispatch = useDispatch();
    const pics = useSelector(selectPics);
    const filtered = useSelector(selectFiltered);
    const filterLoaded = useSelector(selectFilterLoaded);
    // const [pics, loadPics] = React.useState('');

    React.useEffect(() => {
        dispatch(updateAsync());
    }, [])

    const selectPicture = createAction('picture/select', function prepare(text,id) {
        return {
          payload: {
            text,
            id,  
          },
        }
      });
    
    function loadData(d){
        var loaded = []
        d.map((x, i) => (
            loaded.push(
            <Frame  
                selectPicture={selectPicture}
                key={i}
                id={i}
                title={x.title} 
                url={x.url}
                descr={x.description}
                created={x.created}
            ></Frame>)
        ));
        return loaded
    }
    return(
        <StyledContainer 
            style={
                filterLoaded
                ?
                {
                    columnCount: "0"
                }
                :
                null
            }
            onClick={() => dispatch(clearSelect())}
            >
            {
                filterLoaded
                ?
                    filtered.length === 0
                    ?
                    null
                    :
                    loadData(filtered)
                :
                loadData(pics)
            }
        </StyledContainer>
    );
}

export default Pictures;