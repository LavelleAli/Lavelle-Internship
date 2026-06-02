import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ExploreItems.css"

const ExploreItems = () => {

const [exploreItems, setExploreItems] = useState([]);


const getExploreItems = useCallback( async () => {
  try {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
    setExploreItems(data);
    console.log(data);
  } catch (error) {
    console.log("Error fetching Explore Items Data:", error);
  }
});

useEffect(() => {
  getExploreItems();
}, []);


function renderExploreItemsData(explore, id ) {
  return (
    <div
          key={id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
         >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={explore.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {explore.expiryDate && <CountdownTimer expiryDate={explore.expiryDate} />}

            <div className="nft__item_wrap">
              <Link to="/item-details">
                <img src={explore.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{explore.title}</h4>
              </Link>
              <div className="nft__item_price">{explore.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{explore.likes}</span>
              </div>
            </div>
          </div>
        </div>
  )
}

function getTimeLeft(expiryDate) {
  const diff = expiryDate - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  const { hours, minutes, seconds } = timeLeft;
  return (
    <div className="de_countdown">
      {String(hours).padStart(2, "0")}h &nbsp;
      {String(minutes).padStart(2, "0")}m &nbsp;
      {String(seconds).padStart(2, "0")}s
    </div>
  );
}

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.slice(0, 8).map((explore, index) => renderExploreItemsData(explore, index)) }

      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
