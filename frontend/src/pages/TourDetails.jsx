import React, { useEffect, useRef, useState, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from './../utils/avgRating';
import avatar from "../assets/images/avatar.jpg";
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';
import { authContex } from '../context/AuthContext';
import { AuthContext } from '../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const reviewMsgRef = useRef('');
  const { user ,dispatch} = useContext(AuthContext);
  const [tourRating, setTourRating] = useState(null);

  // Scroll to top when the tour data changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !tour) {
    return <p>Tour not found or an error occurred.</p>;
  }

  const { photo, title, desc, price, adress, reviews, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
        alert('Please sign in to submit a review.');
        return;
      }

      const reviewObj = {
        username: user.username,
        reviewText,
        rating: tourRating,
      };

      try {
        const res = await fetch(`http://localhost:4000/api/v1/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reviewObj),
        });
  
        if (!res.ok) {
          throw new Error('Failed to submit review');
        }
  
        const result = await res.json();
        alert(result.message);
      } catch (err) {
        console.error(err);
        alert('An error occurred while submitting the review.');
      }
    }
    catch (err) {
      console.error(err);
      alert('An error occurred while submitting the review.');
    }
    finally {
      reviewMsgRef.current.value = '';
      setTourRating(null);
    }
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };
  const handleLogin = () => {
    // Logic to handle login
    // For example, redirect to login page or show a login modal
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={photo} alt={title} />
              <div className="tour__info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      'Not rated'
                    ) : (
                      <span>({reviews?.length})</span>
                    )}
                  </span>

                  <span>
                    <i className="ri-map-pin-user-fill"></i>{adress}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span>
                    <i className="ri-map-pin-2-fill"></i>{city}
                  </span>

                  <span>
                    <i className="ri-money-dollar-circle-fill"></i>RS.{price} /per person/
                  </span>

                  <span>
                    <i className="ri-map-pin-time-line"></i>{distance} k/m
                  </span>

                  <span>
                    <i className="ri-group-fill"></i>{maxGroupSize} People
                  </span>
                </div>

                <h5>Description</h5>
                <p>{desc}</p>
              </div>
              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>
                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span key={rating} onClick={() => setTourRating(rating)}>
                        {rating}<i className="ri-star-fill"></i>
                      </span>
                    ))}
                  </div>
                  <div className="review__input">
                    <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                    <button className="btn primary__btn text-white" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user__reviews">
                  {reviews?.map((review, index) => (
                    <div className="review__item" key={index}>
                      <img src={avatar} alt="User avatar" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.username || "Anonymous"}</h5>
                            <p>{new Date(review.date || Date.now()).toLocaleDateString("en-US", options)}</p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}<i className="ri-star-fill"></i>
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;