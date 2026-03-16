import { useEffect, useRef } from 'react'

const values = [
  { icon: '🎯', title: '정확한 진단', desc: '고객의 필요와 상황을 세밀하게 분석하여 최적의 솔루션을 제공합니다.' },
  { icon: '💡', title: '맞춤형 솔루션', desc: '획일화된 서비스가 아닌, 개개인에 맞는 전략으로 최고의 효과를 만듭니다.' },
  { icon: '🤝', title: '사후 관리', desc: '서비스 종료 후에도 지속적인 팔로업과 관리로 장기적인 만족을 보장합니다.' },
  { icon: '🏆', title: '검증된 실적', desc: '2,000건 이상의 누적 서비스, 98%의 고객 만족도로 입증된 전문성을 갖췄습니다.' },
]

export default function ValuePropositionSection() {
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
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in text-center mb-16">
          <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#2F80ED' }}>우리가 특별한 이유</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">왜 BrandMate여야 하는가?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">지역 고객을 가장 잘 이해하는 전문가 팀이 함께합니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="fade-in group p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-5xl mb-5 block">{v.icon}</span>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
