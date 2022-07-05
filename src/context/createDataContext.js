import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {

    const Context = React.createContext();


    /*
        children : Burada children => App component oluyor. App component'i
                   provider içerisine koyduk.
    */

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        // state eski adı => blogPosts 
        // actions === { addBlogPost: (dispatch) => {return () =>{} }} bkz. 1.1

        const boundActions = {};

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch); // reducer dispatch bu şekilde çağrılıyor !!!
        }

        // value içerisine koyduğumuz veri tüm alt componentler için erişilebilir
        /*  ...boundActions (callBack functions) ile alt component ler provider içerisindeki veriye    erişebilir. Değiştirebilir vs. 
        */

        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider };

};



/**
 Automating Context Creation

    Any time we need to add new resource, images, commments etc.
    We are going to create another context file like "BlogContext.js"
    All we have to do
        . Define reducer  => blogReducer
        . Define some functions that will be called from dispatch => addBlogPost
        . we then call "createDataContext"


 1.1
   here is the idea. We're going to loop through that action object for every
    key in this case, like just "addBlogPost".
    We are going the take that function =>   "(dispatch) => {return () =>{} }"
    And we are going to call it with the dispatch argument, and that's going to give us back that function =>   "return () =>{}".
    And that fubction is what we're going to pass on down into our value prop
    here =>  "value={{ state }". And it's essenitially going to let all of our 
    child components make changes to our state object.

    Tüm bunlar yerine "REDUX" kullanabilirmişiz.
 */