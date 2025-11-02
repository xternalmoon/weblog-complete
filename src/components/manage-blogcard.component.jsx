import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";

const BlogStats = ({ stats }) => {
    return (
        <div className="flex gap-6 max-lg:mb-6 max-lg:pb-6 border-b border-grey">
            {Object.keys(stats).map((key, i) => {
                if (key.includes("parent")) return null; // Skip "parent" keys

                // Create a human-readable label for each stat
                const label = key.split("_")[1];
                const value = stats[key];

                return (
                    <div
                        key={i}
                        className={`flex flex-col items-center justify-center p-4 px-6 ${i !== 0 ? "border-l border-grey" : ""}`}
                    >
                        <h1 className="text-xl lg:text-2xl mb-2 font-semibold">
                            {value.toLocaleString()}
                        </h1>
                        <p className="capitalize text-sm text-dark-grey">{label}</p>
                    </div>
                );
            })}
        </div>
    );
};

export const ManagePublishedBlogCard = ({ blog }) => {
    const { banner, blog_id, title, publishedAt, activity } = blog;
    const { userAuth: { access_token } } = useContext(UserContext);
    const [showStat, setShowStat] = useState(false);

    const handleToggleStats = () => {
        setShowStat(prev => !prev);
    };

    const handleDeleteBlog = (blog, access_token, target) => {
        const { index, blog_id, setStateFunc } = blog;

        // Disable the delete button to prevent multiple submissions
        target.setAttribute("disabled", true);

        axios.post(
            `${import.meta.env.VITE_SERVER_DOMAIN}/delete-blog`,
            { blog_id },
            { headers: { 'Authorization': `Bearer ${access_token}` } }
        )
        .then(({ data }) => {
            // Re-enable button and update state
            target.removeAttribute("disabled");

            setStateFunc(prevState => {
                const { deletedDocCount = 0, totalDocs, results } = prevState;
                results.splice(index, 1);

                if (!results.length && totalDocs - 1 > 0) {
                    return null;
                }

                return { ...prevState, totalDocs: totalDocs - 1, deleteDocCount: deletedDocCount + 1 };
            });
        })
        .catch(err => {
            console.error("Error deleting blog:", err);
            // Re-enable button even on error
            target.removeAttribute("disabled");
        });
    };

    return (
        <>
            <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
                <img
                    src={banner}
                    alt="Blog Banner"
                    className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover"
                />
                <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
                    <div>
                        <Link to={`/blog/${blog_id}`} className="blog-title mb-4 hover:underline">{title}</Link>
                        <p className="line-clamp-1">Published on {getDay(publishedAt)}</p>
                    </div>
                    <div className="flex gap-6 mt-3">
                        <Link to={`/editor/${blog_id}`} className="pr-4 py-2 underline">Edit</Link>
                        <button className="lg:hidden pr-4 py-2 underline" onClick={handleToggleStats}>Stats</button>
                        <button
                            className="pr-4 py-2 underline text-red"
                            onClick={(e) => handleDeleteBlog(blog, access_token, e.target)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="max-lg:hidden">
                    <BlogStats stats={activity} />
                </div>
            </div>

            {showStat && <div className="lg:hidden"><BlogStats stats={activity} /></div>}
        </>
    );
};

export const ManageDraftBlogPost = ({ blog }) => {
    const { title, des, blog_id, index } = blog;
    const { userAuth: { access_token } } = useContext(UserContext);

    return (
        <div className="flex gap-5 lg:gap-10 pb-6 border-b mb-6 border-grey">
            <h1 className="blog-index text-center pl-4 md:pl-6 flex-none">{index < 10 ? `0${index}` : index}</h1>
            <div>
                <h1 className="blog-title mb-3">{title}</h1>
                <p className="line-clamp-2 font-gelasio">{des || "No Description"}</p>
                <div className="flex gap-6 mt-3">
                    <Link to={`/editor/${blog_id}`} className="pr-4 py-2 underline">Edit</Link>
                    <button
                        className="pr-4 py-2 underline text-red"
                        onClick={(e) => handleDeleteBlog(blog, access_token, e.target)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const handleDeleteBlog = (blog, access_token, target) => {
    const { index, blog_id, setStateFunc } = blog;

    // Disable the delete button to prevent multiple submissions
    target.setAttribute("disabled", true);

    axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/delete-blog`,
        { blog_id },
        { headers: { 'Authorization': `Bearer ${access_token}` } }
    )
    .then(({ data }) => {
        // Re-enable button and update state
        target.removeAttribute("disabled");

        setStateFunc(prevState => {
            const { deletedDocCount = 0, totalDocs, results } = prevState;
            results.splice(index, 1);

            if (!results.length && totalDocs - 1 > 0) {
                return null;
            }

            return { ...prevState, totalDocs: totalDocs - 1, deleteDocCount: deletedDocCount + 1 };
        });
    })
    .catch(err => {
        console.error("Error deleting blog:", err);
        // Re-enable button even on error
        target.removeAttribute("disabled");
    });
};
