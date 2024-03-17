import React, {useEffect, useState} from "react" 
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import '../App.css'
import UserReviewApi from "../Api/UserReviewApi"

export default function ListComents({restaurantId}){

    const navigate = useNavigate();

    const [error, setError] = useState(false) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [reviewList, setReviewList] = useState([]) 
    const [showReviews, setShowReviews] = useState(false) 


    useEffect(() => {

        let restaurantId = localStorage.getItem("restaurantId");

        //api call
        UserReviewApi.getUserReviewsByRestaurantId(restaurantId)
            .then(
                (results) => {
                    setIsLoaded(true);
                    console.log("results", results.userReviewsList);
                    if (results.length === 0 || results.userReviewsList.length == 0) {
                        setError(true);
                    } else {
                        setReviewList(results.userReviewsList);
                        setShowReviews(true);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                    console.error(error);
                }
            );
    }, []);

    const routeToHome = (e) => {
        e.preventDefault();
        navigate(`/`); // Redirect to CommentComponent with the restaurant ID in the URL
    };

    if(error){
        return(
            <div>
                <div className="container">
                    <h1>There isn't any comment for this restaurant.</h1>
                    <button className='input_submit' onClick={(e) => routeToHome(e)}> 'Go Back'</button>
                </div>
            </div>
        )
    }
    else if(!isLoaded){
        return (
            <div>
               LOADING...
            </div>
        ) 
    }
    else{
        return(
            <div key={0} style={{backgroundColor: '#000080', height: "100vh", overflow: "auto", marginRight: "-20px", marginTop: "-30px", paddingRight: "20px"}}>
            <h1 key={1} style={{color: 'white', fontFamily: "Palatino"}}>Reviews</h1>
        
            <div key={2} className="container_restaurant">
                {reviewList.map((review, index) => (
                    <div key={index} className="review-container">
                        <div className="review">
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <p><strong>Rating:</strong> {review.rate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        ) 
    }
}