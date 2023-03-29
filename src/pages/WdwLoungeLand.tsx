import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/WdwLoungeHeader';
import { LoungeBox } from '../components/WdwLoungeBox';
import { WDWLoungeList } from '../components/WDWLoungeList';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import {
  fetchCatLoungesWdw,
  fetchDisneyWorldLounges,
  fetchStickyLoungeWdw,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { StickyPost } from '../components/StickyPostWdw';
import stickerImage from '../assets/img/stickers.jpg';

import { postLoungeWdw } from '../redux/lounges/slice';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const WdwLandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const landid = '4';

  const { items, stickyItem, status, sortByTime } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const [showPopup, setShowPopup] = useState<any | string>(true);
  const [isLoading, setIsLoading] = useState<any | string>(false);
  let subtitle: any;

  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;
  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const handleLoginClick = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchStickyLoungeWdw({}));
    dispatch(fetchCatLoungesWdw({ landid, currentPage }));
  }, [landid]);

  const onSubmit = (data: any) => {
    /*     setIsLoading(true);
    dispatch<any>(postLoungeWdw(data)).then((res: any) => {
      reset();
      setIsLoading(false);

      dispatch(
        fetchDisneyWorldLounges({
          sortType,
          LoungeId,
          currentPage,
          searchValue,
          shortByTime,
        })
      );
    }); */
  };

  //console.log(items);
  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />
            <div className='mid-card-sec'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='content__items'>
                  <div>
                    <LoungeBox
                      onSubmit={onSubmit}
                      register={register}
                      handleSubmit={handleSubmit}
                      setValue={setValue}
                      isLoading={isLoading}
                    />
                  </div>
                  {/* */}
                  {status === 'loading' ? (
                    [...new Array(9)]?.map((_, index) => (
                      <Placeholder key={index} />
                    ))
                  ) : stickyItem[0] != null ? (
                    <StickyPost obj={stickyItem[0]} mybutton={true} />
                  ) : (
                    ''
                  )}

                  {items.map((e) =>
                    e.checksticky === null ? <WDWLoungeList obj={e} /> : ''
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WdwLandLounge;
