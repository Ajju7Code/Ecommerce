import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Twitter, Instagram, Github, Linkedin, ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const links = {
    Shop: [
      { label: 'New Arrivals', to: '/products?sort=newest' },
      { label: 'Best Sellers', to: '/products?sort=popular' },
      { label: 'Collections', to: '/products' },
      { label: 'Sale', to: '/products?sale=true' },
    ],
    Company: [
      { label: 'About Us', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Press', to: '#' },
      { label: 'Blog', to: '#' },
    ],
    Support: [
      { label: 'Help Center', to: '#' },
      { label: 'Returns', to: '#' },
      { label: 'Shipping', to: '#' },
      { label: 'Contact', to: '#' },
    ],
  };

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-surface-950 text-surface-300 pt-20 pb-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-primary-900/60 to-primary-800/40 border border-primary-700/30 p-8 md:p-12 mb-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary-600/10 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-primary-400 font-semibold text-sm uppercase tracking-widest">Newsletter</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-surface-400">
                Get exclusive deals, new arrivals, and style tips delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto min-w-80">
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-accent-400 font-semibold flex items-center gap-2"
                >
                  <span>✓</span> You're subscribed!
                </motion.p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
                    required
                  />
                  <button type="submit" className="btn-primary px-5 whitespace-nowrap">
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                LUX<span className="text-primary-500">A</span>
              </span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed mb-6">
              Premium ecommerce experience. Curated collections for those who appreciate quality.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-surface-800 hover:bg-primary-600 flex items-center justify-center text-surface-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {Object.entries(links).map(([title, items], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-surface-400 hover:text-primary-400 text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-surface-500 text-sm">
            © {new Date().getFullYear()} LUXA. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-surface-500">
            <a href="#" className="hover:text-surface-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-surface-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-surface-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
