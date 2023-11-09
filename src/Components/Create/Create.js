import React, { Fragment , useState , useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext , AuthContext} from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [createData , setCrateData] = useState({name:'',category:'',price:'',image:''})
  const navigate = useNavigate()
  const {user} = useContext(AuthContext);
  const {firebase} =useContext(FirebaseContext);

  function handleSubmit(e){
    const date = new Date();
    e.preventDefault()
    firebase.storage().ref(`/Images/${createData.image.name}`).put(createData.image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        firebase.firestore().collection('products').add({
          name:createData.name,
          category:createData.category,
          price:createData.price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        navigate('/')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={createData.name}
              onChange={(e)=>setCrateData({...createData , name:e.target.value})}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={createData.category}
              onChange={(e)=>setCrateData({...createData , category:e.target.value})}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input"
            type="number" 
            id="fname"
            value={createData.price}
            onChange={(e)=>setCrateData({...createData , price:e.target.value})}
            name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={createData.image ? URL.createObjectURL(createData.image) : ''}></img>
          <form>
            <br />
            <input onChange={(e)=>{
              setCrateData({...createData , image:e.target.files[0]})
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
