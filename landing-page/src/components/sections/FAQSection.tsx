import { useEffect, useRef } from 'react'

const faqs = [
  { q: '처음 방문인데 예약이 필요한가요?', a: '방문 시 바로 서비스 이용이 가능하지만, 대기 없이 최상의 서비스를 위해 사전 예약을 추천합니다.' },
  { q: '비용은 어떻게 되나요?', a: '초기 상담은 완전 무료이며, 서비스 종류 및 범위에 따라 맞춤 견적을 안내해 드립니다.' },
  { q: '서비스 기간은 얼마나 걸리나요?', a: '케이스에 따라 다르지만, 평균 1~3주 내에 결과물을 제공해 드리고 있습니다.' },
  { q: '주차 가능한가요?', a: '네, 건물 지하 주차장이 있으며 방문 시 최대 2시간 무료 주차가 가능합니다.' },
  { q: '지역 외 고객도 서비스 이용이 가능한가요?', a: '물론입니다. 비대면 상담(화상/전화)을 통해 전국 어디서나 이용 가능합니다.' },
]

export default function FAQSection() {
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
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="fade-in text-center mb-16">
          <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#27AE60' }}>자주 묻는 질문</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">FAQ</h2>
          <p className="text-gray-500">궁금한 점이 있으시면 언제든 문의해 주세요.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="fade-in group bg-gray-50 rounded-2xl overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <summary className="px-6 py-5 flex items-center justify-between font-semibold text-gray-900 list-none select-none">
                <span>Q. {f.q}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg">▼</span>
              </summary>
              <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-4">
                A. {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
