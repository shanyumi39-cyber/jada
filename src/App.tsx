// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Download, ArrowRight, ExternalLink, 
  Mail, Phone, Monitor, Smartphone, Layers, Palette
} from 'lucide-react';
import profilePhoto from './assets/profile.png';
import wechatQr from './assets/wechat-qr.png';
import project1Img1 from './assets/portfolio/project-1/1.png';
import project1Img2 from './assets/portfolio/project-1/2.png';
import project1Img3 from './assets/portfolio/project-1/3.png';
import project1Img4 from './assets/portfolio/project-1/4.png';
import project1Img5 from './assets/portfolio/project-1/5.png';
import project1Img6 from './assets/portfolio/project-1/6.png';
import project2Img1 from './assets/portfolio/project-2/1.png';
import project2Img2 from './assets/portfolio/project-2/2.png';
import project2Img3 from './assets/portfolio/project-2/3.png';
import project2Img4 from './assets/portfolio/project-2/4.png';
import project3Img1 from './assets/portfolio/project-3/15.png';
import project3Img2 from './assets/portfolio/project-3/2.png';
import project3Img3 from './assets/portfolio/project-3/3.png';
import project3Img4 from './assets/portfolio/project-3/4.png';
import project3Img5 from './assets/portfolio/project-3/5.png';
import project4Img1 from './assets/portfolio/project-4/1.png';
import project4Img2 from './assets/portfolio/project-4/2.png';
import project4Img3 from './assets/portfolio/project-4/3.png';
import project5Img1 from './assets/portfolio/project-5/1.png';
import project5Img2 from './assets/portfolio/project-5/2.png';
import project5Img3 from './assets/portfolio/project-5/3.png';
import project5Img4 from './assets/portfolio/project-5/4.png';
import project6Img1 from './assets/portfolio/project-6/1.png';
import project6Img2 from './assets/portfolio/project-6/2.png';
import cover1 from './assets/portfolio/covers/cover-1.png';
import cover2 from './assets/portfolio/covers/cover-2.png';
import cover3 from './assets/portfolio/covers/cover-3.png';
import cover4 from './assets/portfolio/covers/cover-4.png';
import cover5 from './assets/portfolio/covers/cover-5.png';
import cover6 from './assets/portfolio/covers/cover-6.png';
import cover7 from './assets/portfolio/covers/cover-7.png';

const project7ImageModules = import.meta.glob('./assets/portfolio/project-7/*.png', { eager: true, import: 'default' });
const project7Images = Object.keys(project7ImageModules)
  .sort((a, b) => parseInt(a.match(/(\d+)\.png$/)?.[1] ?? '0', 10) - parseInt(b.match(/(\d+)\.png$/)?.[1] ?? '0', 10))
  .map((key) => project7ImageModules[key]);

const RESUME_PDF = `${import.meta.env.BASE_URL}resume.pdf`;
const PORTFOLIO_PDF = `${import.meta.env.BASE_URL}portfolio.pdf`;

const downloadFile = (href, filename) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  link.click();
};

const downloadResume = () => downloadFile(RESUME_PDF, '单玉婷简历-福州大学2026届-UI设计.pdf');
const downloadPortfolio = () => downloadFile(PORTFOLIO_PDF, '单玉婷作品集-福州大学2026届毕业生- UI设计.pdf');

// --- Global Data ---
const PORTFOLIO_DATA = [
  { id: "1", title: "智能家居中控屏界面优化", category: "智能硬件UI设计", tags: ["硬件UI", "视觉规范", "海外用户适配"], desc: "海外智能家居中控屏、门口机量产级UI，多尺寸横竖屏适配、海外审美适配。", icon: Monitor, cover: cover1, images: [project1Img1, project1Img2, project1Img3, project1Img4, project1Img5, project1Img6] },
  { id: "2", title: "温控调节界面层级与交互优化", category: "智能硬件UI设计", tags: ["交互设计", "信息架构", "体验优化"], desc: "梳理核心痛点，搭建多状态样式（常规/制热/制冷）与多尺寸适配。", icon: Layers, cover: cover2, images: [project2Img1, project2Img2, project2Img3, project2Img4] },
  { id: "3", title: "智能硬件门口机横竖屏适配", category: "智能硬件UI设计", tags: ["多终端适配", "硬件落地", "触控优化"], desc: "针对 1280x800 横屏与 800x1280 竖屏的监控/通话界面适配方案。", icon: Smartphone, cover: cover3, images: [project3Img1, project3Img2, project3Img3, project3Img4, project3Img5] },
  { id: "4", title: "海外节日主题皮肤 & 图标设计", category: "视觉/主题设计", tags: ["主题UI", "图标系统", "品牌视觉"], desc: "劳动节、情人节等主题界面与全套功能图标，100%落地量产。", icon: Palette, cover: cover4, images: [project4Img1, project4Img2, project4Img3] },
  { id: "5", title: "智能设备配置后台模块重构", category: "B端后台UI设计", tags: ["B端后台", "信息架构", "业务可视化"], desc: "解决原有层级混乱、效率低问题，梳理架构并优化交互反馈。", icon: Layout, cover: cover5, images: [project5Img1, project5Img2, project5Img3, project5Img4] },
  { id: "6", title: "AIGC辅助卡片背景视觉设计", category: "视觉/主题设计", tags: ["AIGC设计", "Prompt", "场景化视觉"], desc: "浅色/深色双主题卡片背景探索与设备场景适配。", icon: Image, cover: cover6, images: [project6Img1, project6Img2] },
  { id: "7", title: "宝宝学英语APP全流程改版", category: "C端APP设计", tags: ["UI/UX", "用户情绪体验", "游戏化设计"], desc: "全链路改版，包含练口语、绘本阅读、背单词PK小游戏及IP形象升级。", icon: Smartphone, cover: cover7, images: project7Images }
];

// Reusable SVG Icons for missing Lucide ones in this quick import
function Layout(props) { return <svg {...props} width="24" height="24" viewBox="0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>; }
function Image(props) { return <svg {...props} width="24" height="24" viewBox="0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>; }

// --- Global Styles Injection ---
const injectGlobalStyles = () => {
  if (document.getElementById('jada-styles')) return;
  const style = document.createElement('style');
  style.id = 'jada-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');
    
    body {
      background-color: #0a0a0d;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      margin: 0;
    }

    h1, h2, h3, .font-title {
      font-family: 'Space Grotesk', sans-serif;
    }

    .font-mono {
      font-family: monospace;
    }

    /* CRUCIAL INTERACTION RULE: 1px purple box with glow */
    .interactable {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid transparent;
    }
    
    .interactable:hover, .interactable.active {
      border: 1px solid #c8a2ff !important;
      box-shadow: 0 0 12px rgba(200, 162, 255, 0.3) !important;
      background-color: rgba(200, 162, 255, 0.05);
    }

    .glass-nav {
      background: rgba(10, 10, 13, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .bg-grid {
      background-image: 
        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(circle at center, black, transparent 80%);
    }

    .fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }
      
    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0a0a0d; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #c8a2ff; }
  `;
  document.head.appendChild(style);
};

// --- Linear Background Component (Replaced Particle Dispersion) ---
const LinearBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime = performance.now();
    let lastCycleCount = -1;
    let particles = [];
    let canvasW = 0;
    let canvasH = 0;
    const layers = 5; // 5层嵌套致敬参考图

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;
      
      // 初始化弥散粒子群 (PC 5000个, 移动端 2000个)
      const res = canvasW < 768 ? 400 : 1000;
      particles = [];
      for (let i = 0; i < layers; i++) {
        for (let j = 0; j <= res; j++) {
          particles.push({
            layer: i,
            j: j,
            res: res,
            // 初始坐标随机散落
            sx: (Math.random() - 0.5) * canvasW * 2.5,
            sy: (Math.random() - 0.5) * canvasH * 2.5,
            // 随机延迟和随机粒子大小
            delay: Math.random() * 0.4, // 拉大延迟增加层次感
            size: Math.random() * 1.5 + 0.5
          });
        }
      }
    };

    const animate = (now) => {
      const elapsed = now - startTime;
      const isMobile = canvasW < 768;
      
      const centerX = isMobile ? canvasW * 0.7 : canvasW * 0.75;
      const centerY = canvasH * 0.5;

      ctx.clearRect(0, 0, canvasW, canvasH);

      // --- 生命周期状态机 (10秒一个轮回) ---
      const cycleDuration = 10000; 
      const cycleTime = elapsed % cycleDuration;
      const currentCycleCount = Math.floor(elapsed / cycleDuration);

      // 当进入全新一轮循环时，重新随机打乱粒子的起源坐标，保证每次聚拢路径不同
      if (currentCycleCount > lastCycleCount) {
        lastCycleCount = currentCycleCount;
        particles.forEach(p => {
          p.sx = (Math.random() - 0.5) * canvasW * 2.5;
          p.sy = (Math.random() - 0.5) * canvasH * 2.5;
        });
      }

      let rawProgress = 0;
      // 0-3秒：弥散粒子聚合成蝴蝶
      if (cycleTime < 3000) {
        rawProgress = cycleTime / 3000; 
      } 
      // 3-6秒：维持线性蝴蝶完美状态 3秒
      else if (cycleTime < 6000) {
        rawProgress = 1;
      } 
      // 6-9秒：线性蝴蝶挥发，褪回粒子四散
      else if (cycleTime < 9000) {
        rawProgress = 1 - ((cycleTime - 6000) / 3000);
      } 
      // 9-10秒：粒子游离状态，等待下一次循环
      else {
        rawProgress = 0;
      }

      // 平滑缓动函数 (Ease In Out Cubic)
      const easeInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      const animProg = easeInOutCubic(rawProgress);

      const baseScale = isMobile ? 25 : 45;
      const globalPhase = Math.sin(elapsed * 0.0005) * 0.1;
      const breathe = 1 + Math.sin(elapsed * 0.001) * 0.02;

      // ==========================================
      // 第一层：弥散粒子的聚合与挥发
      // ==========================================
      // 粒子在形成后（animProg -> 1）完全透明，只在过渡期（< 0.95）显现
      const pAlpha = (1 - animProg) * 0.6; 
      
      if (pAlpha > 0.01) {
        ctx.fillStyle = `rgba(200, 162, 255, ${pAlpha})`;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          // 为每个粒子引入延迟变量，让聚合/散开显得错落有致
          const pProg = Math.max(0, Math.min(1, (animProg - p.delay * 0.5) / (1 - p.delay * 0.5)));
          
          const t = (p.j / p.res) * 24 * Math.PI;
          const sinT12 = Math.sin(t / 12);
          const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(sinT12, 5);
          const xt = r * Math.sin(t);
          const yt = -r * Math.cos(t);

          const scale = baseScale * (1 - p.layer * 0.15) * breathe;
          const layerPhase = globalPhase + p.layer * 0.03;

          const targetX = centerX + scale * (xt * Math.cos(layerPhase) - yt * Math.sin(layerPhase));
          const targetY = centerY + scale * (xt * Math.sin(layerPhase) + yt * Math.cos(layerPhase));

          // 粒子处于游离状态时叠加的微小漂浮感
          const floatX = Math.sin(elapsed * 0.001 + p.j) * 20 * (1 - pProg);
          const floatY = Math.cos(elapsed * 0.001 + p.j) * 20 * (1 - pProg);

          // 插值计算当前坐标：从散乱(sx,sy) 飞向 轨迹(targetX, targetY)
          const currX = (centerX + p.sx + floatX) + (targetX - (centerX + p.sx + floatX)) * pProg;
          const currY = (centerY + p.sy + floatY) + (targetY - (centerY + p.sy + floatY)) * pProg;

          ctx.rect(currX, currY, p.size, p.size);
        }
        ctx.fill();
      }

      // ==========================================
      // 第二层：高精锐利线框的平滑生长与褪去
      // ==========================================
      // 线条在粒子聚合进行了 10% 后开始生长
      const lineProg = Math.max(0, Math.min(1, (animProg - 0.1) / 0.9)); 
      
      if (lineProg > 0) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(200, 162, 255, 0.8)';
        ctx.shadowBlur = 15 * lineProg; // 辉光强度随进程增强

        for (let i = 0; i < layers; i++) {
          ctx.beginPath();
          const scale = baseScale * (1 - i * 0.15) * breathe;
          const layerPhase = globalPhase + i * 0.03;

          const lineRes = 2000;
          const limit = Math.max(1, Math.floor(lineRes * lineProg));

          for (let j = 0; j <= limit; j++) {
            const t = (j / lineRes) * 24 * Math.PI;
            const sinT12 = Math.sin(t / 12);
            const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(sinT12, 5);
            const xt = r * Math.sin(t);
            const yt = -r * Math.cos(t);

            const x = centerX + scale * (xt * Math.cos(layerPhase) - yt * Math.sin(layerPhase));
            const y = centerY + scale * (xt * Math.sin(layerPhase) + yt * Math.cos(layerPhase));

            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          // 内部层越暗，外部层越亮
          const alpha = (0.7 - i * 0.12) * lineProg;
          ctx.strokeStyle = `rgba(200, 162, 255, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <canvas ref={canvasRef} className="block w-full h-full mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/60 to-transparent"></div>
    </div>
  );
};

// --- UI Components ---
const Button = ({ children, onClick, primary = false, className = "", icon: Icon }) => (
  <button 
    onClick={onClick}
    className={`interactable group flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium tracking-wide
      ${primary ? 'bg-white/5 text-white' : 'bg-transparent text-gray-400'} 
      ${className}`}
  >
    {children}
    {Icon && <Icon className="w-4 h-4 group-hover:text-[#c8a2ff] transition-colors" />}
  </button>
);

const Tag = ({ children }) => (
  <span className="text-[10px] sm:text-xs font-mono text-[#b088e8] bg-[#c8a2ff]/10 px-2 py-1 rounded-sm border border-[#c8a2ff]/20">
    {children}
  </span>
);

// --- Pages ---
const Home = ({ navigate }) => (
  <div className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-20">
    <div className="w-full fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="flex items-start justify-between gap-6 mb-6">
        <p className="font-mono text-[#c8a2ff] text-sm tracking-wider">
          // INITIALIZING CREATIVE FLOW
        </p>
        <div className="flex flex-col items-center gap-1 shrink-0 fade-in-up" style={{animationDelay: '0.6s'}}>
          <img
            src={wechatQr}
            alt="微信二维码"
            className="interactable w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-sm border border-white/10 bg-white p-1"
          />
          <span className="text-[10px] font-mono text-gray-500 tracking-widest">WECHAT</span>
        </div>
      </div>

      <div className="max-w-4xl">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8 leading-tight tracking-wide">
        Welcome to my personal portfolio website
      </h1>

      <div className="flex flex-col sm:flex-row gap-8 mb-12">
        <div>
          <h2 className="text-xl text-white font-medium mb-2">单玉婷 | Jada Shan</h2>
          <p className="text-[#888888] max-w-sm leading-relaxed text-sm">
            福州大学2026届产品设计本科 | 全链路UI设计师<br/>
            深耕智能硬件、B端后台、C端APP视觉与交互设计，具备量产级落地设计能力。
          </p>
        </div>
        
        <div className="flex flex-col gap-2 border-l border-white/10 pl-0 sm:pl-8 pt-4 sm:pt-0">
           <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Status</p>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#c8a2ff] animate-pulse"></div>
             <span className="text-sm text-gray-300">Available for Opportunities</span>
           </div>
           <p className="text-xs text-gray-500 mt-2">EXPERIENCE: 多项目实战+企业实习</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
        <Button primary onClick={() => navigate('portfolio')} icon={ArrowRight}>
          查看作品集 / View Work
        </Button>
        <Button onClick={downloadResume} icon={Download}>
          下载完整简历 (PDF)
        </Button>
        <Button onClick={downloadPortfolio} icon={Download}>
          下载完整作品集 (PDF)
        </Button>
      </div>
      
      <div className="mt-12 flex flex-wrap gap-2 opacity-60">
        {['中共党员', 'CET6', '普通话二甲', 'ENTJ', '福建厦门'].map(tag => (
          <span key={tag} className="text-xs border border-white/20 px-2 py-1 rounded-full text-gray-400">
            {tag}
          </span>
        ))}
      </div>
      </div>
    </div>

  </div>
);

const Capabilities = () => (
  <div className="relative z-10 w-full bg-[#0a0a0d] border-t border-white/5 py-24 px-6 sm:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-16 fade-in-up">
        <div>
          <h2 className="text-sm font-mono text-[#c8a2ff] mb-2">01 // EXPERTISE</h2>
          <h3 className="text-3xl sm:text-4xl font-light text-white">Core Capabilities</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "智能硬件UI设计", desc: "海外智能家居中控屏、门口机量产级UI，多尺寸横竖屏适配、海外审美适配。", num: "01" },
          { title: "B端后台UI设计", desc: "企业设备管理后台重构、信息架构梳理、业务流程可视化。", num: "02" },
          { title: "C端APP设计", desc: "少儿教育APP全改版、交互优化、游戏化设计、链路重构。", num: "03" },
          { title: "视觉&动效设计", desc: "主题皮肤、图标系统、AIGC视觉、视频剪辑、交互动效。", num: "04" }
        ].map((item, idx) => (
          <div key={idx} className="interactable bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between min-h-[280px] fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
            <span className="text-xs font-mono text-gray-600 mb-8">{item.num} //</span>
            <div>
              <h4 className="text-xl text-white font-medium mb-4">{item.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 sm:px-12 lg:px-24 fade-in-up">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
      
      {/* Left Column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="aspect-[4/5] bg-gradient-to-br from-white/5 to-[#c8a2ff]/10 border border-white/10 rounded-sm relative overflow-hidden">
           <img
             src={profilePhoto}
             alt="单玉婷 Jada Shan"
             className="absolute inset-0 w-full h-full object-cover object-top"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d]/40 via-transparent to-transparent"></div>
        </div>
        
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm interactable">
          <h3 className="text-[#c8a2ff] font-mono text-xs mb-4 uppercase">Info</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Name</span><span className="text-white">单玉婷 (Jada Shan)</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Education</span><span className="text-white text-right">福州大学 2026届<br/>产品设计 本科</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Location</span><span className="text-white">福建 厦门</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>MBTI</span><span className="text-white">ENTJ</span></li>
            <li className="flex justify-between pt-1"><span>Status</span><span className="text-green-400">Available</span></li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        <h2 className="text-sm font-mono text-[#c8a2ff] mb-4">02 // PROFILE</h2>
        <h3 className="text-4xl sm:text-5xl font-light text-white mb-8">
          The Intersection of <br/><span className="italic text-gray-400">Discipline & Design.</span>
        </h3>
        
        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-xs sm:text-sm leading-loose sm:leading-8">
            在校期间历任
            <span className="text-[#c8a2ff] font-medium">班长</span>、
            <span className="text-[#c8a2ff] font-medium">院国旗队教官</span>、
            <span className="text-[#c8a2ff] font-medium">院团委志愿者工作部副部长</span>、
            <span className="text-[#c8a2ff] font-medium">系助理</span>
            等职务，具备良好的统筹协调、团队管理与执行能力。学业上多次荣获
            <span className="text-[#c8a2ff] font-medium">福州大学优秀学生综合奖学金一、二等奖</span>，并获评
            <span className="text-[#c8a2ff] font-medium">校精神文明建设先进个人</span>、
            <span className="text-[#c8a2ff] font-medium">院思政实践课一等奖</span>、
            <span className="text-[#c8a2ff] font-medium">校优秀共青团员</span>、
            <span className="text-[#c8a2ff] font-medium">优秀共青团干部</span>
            等多项荣誉。同时拥有两年军旅服役经历，兼具公益支教、乡村儿童关爱项目统筹等实践经验，塑造了本人
            <span className="text-[#c8a2ff] font-medium">自律抗压</span>、
            <span className="text-[#c8a2ff] font-medium">目标导向</span>、
            <span className="text-[#c8a2ff] font-medium">严谨负责</span>
            的综合素养。
          </p>
          <div className="border-l-2 border-[#c8a2ff] pl-6 my-8 py-2 bg-gradient-to-r from-[#c8a2ff]/5 to-transparent">
            <p className="font-medium text-white mb-2">🎖️ 两年军旅经历 (2021.03-2023.03)</p>
            <p className="text-sm text-gray-400">部队服役经历与公益支教项目，塑造了我极强的抗压能力、自律性以及目标导向的严谨工作素养。</p>
          </div>
          <p className="font-mono text-[#c8a2ff] text-lg">
            "路虽远，行则将至；事虽难，做则必成。"
          </p>
        </div>

        <div className="mt-16">
           <h3 className="text-sm font-mono text-gray-500 mb-6">SKILL CONSTELLATION</h3>
           <div className="flex flex-wrap gap-3">
             {["UI/UX Design", "Figma", "Sketch", "Prototyping", "3D / Keyshot", "Midjourney (AIGC)", "AI Coding", "After Effects", "Premiere", "Hardware UI Logic"].map(skill => (
               <span key={skill} className="interactable px-4 py-2 border border-white/10 rounded-sm text-sm text-gray-300 bg-white/[0.02]">
                 {skill}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

const Resume = () => (
  <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 sm:px-12 lg:px-24 flex flex-col items-center fade-in-up">
    <div className="max-w-3xl w-full">
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono text-[#c8a2ff] mb-2">03 // EXPERIENCE</h2>
        <h3 className="text-4xl font-light text-white">Professional Journey</h3>
      </div>

      <div className="relative border-l border-white/10 pl-8 sm:pl-12 ml-4 sm:ml-0 space-y-16">
        {/* Experience 1 */}
        <div className="relative interactable p-6 bg-white/[0.01] rounded-sm">
          <div className="absolute w-3 h-3 bg-[#0a0a0d] border-2 border-[#c8a2ff] rounded-full -left-[38px] sm:-left-[54px] top-8 shadow-[0_0_10px_#c8a2ff]"></div>
          <span className="font-mono text-xs text-[#c8a2ff] mb-2 block">2024.12 - 2025.06</span>
          <h4 className="text-xl font-medium text-white mb-1">UI设计师</h4>
          <p className="text-gray-400 text-sm mb-4">睿云联(厦门)网络通讯技术有限公司</p>
          <p className="text-xs sm:text-sm text-gray-400 leading-loose sm:leading-8">
            主要负责
            <span className="text-white font-medium">海外智能硬件（门口机/中控屏）UI设计与界面优化</span>
            工作，独立完成
            <span className="text-white font-medium">海外节日主题界面设计</span>
            并
            <span className="text-white font-medium">100%落地量产</span>；主导门口机等硬件的
            <span className="text-white font-medium">横/竖屏多尺寸界面适配与视觉优化</span>，保障
            <span className="text-white font-medium">视频通话、监控</span>
            等核心功能全场景可用；参与
            <span className="text-white font-medium">B端业务管理系统优化</span>，
            <span className="text-white font-medium">统一视觉规范、简化操作流程</span>，有效提升办公效率；同时完成
            <span className="text-white font-medium">智能家居温控界面迭代设计</span>，强化信息层级与交互体验，方案获
            <span className="text-white font-medium">产品团队认可并纳入版本迭代</span>。全程深耕海外智能硬件设计场景，熟练掌握
            <span className="text-white font-medium">多终端适配、视觉体系搭建、B端业务落地与量产级UI设计</span>
            能力。
          </p>
        </div>

        {/* Experience 2 */}
        <div className="relative interactable p-6 bg-white/[0.01] rounded-sm">
          <div className="absolute w-3 h-3 bg-[#0a0a0d] border-2 border-white/30 rounded-full -left-[38px] sm:-left-[54px] top-8"></div>
          <span className="font-mono text-xs text-gray-500 mb-2 block">2023.09 - 2023.11</span>
          <h4 className="text-xl font-medium text-white mb-1">UI设计师 (课题项目)</h4>
          <p className="text-gray-400 text-sm mb-4">宝宝学英语APP改版</p>
          <p className="text-xs sm:text-sm text-gray-400 leading-loose sm:leading-8">
            参与
            <span className="text-white font-medium">宝宝学英语APP改版全流程</span>
            工作，涵盖
            <span className="text-white font-medium">产品构思、项目企划、市场调研与整体视觉改版</span>；主导
            <span className="text-white font-medium">学习报告模块设计</span>，新增
            <span className="text-white font-medium">答题概况查看、答题分享</span>
            等功能；负责
            <span className="text-white font-medium">H5背单词PK小游戏</span>
            的视觉定义与制作，优化产品学习链路页面，产出
            <span className="text-white font-medium">学习、答题、打卡等核心功能图标</span>，并参与
            <span className="text-white font-medium">产品动效与视觉动画制作</span>；同时
            <span className="text-white font-medium">统筹团队分工与项目进度</span>，保障项目高质高效落地。
          </p>
        </div>
      </div>

      <div className="mt-24 flex justify-center">
        <Button primary className="py-4 px-8 text-lg w-full sm:w-auto justify-center" onClick={downloadResume} icon={Download}>
          Download Full Resume (PDF)
        </Button>
      </div>
    </div>
  </div>
);

const Portfolio = ({ setProject }) => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', '智能硬件UI设计', 'B端后台UI设计', 'C端APP设计', '视觉/主题设计'];

  const filteredProjects = filter === 'All' ? PORTFOLIO_DATA : PORTFOLIO_DATA.filter(p => p.category.includes(filter) || p.category === filter);

  return (
    <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 sm:px-12 lg:px-24 fade-in-up">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-mono text-[#c8a2ff] mb-2">04 // SELECTED WORKS</h2>
            <h3 className="text-4xl font-light text-white">Design Artifacts</h3>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`interactable px-4 py-2 text-xs font-mono rounded-sm transition-colors
                  ${filter === f ? 'bg-[#c8a2ff]/10 text-[#c8a2ff] border-[#c8a2ff]/50' : 'bg-transparent border-white/10 text-gray-500 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {filteredProjects.map((project, idx) => {
            const Icon = project.icon;
            // Make first item take 2 cols on large screens for bento effect
            const isLarge = idx === 0 || idx === 3; 
            
            return (
              <div 
                key={project.id}
                onClick={() => setProject(project)}
                className={`interactable group cursor-pointer relative bg-[#0f0f13] border border-white/5 rounded-sm overflow-hidden flex flex-col justify-between p-6 fade-in-up
                  ${isLarge ? 'lg:col-span-2' : 'col-span-1'}
                `}
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                {/* Cover Image or Placeholder Background */}
                <div className="absolute inset-0 transition-opacity duration-500">
                  {project.cover ? (
                    <>
                      <img src={project.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-45 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/70 to-[#0f0f13]/30"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 bg-gradient-to-br from-white/5 to-[#c8a2ff]/20">
                      <div className="absolute inset-0 bg-grid transform scale-150 mix-blend-overlay"></div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-sm backdrop-blur-sm border border-white/5">
                    <Icon className="w-6 h-6 text-[#c8a2ff]" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 p-2 rounded-full backdrop-blur-md">
                     <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 2).map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-medium text-white mb-2 group-hover:text-[#c8a2ff] transition-colors">{project.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-2">{project.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 fade-in-up">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0d]/90 backdrop-blur-xl" onClick={onClose}></div>
      
      {/* Content Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0f0f13] border border-[#c8a2ff]/20 rounded-sm overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f0f13]/80 backdrop-blur-md z-10">
          <div>
            <span className="font-mono text-xs text-[#c8a2ff] mb-1 block">SYS_PROJECT_ID: {project.id.padStart(4, '0')}</span>
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
          </div>
          <button onClick={onClose} className="interactable p-2 bg-white/5 text-gray-400 hover:text-white rounded-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
             <div className="md:col-span-2 space-y-6">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{project.desc}</p>
                
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-8">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
             </div>
             
             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm h-fit">
                <h3 className="text-sm font-mono text-[#c8a2ff] mb-4">Metadata</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Category</span><span className="text-white text-right">{project.category}</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Role</span><span className="text-white text-right">UI Designer</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Platform</span><span className="text-white text-right">Multi-device</span></li>
                </ul>
             </div>
          </div>

          {/* Project Gallery */}
          <div className="space-y-8">
            {project.images?.length ? (
              project.images.map((src, idx) => (
                <div key={idx} className="w-full border border-white/10 rounded-sm overflow-hidden interactable bg-[#1a1a20]">
                  <img
                    src={src}
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full h-auto block"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))
            ) : (
              <>
                <div className="w-full aspect-video bg-[#1a1a20] border border-white/10 rounded-sm flex items-center justify-center interactable cursor-pointer">
                  <span className="font-mono text-gray-500">[ High-Fidelity UI Presentation Image 1 ]</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="w-full aspect-square bg-[#1a1a20] border border-white/10 rounded-sm flex flex-col items-center justify-center p-8 text-center interactable">
                    <Monitor className="w-8 h-8 text-gray-600 mb-4" />
                    <span className="font-mono text-sm text-gray-500">[ Logic Architecture / State Machine ]</span>
                  </div>
                  <div className="w-full aspect-square bg-[#1a1a20] border border-white/10 rounded-sm flex flex-col items-center justify-center p-8 text-center interactable">
                    <Smartphone className="w-8 h-8 text-gray-600 mb-4" />
                    <span className="font-mono text-sm text-gray-500">[ Multi-resolution Adapation ]</span>
                  </div>
                </div>
                <div className="w-full h-96 bg-[#1a1a20] border border-white/10 rounded-sm flex items-center justify-center interactable">
                  <span className="font-mono text-gray-500">[ Final Mockup / Render ]</span>
                </div>
              </>
            )}
          </div>

          <div className="mt-16 text-center">
             <Button className="mx-auto" onClick={onClose}>Close Project</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Contact = () => (
  <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 sm:px-12 lg:px-24 flex flex-col justify-center fade-in-up">
    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
      
      <div>
        <h2 className="text-sm font-mono text-[#c8a2ff] mb-2">05 // GET IN TOUCH</h2>
        <h3 className="text-4xl sm:text-5xl font-light text-white mb-8">Initiate <br/>Connection.</h3>
        <p className="text-gray-400 mb-12 text-sm leading-relaxed">
          欢迎求职沟通、设计交流或项目合作。目前正在寻找 UI/UX 相关的全职机会。
        </p>

        <div className="space-y-6">
          <a href="tel:13774146769" className="interactable flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm group">
            <Phone className="w-5 h-5 text-gray-500 group-hover:text-[#c8a2ff]" />
            <div>
              <p className="text-xs font-mono text-gray-500">PHONE</p>
              <p className="text-white tracking-wider">137-7414-6769</p>
            </div>
          </a>
          <a href="mailto:2871374421@qq.com" className="interactable flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm group">
            <Mail className="w-5 h-5 text-gray-500 group-hover:text-[#c8a2ff]" />
            <div>
              <p className="text-xs font-mono text-gray-500">EMAIL</p>
              <p className="text-white tracking-wider">2871374421@qq.com</p>
            </div>
          </a>
          <div className="interactable flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm group">
            <Smartphone className="w-5 h-5 text-gray-500 group-hover:text-[#c8a2ff]" />
            <div>
              <p className="text-xs font-mono text-gray-500">WECHAT</p>
              <p className="text-white tracking-wider">Jada_Shan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f0f13] border border-white/5 p-8 rounded-sm">
        <h4 className="text-xl text-white mb-6 font-medium">Send a Message</h4>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent simulated!'); }}>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2">NAME</label>
            <input type="text" required className="interactable w-full bg-white/[0.02] border border-white/10 p-3 rounded-sm text-white focus:outline-none focus:border-[#c8a2ff] focus:ring-1 focus:ring-[#c8a2ff] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2">EMAIL</label>
            <input type="email" required className="interactable w-full bg-white/[0.02] border border-white/10 p-3 rounded-sm text-white focus:outline-none focus:border-[#c8a2ff] focus:ring-1 focus:ring-[#c8a2ff] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2">MESSAGE</label>
            <textarea required rows={4} className="interactable w-full bg-white/[0.02] border border-white/10 p-3 rounded-sm text-white focus:outline-none focus:border-[#c8a2ff] focus:ring-1 focus:ring-[#c8a2ff] transition-all"></textarea>
          </div>
          <Button primary className="w-full justify-center">Transmit Message</Button>
        </form>
      </div>
    </div>
  </div>
);

// --- Main App ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    injectGlobalStyles();
  }, []);

  const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Works' },
    { id: 'contact', label: 'Contact' }
  ];

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-white selection:bg-[#c8a2ff] selection:text-black">
      {/* Background stays persistent */}
      <LinearBackground />

      {/* Navbar */}
      <nav className="glass-nav fixed top-0 w-full z-40 px-6 sm:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 bg-[#c8a2ff] rounded-sm hidden sm:block"></div>
           <span 
             className="font-mono text-sm tracking-widest text-white cursor-pointer hover:text-[#c8a2ff] transition-colors"
             onClick={() => navigate('home')}
           >
             JADA SHAN <span className="text-gray-600 hidden sm:inline">/ UI DESIGNER</span>
           </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`interactable px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors
                ${currentPage === item.id ? 'text-[#c8a2ff] bg-white/5' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <span className="text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-sm">
            STATUS: <span className="text-green-400">AVAILABLE</span>
          </span>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden interactable p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0a0a0d]/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-4 md:hidden">
           {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`interactable w-full text-left p-4 text-xl font-light border-b border-white/5
                ${currentPage === item.id ? 'text-[#c8a2ff]' : 'text-gray-300'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 w-full pb-20">
        {currentPage === 'home' && (
          <>
            <Home navigate={navigate} />
            <Capabilities />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'resume' && <Resume />}
        {currentPage === 'portfolio' && <Portfolio setProject={setSelectedProject} />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#0a0a0d]/80 backdrop-blur-md py-8 text-center flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12">
        <p className="text-xs font-mono text-gray-600 mb-4 sm:mb-0">
          © 2026 JADA SHAN. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          <span className="text-xs text-gray-600">DESIGNED WITH SYSTEMATIC LOGIC.</span>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
    </div>
  );
}