import React, { useContext , useEffect , useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import {useParams} from 'react-router-dom'
import { ShimmerThumbnail } from "react-shimmer-effects";
import {Image , Shimmer} from 'react-shimmer'

import './View.css';
function View() {
  const [data,setData] = useState();
  const [seller,setSeller] = useState();
  const {id} = useParams();
  const {firebase} = useContext(FirebaseContext);
  const isDatahere = data;
  useEffect(()=>{
    firebase.firestore().collection('products').doc(id).get().then((response)=>{
      console.log("This is response ==>",response.data())
      setData(response.data());
      console.log("userid==>" , response.data().userId);
      firebase.firestore().collection('users').where('id','==',response.data().userId).get().then((userSnap)=>{
        console.log("UserData ==>",userSnap.docs[0].data())
        setSeller(userSnap.docs[0].data());
      })
    })
  },[data,seller])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <Image src={data ? data.url : ''} fallback={<Shimmer width={800} height={600} />} />
      </div>
      {isDatahere ? (
        <div className="rightSection">
          <div className="productDetails">
            <h2 className='heading'>Product Details</h2>
            <p>&#x20B9; {data ? data.price : 'Loading...'} </p>
            <span>{data ? data.name : 'Loading...'}</span><br />
            <span>{data ? data.category : 'Loading...'}</span><br />
            <span>{data ? data.createdAt : 'Loading...'}</span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{seller ? seller.username : 'Loading...'}</p>
            <p>{seller ? seller.phone : 'Loading...'}</p>
          </div>
        </div>
      
      ) : (
        <ShimmerThumbnail height={250} width={350} className='shimmerCard'/>
      )}
    </div>
  );
  
}
export default View;
