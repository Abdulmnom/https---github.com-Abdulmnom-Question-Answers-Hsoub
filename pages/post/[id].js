export default function Show({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export async function getStaticPaths() {
    const data = await fetch(`http://localhost:3000/api/post`);
    const posts = await data.json();
    const paths = posts.map(item => ({
       params: { id: item._id.toString() }
    }))
    return {
        paths, fallback: false
    }
}

export async function getStaticProps({ params }) {
    const data = await fetch(`http://localhost:3000/api/post/${params.id}`);
    const post = await data.json();
    return {
        props: {
            post
        }
    }
}
