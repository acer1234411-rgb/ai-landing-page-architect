import { useEffect, useRef } from 'react'

export default function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.2 }
    )
    el.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-28 text-white text-center"
      style={{ background: 'linear-gradient(135deg, #1a56a8, #2F80ED)' }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="fade-in">
          <p className="text-sm font-semibold tracking-widest mb-4 opacity-80">지금 바로 시작하세요</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            더 이상 고민하지 마세요.<br />
            <span style={{ color: '#86EFAC' }}>무료 상담</span>으로 시작하면 됩니다.
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            지금 신청하시면 48시간 이내 전담 컨설턴트가 연락을 드립니다.<br />
            첫 상담은 완전 무료입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-10 py-4 rounded-full font-bold text-lg bg-white transition-all hover:scale-105 shadow-lg"
              style={{ color: '#2F80ED' }}
            >
              💬 무료 상담 신청하기
            </a>
            <a
              href="tel:02-1234-5678"
              className="px-10 py-4 rounded-full font-bold text-lg border-2 border-white/50 text-white hover:bg-white/10 transition-all"
            >
              📞 전화 바로 연결
            </a>
          </div>
          <p className="mt-8 text-sm text-white/50">별도 가입 없이 바로 신청 가능합니다</p>
        </div>
      </div>
    </section>
  )
}
