import { FetchBlogFromDB } from "../lib/dal/blog"
import { DeleteBlogAction } from "../(actions)/blog"

export default async function HomePage() {

    const blogs = await FetchBlogFromDB();

    return (
        <div>
            <h3>Blogs</h3>

            {
                blogs.map((blog) => {
                    return (
                        <div key={blog._id.toString()}>
                            <ul>
                                <li>{blog.title}</li>
                                <li>{blog.description}</li>
                            </ul>
                            <form action={DeleteBlogAction}>
                                <input type="hidden" name="blog-id" value={blog._id.toString()} />
                                <button type="submit">Delete</button>
                            </form>
                        </div>
                    )
                })
            }
        </div>
    )
}