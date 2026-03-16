import { useEffect, useRef } from 'react'

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24" style={{ background: '#F8F9FA' }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in text-center mb-16">
          <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#2F80ED' }}>찾아오시는 길</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Location &amp; Contact</h2>
          <p className="text-gray-500">언제든지 방문해 주시면 환영합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* 지도 */}
          <div className="fade-in rounded-2xl overflow-hidden shadow-lg h-80 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500 p-6">
              <p className="text-4xl mb-3">🗺️</p>
              <p className="font-semibold">Google Maps</p>
              <p className="text-sm">서울특별시 강남구 테헤란로 123</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-bold px-4 py-2 rounded-full text-white"
                style={{ background: '#2F80ED' }}
              >
                지도에서 보기
              </a>
            </div>
          </div>

          {/* 정보 */}
          <div className="fade-in space-y-5">
            {[
              { icon: '📍', label: '주소', value: '서울특별시 강남구 테헤란로 123, 2층 201호' },
              { icon: '📞', label: '전화', value: '02-1234-5678' },
              { icon: '📧', label: '이메일', value: 'hello@brandmate.kr' },
              { icon: '🕐', label: '영업시간', value: '평일 09:00 – 18:00 (주말 및 공휴일 휴무)' },
              { icon: '🚗', label: '주차', value: '건물 지하 주차장 이용 (방문 시 2시간 무료)' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-1">{item.label}</p>
                  <p className="text-gray-800 font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
            <a
              href="/contact"
              className="block w-full text-center text-white font-bold py-4 rounded-full transition-all hover:scale-105"
              style={{ background: '#27AE60' }}
            >
              방문 예약하기 →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
