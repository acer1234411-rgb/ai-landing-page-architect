import HeroSection from '../components/sections/HeroSection'
import ValuePropositionSection from '../components/sections/ValuePropositionSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import SocialProofSection from '../components/sections/SocialProofSection'
import LocationSection from '../components/sections/LocationSection'
import FAQSection from '../components/sections/FAQSection'
import FinalCTASection from '../components/sections/FinalCTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ValuePropositionSection />
      <HowItWorksSection />
      <SocialProofSection />
      <LocationSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  )
}
