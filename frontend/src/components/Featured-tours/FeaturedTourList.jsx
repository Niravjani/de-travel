import React from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';
import useFetch from '../../hooks/useFetch.js';

export const BASE_URL = "http://localhost:4000/api/v1";

const FeaturedTourList = () => {
  const { data: featuredTour, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeatured`);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching data:', error); // Log the error
    return <p>Error: {error}</p>;
  }
  if (!featuredTour || featuredTour.length === 0) {
    return <p>No featured tours available.</p>;
  }

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!loading && !error && featuredTour.map((tour) => (
        <Col lg="3" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;