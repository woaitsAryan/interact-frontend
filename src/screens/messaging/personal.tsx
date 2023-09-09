import Loader from '@/components/common/loader';
import PersonalChatCard from '@/components/messaging/personal_chat_card';
import { SERVER_ERROR } from '@/config/errors';
import { MESSAGING_URL } from '@/config/routes';
import socketService from '@/config/ws';
import getHandler from '@/handlers/get_handler';
import { Chat } from '@/types';
import getMessagingUser from '@/utils/get_messaging_user';
import sortChats from '@/utils/sort_chats';
import Toaster from '@/utils/toaster';
import React, { useEffect, useState } from 'react';

const Personal = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    setLoading(true);
    const URL = `${MESSAGING_URL}/personal`;
    const res = await getHandler(URL);
    if (res.statusCode == 200) {
      setChats(sortChats(res.data.chats || []));
      setFilteredChats(res.data.chats || []);
      setLoading(false);
    } else {
      if (res.data.message) Toaster.error(res.data.message);
      else Toaster.error(SERVER_ERROR);
    }
  };

  const filterChats = (search: string | null) => {
    if (!search || search == '') setFilteredChats(chats);
    else
      setFilteredChats(
        chats.filter(chat => {
          const messagingUser = getMessagingUser(chat);
          if (messagingUser.name.match(search) || messagingUser.username.match(search)) return true;
          return false;
        })
      );
  };

  useEffect(() => {
    fetchChats();
    socketService.setupChatListRoutes(setChats);
  }, []);

  useEffect(() => {
    filterChats(new URLSearchParams(window.location.search).get('search'));
  }, [window.location.search]);

  return (
    <div className="w-full flex flex-col gap-2 p-2">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!new URLSearchParams(window.location.search).get('search') ? (
            <>
              {chats.length > 0 ? (
                <>
                  {chats.map(chat => {
                    return <PersonalChatCard key={chat.id} chat={chat} />;
                  })}
                </>
              ) : (
                <div>No Chats found</div>
              )}
            </>
          ) : (
            <>
              {filteredChats.length > 0 ? (
                <>
                  {filteredChats.map(chat => {
                    return <PersonalChatCard key={chat.id} chat={chat} />;
                  })}
                </>
              ) : (
                <div>No Chats found</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Personal;