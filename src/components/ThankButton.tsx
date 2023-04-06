import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import likeV from '../assets/img/like-v.png';
import likeB from '../assets/img/h-v.png';
import commentV from '../assets/img/comm-v.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  postThankyou,
  postBookMark,
  postLoungeComment,
} from '../redux/lounges/slice';
type ThankButtonPropsType = {
  chatId: number;
  likecount: number;
  getThankYou: boolean;
};

export const ThankButton: React.FC<ThankButtonPropsType> = ({
  chatId,
  likecount,
  getThankYou,
}) => {
  const dispatch = useAppDispatch();
  const [likeCount, SetLikeCount] = useState<any>(likecount);
  const [Notify, setIsNotify] = useState<any | string>();
  const [myicon, SetMyIcon] = useState<any>(
    getThankYou == true ? likeB : likeV
  );
  const onThank = (LoungeId: any, countvalue: number) => {
    dispatch<any>(postThankyou({ LoungeId })).then((res: any) => {
      res.payload.data[0].message == 'Added' && SetLikeCount(countvalue + 1);
      res.payload.data[0].message == 'Removed' && SetLikeCount(countvalue - 1);
      res.payload.data[0].message == 'Added' && SetMyIcon(likeB);
      res.payload.data[0].message == 'Removed' && SetMyIcon(likeV);
      Notify(toast(res.payload.data[0].message));
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <span className='d-flex'>
        <div className='co-icon' onClick={() => onThank(chatId, likeCount)}>
          <img src={myicon} className='img-fluid' />
        </div>
        {likeCount}
      </span>
    </>
  );
};
