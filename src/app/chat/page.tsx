'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export type Message = {
  id: string;
  created_at: string;
  content: string;
  user_id: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<any>(null); // Type for user can be improved later
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
      } else {
        setUser(user);
        fetchMessages();
      }
    };
    checkUser();

    // Set up real-time subscription
    const channel = supabase
      .channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages((currentMessages) => [...currentMessages, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Dependency array kosong, karena `router` tidak perlu di sini

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data as Message[]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase.from('messages').insert({
      content: newMessage,
      user_id: user.id,
    });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
        <h2>Realtime Chat App</h2>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg: Message) => (
          <div key={msg.id} style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#eef', borderRadius: '8px' }}>
            <strong style={{ color: '#555' }}>User {msg.user_id.substring(0, 4)}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc', gap: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          disabled={!user}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
          disabled={!user}
        >
          Send
        </button>
      </form>
    </div>
  );
}