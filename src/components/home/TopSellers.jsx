import {useCallback, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {

const [topSellersData, setTopSellersData] = useState([]);
const [loading, setLoading] = useState(true);


const getTopsellersData = useCallback(async () => {
  try {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);

    setTopSellersData( data );
    console.log(topSellersData)
  }
  catch (error) {
    console.log("Error fetching topSellersData", error)
  }
})

useEffect(() => {
 { getTopsellersData()};
}, [])







  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                    <span>2.1 ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
