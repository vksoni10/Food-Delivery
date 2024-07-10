import axios from 'axios';
// import axios from '../Config/Interceptor';
import React, { useState } from 'react';
// import { toast } from 'react-toastify';

export default function Comment(props) {
    const {product_id, user_id} = props
    // console.log(product_id, user_id)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [commentClicked, setCommentClicked] = useState(false);
    const [message, setMessage] = useState('')

    const handleStarClick = (index) => {
        setRating(index);
        console.log(index)
    };

    // const handleCommentClick = () => {
    //     setCommentClicked(true);
    // };

    // const handleSubmit = () => {
    //     alert('Comment submitted!');
    // };
    const handleSubmit =()=>{
        console.log(rating, comment, "Hello")
        if(!rating){
            // toast.warn('Please rate the product first')
            // toast.error('Please rate the product first')
            return 
        }
        // if(!comment){
        //     return alert('Please rate the product first')
        // }
        setMessage('')
        // axios.post(`${BASE_URL}/user/add-rating/${product_id}`,{
        //     user_id:user_id,
        //     rating: rating,
        //     comment: comment
        // })
        // .then((result)=>{
        //     console.log(result.data)
        //     alert(result.data.message)
        //     setMessage(result.data.message)
        //     window.location.reload()
        //   }).catch((error)=>{
        //   console.log(error)
        //   // alert(error)
        // })
      }

    return (
        <div className={`containe mt-1 w-100 `} >
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-12"> {/* Adjusted width and added col-lg-6 for landscape mode */}
                    <div className="card border-secondary w-100" style={{width: 'fit-content'}}>
                        <div className="card-header bg-primary d-flex justify-content-center align-items-center mb-0 ">
                                <h2>Rate The Product</h2>
                            {/* <span className="mb-0"></span> */}
                        </div>
                        <div className="card-body" >
                            <div className="text-center">                               
                                <div className="rating-stars mb-3 fs-1">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            style={{cursor:'pointer'}}
                                            className="star text-warning cursor-pointer"
                                            onClick={() => handleStarClick(index)}>
                                            {index <= rating ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className='bg-light'>(Optional)</span>
                            <textarea
                                className={`form-control mb-3 `}
                                placeholder="Enter your comment here"
                                rows={4}
                                value={comment}
                                
                                // onInput={(e) => {
                                //     const maxLength = 200;
                                //     const input = e.target.value;
                                //     const trimmedInput = input.slice(0, maxLength);
                                //     e.target.value = trimmedInput;
                                //     setPincode(trimmedInput); // Update the state with the trimmed input
                                //   }}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div  style={{display:'flex', justifyContent:'space-between'}}>

                                <span className='bg-light'>({comment.length} characters)</span>
                                <span className='text-danger'>{comment.length > 199 ? '(0 to 200 characters allowed)': <></> }</span>
                            </div>
                            {
                                message ?
                                <h6 className='text-danger'>{message}</h6>
                                :<></>
                            }
                            <button className="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
