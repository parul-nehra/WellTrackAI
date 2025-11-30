'use client';
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaHeartbeat } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function HealthChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your WellTrackAI health assistant. Ask me anything about fitness, nutrition, sleep, mental wellness, or healthy habits!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('API Error:', response.status, data);
                const errorMsg = response.status === 429
                    ? 'The AI service is currently unavailable due to high demand. Please try again in a few moments.'
                    : 'Service temporarily unavailable. Please try again.';
                setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
                return;
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Fetch Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please check your internet and try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 flex items-center justify-center z-40"
            >
                <FaHeartbeat size={24} />
            </button>

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
                    <div className="bg-teal-600 text-white p-4 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaHeartbeat size={20} />
                            <span className="font-semibold">Health Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-teal-700 p-1 rounded">
                            <FaTimes size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    {msg.role === 'user' ? (
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                    ) : (
                                        <div className="text-sm prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about health..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
