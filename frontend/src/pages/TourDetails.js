// frontend/src/pages/TourDetails.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // icons
import API from '../api';
import '../styles/global.css';

export default function TourDetails({ onBookNowClick }) {
    const { id } = useParams();
    const [tour, setTour] = useState(null);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await API.get(`/tours/${id}`);
                setTour(res.data);
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };
        fetchTour();
    }, [id]);

    if (!tour) return <div className="text-center my-5"><div className="spinner-border text-success"></div></div>;

    return (
        <div className="tour-details-page">
            {/* Hero Section */}
            <section 
                className="tour-hero text-center text-white d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${tour.image || 'https://via.placeholder.com/1200x600'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60vh',
                }}
            >
                <div>
                    <h1 className="display-4 fw-bold">{tour.title}</h1>
                    <p className="lead text-light">{tour.location}</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container py-5">
                <div className="row g-5">
                    {/* Left Content */}
                    <div className="col-lg-8">
                        <div className="mb-5">
                            <h2 className="fw-bold text-success mb-3">About the Tour</h2>
                            <p className="text-muted fs-5">{tour.description}</p>
                        </div>

                        {/* Highlights */}
                        <div className="mb-5">
                            <h4 className="fw-bold mb-3">Highlights</h4>
                            <ul className="list-group list-group-flush shadow-sm">
                                <li className="list-group-item">📍 Location: {tour.location}</li>
                                <li className="list-group-item">⏱ Duration: {tour.duration}</li>
                                <li className="list-group-item">💰 Price: Ksh {tour.price}</li>
                                <li className="list-group-item">🚗 Transport Included</li>
                                <li className="list-group-item">🏨 Accommodation Available</li>
                            </ul>
                        </div>

                        {/* 🖼 Gallery Carousel */}
                        <div className="mb-5">
                            <h4 className="fw-bold mb-3">Photo Gallery</h4>
                            <div id="tourGallery" className="carousel slide shadow-sm rounded overflow-hidden">
                                <div className="carousel-inner">
                                    {tour.gallery && tour.gallery.length > 0 ? (
                                        tour.gallery.map((img, i) => (
                                            <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                                                <img
                                                    src={img}
                                                    className="d-block w-100"
                                                    alt={`Gallery ${i}`}
                                                    style={{ height: '400px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="carousel-item active">
                                            <img
                                                src={tour.image || 'https://via.placeholder.com/800x400'}
                                                className="d-block w-100"
                                                alt="Default"
                                                style={{ height: '400px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Carousel Controls */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#tourGallery" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#tourGallery" data-bs-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="col-lg-4">
                        <div className="card booking-card shadow-lg border-0 sticky-top" style={{ top: '100px' }}>
                            <div className="card-body text-center p-4">
                                <h3 className="fw-bold text-success mb-3">Ksh {tour.price}</h3>
                                <p className="text-muted mb-4">per person</p>
                                <button 
                                    className="btn btn-success btn-lg w-100 mb-3"
                                    onClick={() => onBookNowClick(tour)}
                                >
                                    Book Now
                                </button>
                                <p className="small text-muted">
                                    <i className="bi bi-shield-check text-success me-1"></i> Safe & Secure Booking
                                </p>
                                <hr />
                                <p className="mb-1"><strong>Duration:</strong> {tour.duration}</p>
                                <p className="mb-0"><strong>Location:</strong> {tour.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
