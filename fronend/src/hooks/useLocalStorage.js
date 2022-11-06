import { useState, useEffect } from "react";

/** store user Token in localStorage
 * when user refreshes their page or closes the browser window, 
 * they’ll not lose their token
 */

function useLocalStorage(key, firstValue = null){
    const initialValue = localStorage.getItem(key) || firstValue;
    const[ item, setItem ] = useState(initialValue);

    useEffect(function setKeyInLocalStorage(){
        console.debug("hooks useLocalStorage useEffect", "item=", item);

        if (item === null){
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);
    
    return [item, setItem];
}

export default useLocalStorage;
