import { useEffect, useRef } from 'react'

const testimonials = [
  {
    name: '김혜진',
    role: '자영업자',
    text: '처음엔 반신반의했는데, 상담 후 결과가 정말 달랐어요. 매출이 30% 이상 오른 건 처음입니다!',
    img: 'https://loremflickr.com/80/80/woman,portrait',
    stars: 5,
  },
  {
    name: '이민호',
    role: '직장인',
    text: '지역 내에서 이렇게 전문적인 서비스를 만날 수 있을 거라 생각 못 했어요. 강력 추천합니다.',
    img: 'https://loremflickr.com/80/80/man,portrait',
    stars: 5,
  },
  {
    name: '박수연',
    role: '프리랜서',
    text: '사후 관리까지 꼼꼼하게 챙겨주는 곳은 여기밖에 없었어요. 정말 감사합니다.',
    img: 'https://loremflickr.com/80/80/woman,face',
    stars: 5,
  },
]

export default function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in text-center mb-16">
          <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#2F80ED' }}>고객이 말합니다</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">실제 고객 후기</h2>
          <p className="text-gray-500">지역에서 인정받는 서비스, 고객의 목소리로 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="fade-in bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 mb-4 text-yellow-400">
                {Array.from({ length: t.stars }).map((_, j) => <span key={j}>★</span>)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 수치 */}
        <div className="fade-in mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '2,000+', label: '누적 고객 수' },
            { num: '98%', label: '고객 만족도' },
            { num: '5년', label: '지역 서비스 경력' },
            { num: '4.9★', label: '네이버 평점' },
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50">
              <p className="text-3xl font-extrabold mb-1" style={{ color: '#2F80ED' }}>{s.num}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
