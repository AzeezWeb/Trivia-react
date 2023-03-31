import React, { useState } from "react";

const initialState = {
  data : null,
  loading : true  
}

function useTrivia() {
  const [state,  setState] = useState(initialState)
  
  React.useEffect( () => {
     setState({ data: null, loading: true });
     fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setState({ data: data, loading: false});
          }, 500)
        });
    }, [])
    
   return state;
}

export default useTrivia;