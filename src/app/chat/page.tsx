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


