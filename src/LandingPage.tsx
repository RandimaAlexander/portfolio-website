import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowRight,
  BarChart3,
  Palette,
  Zap,
  Target,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Work', href: '#work' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center neon-glow bg-inherit bg-cover bg-center bg-no-repeat bg-[url(https://miaoda-edit-image.s3cdn.medo.dev/b6fmq0wuv9j5/IMG-b6ge772np79c.png)]" />
          <span className="text-2xl font-bold tracking-tight">Taskilla</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Button
            variant="default"
            className="neon-glow gradient-bg border-none"
            onClick={() => scrollToSection('#contact')}
          >
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-lg font-medium text-foreground/70 hover:text-primary text-left"
                >
                  {link.name}
                </button>
              ))}
              <Button
                variant="default"
                className="w-full neon-glow gradient-bg border-none"
                onClick={() => scrollToSection('#contact')}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-1000" />
    </div>

    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/50 text-primary backdrop-blur-sm">
          Future of Digital Growth
        </Badge>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
          Elevate Your Brand <br />
          <span className="gradient-text">With Data Mastery</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Helping brands grow with data-driven marketing and high-impact digital content.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold gradient-bg border-none neon-glow group"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Growth
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg font-semibold glass border-white/10 hover:bg-white/10"
            onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Our Work
          </Button>
        </div>
      </motion.div>
    </div>

    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center p-1">
        <div className="w-1 h-2 bg-primary rounded-full" />
      </div>
    </motion.div>
  </section>
);

const Services = () => {
  const services = [
    {
      title: 'Content',
      description: 'Engaging storytelling and high-impact visual assets that resonate with your audience.',
      icon: <Palette className="w-8 h-8 text-primary" />,
      color: 'primary',
    },
    {
      title: 'Branding',
      description: 'Cohesive brand identities that communicate your core values and stand out.',
      icon: <Zap className="w-8 h-8 text-accent" />,
      color: 'accent',
    },
    {
      title: 'Growth',
      description: 'Scalable marketing strategies powered by advanced analytics and performance metrics.',
      icon: <Target className="w-8 h-8 text-primary" />,
      color: 'primary',
    },
    {
      title: 'Strategy',
      description: 'Future-proof roadmaps designed to navigate the complex digital landscape.',
      icon: <BarChart3 className="w-8 h-8 text-accent" />,
      color: 'accent',
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Do</h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card h-full border-white/10 overflow-hidden group">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div
                    className={`mb-6 p-4 rounded-2xl bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                      service.color === 'primary' ? 'group-hover:neon-glow' : 'group-hover:neon-glow-accent'
                    }`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">{service.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section id="philosophy" className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <motion.div className="flex-1" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Data Meets <br />
            <span className="gradient-text">Creativity</span>
          </h2>
          <p className="text-xl text-foreground/60 mb-8 leading-relaxed">
            At Taskilla, we believe that pure data is cold, and pure creativity is blind. By merging these two forces, we create
            high-impact digital experiences that are both beautiful and effective.
          </p>
          <div className="space-y-6">
            {[
              { title: 'Insights-Driven Design', desc: 'Every pixel has a purpose backed by data.' },
              { title: 'Creative Agility', desc: 'Adapting at the speed of the digital trend.' },
              { title: 'Proven Results', desc: 'Consistent growth for brands of all sizes.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full border border-primary flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-foreground/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="flex-1 relative" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="aspect-square glass rounded-full flex items-center justify-center p-12 relative">
            <div className="absolute inset-0 gradient-bg opacity-10 rounded-full blur-[100px]" />
            <div className="w-full h-full border-4 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-32 h-32 text-primary neon-glow" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const projects = [
    {
      title: 'NeuraLink App',
      category: 'Product Design',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d4bb5348-0970-413e-b472-b0b99d095c5e.jpg',
    },
    {
      title: 'Quantum Flux',
      category: 'Branding',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_55d2b629-ea26-4c25-848c-64643aedd1bf.jpg',
    },
    {
      title: 'Vortex Media',
      category: 'Marketing',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_68feac77-ef4f-45b5-b752-f6ad4d81fb54.jpg',
    },
    {
      title: 'Astra Cloud',
      category: 'Strategy',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_76d21775-80a5-457c-9579-7a2976f59a0d.jpg',
    },
  ];

  return (
    <section id="work" className="py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Work</h2>
            <div className="w-24 h-1 gradient-bg rounded-full" />
          </div>
          <p className="text-foreground/60 max-w-md">
            Explore our latest case studies and see how we help brands scale through data and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="default" className="gradient-bg border-none neon-glow" onClick={() => {}}>
                    View Case Study
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-foreground/40">{project.category}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-6">
      <div className="glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 gradient-bg opacity-10 blur-[80px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[80px] -ml-32 -mb-32" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">
            Let's Build Your <br />
            <span className="gradient-text">Brand's Future</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-12">
            Ready to take your brand to the next level? Our team of experts is ready to help you navigate the future of digital growth.
          </p>
          <Button
            size="lg"
            className="h-16 px-12 text-xl font-bold gradient-bg border-none neon-glow group"
            onClick={() => toast.success("We've received your signal! Our team will reach out shortly.")}
          >
            Get in Touch
            <Mail className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center">
            <Zap className="text-primary-foreground w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight">Taskilla</span>
        </div>

        <p className="text-foreground/40 text-sm">© {new Date().getFullYear()} Taskilla. All rights reserved.</p>

        <div className="flex items-center gap-6">
          {[Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-foreground/40 hover:text-primary transition-colors">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <div className="bg-background text-foreground selection:bg-primary/20">
    <Navbar />
    <Hero />
    <Services />
    <Philosophy />
    <Portfolio />
    <CTA />
    <Footer />
  </div>
);

export default LandingPage;
