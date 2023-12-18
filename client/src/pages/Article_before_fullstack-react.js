import React from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFound from "./NotFound";

const Article = () => {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);
  if (!article) return <NotFound />; //<h1>Articls does not exist</h1>;
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {/* for each paragraph in article we found .content  (array), index is always necessary when dealing with array or ul li in react, index is index 0 1 2 3 4*/}
      {article.content.map((paragraph, index) => (
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Article;
