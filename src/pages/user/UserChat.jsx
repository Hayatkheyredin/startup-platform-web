/**
 * User Live Chat - Chat with team members. Simulated text + voice; you send text.
 * Team: Saba Baltna — Tsion Solomon, Meron, Hayat, Mekdelawit.
 */
import React, { useState, useRef, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../../lib/authStorage'

const TEAM = {
  name: 'Saba Baltna',
  members: [
    { id: 'tsion', name: 'Tsion Solomon' },
    { id: 'meron', name: 'Meron' },
    { id: 'hayat', name: 'Hayat' },
    { id: 'mekdelawit', name: 'Mekdelawit' },
  ],
}

// Message shape: { id, senderId, senderName, type: 'text'|'voice', text?, durationSeconds?, timestamp }
const MOCK_MESSAGES = [
  { id: '1', senderId: 'hayat', senderName: 'Hayat', type: 'text', text: 'Hey everyone! Ready to work on the pitch deck?', timestamp: '10:00 AM' },
  { id: '2', senderId: 'tsion', senderName: 'Tsion Solomon', type: 'text', text: 'Yes! I can take the market size and TAM slides.', timestamp: '10:02 AM' },
  { id: '3', senderId: 'meron', senderName: 'Meron', type: 'text', text: "I'll do storytelling and challenges.", timestamp: '10:05 AM' },
  { id: '4', senderId: 'mekdelawit', senderName: 'Mekdelawit', type: 'voice', durationSeconds: 12, timestamp: '10:06 AM' },
  { id: '5', senderId: 'mekdelawit', senderName: 'Mekdelawit', type: 'text', text: "I'll handle the demo flow and business model.", timestamp: '10:07 AM' },
  { id: '6', senderId: 'hayat', senderName: 'Hayat', type: 'text', text: "Perfect. Let's sync again before the rehearsal.", timestamp: '10:10 AM' },
  { id: '7', senderId: 'tsion', senderName: 'Tsion Solomon', type: 'voice', durationSeconds: 8, timestamp: '10:11 AM' },
  { id: '8', senderId: 'tsion', senderName: 'Tsion Solomon', type: 'text', text: 'Sounds good. When is the rehearsal?', timestamp: '10:12 AM' },
  { id: '9', senderId: 'meron', senderName: 'Meron', type: 'text', text: 'Tomorrow 3 PM? We can do a quick run-through.', timestamp: '10:15 AM' },
  { id: '10', senderId: 'mekdelawit', senderName: 'Mekdelawit', type: 'text', text: 'Works for me.', timestamp: '10:16 AM' },
]

// Simulated replies from other members (text or voice) — used by the auto-sender
const SIMULATED_REPLIES = [
  { senderId: 'hayat', senderName: 'Hayat', type: 'text', text: "I'll send the updated deck in an hour." },
  { senderId: 'tsion', senderName: 'Tsion Solomon', type: 'text', text: 'Got it, thanks!' },
  { senderId: 'mekdelawit', senderName: 'Mekdelawit', type: 'voice', durationSeconds: 5 },
  { senderId: 'hayat', senderName: 'Hayat', type: 'voice', durationSeconds: 10 },
  { senderId: 'tsion', senderName: 'Tsion Solomon', type: 'text', text: 'Can we add one more slide on impact?' },
  { senderId: 'mekdelawit', senderName: 'Mekdelawit', type: 'text', text: 'Sure, I can do that.' },
  { senderId: 'hayat', senderName: 'Hayat', type: 'text', text: 'Everyone check the shared doc when you can.' },
  { senderId: 'tsion', senderName: 'Tsion Solomon', type: 'voice', durationSeconds: 7 },
  { senderId: 'hayat', senderName: 'Hayat', type: 'text', text: '👍' },
  { senderId: 'mekdelawit', senderName: 'Mekdelawit', type: 'text', text: 'Done with my part.' },
]

function getInitial(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function VoiceBubble({ durationSeconds, isOwn }) {
  const [playing, setPlaying] = useState(false)
  const bars = Math.min(5, Math.max(3, Math.floor(durationSeconds / 2)))

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 ${
        isOwn ? 'bg-primary text-white rounded-br-md' : 'bg-brand border border-brand-dark/20 text-text rounded-bl-md'
      }`}
    >
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
          isOwn ? 'bg-white/20 hover:bg-white/30' : 'bg-primary/20 hover:bg-primary/30'
        } transition-colors`}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          {playing ? (
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          ) : (
            <path d="M8 5v14l11-7L8 5z" />
          )}
        </svg>
      </button>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full bg-current opacity-70 ${playing ? 'animate-pulse' : ''}`}
            style={{ height: `${12 + (i % 3) * 6}px` }}
          />
        ))}
      </div>
      <span className="text-xs opacity-90 ml-1">{durationSeconds}s</span>
    </div>
  )
}

function UserChat() {
  const user = getCurrentUser()
  if (!user?.hasCompletedProfile) {
    return <Navigate to="/user/profile" replace />
  }

  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [input, setInput] = useState('')
  const [currentUserId] = useState('meron')
  const simIndexRef = useRef(0)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate other team members sending messages periodically
  useEffect(() => {
    const others = TEAM.members.filter((m) => m.id !== currentUserId)
    const interval = setInterval(() => {
      const reply = SIMULATED_REPLIES[simIndexRef.current % SIMULATED_REPLIES.length]
      simIndexRef.current += 1
      const sender = others.find((m) => m.id === reply.senderId) || others[0]
      const newMsg = {
        id: `sim-${Date.now()}`,
        senderId: reply.senderId,
        senderName: reply.senderName,
        type: reply.type || 'text',
        text: reply.text,
        durationSeconds: reply.durationSeconds,
        timestamp: formatTime(),
      }
      setMessages((prev) => [...prev, newMsg])
    }, 12000)
    return () => clearInterval(interval)
  }, [currentUserId])

  const handleSend = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    const currentMember = TEAM.members.find((m) => m.id === currentUserId)
    const newMessage = {
      id: String(Date.now()),
      senderId: currentUserId,
      senderName: currentMember?.name ?? 'You',
      type: 'text',
      text: trimmed,
      timestamp: formatTime(),
    }
    setMessages((prev) => [...prev, newMessage])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px]">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-text">Live chat</h1>
        <p className="text-text-muted text-sm mt-0.5">
          Team: <span className="font-medium text-primary">{TEAM.name}</span>
        </p>
      </div>

      {/* Team members strip */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TEAM.members.map((m) => (
          <div
            key={m.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
              m.id === currentUserId ? 'bg-primary text-white' : 'bg-brand border border-brand-dark/30 text-text'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
              {getInitial(m.name)}
            </span>
            {m.name}
            {m.id === currentUserId && <span className="text-xs opacity-90">(you)</span>}
          </div>
        ))}
      </div>

      {/* Chat box */}
      <div className="flex-1 flex flex-col min-h-0 rounded-2xl border border-brand-dark/30 bg-white shadow-card overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isOwn = msg.senderId === currentUserId
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold ${
                    isOwn ? 'bg-primary text-white' : 'bg-brand text-primary'
                  }`}
                >
                  {getInitial(msg.senderName)}
                </div>
                <div className={`min-w-0 max-w-[85%] ${isOwn ? 'text-right' : ''}`}>
                  <p className="text-xs text-text-muted mb-0.5">
                    {msg.senderName}
                    {isOwn && ' · You'}
                    <span className="ml-1">{msg.timestamp}</span>
                    {msg.type === 'voice' && (
                      <span className="ml-1 text-primary">Voice</span>
                    )}
                  </p>
                  {msg.type === 'voice' ? (
                    <VoiceBubble durationSeconds={msg.durationSeconds ?? 0} isOwn={isOwn} />
                  ) : (
                    <p
                      className={`text-sm rounded-2xl px-4 py-2 inline-block ${
                        isOwn
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-brand text-text border border-brand-dark/20 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input — text only for you */}
        <form
          onSubmit={handleSend}
          className="flex gap-2 p-3 border-t border-brand-dark/20 bg-brand/30"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-brand-dark/30 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors text-sm shrink-0"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserChat
