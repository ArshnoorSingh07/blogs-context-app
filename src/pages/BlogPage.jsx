import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
// import { baseUrl } from '../baseUrl';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
  
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

  const [blog,setBlog]=useState(null);
  const [relatedBlogs,setRelatedBlogs]=useState([]);
  const navigation=useNavigate();
  const location=useLocation();
  const blogId=location.pathname.split("/").at(-1);

  const {setLoading ,loading}=useContext(AppContext);

  async function fetchRelatedBlogs(){
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log("URL is: ");
    console.log(url);

    try{
      const response=await fetch(url);
      const data=await response.json();

      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    }
    catch(error){
      console.log("Error in Blog id Call");
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(blogId){
      fetchRelatedBlogs();
    }
  },[location.pathname])
  
  return (
  
    <div>
      <Header/>
      <div>
        <button
        onClick={()=>navigation(-1)}
        >Back</button>
      </div>
      {
        loading 
          ? (
              <div>
                <p>Loading</p>
              </div>
            )
          : (
              blog 
              ? (
                <div>
                  <BlogDetails post={blog}/>
                  <h2>Related Blogs</h2>
                  {
                    relatedBlogs.map((post)=>(
                      <div key={post.id}>
                        <BlogDetails post={post}/>
                      </div>
                    ))
                  }
                </div>
              )
              : (
                  <div>
                    <p>
                      No blog found
                    </p>
                  </div>
              )
            ) 
      }
    </div>

  )
}

export default BlogPage