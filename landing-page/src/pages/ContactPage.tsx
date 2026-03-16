import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="pt-24 pb-20 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#2F80ED' }}>언제든지 연락하세요</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-500 max-w-lg mx-auto">첫 상담은 무료입니다. 작은 고민도 편하게 말씀해 주세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 폼 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {sent ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">✅</p>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">문의가 접수되었습니다!</h3>
              <p className="text-gray-500 text-sm">48시간 이내로 담당자가 연락을 드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">이름 *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800"
                  style={{ focusRingColor: '#2F80ED' } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">문의 내용 *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="문의하실 내용을 자유롭게 작성해 주세요."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105"
                style={{ background: '#2F80ED' }}
              >
                문의 보내기 →
              </button>
            </form>
          )}
        </div>

        {/* 사이드 정보 */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden h-56 bg-gray-100 flex items-center justify-center shadow-sm">
            <div className="text-center text-gray-500">
              <p className="text-3xl mb-2">🗺️</p>
              <p className="text-sm">서울특별시 강남구 테헤란로 123</p>
            </div>
          </div>

          {[
            { icon: '📞', label: '전화 상담', value: '02-1234-5678', sub: '평일 09:00–18:00' },
            { icon: '📧', label: '이메일', value: 'hello@brandmate.kr', sub: '24시간 접수 가능' },
            { icon: '💬', label: '카카오톡', value: '채널 ID: brandmate', sub: '평일 09:00–20:00' },
          ].map((c, i) => (
            <div key={i} className="flex gap-4 items-start p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="font-bold text-gray-900">{c.label}</p>
                <p className="text-sm" style={{ color: '#2F80ED' }}>{c.value}</p>
                <p className="text-xs text-gray-400">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
