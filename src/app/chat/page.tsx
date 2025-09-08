// src/app/chat/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // atau "../../lib/supabaseClient"
import { useRouter } from 'next/navigation';
import { Message } from '@/types/index'; // Import tipe yang sudah dibuat

export default function ChatPage() {
  // Ganti `useState([])` dengan `useState<Message[]>([]);` untuk memberitahu TypeScript bahwa `messages` adalah array dari objek `Message`.
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<any>(null); // Boleh pakai any untuk sementara

  useEffect(() => {
    // ... kode yang lain

    const fetchMessages = async () => {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        // Beri tahu TypeScript bahwa `data` adalah array `Message`
        setMessages(data as Message[]);
      }
    };
    fetchMessages();

    const channel = supabase
      .channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        // Tipe `payload.new` adalah `any`. Kita harus casting ke `Message`.
        const newMessage = payload.new as Message;
        setMessages((currentMessages) => [...currentMessages, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const handleSendMessage = async (e: React.FormEvent) => { // Tambahkan tipe `React.FormEvent` pada `e`
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
    // ...kode JSX yang lain
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
      {messages.map((msg: Message) => ( // Tambahkan tipe `Message` pada `msg`
        <div key={msg.id} style={{ marginBottom: '10px' }}>
          <strong>User {msg.user_id.substring(0, 4)}:</strong> {msg.content}
        </div>
      ))}
    </div>
    // ...kode JSX yang lain
  );
}