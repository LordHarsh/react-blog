import BlogList from './BlogList'
import useFetch from './useFetch';

const Home = () => {
    const jsonServerUrl = String(process.env.REACT_APP_JSON_SERVER_URL);
    const { data: blogs, isPending, error } = useFetch(jsonServerUrl)

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <h2>Loading...</h2>}
            {blogs && <BlogList blogs={blogs} title='All Blogs!'/>}
        </div>
    );
}

export default Home;