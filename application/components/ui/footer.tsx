import Link from "next/link"
import { TextHoverEffect } from "./text-hover-effect"

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Text Effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-full h-full max-w-4xl">
          <TextHoverEffect text="NOVA" />
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-sm transform rotate-45"></div>
              <span className="text-xl font-bold">Nova</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Copyright © 2025 Armitage Labs OÜ
              <br />
              All rights reserved
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Socials</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Integrations</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ai-negotiation" className="text-gray-400 hover:text-white transition-colors duration-200">
                  AI Negotiation
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
