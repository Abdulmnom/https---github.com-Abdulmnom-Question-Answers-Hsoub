import Link from 'next/link'

export default function Posts({ posts }) {
    return (
        <div>
            <h1>Posts list</h1>
            {
                posts.map(item => 
                    <li key={item._id}>
                        <Link href={`/post/${item._id}`}>
                            {item.title}
                        </Link>
                    </li>
                )
            }
        </div>
    )
}

export async function getStaticProps() {
    const data = await fetch(`http://localhost:3000/api/post`);
    const posts = await data.json();
    return {
        props: {
            posts
        }
        
    }
}