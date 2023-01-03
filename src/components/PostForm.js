import {useState} from "react"
import {usePostsContext} from "../hooks/usePostsContext"
import { useAuthContext } from "../hooks/useAuthContext"
const PostForm = () => {

    const {dispatch} = usePostsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in")
        }
        const post = {title, body}

        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })
         const json = await response.json()
         if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
         }
         if (response.ok) {
            setTitle("")
            setBody("")
            setError(null)
            setEmptyFields([])
            console.log("New Post Added")
            dispatch({
                type: 'CREATE_POST',
                payload: json
            })
         }
    }
    return ( 
        
        <form className="create"  onSubmit={handleSubmit}>
            <h3>Add New Post</h3>
            <label htmlFor="">Title</label>
            <input 
                type="text" 
                name="" 
                id="" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error': ''}
                />
            <label htmlFor="">Body</label>
            <textarea 
                name="" 
                id="text-area" 
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className={emptyFields.includes('body') ? 'error': ''}
                />
                <button>Add Post</button>
                {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default PostForm;