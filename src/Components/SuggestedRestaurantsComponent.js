import React, {useEffect, useState} from "react" 
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button' 
import comment from '../Images/comment.svg' 
import restaurant from '../Images/restaurant.svg'
import '../App.css'
import restaurantSuggestionApi from "../Api/RestaurantSuggestionApi"

export default function SuggestedRestaurantsComponent(){

     const navigate = useNavigate();

    const [error, setError] = useState(false) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [RestaurantList, setRestaurantList] = useState([]) 
    const [showRestaurants, setShowRestaurants] = useState(false) 


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user")) || {}
        console.log("User: ", user);
        let latitude = user.latitude;
        let longitude = user.longitude;
    
        //api call
        restaurantSuggestionApi.findTop3(latitude, longitude)
            .then(
                (results) => {
                    setIsLoaded(true);
                    if (results.length === 0) {
                        setError(true);
                    } else {
                        setRestaurantList(results);
                        setShowRestaurants(true);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                    console.error(error);
                }
            );
    }, []);
    

    const onSubmit = (e) => {
        e.preventDefault() 
        let user = JSON.parse(localStorage.getItem("user")) || {}
        console.log("User: ", user);
        let latitude = user.latitude;
        let longitude = user.longitude;
    
        //api call
        restaurantSuggestionApi.findTop3(latitude, longitude)
            .then(
                (results) => {
                    setIsLoaded(true);
                    if (results.length === 0) {
                        setError(true);
                        window.alert("User review created successfully!") 
                    } else {
                        setRestaurantList(results);
                        setShowRestaurants(true);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                    console.error(error);
                }
            );
    }

    function formatScore(score) {
    
        const formattedScore = score.toFixed(2);
    
        return formattedScore;
    }

    const routeToComment = (e, restaurantId) => {
        e.preventDefault();
        console.log("id:", restaurantId);
        localStorage.setItem("restaurantId", restaurantId) ;
        navigate(`/comment/${restaurantId}`); // Redirect to CommentComponent with the restaurant ID in the URL
    };

    if(error){
        return (<div className="container">
            <h1>Sorry, we couldn't find any restaurants nearby. Please try again with a different location.</h1>
            <button className='input_submit' onClick={(e) => onSubmit(e)}> 'Refresh'</button>
            </div>) 
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
                <h1 key={1} style={{color: 'white', fontFamily: "Palatino"}}>Suggested Restaurants</h1>
            
                <div key={2} className="container_restaurant" >
                    {RestaurantList.map( _Restaurant => (
                        <Card border="secondary" style={{ width: '19rem',  maxWidth: 250, height: '33rem',  maxHeight: 450, margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                            <Card.Header>
                                <Card.Title style={{color: '#191970', fontWeight: 'bold'}}>{_Restaurant.name}</Card.Title>
                                <Card.Img key={`${_Restaurant.id}-img`} style={{ width: "auto", maxHeight: "200px", padding: '5px', position: 'relative' }} variant="top" src={restaurant} />
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                <ListGroup.Item style={{color: '#e6e6fa'}}><strong>Category:</strong> {_Restaurant.category}</ListGroup.Item>
                                        <ListGroup.Item style={{color: '#fff0f5'}}><strong>Score:{formatScore(_Restaurant.score)}</strong></ListGroup.Item>
                                        <ListGroup.Item style={{color: '#fff0f5'}}><strong>Latitude:</strong>{_Restaurant.latitude}</ListGroup.Item>
                                        <ListGroup.Item style={{color: '#fff0f5'}}><strong>Longitude:</strong> {_Restaurant.longitude}</ListGroup.Item>
                                        <ListGroup.Item style={{color: '#fff0f5'}}><strong>E-Mail:</strong> {_Restaurant.email}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        
        ) 
    }
}