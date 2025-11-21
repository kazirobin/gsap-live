import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from '../../components/bg_animations/AnimatedBackground'
import ParticleBackground from '../../components/bg_animations/ParticleBackground'
import InteractiveBackground from '../../components/bg_animations/InteractiveBackground'
import MorphingGradientBackground from '../../components/bg_animations/MorphingGradientBackground'
import ProfessionalBackground from '../../components/bg_animations/ProfessionalBackground'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const showcaseRef = useRef(null)

  useEffect(() => {
    // Hero animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    )
    
    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8 }
    )

    gsap.fromTo('.hero-cta',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 1.2 }
    )

    // Features animations
    gsap.fromTo('.feature-card', {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Showcase animations
    gsap.fromTo('.showcase-item', {
      opacity: 0,
      x: -50
    }, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: showcaseRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  }, [])

  const features = [
    {
      icon: '🚀',
      title: 'Ready-to-Use Animations',
      description: 'Copy-paste GSAP animations for your projects'
    },
    {
      icon: '🎓',
      title: 'Free Tutorials',
      description: 'Learn GSAP with step-by-step guides and examples'
    },
    {
      icon: '💎',
      title: 'Premium Content',
      description: 'Advanced animations and exclusive components'
    },
    {
      icon: '⚡',
      title: 'Optimized Performance',
      description: 'Smooth, performant animations for all devices'
    }
  ]

  const showcaseItems = [
    {
      title: 'Scroll Animations',
      description: 'Beautiful scroll-triggered effects',
      image: '🔄'
    },
    {
      title: 'Page Transitions',
      description: 'Smooth transitions between pages',
      image: '✨'
    },
    {
      title: 'Interactive Elements',
      description: 'Engaging hover and click animations',
      image: '🎯'
    }
  ]

  return (
    <div className="pt-16 relative">
      {/* <AnimatedBackground/> */}
      {/* <ParticleBackground/> */}
      {/* <InteractiveBackground/> */}
      {/* <MorphingGradientBackground/> */}
      <ProfessionalBackground/>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center  text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            GSAP <span className="text-yellow-300">Live</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Premium GSAP animations, free tutorials, and ready-to-use components for modern web development.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/animations"
              className="px-8 py-4 text-primary rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105 text-black"
            >
              Explore Animations
            </Link>
            <Link
              to="/tutorials"
              className="px-8 py-4 border-2 border-white text-white hover:text-black rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Start Learning Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 ">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Why Choose GSAP Live?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card bg-white p-8 rounded-2xl shadow-lg card-hover">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section ref={showcaseRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Animation Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseItems.map((item, index) => (
              <div key={index} className="showcase-item bg-white p-8 rounded-2xl shadow-lg card-hover text-center">
                <div className="text-6xl mb-6 animate-float">{item.image}</div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <Link
                  to="/animations"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
                >
                  View Examples
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Animations?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers using GSAP Live to create stunning website animations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="px-8 py-4 bg-white text-black text-primary rounded-lg font-semibold hover:shadow-2xl transition-all"
            >
              Get Premium Access
            </Link>
            <Link
              to="/tutorials"
              className="px-8 py-4 border-2 border-white text-white hover:text-black rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Explore Free Tutorials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home