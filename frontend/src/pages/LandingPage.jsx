/* eslint-disable react/prop-types */
import DNALandingPage from '../components/LandingPageComp/DNALandingPage'
import FeaturesSection from '../components/LandingPageComp/FeaturesSection'
import TeamSection from '../components/LandingPageComp/TeamSection'

export default function LandingPage({teamRef}) {


  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DNALandingPage />
      <FeaturesSection />
      <section id="team" ref={teamRef}>
        <TeamSection />
      </section>
    </div>
  )
}

