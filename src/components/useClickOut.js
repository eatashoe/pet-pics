import { useEffect } from "react";
import { useSelector} from 'react-redux';
import { selectFilterValue, selectFilterLoaded } from "./pictureSlice";

function useClickOut(ref, f) {   
    const filterValue = useSelector(selectFilterValue);
    const filterLoaded = useSelector(selectFilterLoaded);
    
    // console.log(textareaRef.current.value)
    useEffect(() => {
        // console.log("why",filterValue.length,"not");
        if(!filterLoaded && filterValue.length >= 0){   
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // console.log('wowverycool',filterValue);
                    f();
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [ref,filterLoaded,filterValue]);
}

export default useClickOut;
