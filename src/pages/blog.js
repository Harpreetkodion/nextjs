import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`);
    setCount(count + 2);
    let data = await d.json();
    setBlogs(data);
  };

  return (
    <div className="text-white min-h-screen flex justify-center items-center">
      <main className="container mx-auto">
        <div className="flex justify-center"> 
          <div className="sm:grid-cols-2 gap-8">
            <InfiniteScroll
              dataLength={blogs.length}
              next={fetchData}
              hasMore={props.allCount !== blogs.length}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {blogs.map((blogitem) => (
                <div key={blogitem.slug} className="p-4 rounded-lg">
                  <Link href={`/blogpost/${blogitem.slug}`}>
                    <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-500">{blogitem.title}</h3>
                  </Link>
                  <p className="mt-2">{blogitem.desp.substr(0, 140)}...</p>
                  <Link href={`/blogpost/${blogitem.slug}`}>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Read More</button>
                  </Link>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </main>
    </div>
  );
  
  

};

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8');
    allBlogs.push(JSON.parse(myfile));
  }

  return {
    props: { allBlogs, allCount },
  };
}
export default Blog;