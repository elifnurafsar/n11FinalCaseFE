import React, { useState } from 'react';
import createUserReview from "../Api/UserReviewApi"
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import UserReviewApi from '../Api/UserReviewApi';

const CommentComponent = ({restaurantId}) => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState(1);
    

  const handleSubmit = async (e) => {
    e.preventDefault()
    let restaurantId = localStorage.getItem("restaurantId");
    let user = JSON.parse(localStorage.getItem("user")) || {}
    console.log("User: ", user);
    
    
    console.log('User ID:', user.id);
    console.log('Comment:', comment);
    console.log('Rate:', rate);

    console.log("restaurantId:", restaurantId)

    let createUserReviewRequest = {
        userId: user.id,
        restaurantId: restaurantId,
        rate: rate,
        comment: comment
    }

    try {
        
        const response = await UserReviewApi.createUserReview(createUserReviewRequest);
        
        toast.success('User review created successfully');
        window.alert("User review created successfully!");
        console.log('User review created:', response);
    } catch (error) {
        
        window.alert('Error creating user review');
        console.error('Error creating user review:', error);
    }

  };

  const returnToMain = (e) => {
    e.preventDefault();
    navigate(`/`); 
};

  return (
    <div key={0} style={{backgroundColor: '#000080', height: "100vh", overflow: "auto", marginRight: "-20px", marginTop: "-30px", paddingRight: "20px"}}>
 
      <h1 key={1} style={{color: 'white', fontFamily: "Palatino"}}>Leave a Comment</h1>

      <form className='input'>
            <div className="input_card">
                <h1 style={{ color: 'white' }}>Leave a Comment</h1>

                <div>
                    <label className="white_label"><b>Comment</b></label>
                    <input
                        type="text"
                        className="input_box"
                        placeholder="Enter your comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div>
                    <label className="white_label"><b>Rating</b></label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="input_box"
                        placeholder="Enter rating (1-5)"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                </div>

                <button className='input_submit' onClick={(e) => handleSubmit(e)}> Save </button>
            </div>
        </form>
    </div>
  );
};

export default CommentComponent;
