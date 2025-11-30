'use client';
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaDumbbell, FaAppleAlt, FaBrain, FaHeart, FaRunning, FaBed } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function AIAssistantPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your WellTrackAI health assistant. Ask me anything about fitness, nutrition, sleep, mental wellness, or use the quick prompts below!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const quickPrompts = [
        { icon: FaDumbbell, text: 'Create a 30-day workout plan', color: 'bg-teal-50 text-teal-600 hover:bg-teal-100' },
        { icon: FaAppleAlt, text: 'Suggest a healthy meal plan for weight loss', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
        { icon: FaBed, text: 'Tips to improve sleep quality', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
        { icon: FaBrain, text: 'Meditation techniques for beginners', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
        { icon: FaHeart, text: 'How to reduce stress naturally', color: 'bg-pink-50 text-pink-600 hover:bg-pink-100' },
        { icon: FaRunning, text: 'Best exercises for cardio health', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text) => {
        if (!text.trim() || loading) return;

        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setLoading(true);
        setInput('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = response.status === 429
                    ? 'The AI service is currently unavailable. Please try again later.'
                    : 'Service temporarily unavailable. Please try again.';
                setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
                return;
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <FaRobot className="text-teal-600" />
                    WellTrackAI Assistant
                </h1>
                <p className="text-gray-600 mt-1">Your personal AI health companion</p>
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-xl ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                {msg.role === 'user' ? (
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                ) : (
                                    <div className="text-sm prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-ul:text-gray-800 prose-ol:text-gray-800">
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 p-4 rounded-xl">
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

                {messages.length === 1 && (
                    <div className="p-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Prompts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {quickPrompts.map((prompt, idx) => {
                                const Icon = prompt.icon;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => sendMessage(prompt.text)}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${prompt.color}`}
                                    >
                                        <Icon className="text-lg" />
                                        <span className="text-sm font-medium">{prompt.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-4 border-t border-gray-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about health..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
