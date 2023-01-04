import formatDistanceToNow from'date-fns/formatDistanceToNow'
import DOMpurify from "dompurify"
import trashIcon from "../images/trashcan.png"
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from '../hooks/useAuthContext';




const PostDetails = ({post}) => {

    const {title, body, createdAt, _id} = post;
    
    const {dispatch} = usePostsContext()
    const {user} = useAuthContext()
    const sanitizedBody = () => ({
        __html: DOMpurify.sanitize(body)
    })

    const handleClick = async(e) => {
        if (!user) {
            return
        }
        const response = await fetch(`/api/posts/${_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json();
        if (response.ok) {
            dispatch({
                type: "DELETE_POST",
                payload: json
            })
        }
    }
    return ( 
        <div className="post-details">
            <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
            <h2>{title}{user && <img src={trashIcon} alt="traschcan" className="trashcan" onClick={handleClick}/>}</h2>
            <div dangerouslySetInnerHTML={sanitizedBody()}/>
            
        </div>
     )
}
 
export default PostDetails;
