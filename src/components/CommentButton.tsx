import { useEffect, useRef,useState } from 'react'
import commentV from '../assets/img/comm-v.png';
type CommentButtonPropsType = {
  chatId: number,
  commentcount: number,

}

export const CommentButton: React.FC<CommentButtonPropsType> = ({ chatId, commentcount, }) => {



 return (

<>


         <span className="d-flex"><div className="co-icon">
         <img
          src={commentV}
      className="img-fluid"
        /></div>{commentcount}</span>                   
    </>
  )
}

