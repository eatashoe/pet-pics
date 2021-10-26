import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectPics,
    setFilterValue,
    update, 
    selectFiltered,
    selectFilterValue, 
    unloadFilter,
    selectFilterLoaded
 } from './pictureSlice';
import useClickOut from './useClickOut';

const TextArea = styled.textarea`
    position: absolute;
    height: 1.5em;
    width: calc(100% - 220px);
    transform: translateY(0.3em);
    background: transparent;
    border:none;
    outline: none;
    resize: none;
    overflow: none;
    white-space: nowrap;
    top: 3.5px;
    color: #FFB1B8;
    caret-color: #FFB1B8;
    padding: 5px 5px 0px 5px;
    font-size: 24px;
    font-weight: bold;
    pointer-events: none;
    transition: all 0.3s;
    font-family: 'Zen Kurenaido', sans-serif;
`
const SubmitBtn = styled.i`
    position: absolute;
    right: 10px;
    transform: translateY(0.6em);
    transition: all 0.3s;
    opacity: 0;
    pointer-events: none;
`

const ResetFilterBtn = styled.i`
    position: absolute;
    right: 10px;
    transform: translateY(-0.6em);
    transition: all 0.3s;
    opacity: 0;
    pointer-events: none;
`
function SearchBar() {
    const textareaRef = React.useRef(null);
    const submitRef = React.useRef(null);
    const searchBarRef = React.useRef(null);
    const searchIconRef = React.useRef(null);
    const pics = useSelector(selectPics);
    const filter = useSelector(selectFiltered);
    const filterLoaded = useSelector(selectFilterLoaded);
    const filterValue = useSelector(selectFilterValue);
    const dispatch = useDispatch();


    useClickOut(searchBarRef,blurHandler);

    function search(text){
        var t = text.toLowerCase().trim()
        const filtered = pics.filter(
            pic => {
                return(
                    pic
                    .title
                    .toLowerCase()
                    .includes(t) ||
                    pic
                    .description
                    .toLowerCase()
                    .includes(t)
                );
            }
        );
        // console.log(filtered);
        submitRef.current.style.transform = "translateY(0.6em)";
        submitRef.current.style.opacity = "0";
        submitRef.current.style.pointerEvents = "none";
        textareaRef.current.blur()
        textareaRef.current.style.pointerEvents = "none";
        searchIconRef.current.style.color = "#C8E4FF";
        searchIconRef.current.style.pointerEvents = "none";
        dispatch(update(filtered));
        // blurHandler();
    }

    function focusHandler(){
        if(!filterLoaded){        
            textareaRef.current.style.pointerEvents = "visible";
            textareaRef.current.style.borderBottom = "#FFB1B8 1px solid";
            textareaRef.current.style.transform = "translateY(-0.3em)";
            textareaRef.current.focus();
            submitRef.current.style.transform = "translateY(0em)";
            submitRef.current.style.opacity = "1";
            submitRef.current.style.pointerEvents = "visible";
        }
    }
    function blurHandler(){
        textareaRef.current.style.pointerEvents = "none";
        textareaRef.current.style.borderBottom = "transparent 1px solid";
        textareaRef.current.style.transform = "translateY(0.3em)";
        textareaRef.current.value = "";
        textareaRef.current.blur();
        submitRef.current.style.transform = "translateY(0.6em)";
        submitRef.current.style.opacity = "0";
        submitRef.current.style.pointerEvents = "none";
        // dispatch(update([]));
    }
    function keyDownHandler(e){
        if(e.key === "Enter"){
            search(textareaRef.current.value);
        }
        else{
            // console.log(e.key,textareaRef.current.value);
            dispatch(setFilterValue(textareaRef.current.value));
        }
    }
    function clearFilter(){
        dispatch(update([]));
        blurHandler();
        dispatch(unloadFilter());
        searchIconRef.current.style.color = "#FFB1B8";
        searchIconRef.current.style.pointerEvents = "visible";
    }
    return(
        <div ref={searchBarRef}>
            <i  ref={searchIconRef}
                className="fas fa-search"
                onClick={focusHandler}
            ></i>
            <TextArea 
                ref={textareaRef}
                onKeyDown={keyDownHandler}
                // onBlur={blurHandler}
            ></TextArea>
            <SubmitBtn 
                tabindex="-1"
                onClick={() => {search(textareaRef.current.value)}} 
                ref={submitRef} 
                className="fas fa-greater-than"
            ></SubmitBtn>
            {
                (!filterLoaded)
                ?
                <ResetFilterBtn
                    className="fas fa-times"
                ></ResetFilterBtn>
                :
                <ResetFilterBtn
                    className="fas fa-times"
                    style={{ 
                        // color:"blue",
                        opacity: "1",
                        pointerEvents: "visible",
                        transform: "translateY(0.06em)"
                    }}
                    onClick={clearFilter}
                ></ResetFilterBtn>

            }
        </div>
    );
}

export default SearchBar;