import { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentReply } from './CommentReply';
import stickerImage from '../assets/img/stickers.jpg';
import { useForm } from 'react-hook-form';
import { StickerTabs } from '../components/StickerTabs';
import ReactQuill from 'react-quill';
import { selectLounges } from '../redux/lounges/selectors';
import imageicon from '../assets/img/chart-icon1.png';
import emojiicon from '../assets/img/chart-icon2.png';
import { MentionsInput, Mention } from 'react-mentions';
import imageiconh from '../assets/img/chart-icon1h.png';
import emojiiconh from '../assets/img/chart-icon2h.png';
import { RichTextEditor } from '@mantine/rte';
import { fetchUser } from '../redux/lounges/slice';
import { useAppDispatch } from '../redux/store';
import axios, { AxiosResponse } from 'axios';
import { GET_BASE_URL } from '../constants/apiEndpoints';

type CommenBoxPropsType = {
  chatId: any;
  onSubmit: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  stickerData: any;
};

type FormData = {
  chat_msg: string;
  chat_id: number;
};

export const CommentBox: React.FC<CommenBoxPropsType> = ({
  chatId,
  onSubmit,
  register,
  handleSubmit,
  setValue,
  stickerData,
}) => {
  // const { register, setValue, handleSubmit,getValues, formState: { errors } } = useForm<FormData>();
  const [showSticker, SetShowSticker] = useState<any | string>(false);
  const [stickerSelection, SetStickerSelection] = useState<any | string>(null);
  const token = localStorage.getItem('token');
  const { stickerPickItems } = useSelector(selectLounges);

  const [text, setText] = useState('');

  const textRef = useRef(null);

  useEffect(() => {
    register('chat_msg', { required: true, minLength: 11 });
    setValue('chat_msg', text);
    let up = document.getElementsByClassName('mantine-RichTextEditor-root');
    // up[0].scrollTop = up[0].scrollHeight;

    let editor = (textRef.current  as any ).getEditor();
    let cursorPos = editor.getSelection();
    // console.log("cursorPos AfterChange=> ", stickerPickItems, cursorPos?.index);
    
    // console.log("flag", flag);
      (textRef.current  as any ).getEditor().setSelection(text.length, 0);
    // console.log("ref => ", (textRef.current  as any ).getEditor());
    
  }, [text]);

  
  useEffect(() => {
    setText(text.replace(/<p>|<\/p>/, '') + stickerPickItems);
    
    // let up = document.getElementsByClassName('mantine-RichTextEditor-root');
    // up[0].scrollTop = up[0].scrollHeight;
  }, [stickerPickItems]);

  /*   const onEditorStateChange = (editorState: any) => {
    setValue('chat_msg', editorState);
  };
 */
  let navigate = useNavigate();
  const openSticker = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      SetShowSticker(!showSticker);
    }
  };

  const dispatch = useAppDispatch();
  const [people, SetPeople] = useState<any | string>([]);

  const tags = [
    { id: 1, value: 'JavaScript' },
    { id: 2, value: 'TypeScript' },
    { id: 3, value: 'Ruby' },
    { id: 3, value: 'Python' },
  ];

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\-sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (
        searchTerm: any,
        renderList: any,
        mentionChar: any,
        callback: any
      ) => {
        if (searchTerm.length > 0) {
          axios
            .get(GET_BASE_URL + '/backend/api/v1/getUser?name=' + searchTerm)
            .then((response: any) => {
              const includesSearchTerm = response.data.data.filter(
                (item: any) =>
                  item.value.toLowerCase().includes(searchTerm.toLowerCase())
              );

              renderList(includesSearchTerm);
            });

          const list = mentionChar === '@' ? people : tags;
        }
      },
    }),
    []
  );

  // console.log(text);
  return (
    <div>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}
        method='POST'
      >
        <div className='com-box-main'>
          <div className='com-box d-flex'>
            <RichTextEditor
              id='rte'
              placeholder='Type comment and @ to tag user..'
              mentions={mentions}
              value={text}
              onChange={setText}
              controls={[[]]}
              ref={textRef}
            />

            <input
              type='hidden'
              readOnly={true}
              {...register('chat_id')}
              defaultValue={chatId}
            />

            <div className='icon-ic d-flex'>
              <div className='icon-ic0' onClick={handleSubmit(onSubmit)}></div>
              <div className='icon-ic1' onClick={openSticker}></div>
            </div>
          </div>
        </div>
      </form>
      {showSticker == true && (
        <div>
          <StickerTabs tabData={stickerData} />
        </div>
      )}
    </div>
  );
};
