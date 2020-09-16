import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import House from "../assets/images/house.jpg";

const About = () => {
  const [topSeller, setTopSeller] = useState([]);
  const [realtors, setRealtors] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const getTopSeller = async () => {
      try {
        const res = await axios.get(
          "http://178.62.4.54/api/realtors/topseller",
          // "http://localhost:8000/api/realtors/topseller",
          config
        );
        setTopSeller(res.data);
      } catch (err) {}
    };

    getTopSeller();
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const getRealtors = async () => {
      try {
        const res = await axios.get(
          "http://178.62.4.54/api/realtors/",
          // "http://localhost:8000/api/realtors/",
          config
        );
        setRealtors(res.data);
      } catch (err) {}
    };

    getRealtors();
  }, []);

  const getAllRealtors = () => {
    let allRealtors = [];
    let results = [];

    realtors.map((realtor) => {
      return allRealtors.push(
        <Fragment key={realtor.id}>
          <div className="about__display">
            <img className="about__display__image" src={realtor.photo} alt="" />
          </div>
          <h3 className="about__realtor">{realtor.name}</h3>
          <p className="about__contact">{realtor.phone}</p>
          <p className="about__contact">{realtor.email}</p>
          <p className="about__about">{realtor.description}</p>
        </Fragment>
      );
    });

    for (let i = 0; i < realtors.length; i += 3) {
      results.push(
        <div key={i} className="row">
          <div className="col-1-of-3">{allRealtors[i]}</div>
          <div className="col-1-of-3">
            {allRealtors[i + 1] ? allRealtors[i + 1] : null}
          </div>
          <div className="col-1-of-3">
            {allRealtors[i + 2] ? allRealtors[i + 2] : null}
          </div>
        </div>
      );
    }

    return results;
  };

  const getTopSeller = () => {
    let result = [];

    topSeller.map((seller) => {
      return result.push(
        <Fragment key={seller.id}>
          <div className="about__display">
            <img className="about__display__image" src={seller.photo} alt="" />
          </div>
          <h3 className="about__topseller">Top Seller:</h3>
          <p className="about__realtor">{seller.name}</p>
          <p className="about__contact">{seller.phone}</p>
          <p className="about__contact">{seller.email}</p>
          <p className="about__about">{seller.description}</p>
        </Fragment>
      );
    });

    return result;
  };

  return (
    <main className="about">
      <Helmet>
        <title>Property Listing - About</title>
        <meta name="description" content="About us" />
      </Helmet>
      <header className="about__header">
        <h1 className="about__heading">About Property Listing</h1>
      </header>
      <section className="about__info">
        <div className="row">
          <div className="col-3-of-4">
            <h2 className="about__subheading">
              We find the perfect home for you
            </h2>
            <p className="about__paragraph">
              Property Listing Website provides fast and reliable services for
              property sales and lettings.
            </p>
            <div className="about__display">
              <img className="about__display__image" src={House} alt="" />
            </div>
            <p className="about__paragraph">
              Are you an estate agent or property owner/landlord looking to
              sell, rent or lease out property to buyers or tenants in Nigeria?
              Are you a developer building properties in Nigeria? Property
              Listing Website is Nigeria’s number one real estate and property
              website with property listings for sale, rent and lease. We offer
              Nigerian property seekers an easy way to find details of
              apartments, houses, lands, shops, office spaces and other
              commercial properties to buy or rent.
            </p>
          </div>
          <div className="col-1-of-4">{getTopSeller()}</div>
        </div>
      </section>
      <section className="about__team">
        <div className="row">
          <h2 className="about__subheading">Meet out awesome team!</h2>
        </div>
        {getAllRealtors()}
      </section>
    </main>
  );
};

export default About;
