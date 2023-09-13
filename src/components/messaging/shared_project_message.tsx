import { Message } from '@/types';
import React from 'react';
import Image from 'next/image';
import { PROJECT_PIC_URL, USER_PROFILE_PIC_URL } from '@/config/routes';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useRouter } from 'next/router';

interface Props {
  message: Message;
}

const SharedProjectMessage = ({ message }: Props) => {
  const userID = Cookies.get('id');
  const router = useRouter();
  return (
    <div
      key={message.id}
      className={`w-full flex gap-2 font-Helvetica ${message.userID === userID ? 'flex-row-reverse' : ''}`}
    >
      <Image
        crossOrigin="anonymous"
        width={10000}
        height={10000}
        alt={'User Pic'}
        src={`${USER_PROFILE_PIC_URL}/${message.user.profilePic}`}
        className={'rounded-full w-8 h-8 cursor-pointer border-[1px] border-black'}
      />
      <div className={`w-1/3 flex flex-wrap gap-2 ${message.userID === userID ? 'flex-row-reverse' : ''}`}>
        <div className="w-fit max-w-[27rem] flex flex-col text-sm cursor-default rounded-xl px-4 py-2 bg-primary_comp_hover gap-2">
          <div className="w-full min-w-[240px] font-primary text-white border-[1px] border-primary_btn rounded-lg p-4 flex flex-col items-center gap-6 max-md:gap-4 transition-ease-300 cursor-pointer">
            <Image
              crossOrigin="anonymous"
              width={10000}
              height={10000}
              alt={'User Pic'}
              src={`${PROJECT_PIC_URL}/${message.project.coverPic}`}
              className={'w-[200px] h-[200px] max-md:w-[120px] max-md:h-[120px] rounded-lg object-cover'}
            />

            <div className="w-full flex flex-col gap-4 max-md:gap-2 px-8">
              <div className="w-full flex flex-col items-center gap-1">
                <div className="font-bold text-center text-2xl text-gradient">{message.project.title}</div>
                <div className="text-sm">{message.project.tagline}</div>
                <div className="text-xs font-thin">{moment(message.project.createdAt).fromNow()}</div>
              </div>

              <div className="w-full flex justify-center flex-wrap gap-2">
                {message.project.tags &&
                  message.project.tags // Splicing causes array mutation
                    .filter((tag, index) => {
                      return index >= 0 && index < 3;
                    })
                    .map(tag => {
                      return (
                        <div
                          key={tag}
                          className="flex-center p-2 font-primary text-xs text-white border-[1px] border-primary_btn rounded-xl"
                        >
                          {tag}
                        </div>
                      );
                    })}
                {message.project.tags && message.project.tags.length - 3 > 0 ? (
                  <div className="flex-center p-2 font-primary text-xs text-white border-[1px] border-primary_btn rounded-xl">
                    + {message.project.tags.length - 3}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {message.content != '' ? (
            <div className="border-t-[1px] border-white pt-2 border-dashed">{message.content}</div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={` flex items-center gap-1 text-xs self-end ${message.userID === userID ? 'flex-row-reverse' : ''}`}
        >
          <div>•</div>
          <div> {moment(message.createdAt).format('hh:mm A')}</div>
        </div>
      </div>
    </div>
  );
};

export default SharedProjectMessage;
