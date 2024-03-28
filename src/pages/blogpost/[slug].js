import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Slug = ({myblogs}) => {

    const [blog, setBlog] = useState(myblogs);
    function createMarkup(c) {
        return { __html: c };
    }

    return (
        <div className="flex justify-between items-start mt-8">
            <div className="w-1/3"></div>
            <div className="w-1/3 text-center">
                <h1 className="text-3xl font-bold mb-4">
                    {blog && blog.title}
                </h1>
                <div>
                {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
                </div>
            </div>
            <div className="w-1/3"></div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const { slug } = context.query;
    const response = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
    const myblogs = await response.json();

    return {
        props: { myblogs },
    };
}

export default Slug;