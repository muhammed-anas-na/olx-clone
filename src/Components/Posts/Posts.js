import React, { useEffect, useContext, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import {Link} from 'react-router-dom'
import { ShimmerPostList } from "react-shimmer-effects";
import useOnlineStatus from "../../utils/useOnlineStatus";

function Posts() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        console.log("This is snapshot ==>", snapshot);
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPost);
        console.log(allPost)
      });
  }, [firebase,products]);
  
  let status = useOnlineStatus();
  if(status === false) return <div></div>

  return products.length>0? (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((data) => {
            return (
              <Link to={'/view/'+data.id}>
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={data.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {data.price}</p>
                  <span className="kilometer">{data.name}</span>
                  <p className="name">{data.category}</p>
                </div>
                <div className="date">
                  <span>{data.createdAt}</span>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):(
    <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />
  );
}
export default Posts;
