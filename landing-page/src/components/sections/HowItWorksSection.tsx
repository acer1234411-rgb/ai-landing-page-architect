import { useEffect, useRef } from 'react'

const steps = [
  { step: '01', title: '정확한 진단', desc: '방문 또는 전화 상담을 통해 고객의 상황을 면밀히 파악합니다.', icon: '🔍' },
  { step: '02', title: '맞춤형 솔루션', desc: '진단 결과를 바탕으로 최적화된 맞춤 플랜을 설계합니다.', icon: '🗂️' },
  { step: '03', title: '사후 관리', desc: '서비스 완료 후에도 지속적인 피드백과 관리를 제공합니다.', icon: '🛡️' },
]

export default function HowItWorksSection() {
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
    <section className="py-24" style={{ background: '#F8F9FA' }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in text-center mb-16">
          <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#27AE60' }}>간단한 3단계</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">서비스 이용 과정</h2>
          <p className="text-gray-500">복잡하지 않습니다. 단 3단계로 결과를 경험하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* 연결선 */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 to-green-200" />
          
          {steps.map((s, i) => (
            <div
              key={i}
              className="fade-in bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ background: i % 2 === 0 ? '#2F80ED' : '#27AE60' }}
              >
                {s.step}
              </div>
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
