import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch';

const BlogDetails = () => {
    const jsonServerUrl = process.env.REACT_APP_JSON_SERVER_URL;
    const { id } = useParams();
    const history = useHistory();
    
    const {data: blog, error, isPending} = useFetch(jsonServerUrl + id)
    
    const handleClick = () => {
        fetch(jsonServerUrl + blog._id, {
            method: 'DELETE'
        }).then(()=>{
            history.push('/')

        })
    }
    
    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>} 
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;