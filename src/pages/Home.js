import {useEffect} from "react"
import { usePostsContext } from "../hooks/usePostsContext"
import {useAuthContext} from "../hooks/useAuthContext"

// components
import PostDetails from "../components/PostDetails"
import PostForm from "../components/PostForm"

const Home = () => {
    const {user} = useAuthContext()
    const {posts, dispatch} = usePostsContext()
    useEffect(() => {
        const fetchPosts = async() => {
            
            
            
            const response = await fetch("/api/posts", {
                // headers: {
                //    'Authorization': `Bearer ${user.token}`     
                // }
                
            }
            );
            console.log(response)
    
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                // setPosts(json)
                dispatch({
                    type: 'SET_POSTS',
                    payload: json
                })
            } 
        }
        // if (user) { don't need this protection. anybody can view posts
            fetchPosts()
        // }
        
    }, [dispatch, user])
    return ( 
        <div className="home">
            <a href="https://www.flaticon.com/free-icons/sports-and-competition" title="sports and competition icons">Sports and competition icons created by Freepik - Flaticon</a>
            {user && <PostForm />}
            <div className="posts">
                {posts && posts.map((post) => (
                    <PostDetails key={post._id} post={post}/>
                ))}
            </div>
            
        </div>
     );
}
 
export default Home;