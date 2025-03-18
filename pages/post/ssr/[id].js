export default function SSRShow({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const data = await fetch(`http://localhost:3000/api/post/${params.id}`);
    const post = await data.json();
    return {
        props: {
            post
        }
    }
}
