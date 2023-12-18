import React, { useState, useEffect } from "react"; //1
import { useParams } from "react-router-dom";
import articleContent from "./article-content";

// Pages
import NotFound from "./NotFound";

// Components
import Articles from "../components/Articles";
import CommentsList from "../components/CommentsList"; //after creating CommentsList.js, and finishing useEffect
import AddCommentForm from "../components/AddCommentForm"; //after finishing with commentList and  creating AddCommentForm.js

const Article = () => {
  const { name } = useParams();
  console.log(name);

  const article = articleContent.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ comments: [] }); //2

  useEffect(() => {
    //3
    // console.log("all good");
    //4 we cant use async directly in useEffect(async() like this, instead we create a function inside useEffect)
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    };
    //call the function to run
    fetchData();
    //useEffect to run only when name from params change
  }, [name]);

  if (!article) return <NotFound />; //<h1>Articls does not exist</h1>;
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>

      {/* for each paragraph in article we found .content  (array), index is always necessary when dealing with array or ul li in react, index is index 0 1 2 3 4*/}
      {article.content.map((paragraph, index) => (
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
          {paragraph}
        </p>
      ))}
      {/* articleInfo the one in state and we fetshed it using useState from the /api, mongodb, and its passed as props, the function/file can use it */}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
        Other Articles
      </h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles} />
      </div>
    </>
  );
};

export default Article;
