import React from "react";
//props 1
const CommentsList = ({ comments }) => {
  return (
    //2 react fragment for multiple jsx
    <>
      {/* //3 */}
      <h3 className="sm:text-2xl text-xl font-bold my-6 text-gray-900">
        Comments :
      </h3>
      {/* 4 comments we received from props, for each comment and position in comments, open brackets  */}
      {comments.map((comment, index) => (
        <div key={index}>
          <h4 className="text-xl font-bold">{comment.username}</h4>
          {/* margin top margin bottom */}
          <p className="mt-1 mb-4">{comment.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
