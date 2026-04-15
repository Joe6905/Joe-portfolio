import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Database, Cpu, Globe, Terminal, ChevronRight, Send, Sun, Moon } from 'lucide-react';
import { cn } from './lib/utils';
import { fetchGitHubRepos } from './services/github';
import { Project } from './types';

// --- Components ---

const Wave = ({ top, flip, color }: { top?: boolean, flip?: boolean, color?: string }) => (
  <div className={cn(
    "w-full leading-[0] overflow-hidden pointer-events-none",
    top ? "absolute top-0 left-0 z-0" : "relative",
    flip && "rotate-180"
  )}>
    <div className="relative h-12 md:h-24">
      {/* Layer 1 - Slowest */}
      <svg 
        viewBox="0 0 1440 120" 
        className={cn("absolute inset-0 w-[200%] h-full fill-current animate-wave-slow opacity-20", color)}
        preserveAspectRatio="none"
      >
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
      {/* Layer 2 - Reverse */}
      <svg 
        viewBox="0 0 1440 120" 
        className={cn("absolute inset-0 w-[200%] h-full fill-current animate-wave-reverse opacity-30", color)}
        preserveAspectRatio="none"
      >
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
      {/* Layer 3 - Main */}
      <svg 
        viewBox="0 0 1440 120" 
        className={cn("absolute inset-0 w-[200%] h-full fill-current animate-wave-medium opacity-50", color)}
        preserveAspectRatio="none"
      >
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  </div>
);

const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-primary text-background"
          )}>
            <Terminal size={24} />
          </div>
          <span className={cn(
            "text-xl font-display font-bold tracking-tight hidden sm:block text-text-primary"
          )}>
            JothiRamalingam
          </span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-all relative group",
                activeSection === link.id 
                  ? "text-primary" 
                  : "text-text-secondary hover:text-primary"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass glass-hover transition-colors"
          >
            {isDarkMode ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass"
          >
            {isDarkMode ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
          </button>
          <button 
            className="text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass mt-2 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-text-secondary hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-medium mb-4 tracking-wider uppercase text-sm text-primary">
            Welcome to my portfolio
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-text-primary">
            Hi, I'm JothiRamalingam Mj
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-text-secondary">
            Full Stack Developer building scalable apps & smart systems.
            <span className="block mt-2 text-lg text-text-secondary/70">Focused on modern web apps, AI integrations, and real-world solutions.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg bg-primary text-background shadow-primary/20"
            >
              View Projects
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass text-text-primary rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <ChevronRight size={18} className="text-primary" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
      >
        <div className="w-6 h-10 border-2 rounded-full flex justify-center p-1 border-primary">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

const About = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const highlights = [
    { icon: Globe, title: 'Web Development', desc: 'Crafting responsive and interactive user interfaces.', color: 'text-primary' },
    { icon: Terminal, title: 'Backend Systems', desc: 'Building robust and scalable server-side architectures.', color: 'text-secondary' },
    { icon: Cpu, title: 'AI Integration', desc: 'Leveraging LLMs and smart systems to enhance apps.', color: 'text-highlight' },
    { icon: Code, title: 'Problem Solving', desc: 'Finding efficient solutions to complex technical challenges.', color: 'text-primary' },
  ];

  return (
    <section id="about" className="py-24 relative bg-background">
      <Wave top flip color="text-primary" />
      <div className="container mx-auto px-6 pt-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-text-primary">About Me</h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-primary" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* PFP Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative group"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-square rounded-[40px] overflow-hidden glass p-4">
                <img 
                  src="https://github.com/Joe6905.png" 
                  alt="JothiRamalingam Mj" 
                  className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-display font-bold mb-6 text-text-primary">Building the Future with Code</h3>
                <p className="text-lg leading-relaxed mb-6 text-text-secondary">
                  I build practical and scalable applications using modern technologies. My focus is on clean architecture, performance, and creating products that solve real problems.
                </p>
                <p className="text-lg leading-relaxed mb-10 text-text-secondary">
                  With a passion for continuous learning, I stay at the forefront of technology, exploring everything from Three.js for 3D web experiences to advanced AI integrations.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 rounded-2xl glass-hover"
                  >
                    <item.icon className={cn("mb-4", item.color)} size={24} />
                    <h4 className="font-bold mb-2 text-text-primary">{item.title}</h4>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Globe,
      color: 'text-primary',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Three.js']
    },
    {
      title: 'Backend',
      icon: Terminal,
      color: 'text-secondary',
      skills: ['Python (Django, Flask)', 'Node.js', 'Java']
    },
    {
      title: 'Database',
      icon: Database,
      color: 'text-highlight',
      skills: ['SQL', 'Firebase']
    },
    {
      title: 'Tools',
      icon: Cpu,
      color: 'text-primary',
      skills: ['Git', 'GitHub', 'VS Code', 'REST APIs', 'Claude AI', 'GitHub Copilot', 'Ollama']
    }
  ];

  return (
    <section id="skills" className="py-24 relative bg-background overflow-hidden">
      <Wave top flip color="text-secondary" />
      <div className="container mx-auto px-6 pt-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-text-primary">My Skills</h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-secondary" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="glass p-8 rounded-[2rem] glass-hover group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                isDarkMode ? "bg-white/5 shadow-white/5" : "bg-background/5 shadow-background/5"
              )}>
                <category.icon className={category.color} size={28} />
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-text-primary">{category.title}</h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-1.5 glass rounded-xl text-xs font-medium text-text-secondary border-border/50 hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onPreview: (url: string) => void;
  isDarkMode: boolean;
}

const ProjectCard = ({ project, featured = false, onPreview, isDarkMode }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl overflow-hidden group transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image_url} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
          <div className="flex gap-4">
            <a 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              title="View Code"
              className="p-3 rounded-full transition-colors bg-surface hover:bg-primary/20 text-text-primary"
            >
              <Github size={24} />
            </a>
            {project.homepage && (
              <button 
                onClick={() => onPreview(project.homepage)}
                title="Live Preview"
                className="p-3 rounded-full transition-colors bg-primary text-background hover:bg-primary/90"
              >
                <Globe size={24} />
              </button>
            )}
            {project.homepage && (
              <a 
                href={project.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Open in New Tab"
                className="p-3 rounded-full transition-colors bg-surface hover:bg-primary/20 text-text-primary"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold transition-colors text-text-primary group-hover:text-primary">{project.name}</h3>
          <span className="text-xs px-2 py-1 rounded-md border bg-primary/10 text-primary border-primary/20">
            {project.language}
          </span>
        </div>
        <p className="text-sm mb-6 line-clamp-3 flex-grow text-text-secondary">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.topics.slice(0, 3).map(topic => (
            <span key={topic} className="text-[10px] uppercase tracking-wider text-text-secondary/60">#{topic}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PreviewModal = ({ url, onClose, isDarkMode }: { url: string, onClose: () => void, isDarkMode: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full h-full max-w-6xl glass rounded-3xl overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-highlight/50" />
            </div>
            <span className="text-sm truncate max-w-[200px] md:max-w-md text-text-secondary">{url}</span>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:bg-primary/10 text-text-secondary hover:text-primary"
            >
              <ExternalLink size={18} />
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-primary/10 text-text-secondary hover:text-primary"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex-grow bg-white relative">
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Project Preview"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubRepos('Joe6905').then(data => {
      // Sort by stars to simulate "pinned" or "featured"
      const sorted = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepos(sorted);
      setLoading(false);
    });
  }, []);

  const featuredProjects = repos.slice(0, 4);
  const miniProjects = repos.slice(4, 12);

  return (
    <section id="projects" className="py-24 relative bg-background">
      <Wave top flip color="text-highlight" />
      <div className="container mx-auto px-6 pt-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-text-primary">Featured Projects</h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-highlight" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              {featuredProjects.map(project => (
                <div key={project.id}>
                  <ProjectCard project={project} featured onPreview={setPreviewUrl} isDarkMode={isDarkMode} />
                </div>
              ))}
            </div>

            <div className="text-center mb-12">
              <h2 className="text-2xl font-display font-bold mb-4 text-text-primary">More Projects</h2>
              <div className="w-12 h-1 mx-auto rounded-full bg-primary/50" />
            </div>

            <div className="relative">
              <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x">
                {miniProjects.map(project => (
                  <div key={project.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                    <ProjectCard project={project} onPreview={setPreviewUrl} isDarkMode={isDarkMode} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {previewUrl && (
          <PreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} isDarkMode={isDarkMode} />
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative bg-background">
      <Wave top flip color="text-primary" />
      <div className="container mx-auto px-6 pt-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 text-text-primary">Let's Connect</h2>
              <p className="text-lg mb-8 text-text-secondary">
                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities and creative ideas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Email Me</p>
                    <a href="mailto:jothishmjk.2405@gmail.com" className="text-lg font-medium transition-colors text-text-primary hover:text-primary">jothishmjk.2405@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-secondary">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">LinkedIn</p>
                    <a href="https://linkedin.com/in/joe-mj" target="_blank" rel="noopener noreferrer" className="text-lg font-medium transition-colors text-text-primary hover:text-secondary">joe-mj</a>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors border bg-surface border-border focus:border-primary text-text-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors border bg-surface border-border focus:border-primary text-text-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors border bg-surface border-border focus:border-primary text-text-primary resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status !== 'idle'}
                  className="w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 bg-primary text-background hover:bg-primary/90"
                >
                  {status === 'idle' && <><Send size={18} /> Send Message</>}
                  {status === 'sending' && <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin border-background" />}
                  {status === 'sent' && 'Message Sent!'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <footer className="py-12 relative bg-background">
      <Wave top flip color="text-secondary" />
      <div className="container mx-auto px-6 pt-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-background">
                <Terminal size={18} />
              </div>
              <span className="text-xl font-display font-bold text-text-primary">JothiRamalingam</span>
            </div>
            <p className="text-sm text-text-secondary">Full Stack Developer & AI Enthusiast</p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/Joe6905" target="_blank" rel="noopener noreferrer" className="transition-colors text-text-secondary hover:text-primary">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/joe-mj" target="_blank" rel="noopener noreferrer" className="transition-colors text-text-secondary hover:text-secondary">
              <Linkedin size={24} />
            </a>
            <a href="mailto:jothishmjk.2405@gmail.com" className="transition-colors text-text-secondary hover:text-highlight">
              <Mail size={24} />
            </a>
          </div>

          <p className="text-xs text-text-secondary/50">
            © {new Date().getFullYear()} JothiRamalingam Mj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-mode');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-24 h-24 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Terminal className="text-primary" size={32} />
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-text-secondary font-medium tracking-widest uppercase text-xs"
        >
          Initializing Portfolio
        </motion.p>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-sans selection:bg-primary/30 selection:text-text-primary",
      isDarkMode ? "dark" : ""
    )}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
