import { createContext, useReducer } from "react";

export const PostsContext = createContext()

export const postsReducer = (state, action) => { // state is prevState and our postsReducer function will use the data from action.payload to update state
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PostsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null
    })

    return (
        //   Given to us when we created context. needs to wrap component tree where state needs to be updated. In our case, we will wrap App, we do that in index.js. And then we also need to wrap App's children like so
         <PostsContext.Provider value={{...state, dispatch}}>
            {children}
        </PostsContext.Provider>
    )
}