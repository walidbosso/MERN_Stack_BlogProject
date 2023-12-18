import React, { useState } from "react";
// 10articleName props we took it from Params in Article.js //12setArticleinfo state for comments in Articles.js
const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState(""); //5
  const [commentText, setCommentText] = useState(""); //5
  //9 on click button callback
  const addComments = async () => {
    //10 we already defined this route in server.js, its the backend, it checks the body and URL and update the article comments in mongodb
    const result = await fetch(`/api/articles/${articleName}/add-comments`, {
      method: "post",
      //11 string to json, usernam:username, text comment, gonna be stiored in comments array
      body: JSON.stringify({ username, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    }); //end of fetch
    //12 result the one we fetshed now
    const body = await result.json();
    setArticleInfo(body); //update Article comments state
    setUsername("");
    setCommentText("");
  };
  return (
    //1
    <form className="shadow rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Add a comment</h3>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name :
      </label>
      {/* //2 we start with input className 
      //6 value = the one in state, same with comment
      //7 on change, setUsername is variable in stock, onChange yaeni each time the value in the input changes, it will be stored in state, we'll do the same for comments
      */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Comment :
      </label>
      {/* //3 rows cols and className */}
      <textarea
        rows="4"
        cols="50"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {/* //4 className 
      //8 on click, it will be handled with tha function we'll define above
      */}
      <button
        onClick={() => addComments()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouded focus:outline-none focus:shadow-outline"
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
