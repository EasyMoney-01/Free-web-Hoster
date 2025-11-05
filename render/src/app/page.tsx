'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Cloud Hosting, Simplified</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Deploy your apps with zero configuration. From code to production in minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Get Started
            </Link>
            <Link 
              href="/login" 
              className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need to deploy</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="text-blue-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Zero Configuration</h3>
              <p className="text-gray-600">
                Connect your GitHub repo and deploy automatically. No complex CI/CD setup required.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="text-blue-600 text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-2">Auto Scaling</h3>
              <p className="text-gray-600">
                Automatically scale your apps based on traffic. Pay only for what you use.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Global CDN</h3>
              <p className="text-gray-600">
                Lightning fast delivery with our global CDN. Your users get the best experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, predictable pricing</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Start for free. Upgrade as you grow. No hidden fees.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Up to 2 services</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>100k requests/month</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition duration-300">
                Get Started
              </button>
            </div>
            
            <div className="border-2 border-blue-600 rounded-lg p-8 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$15</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited services</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>1M requests/month</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom domains</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
                Get Started
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated infrastructure</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>24/7 phone support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Render Clone</h3>
              <p className="text-gray-400">
                Cloud hosting platform for developers and teams.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Web Services</a></li>
                <li><a href="#" className="hover:text-white">Static Sites</a></li>
                <li><a href="#" className="hover:text-white">Cron Jobs</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 Render Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}