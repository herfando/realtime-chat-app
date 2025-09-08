'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
      } else {
        setUser(user);
      }
    };
    checkUser();

    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };
    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((currentMessages) => [...currentMessages, payload.new]);
      })
      .subscribe();

      return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const handleSendMessage = async (e) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <h2>Realtime Chat App</h2>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '10px' }}>
            <strong>User {msg.user_id.substring(0, 4)}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '8px', marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}


