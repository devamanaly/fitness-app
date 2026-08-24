/* eslint-disable react/no-unescaped-entities */
// app/page.js
import Link from 'next/link'
import { ArrowRight, Dumbbell, Target, Brain, Zap, Users, Trophy, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                  FitJourney AI
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-red-500 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-red-500 transition-colors">How It Works</a>
              <a href="#ai-coach" className="text-gray-300 hover:text-red-500 transition-colors">AI Coach</a>
              <Link href="/login" className="text-gray-300 hover:text-red-500 transition-colors">Login</Link>
              <Link href="/signup" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-600/25">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15),transparent_70%)]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 animate-pulse-red">
              <Zap className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-400">Your Personal AI Fitness Coach</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-red-100 to-red-500 bg-clip-text text-transparent">
                Fitness Coaching
              </span>
              <br />
              <span className="text-white">That Actually Understands You</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              FitJourney AI remembers your history, adapts to your lifestyle, and guides you 
              every step of the way. Not just another workout app—your intelligent companion 
              on the journey to lasting health.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/signup" className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-red-600/25 inline-flex items-center space-x-2">
                <span>Begin Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-gray-700 hover:border-red-600 transition-all">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built Different <span className="text-red-500">On Purpose</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Most fitness apps give you a plan and forget about you. FitJourney AI evolves with you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6" />,
                title: 'Memory That Matters',
                description: 'Remembers your injuries, preferences, and history. When you mention knee pain in week one, it still matters in week twelve.',
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Adaptive Plans',
                description: 'Your plan changes as your life changes. Busy week? The AI adjusts your workouts instead of making you feel guilty.',
              },
              {
                icon: <Trophy className="w-6 h-6" />,
                title: 'Habit Building Focus',
                description: 'We care about consistency, not perfection. Streak freezes and gentle nudges help you build habits that last.',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Always Available Coach',
                description: 'Need guidance at 6 AM or midnight? Your AI coach is there whenever you need support or motivation.',
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: 'Insightful Reviews',
                description: 'Weekly and monthly summaries show your progress, celebrate wins, and suggest what to focus on next.',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Smart Reminders',
                description: 'Notifications that feel like a coach checking in—timely, relevant, and never spammy.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Journey <span className="text-red-500">Starts Here</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Simple steps to transform your fitness journey with AI-powered guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create Account',
                description: 'Sign up with email or Google. Takes less than a minute.',
              },
              {
                step: '02',
                title: 'Meet Your AI Coach',
                description: 'Answer questions about your goals, lifestyle, and preferences.',
              },
              {
                step: '03',
                title: 'Get Your Plan',
                description: 'AI creates a personalized plan tailored to your unique needs.',
              },
              {
                step: '04',
                title: 'Grow Together',
                description: 'Log daily check-ins. The AI adapts your plan as you evolve.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-600 to-transparent transform -translate-x-4" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Coach Demo Section */}
      <section id="ai-coach" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                An AI Coach That{' '}
                <span className="text-red-500">Remembers You</span>
              </h2>
              <p className="text-gray-400 mb-8">
                This is what makes FitJourney AI different. Your coach doesn't forget—it remembers 
                every detail of your journey and uses that knowledge to guide you better.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">Week 1:</span>{" "}
                    "My knee hurts." — AI remembers this permanently.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">Week 3:</span>{" "}
                    "Can I start running?" — AI recalls your knee issue and suggests alternatives.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">Always:</span>{" "}
                    Your coach knows your history, preferences, and journey context.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chat Demo */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-500 ml-2">AI Coach Chat</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-red-600/20 text-white rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                    Can I start running today?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]">
                    I remember you mentioned knee pain earlier. Let's start with walking and 
                    low-impact exercises before progressing to running. How about a 20-minute walk today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-red-600/20 text-white rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                    That sounds good! Thank you for remembering.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-red-600/10 to-red-600/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your <span className="text-red-500">Transformation</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Your AI coach is ready when you are. Take the first step today.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-red-600/25"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                FitJourney AI
              </span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-600 text-sm">
            © 2026 FitJourney AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}