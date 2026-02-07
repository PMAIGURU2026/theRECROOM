import { useEffect, useState } from "react";
import { ArrowLeft, Search, Check, ThumbsUp, ThumbsDown, BookOpen, Users, MessageCircle, Star } from "lucide-react";
import { supabase } from "./supabaseClient";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --red: #FF1A1A; --red-dk: #C41200; --red-lt: #FF4D4D;
    --black: #000; --dk-gray: #1A1A1A; --mid-gray: #666;
    --lt-gray: #999; --border: #E5E5E5; --bg: #F5F5F5; --white: #FFF;
    --gold: #F5A623; --gold-lt: #FFF8EC;
    --blue: #0066CC; --blue-lt: #EBF2FA;
    --green: #2E9E5A; --green-lt: #EBF8F0;
    --purple: #7B2FBE; --purple-lt: #F3EBF9;
  }
  body { font-family:'Source Sans 3',sans-serif; background:var(--bg); color:var(--dk-gray); min-height:100vh; }

  .nav { background:var(--red); padding:0 24px; height:56px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; box-shadow:0 2px 8px rgba(0,0,0,.15); }
  .nav-logo { font-family:'Playfair Display',serif; color:var(--white); font-size:26px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; letter-spacing:-.5px; }
  .nav-logo .burst { width:28px; height:28px; background:var(--white); clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); display:flex; align-items:center; justify-content:center; }
  .nav-logo .burst-inner { width:14px; height:14px; background:var(--red); clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); }
  .nav-search { flex:1; max-width:520px; margin:0 24px; position:relative; }
  .nav-search input { width:100%; padding:10px 16px 10px 40px; border:none; border-radius:24px; font-size:14px; font-family:'Source Sans 3',sans-serif; outline:none; background:rgba(255,255,255,.95); }
  .nav-search .search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--lt-gray); }
  .nav-actions { display:flex; gap:16px; align-items:center; }
  .nav-btn { background:transparent; border:1.5px solid var(--white); color:var(--white); padding:6px 16px; border-radius:20px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Source Sans 3',sans-serif; transition:.2s; }
  .nav-btn:hover { background:rgba(255,255,255,.15); }

  .hero { background:linear-gradient(135deg,var(--red),var(--red-dk)); padding:80px 24px 72px; text-align:center; position:relative; overflow:hidden; }
  .hero::before { content:''; position:absolute; top:-60px; right:-60px; width:240px; height:240px; background:rgba(255,255,255,.06); border-radius:50%; }
  .hero::after { content:''; position:absolute; bottom:-40px; left:-40px; width:180px; height:180px; background:rgba(255,255,255,.04); border-radius:50%; }
  .hero h1 { font-family:'Playfair Display',serif; color:var(--white); font-size:42px; font-weight:700; margin-bottom:10px; position:relative; z-index:1; }
  .hero p { color:rgba(255,255,255,.85); font-size:17px; max-width:560px; margin:0 auto 32px; position:relative; z-index:1; font-weight:300; }
  .hero-btn { background:var(--white); color:var(--red); border:none; padding:14px 36px; border-radius:28px; font-size:16px; font-weight:600; cursor:pointer; font-family:'Source Sans 3',sans-serif; transition:.25s; box-shadow:0 4px 16px rgba(0,0,0,.2); position:relative; z-index:1; }
  .hero-btn:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(0,0,0,.25); }

  .section-header { padding:28px 24px 12px; display:flex; justify-content:space-between; align-items:baseline; }
  .section-header h2 { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--black); }
  .section-header .see-all { color:var(--red); font-size:14px; font-weight:600; cursor:pointer; border-bottom:1px solid transparent; transition:.2s; }
  .section-header .see-all:hover { border-color:var(--red); }

  .card-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; padding:0 24px 32px; }
  .classmate-card { background:var(--white); border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.08); cursor:pointer; transition:.25s; border:1px solid var(--border); }
  .classmate-card:hover { transform:translateY(-3px); box-shadow:0 6px 20px rgba(0,0,0,.14); border-color:var(--red-lt); }
  .card-avatar-wrap { height:140px; background:linear-gradient(135deg,#f0f0f0,#e0e0e0); display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
  .card-avatar { width:76px; height:76px; border-radius:50%; background:var(--red); border:3px solid var(--white); box-shadow:0 2px 10px rgba(0,0,0,.15); display:flex; align-items:center; justify-content:center; z-index:1; }
  .card-avatar .initials { color:var(--white); font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
  .card-photo { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
  .camera-shy-badge { position:absolute; left:-10px; right:-10px; top:50%; transform:translateY(-50%) rotate(-8deg); background:rgba(0,0,0,.65); color:var(--white); font-size:11px; font-weight:700; letter-spacing:1px; text-align:center; padding:4px 0; text-transform:uppercase; z-index:2; }
  .card-body { padding:16px; }
  .card-name { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--black); margin-bottom:4px; }
  .card-role { font-size:13px; color:var(--red); font-weight:600; margin-bottom:8px; }
  .card-stars { display:flex; align-items:center; gap:4px; margin-bottom:8px; }
  .card-stars .avg { font-size:13px; color:var(--mid-gray); font-weight:600; margin-left:4px; }
  .card-stars .count { font-size:12px; color:var(--lt-gray); }
  .card-tags { display:flex; flex-wrap:wrap; gap:6px; }
  .tag { background:#f0f0f0; color:var(--mid-gray); font-size:11px; font-weight:600; padding:4px 10px; border-radius:12px; text-transform:uppercase; letter-spacing:.5px; }
  .card-recognition { position:absolute; top:10px; right:10px; background:var(--gold); color:var(--white); font-size:10px; font-weight:700; padding:3px 8px; border-radius:10px; text-transform:uppercase; letter-spacing:.5px; box-shadow:0 1px 4px rgba(0,0,0,.2); }

  /* People Also Search For */
  .also-search { padding:0 24px 28px; }
  .also-search-scroll { display:flex; gap:10px; overflow-x:auto; padding-bottom:8px; scrollbar-width:none; }
  .also-search-scroll::-webkit-scrollbar { display:none; }
  .also-chip { background:var(--white); border:1.5px solid var(--border); border-radius:24px; padding:10px 18px; white-space:nowrap; cursor:pointer; font-size:13px; font-weight:600; color:var(--mid-gray); display:flex; align-items:center; gap:6px; transition:.2s; box-shadow:0 1px 4px rgba(0,0,0,.06); flex-shrink:0; }
  .also-chip:hover { border-color:var(--red); color:var(--red); box-shadow:0 2px 8px rgba(0,0,0,.1); }
  .also-chip .chip-icon { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }

  /* Profile */
  .profile-page { background:var(--white); min-height:100vh; }
  .profile-hero { background:linear-gradient(135deg,var(--red),var(--red-dk)); padding:48px 24px 56px; text-align:center; }
  .profile-avatar-lg { width:110px; height:110px; border-radius:50%; background:rgba(255,255,255,.2); border:4px solid var(--white); margin:0 auto 16px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 16px rgba(0,0,0,.2); position:relative; overflow:hidden; }
  .profile-avatar-lg .initials { color:var(--white); font-family:'Playfair Display',serif; font-size:40px; font-weight:700; }
  .profile-photo { width:100%; height:100%; object-fit:cover; }
  .profile-avatar-lg .camera-shy-badge { font-size:12px; }
  .profile-name { font-family:'Playfair Display',serif; color:var(--white); font-size:30px; font-weight:700; margin-bottom:4px; }
  .profile-role-badge { display:inline-block; background:rgba(255,255,255,.2); color:var(--white); font-size:13px; font-weight:600; padding:4px 16px; border-radius:16px; margin-bottom:12px; }
  .profile-overall-stars { display:flex; align-items:center; justify-content:center; gap:6px; }
  .profile-overall-stars .big-avg { color:var(--white); font-size:20px; font-weight:700; }
  .profile-overall-stars .review-count { color:rgba(255,255,255,.7); font-size:13px; }

  /* Sticky Tab Nav */
  .profile-tabs { background:var(--white); border-bottom:1px solid var(--border); position:sticky; top:56px; z-index:90; display:flex; justify-content:center; }
  .profile-tab { padding:14px 28px; font-size:14px; font-weight:600; color:var(--lt-gray); cursor:pointer; border:none; background:none; font-family:'Source Sans 3',sans-serif; border-bottom:3px solid transparent; transition:.2s; display:flex; align-items:center; gap:6px; }
  .profile-tab:hover { color:var(--mid-gray); }
  .profile-tab.active { color:var(--red); border-bottom-color:var(--red); }

  .profile-content { max-width:780px; margin:0 auto; padding:24px 24px 48px; }

  /* About sections */
  .answers-section, .rating-breakdown, .resource-card, .qa-section { background:var(--white); border-radius:14px; box-shadow:0 4px 20px rgba(0,0,0,.1); padding:28px; margin-bottom:20px; border:1px solid var(--border); }
  .answers-section h3, .rating-breakdown h3, .resource-card h3, .qa-section h3 { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--black); margin-bottom:18px; padding-bottom:12px; border-bottom:2px solid var(--red); display:inline-block; }
  .answer-item { margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid #f0f0f0; }
  .answer-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
  .answer-q { font-size:13px; font-weight:600; color:var(--red); text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }
  .answer-a { font-size:15px; color:var(--dk-gray); line-height:1.5; }

  .breakdown-row { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
  .breakdown-label { width:32px; font-size:13px; font-weight:600; color:var(--mid-gray); text-align:right; }
  .breakdown-bar-bg { flex:1; height:12px; background:#f0f0f0; border-radius:6px; overflow:hidden; }
  .breakdown-bar-fill { height:100%; background:var(--gold); border-radius:6px; transition:width .6s; }
  .breakdown-pct { width:38px; font-size:12px; color:var(--lt-gray); }

  /* Resources */
  .resource-intro { font-size:13px; color:var(--lt-gray); margin-bottom:18px; line-height:1.5; }
  .resource-item { display:flex; gap:14px; align-items:flex-start; padding:14px 0; border-bottom:1px solid #f0f0f0; }
  .resource-item:last-child { border-bottom:none; }
  .resource-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .resource-icon.blue { background:var(--blue-lt); color:var(--blue); }
  .resource-icon.green { background:var(--green-lt); color:var(--green); }
  .resource-icon.purple { background:var(--purple-lt); color:var(--purple); }
  .resource-icon.gold { background:var(--gold-lt); color:#D4890A; }
  .resource-title { font-size:15px; font-weight:600; color:var(--black); margin-bottom:3px; }
  .resource-desc { font-size:13px; color:var(--lt-gray); line-height:1.4; }
  .resource-tag { display:inline-block; margin-top:6px; font-size:11px; font-weight:600; padding:3px 8px; border-radius:8px; text-transform:uppercase; letter-spacing:.4px; }
  .resource-tag.article { background:var(--blue-lt); color:var(--blue); }
  .resource-tag.course { background:var(--green-lt); color:var(--green); }
  .resource-tag.tool { background:var(--purple-lt); color:var(--purple); }
  .resource-tag.tutorial { background:var(--gold-lt); color:#D4890A; }

  /* Q&A */
  .qa-item { padding:14px 0; border-bottom:1px solid #f0f0f0; }
  .qa-item:last-child { border-bottom:none; }
  .qa-question { font-size:14px; font-weight:600; color:var(--dk-gray); margin-bottom:6px; display:flex; gap:8px; align-items:flex-start; }
  .q-badge { background:var(--red); color:var(--white); font-size:11px; font-weight:700; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
  .qa-answer { font-size:13px; color:var(--mid-gray); line-height:1.5; padding-left:28px; }
  .qa-meta { font-size:11px; color:var(--lt-gray); padding-left:28px; margin-top:4px; }

  /* Review Insights */
  .insights-bar { background:var(--white); border-radius:14px; box-shadow:0 4px 20px rgba(0,0,0,.1); padding:22px 28px; margin-bottom:20px; border:1px solid var(--border); }
  .insights-bar h4 { font-size:13px; font-weight:600; color:var(--lt-gray); text-transform:uppercase; letter-spacing:.6px; margin-bottom:14px; }
  .insights-row { display:flex; gap:12px; flex-wrap:wrap; }
  .insight-pill { display:flex; align-items:center; gap:8px; background:#fafafa; border:1px solid var(--border); border-radius:20px; padding:7px 14px; }
  .insight-label { font-size:13px; font-weight:600; color:var(--dk-gray); }
  .insight-score { font-size:12px; font-weight:700; padding:2px 8px; border-radius:10px; }
  .insight-score.positive { background:var(--green-lt); color:var(--green); }
  .insight-score.neutral { background:#FFF3CD; color:#856404; }

  /* Reviews */
  .reviews-section h3 { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--black); margin-bottom:16px; }
  .review-card { background:var(--white); border-radius:14px; box-shadow:0 2px 10px rgba(0,0,0,.07); padding:22px; margin-bottom:14px; border:1px solid var(--border); }
  .review-header { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
  .review-avatar { width:40px; height:40px; border-radius:50%; background:var(--red); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .review-avatar .initials { color:var(--white); font-size:15px; font-weight:700; font-family:'Playfair Display',serif; }
  .review-meta { flex:1; }
  .review-reviewer-name { font-size:14px; font-weight:600; color:var(--black); }
  .review-date { font-size:12px; color:var(--lt-gray); }
  .review-recognition-badge { display:inline-block; background:var(--gold); color:var(--white); font-size:10px; font-weight:700; padding:2px 7px; border-radius:8px; margin-left:6px; vertical-align:middle; text-transform:uppercase; letter-spacing:.3px; }
  .review-stars { margin-bottom:10px; display:flex; gap:2px; }
  .review-text { font-size:14px; color:var(--mid-gray); line-height:1.6; margin-bottom:12px; }
  .review-helpful { display:flex; align-items:center; gap:12px; padding-top:10px; border-top:1px solid #f0f0f0; }
  .review-helpful span { font-size:12px; color:var(--lt-gray); font-weight:500; }
  .helpful-btn { display:flex; align-items:center; gap:4px; background:none; border:1.5px solid var(--border); border-radius:16px; padding:4px 10px; cursor:pointer; font-size:12px; color:var(--mid-gray); font-weight:600; font-family:'Source Sans 3',sans-serif; transition:.2s; }
  .helpful-btn:hover { border-color:var(--red); color:var(--red); }
  .helpful-btn.active { border-color:var(--red); background:var(--red); color:var(--white); }

  /* Form */
  .review-form-page { background:var(--bg); min-height:100vh; }
  .review-form-container { max-width:680px; margin:0 auto; padding:32px 24px; }
  .form-card { background:var(--white); border-radius:16px; box-shadow:0 4px 24px rgba(0,0,0,.1); padding:36px; border:1px solid var(--border); }
  .form-card h2 { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:var(--black); margin-bottom:6px; }
  .form-subtitle { font-size:14px; color:var(--lt-gray); margin-bottom:28px; }
  .form-target-mini { display:flex; align-items:center; gap:12px; background:#faf5f5; border:1px solid #f0d8d8; border-radius:10px; padding:12px 16px; margin-bottom:28px; }
  .form-target-mini .mini-avatar { width:42px; height:42px; border-radius:50%; background:var(--red); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .form-target-mini .mini-avatar .initials { color:white; font-size:16px; font-weight:700; font-family:'Playfair Display',serif; }
  .mini-name { font-size:15px; font-weight:700; color:var(--black); }
  .mini-role { font-size:12px; color:var(--red); font-weight:600; }
  .form-group { margin-bottom:24px; }
  .form-group label { display:block; font-size:14px; font-weight:600; color:var(--black); margin-bottom:8px; }
  .star-selector { display:flex; gap:4px; }
  .star-btn { background:none; border:none; cursor:pointer; transition:transform .15s; }
  .star-btn:hover { transform:scale(1.15); }
  .form-group textarea { width:100%; padding:12px 16px; border:1.5px solid var(--border); border-radius:10px; font-family:'Source Sans 3',sans-serif; font-size:14px; resize:vertical; min-height:100px; outline:none; transition:border-color .2s; color:var(--dk-gray); }
  .form-group textarea:focus { border-color:var(--red); }
  .form-group textarea::placeholder { color:var(--lt-gray); }
  .dimension-chips { display:flex; flex-wrap:wrap; gap:8px; }
  .dim-chip { padding:8px 16px; border:1.5px solid var(--border); border-radius:20px; font-size:13px; font-weight:600; color:var(--mid-gray); cursor:pointer; background:var(--white); transition:.2s; font-family:'Source Sans 3',sans-serif; }
  .dim-chip:hover { border-color:var(--red-lt); color:var(--red); }
  .dim-chip.active { border-color:var(--red); background:#fff5f5; color:var(--red); }
  .submit-btn { width:100%; padding:14px; background:var(--red); color:var(--white); border:none; border-radius:10px; font-size:16px; font-weight:600; cursor:pointer; font-family:'Source Sans 3',sans-serif; transition:.2s; margin-top:8px; }
  .submit-btn:hover { background:var(--red-dk); transform:translateY(-1px); }
  .submit-btn:disabled { background:#ccc; cursor:not-allowed; transform:none; }
  .back-btn { display:flex; align-items:center; gap:6px; background:none; border:none; cursor:pointer; color:var(--red); font-size:14px; font-weight:600; padding:16px 24px; font-family:'Source Sans 3',sans-serif; }
  .back-btn:hover { opacity:.7; }

  .success-overlay { text-align:center; padding:60px 24px; }
  .success-icon { width:80px; height:80px; background:var(--red); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; box-shadow:0 4px 16px rgba(255,26,26,.35); }
  .success-overlay h2 { font-family:'Playfair Display',serif; font-size:26px; color:var(--black); margin-bottom:8px; }
  .success-overlay p { color:var(--lt-gray); font-size:15px; margin-bottom:28px; }
  .success-btn { background:var(--red); color:white; border:none; padding:12px 32px; border-radius:24px; font-size:15px; font-weight:600; cursor:pointer; font-family:'Source Sans 3',sans-serif; }
  .success-btn:hover { background:var(--red-dk); }
`;

// ── DATA ──────────────────────────────────────────────────────────────────
const RESOURCES_MAP = {
  "Full-Stack Developer": [
    { icon:"blue", type:"article", title:"System Design Primer: Building Scalable Apps", desc:"Master architectural patterns, load balancing, caching, and database design used at scale." },
    { icon:"green", type:"course", title:"The Complete React & Node.js Course", desc:"End-to-end app development with state management, authentication, and deployment strategies." },
    { icon:"purple", type:"tool", title:"Next.js Framework & Vercel Deployment", desc:"Modern full-stack development with Server Components, API routes, and zero-config deployment." },
    { icon:"gold", type:"tutorial", title:"Building Your First Production App", desc:"Practical checklist: authentication, error handling, monitoring, testing, and security best practices." },
  ],
  "Product & UX Designer": [
    { icon:"purple", type:"tool", title:"Figma Advanced Design Systems & Libraries", desc:"Create scalable, maintainable component systems for collaborative design at enterprise scale." },
    { icon:"blue", type:"article", title:"Design Thinking for Tech Startups", desc:"Customer discovery, rapid prototyping, and iterative validation for AI-powered products." },
    { icon:"green", type:"course", title:"Product Strategy & Vision (Maven Analytics)", desc:"From problem definition to product-market fit — frameworks used by top tech PMs." },
    { icon:"gold", type:"tutorial", title:"End-to-End Design Workflow: Research to Handoff", desc:"User research → wireframes → prototypes → developer specs with design tokens and accessibility." },
  ],
  "Data Scientist": [
    { icon:"blue", type:"article", title:"Generative AI & LLMs: Practical Applications", desc:"Understanding prompt engineering, fine-tuning, retrieval-augmented generation (RAG), and evaluation." },
    { icon:"green", type:"course", title:"Applied Machine Learning with Python & SQL", desc:"Real-world ML pipelines, feature engineering, model evaluation, and handling production data." },
    { icon:"purple", type:"tool", title:"Hugging Face & LangChain for AI Products", desc:"Build AI applications with pre-trained models, embeddings, and LLM orchestration tools." },
    { icon:"gold", type:"tutorial", title:"From Notebook to Production: ML Deployment", desc:"Model versioning, A/B testing, monitoring, and scaling ML systems with cloud platforms." },
  ],
  "Backend Engineer": [
    { icon:"blue", type:"article", title:"Event-Driven Architecture & Message Queues", desc:"Scalable backend patterns with RabbitMQ, Kafka, and eventual consistency trade-offs." },
    { icon:"green", type:"course", title:"AWS Certified Solutions Architect – Associate", desc:"Cloud services, networking, security, and infrastructure-as-code for production backends." },
    { icon:"purple", type:"tool", title:"PostgreSQL & Database Optimization", desc:"Advanced SQL, indexing, query optimization, replication, and backup strategies." },
    { icon:"gold", type:"tutorial", title:"Architecting Microservices with CI/CD Pipelines", desc:"Service design, containerization with Docker, orchestration, and GitOps workflows." },
  ],
  "Mobile Developer": [
    { icon:"blue", type:"article", title:"Cross-Platform Mobile Development Trade-offs", desc:"React Native vs Flutter vs native — performance, ecosystem, and time-to-market analysis." },
    { icon:"green", type:"course", title:"React Native: Build Production Apps", desc:"Navigation, state management (Redux), native modules, push notifications, and app store submission." },
    { icon:"purple", type:"tool", title:"Firebase for Mobile Backends", desc:"Authentication, Firestore database, Cloud Functions, Analytics, and crash reporting." },
    { icon:"gold", type:"tutorial", title:"Publishing to iOS & Android App Stores", desc:"Signing certificates, provisioning profiles, App Store Connect, Google Play Console, and version management." },
  ],
  "DevOps & Automation": [
    { icon:"blue", type:"article", title:"GitHub Actions & Enterprise CI/CD Workflows", desc:"Matrix strategies, reusable workflows, security scanning, secrets management, and cost optimization." },
    { icon:"green", type:"course", title:"Kubernetes for DevOps Engineers", desc:"Container orchestration, deployment strategies, service mesh, and cluster administration." },
    { icon:"purple", type:"tool", title:"Terraform & Infrastructure as Code", desc:"Declarative infrastructure provisioning, state management, and multi-cloud deployment strategies." },
    { icon:"gold", type:"tutorial", title:"Building Resilient Deployment Pipelines", desc:"Blue-green deployments, canary releases, rollback strategies, monitoring, and observability stacks." },
  ],
};

const QA_MAP = {
  1: [
    { q:"What's your go-to stack for a new project from scratch?", a:"React + Node + PostgreSQL. It's versatile and I know it inside and out.", asker:"Destiny W.", date:"Jan 29" },
    { q:"How do you approach debugging complex async issues?", a:"I always start by isolating the promise chain and logging at each step. Chrome's async stack traces have been a game-changer.", asker:"Kai O.", date:"Jan 26" },
  ],
  2: [
    { q:"What's your process when you receive vague requirements?", a:"I push back immediately with a structured set of clarifying questions — who's the user, what's the trigger, what does success look like?", asker:"Marcus C.", date:"Jan 28" },
    { q:"Any tips for building a strong UX portfolio?", a:"Show your process, not just the final screens. Annotate your wireframes and include your research findings.", asker:"Tyler K.", date:"Jan 24" },
  ],
  3: [
    { q:"What ML framework do you recommend for beginners?", a:"TensorFlow if you want ecosystem breadth, PyTorch if you want flexibility. Both are solid — just pick one and commit.", asker:"Aisha B.", date:"Jan 27" },
    { q:"How do you handle class imbalance in your datasets?", a:"SMOTE for smaller datasets, class weights for larger ones. Always validate with stratified k-fold.", asker:"Jordan P.", date:"Jan 23" },
  ],
  4: [
    { q:"What's the biggest gotcha with microservices?", a:"Distributed tracing. Once you go micro, debugging across services becomes the hardest problem. Invest in observability early.", asker:"Marcus C.", date:"Jan 28" },
    { q:"How do you size your Docker containers for production?", a:"Start minimal with alpine images, profile under load, then set resource limits. Never guess — measure.", asker:"Sam R.", date:"Jan 22" },
  ],
  5: [
    { q:"Flutter or React Native — which should I learn first?", a:"Dart is more opinionated but Flutter's widget engine is genuinely impressive. If you already know JS, RN has a lower learning curve.", asker:"Kai O.", date:"Jan 27" },
    { q:"How do you handle offline-first data in mobile?", a:"SQLite for local storage with a sync queue. Conflict resolution is the tricky part — last-write-wins works for most apps.", asker:"Destiny W.", date:"Jan 25" },
  ],
  6: [
    { q:"What's the best way to learn CI/CD from zero?", a:"Build a pipeline for a real project you care about. GitHub Actions is the easiest entry point — the YAML syntax clicks fast.", asker:"Aisha B.", date:"Jan 26" },
    { q:"How do you handle secrets in a multi-environment setup?", a:"Never hardcode. Use environment-specific secret stores — GitHub Secrets for CI, AWS SSM or Vault for production.", asker:"Tyler K.", date:"Jan 24" },
  ],
};

const INSIGHTS_MAP = {
  1: [{label:"Expertise",score:92,level:"positive"},{label:"Collaboration",score:88,level:"positive"},{label:"Communication",score:78,level:"positive"},{label:"Availability",score:65,level:"neutral"}],
  2: [{label:"Creativity",score:95,level:"positive"},{label:"Strategic Thinking",score:91,level:"positive"},{label:"Mentorship",score:84,level:"positive"},{label:"Pace",score:72,level:"positive"}],
  3: [{label:"Technical Depth",score:89,level:"positive"},{label:"Problem-Solving",score:85,level:"positive"},{label:"Participation",score:55,level:"neutral"},{label:"Mentorship",score:70,level:"positive"}],
  4: [{label:"Reliability",score:94,level:"positive"},{label:"System Design",score:90,level:"positive"},{label:"Teamwork",score:86,level:"positive"},{label:"Availability",score:68,level:"neutral"}],
  5: [{label:"UI Polish",score:93,level:"positive"},{label:"Creativity",score:88,level:"positive"},{label:"Engagement",score:82,level:"positive"},{label:"Backend Skills",score:52,level:"neutral"}],
  6: [{label:"Automation Skills",score:91,level:"positive"},{label:"Knowledge Sharing",score:85,level:"positive"},{label:"Problem-Solving",score:80,level:"positive"},{label:"Focus Balance",score:58,level:"neutral"}],
};

const ALSO_SEARCH = [
  {label:"Top Rated Mentors",icon:"🎓",bg:"#FFF3E0",filter:"mentor"},
  {label:"Backend Experts",icon:"⚙️",bg:"#E3F2FD",filter:"backend"},
  {label:"UI/UX Designers",icon:"🎨",bg:"#F3E5F5",filter:"design"},
  {label:"Data & AI",icon:"📊",bg:"#E8F5E9",filter:"data"},
  {label:"Mobile Builders",icon:"📱",bg:"#FFF8E1",filter:"mobile"},
  {label:"DevOps Pros",icon:"🔄",bg:"#E0F7FA",filter:"devops"},
  {label:"Community Leaders",icon:"🤝",bg:"#FCE4EC",filter:"community"},
  {label:"New to Tech",icon:"🚀",bg:"#F1F8E9",filter:"tech"},
];

const PROFILE_IMAGES = {
  "Gary Gonzalez": "/profile-photos/image20.png",
  "Manny": "/profile-photos/image9.png",
  "Manny (Manuel)": "/profile-photos/image9.png",
  "Joel P.": "/profile-photos/image13.png",
  "Duvall Morgan": "/profile-photos/image7.png",
  "Gamaliel": "/profile-photos/image12.png",
  "David Omokagbor": "/profile-photos/image21.png",
  "Juan Franco": "/profile-photos/image16.png",
  "Kevin Natera": "/profile-photos/image10.png",
  "Victor": "/profile-photos/image11.png",
  "Pape Sy": "/profile-photos/image17.png",
  "Jonel Richardson": "/profile-photos/image22.png",
  "Jagger Sonia Toure": "/profile-photos/image14.png",
  "Luba Kaper": "/profile-photos/image18.png",
  "Paula Lawton": "/profile-photos/image5.png",
  "Erick Perez": "/profile-photos/image15.png",
};

const CAMERA_SHY_NAMES = new Set([
  "Ibrahima",
  "Michael Chabler",
  "Ismael Carabollo",
]);

const getInitials = (name="") => name.split(" ").filter(Boolean).slice(0,2).map(n=>n[0].toUpperCase()).join("");

const applyMedia = (profile) => {
  const image = PROFILE_IMAGES[profile.name] || profile.image || "";
  return {
    ...profile,
    image,
    cameraShy: CAMERA_SHY_NAMES.has(profile.name),
  };
};

const BASE_PROFILES = [
  {
    id:1,
    name:"Gary Gonzalez",
    initials:"GG",
    role:"Product & UX Designer",
    skills:"Currently learning more frontend via UX/UI.",
    professionalInterests:"Arts and Humanities, Science and Tech, Business and Administration, Healthcare, Skilled Trades",
    career:"Going for a Design degree and becoming a product designer, building tools that resolve real world issues via UX/UI skills acquired.",
    hobbies:"Photography, reading, outdoor activities (jogging with dog, sports, naps in Central Park), building side projects",
    proudProject:"In L1, I built a PC Builder and I have been proud of that build ever since.",
    bonusFact:"",
    tags:["design","ux-ui","frontend"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:2,
    name:"Ibrahima",
    initials:"IB",
    role:"Full-Stack Developer",
    skills:"I don't know the skills I have not gonna lie.",
    professionalInterests:"Trying to get money to train as a wrestler; interested in film/show production and the world of video editing.",
    career:"I don't know my career path yet — still trying to find it at this moment.",
    hobbies:"Playing basketball, used to play football, video games, going to the gym, learning to cook",
    proudProject:"Language learning tool app focused on voice-to-voice learning with confidence grading, tone checks, scores, and a history panel to track mastery.",
    bonusFact:"I've met two wrestlers I saw on TV twice but never asked about advice or if their company was hiring.",
    tags:["exploring","creative","fullstack"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:3,
    name:"Manny (Manuel)",
    initials:"MM",
    role:"Full-Stack Developer",
    skills:"Project management",
    professionalInterests:"Building accessible tech solutions for underserved communities",
    career:"Currently seeking roles in AI product development and full-stack engineering",
    hobbies:"Music, movies, and AI experimentation",
    proudProject:"Calldone — reimagined for consumers to regain control of their time and decision-making; earned entry into Level 2 at Pursuit.",
    bonusFact:"",
    tags:["ai","product","fullstack"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:4,
    name:"Joel P.",
    initials:"JP",
    role:"Product & UX Designer",
    skills:"UI/UX design, project management, psychology, mental health advocacy",
    professionalInterests:"Psychology, tech research, art and creative building, voice over work, writing",
    career:"Pivoting from government infrastructure to ethical technology usage and advanced technology-based creativity",
    hobbies:"Music, writing, poetry, philosophy and gaming",
    proudProject:"Deep Hug — a mental health companion app for anxiety",
    bonusFact:"",
    tags:["design","mental-health","creative"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:5,
    name:"Duvall Morgan",
    initials:"DM",
    role:"Data Scientist",
    skills:"Python, Machine Learning, Data Engineering, Google Cloud (GCP) ecosystem",
    professionalInterests:"AI Engineering and Data Architecture; designing agentic systems that act as intelligent sentinels",
    career:"Mission-driven path focused on high-velocity learning and building systems that outlast the hype",
    hobbies:"Deep-reading AI research and studying breakthroughs from MIT, Stanford, and Harvard Innovation Labs",
    proudProject:"MotionFrame/Sentinel — current project with a major momentum spike and long-term focus",
    bonusFact:"Google Higher Ed Leader with a 'Humble Giant' mindset; ambitious but a true team player",
    tags:["ai","data","gcp"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:6,
    name:"Michael Chabler",
    initials:"MC",
    role:"Full-Stack Developer",
    skills:"IT support, writing, fine art, acting",
    professionalInterests:"AI software development, writing, acting",
    career:"Support tech for 15+ years with acting in theater and movies",
    hobbies:"Writing, reading, swimming, running (weather permitting), hiking in the Catskills",
    proudProject:"Spotify improvement app",
    bonusFact:"Released an album of original children's music with Treehouse 10 in 2009 (Album: Bug in a Puddle).",
    tags:["creative","it-support","software"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:7,
    name:"Gamaliel",
    initials:"GA",
    role:"Backend Engineer",
    skills:"Python, web development, backend development",
    professionalInterests:"Software development and engineering",
    career:"Former healthcare operations professional transitioning into software engineering, specializing in Python and AI to build tools that simplify complex user experiences",
    hobbies:"Anime, boxing, reading, philanthropy, computers, and scenic views",
    proudProject:"Meeting such an amazing group of people — nobody doing it like us",
    bonusFact:"If I cross my legs while I am talking to you, I am locked in and fully focused",
    tags:["backend","python","ai"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:8,
    name:"David Omokagbor",
    initials:"DO",
    role:"Full-Stack Developer",
    skills:"Full-stack development (Python, JavaScript), AI/ML fundamentals, recommender systems, backend API design, MongoDB modeling",
    professionalInterests:"Applied AI, full-stack development, and building scalable intelligent products",
    career:"Working toward becoming a full-stack AI engineer and leading technical projects",
    hobbies:"Music production and audio engineering",
    proudProject:"Recommendation system work and Smart Unit Converter project focused on clean data modeling and edge cases",
    bonusFact:"I learn extremely fast and stay deeply curious, diving into new systems until I understand them",
    tags:["fullstack","ai","music"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:9,
    name:"Juan Franco",
    initials:"JF",
    role:"Full-Stack Developer",
    skills:"AI-native software engineer, full-stack developer, 15+ years audio engineering and studio operations",
    professionalInterests:"AI-native full-stack development, recording studio and video production",
    career:"Full-stack developer",
    hobbies:"Sports, music, AI",
    proudProject:"Wingmate (airport app)",
    bonusFact:"Enjoys warm weather, wants a remote role, and is into crypto, finance, and politics",
    tags:["fullstack","ai","audio"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:10,
    name:"Kevin Natera",
    initials:"KN",
    role:"Full-Stack Developer",
    skills:"React, Redux, Ruby on Rails, Node.js, Python, Swift, HTML, CSS, JavaScript",
    professionalInterests:"Software development role of any kind",
    career:"Hoping to evolve into a tech career",
    hobbies:"Gaming, anime, card magic, parkour",
    proudProject:"Your Sol — app that stores user interests in a solar system generated one star at a time",
    bonusFact:"",
    tags:["fullstack","gaming","creative"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:11,
    name:"Ismael Carabollo",
    initials:"IC",
    role:"Full-Stack Developer",
    skills:"",
    professionalInterests:"",
    career:"",
    hobbies:"",
    proudProject:"",
    bonusFact:"",
    tags:["cohort"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:12,
    name:"Victor",
    initials:"VT",
    role:"Product & UX Designer",
    skills:"15 years cable and satellite technician experience with DirecTV and Spectrum",
    professionalInterests:"AI-native UI/UX development",
    career:"Goal is to become a fully AI-native developer specializing in UI/UX",
    hobbies:"Movie buff who enjoys running and the great outdoors",
    proudProject:"CommonGround — app that connects people going through life transitions via local meetups",
    bonusFact:"",
    tags:["ux-ui","ai","social-impact"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:13,
    name:"Pape Sy",
    initials:"PS",
    role:"Full-Stack Developer",
    skills:"",
    professionalInterests:"",
    career:"",
    hobbies:"",
    proudProject:"",
    bonusFact:"",
    tags:["cohort"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:14,
    name:"Jonel Richardson",
    initials:"JR",
    role:"Product & UX Designer",
    skills:"UX/UI design with accessibility focus, problem scoping and MVP development, Git/GitHub workflows",
    professionalInterests:"Accessibility tools that serve diverse populations",
    career:"Becoming AI native",
    hobbies:"Fitness and cooking",
    proudProject:"explainThis — an app translating technical jargon into plain language",
    bonusFact:"Lived in Japan for 8 years teaching preschool",
    tags:["ux-ui","accessibility","ai"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:15,
    name:"Jagger Sonia Toure",
    initials:"JST",
    role:"Full-Stack Developer",
    skills:"",
    professionalInterests:"",
    career:"",
    hobbies:"",
    proudProject:"",
    bonusFact:"",
    tags:["cohort"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:16,
    name:"Luba Kaper",
    initials:"LK",
    role:"Mobile Developer",
    skills:"iOS development (Swift, SwiftUI, Xcode), front-end development (React, TypeScript, Tailwind), backend fundamentals (Node.js, APIs), AI/LLM integration, product thinking, UX-driven development",
    professionalInterests:"Building AI-native products, human-centered UX, and tools that solve real problems — especially how LLMs support learning and decision-making",
    career:"Moving deeper into AI-native development and applied AI product work; wants to build and ship end-to-end on small, fast teams",
    hobbies:"Music, cooking, traveling, long walks, learning new tools, side projects",
    proudProject:"Sveti — AI tutor project focused on real learning needs, UX, guardrails, and learning styles",
    bonusFact:"Graduated from music school — major in cello, minor in piano",
    tags:["mobile","ai","product"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:17,
    name:"Paula Lawton",
    initials:"PL",
    role:"Full-Stack Developer",
    skills:"Full-stack development (React, Node.js, Express, Vite), AI/LLM prompt engineering, project management, program administration, grant management, workforce development, mental health instruction, HR certification, digital literacy instruction, workshop facilitation, financial literacy education, community organizing, business development",
    professionalInterests:"AI training and development, AI compliance and governance, workforce development with AI integration, mental health support in professional settings, financial technology education, HR systems optimization, and AI-powered solutions for social impact",
    career:"Transitioning from nonprofit leadership into AI-focused roles in training, development, compliance, and workforce solutions while launching ZenPawZ LLC",
    hobbies:"SGI Buddhism practice, memoir writing, financial literacy advocacy, community organizing, cultural entrepreneurship, pet wellness",
    proudProject:"AI Money Mentor — financial education platform that makes complex concepts accessible through AI-powered learning",
    bonusFact:"Performed stand-up comedy for 2½ years at The Laugh Factory, The Comedy Cellar, and Carolines on Broadway",
    tags:["fullstack","ai","workforce"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
  {
    id:18,
    name:"Erick Perez",
    initials:"EP",
    role:"DevOps & Automation",
    skills:"Systems administration, networking, mobile device management, cybersecurity with a focus on incident response",
    professionalInterests:"Cybersecurity, systems administration, and AI",
    career:"A consultant's consultant",
    hobbies:"Mechanical engineering and legal subjects",
    proudProject:"ListingTruthFinder — site designed to verify Zillow listing images with Google Street View (https://listingtruthfinder.com/)",
    bonusFact:"From one of the smallest counties in New York State (County of Kings). Resources: https://news.ycombinator.com/ and https://krebsonsecurity.com/",
    tags:["cybersecurity","systems","ai"],
    image:"",
    cameraShy:true,
    avgRating:0,
    reviewCount:0,
    recognition:false,
    reviews:[],
  },
];

const CLASSMATES = BASE_PROFILES.map(applyMedia);

function StarIcon({filled,size=18}){return<svg width={size}height={size}viewBox="0 0 24 24"fill={filled?"#F5A623":"none"}stroke={filled?"#F5A623":"#E0E0E0"}strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;}
function StarRow({rating,size=18}){return<div style={{display:"flex",gap:"2px"}}>{[1,2,3,4,5].map(i=><StarIcon key={i}filled={i<=rating}size={size}/>)}</div>;}

export default function RecRoom(){
  const[view,setView]=useState("home");
  const[selected,setSelected]=useState(null);
  const[search,setSearch]=useState("");
  const[tab,setTab]=useState("about");
  const[votes,setVotes]=useState({});
  const[form,setForm]=useState({rating:0,hover:0,expertise:"",personality:"",contributions:"",support:"",dims:[]});
  const[authMode,setAuthMode]=useState("signIn");
  const[authForm,setAuthForm]=useState({username:"",email:"",password:""});
  const[authUser,setAuthUser]=useState(null);
  const[authError,setAuthError]=useState("");
  const[profileForm,setProfileForm]=useState({name:"",role:"",skills:"",professionalInterests:"",career:"",hobbies:"",proudProject:"",bonusFact:"",imageUrl:"",tags:""});
  const[profileMessage,setProfileMessage]=useState("");
  const[remoteProfiles,setRemoteProfiles]=useState([]);
  const[loadingProfiles,setLoadingProfiles]=useState(false);

  useEffect(()=>{
    let isMounted=true;
    supabase.auth.getSession().then(({data})=>{if(isMounted){setAuthUser(data.session?.user||null);}});
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session)=>{
      setAuthUser(session?.user||null);
    });
    return ()=>{isMounted=false;listener?.subscription?.unsubscribe();};
  },[]);

  useEffect(()=>{
    const loadProfiles=async()=>{
      setLoadingProfiles(true);
      const { data, error } = await supabase.from("profiles").select("*").order("created_at",{ascending:false});
      if(!error&&data){
        const mapped=data.map(p=>applyMedia({
          id:p.id,
          name:p.name||"",
          initials:getInitials(p.name||""),
          role:p.role||"Classmate",
          skills:p.skills||"",
          professionalInterests:p.professional_interests||"",
          career:p.career||"",
          hobbies:p.hobbies||"",
          proudProject:p.proud_project||"",
          bonusFact:p.bonus_fact||"",
          tags:Array.isArray(p.tags)?p.tags:[],
          image:p.image_url||"",
          avgRating:p.avg_rating||0,
          reviewCount:p.review_count||0,
          recognition:!!p.recognition,
          reviews:[],
        }));
        setRemoteProfiles(mapped);
      }
      setLoadingProfiles(false);
    };
    loadProfiles();
  },[]);

  const allProfiles=[...remoteProfiles,...CLASSMATES];
  const filtered=allProfiles.filter(c=>{
    const query=search.toLowerCase();
    const tags=c.tags||[];
    return (
      c.name.toLowerCase().includes(query)||
      c.role.toLowerCase().includes(query)||
      (c.skills||"").toLowerCase().includes(query)||
      (c.professionalInterests||"").toLowerCase().includes(query)||
      tags.some(t=>t.toLowerCase().includes(query))
    );
  });
  const sorted=[...filtered].sort((a,b)=>b.avgRating-a.avgRating);

  const goProfile=(cm)=>{setSelected(cm);setView("profile");setTab("about");};
  const goHome=()=>{setView("home");setSelected(null);};
  const goAuth=()=>{setView("auth");setSelected(null);};
  const toggleDim=(d)=>setForm(f=>({...f,dims:f.dims.includes(d)?f.dims.filter(x=>x!==d):[...f.dims,d]}));
  const toggleVote=(k,v)=>setVotes(vs=>({...vs,[k]:vs[k]===v?null:v}));
  const canSubmit=form.rating>0&&(form.expertise||form.personality||form.contributions||form.support);

  const handleSignUp=async(e)=>{
    e.preventDefault();
    setAuthError("");
    const { email, password, username } = authForm;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options:{ data:{ username } }
    });
    if(error){setAuthError(error.message);return;}
    setAuthMode("signIn");
  };

  const handleSignIn=async(e)=>{
    e.preventDefault();
    setAuthError("");
    const { email, password } = authForm;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error){setAuthError(error.message);}
  };

  const handleSignOut=async()=>{
    await supabase.auth.signOut();
  };

  const handleSaveProfile=async(e)=>{
    e.preventDefault();
    setProfileMessage("");
    if(!authUser){setProfileMessage("Please sign in to save a profile.");return;}
    const tags=profileForm.tags.split(",").map(t=>t.trim()).filter(Boolean);
    const payload={
      user_id:authUser.id,
      name:profileForm.name,
      role:profileForm.role,
      skills:profileForm.skills,
      professional_interests:profileForm.professionalInterests,
      career:profileForm.career,
      hobbies:profileForm.hobbies,
      proud_project:profileForm.proudProject,
      bonus_fact:profileForm.bonusFact,
      image_url:profileForm.imageUrl,
      tags,
    };
    const { error } = await supabase.from("profiles").upsert(payload,{ onConflict:"user_id" });
    if(error){setProfileMessage(error.message);return;}
    setProfileMessage("Profile saved!");
    const { data } = await supabase.from("profiles").select("*").order("created_at",{ascending:false});
    if(data){
      const mapped=data.map(p=>applyMedia({
        id:p.id,
        name:p.name||"",
        initials:getInitials(p.name||""),
        role:p.role||"Classmate",
        skills:p.skills||"",
        professionalInterests:p.professional_interests||"",
        career:p.career||"",
        hobbies:p.hobbies||"",
        proudProject:p.proud_project||"",
        bonusFact:p.bonus_fact||"",
        tags:Array.isArray(p.tags)?p.tags:[],
        image:p.image_url||"",
        avgRating:p.avg_rating||0,
        reviewCount:p.review_count||0,
        recognition:!!p.recognition,
        reviews:[],
      }));
      setRemoteProfiles(mapped);
    }
  };

  const CardComponent=({cm})=>(
    <div className="classmate-card" onClick={()=>goProfile(cm)}>
      <div className="card-avatar-wrap">
        {cm.recognition&&<div className="card-recognition">⭐ Recognized</div>}
        {cm.image ? (
          <img className="card-photo" src={cm.image} alt={`${cm.name} profile`} />
        ) : (
          <div className="card-avatar"><span className="initials">{cm.initials}</span></div>
        )}
        {cm.cameraShy&&<div className="camera-shy-badge">CAMERA SHY</div>}
      </div>
      <div className="card-body">
        <div className="card-name">{cm.name}</div>
        <div className="card-role">{cm.role}</div>
        <div className="card-stars"><StarRow rating={Math.round(cm.avgRating)}size={15}/><span className="avg">{cm.avgRating.toFixed(1)}</span><span className="count">({cm.reviewCount})</span></div>
        <div className="card-tags">{cm.tags.map(t=><span key={t}className="tag">{t}</span>)}</div>
      </div>
    </div>
  );

  return(
    <>
      <style>{STYLES}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={goHome}><div className="burst"><div className="burst-inner"/></div>RecRoom</div>
        <div className="nav-search"><Search className="search-icon"size={16}/><input type="text"placeholder="Search classmates, skills, or interests..."value={search}onChange={e=>setSearch(e.target.value)}onFocus={()=>setView("home")}/></div>
        <div className="nav-actions">
          {view!=="home"&&<button className="nav-btn"onClick={goHome}>← Browse</button>}
          <button className="nav-btn"onClick={goAuth}>{authUser?"My Account":"Register / Login"}</button>
          {authUser&&<button className="nav-btn"onClick={handleSignOut}>Sign Out</button>}
        </div>
      </nav>

      {/* ═══ HOME ═══ */}
      {view==="home"&&(
        <div>
          <div className="hero">
            <h1>The Rec Room</h1>
            <p>Your cohort, rated and reviewed. Discover your classmates' skills, celebrate their growth, and give feedback that actually matters.</p>
            <button className="hero-btn"onClick={()=>document.querySelector('.card-grid')?.scrollIntoView({behavior:'smooth'})}>Browse the Cohort</button>
          </div>
          <div className="section-header"><h2>🔍 People Also Search For</h2></div>
          <div className="also-search">
            <div className="also-search-scroll">
              {ALSO_SEARCH.map((item,i)=>(
                <div key={i}className="also-chip"onClick={()=>setSearch(item.filter)}>
                  <span className="chip-icon"style={{background:item.bg}}>{item.icon}</span>{item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="section-header"><h2>⭐ Top Rated This Week</h2><span className="see-all">See all →</span></div>
          <div className="card-grid">{sorted.slice(0,3).map(cm=><CardComponent key={cm.id}cm={cm}/>)}</div>
          <div className="section-header"><h2>Browse All Classmates</h2><span className="see-all">Sorted by rating</span></div>
          {loadingProfiles&&<div style={{padding:"0 24px 12px",color:"var(--lt-gray)",fontSize:13}}>Loading new profiles...</div>}
          <div className="card-grid">{sorted.map(cm=><CardComponent key={cm.id}cm={cm}/>)}</div>
        </div>
      )}

      {/* ═══ AUTH ═══ */}
      {view==="auth"&&(
        <div className="review-form-page">
          <div className="review-form-container">
            <div className="form-card">
              <h2>{authMode==="signIn"?"Sign In":"Create Account"}</h2>
              <p className="form-subtitle">Register or log in to add your profile</p>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                <button className={`dim-chip ${authMode==="signIn"?"active":""}`}onClick={()=>setAuthMode("signIn")}>Sign In</button>
                <button className={`dim-chip ${authMode==="signUp"?"active":""}`}onClick={()=>setAuthMode("signUp")}>Sign Up</button>
              </div>
              <form onSubmit={authMode==="signIn"?handleSignIn:handleSignUp}>
                {authMode==="signUp"&&(
                  <div className="form-group">
                    <label>Username</label>
                    <input value={authForm.username}onChange={e=>setAuthForm(f=>({...f,username:e.target.value}))}className="nav-search input"style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input type="email"value={authForm.email}onChange={e=>setAuthForm(f=>({...f,email:e.target.value}))}className="nav-search input"style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password"value={authForm.password}onChange={e=>setAuthForm(f=>({...f,password:e.target.value}))}className="nav-search input"style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                </div>
                {authError&&<div style={{color:"var(--red)",fontSize:13,marginBottom:12}}>{authError}</div>}
                <button className="submit-btn"type="submit">{authMode==="signIn"?"Sign In":"Create Account"}</button>
              </form>
            </div>

            {authUser&&(
              <div className="form-card"style={{marginTop:20}}>
                <h2>Create Your Profile</h2>
                <p className="form-subtitle">This will appear as a new card on the homepage</p>
                <form onSubmit={handleSaveProfile}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input value={profileForm.name}onChange={e=>setProfileForm(f=>({...f,name:e.target.value}))}style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input value={profileForm.role}onChange={e=>setProfileForm(f=>({...f,role:e.target.value}))}style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                  </div>
                  <div className="form-group">
                    <label>Skills</label>
                    <textarea value={profileForm.skills}onChange={e=>setProfileForm(f=>({...f,skills:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label>Professional Interests</label>
                    <textarea value={profileForm.professionalInterests}onChange={e=>setProfileForm(f=>({...f,professionalInterests:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label>Career Path</label>
                    <textarea value={profileForm.career}onChange={e=>setProfileForm(f=>({...f,career:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label>Hobbies</label>
                    <textarea value={profileForm.hobbies}onChange={e=>setProfileForm(f=>({...f,hobbies:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label>Proudest Project</label>
                    <textarea value={profileForm.proudProject}onChange={e=>setProfileForm(f=>({...f,proudProject:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label>Bonus Fact</label>
                    <textarea value={profileForm.bonusFact}onChange={e=>setProfileForm(f=>({...f,bonusFact:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input value={profileForm.imageUrl}onChange={e=>setProfileForm(f=>({...f,imageUrl:e.target.value}))}style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                  </div>
                  <div className="form-group">
                    <label>Tags (comma separated)</label>
                    <input value={profileForm.tags}onChange={e=>setProfileForm(f=>({...f,tags:e.target.value}))}style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10}}/>
                  </div>
                  {profileMessage&&<div style={{color:"var(--mid-gray)",fontSize:13,marginBottom:12}}>{profileMessage}</div>}
                  <button className="submit-btn"type="submit">Save Profile</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ PROFILE ═══ */}
      {view==="profile"&&selected&&(
        <div className="profile-page">
          <button className="back-btn"onClick={goHome}><ArrowLeft size={16}/> Back to Browse</button>
          <div className="profile-hero">
            <div className="profile-avatar-lg">
              {selected.image ? (
                <img className="profile-photo" src={selected.image} alt={`${selected.name} profile`} />
              ) : (
                <span className="initials">{selected.initials}</span>
              )}
              {selected.cameraShy&&<div className="camera-shy-badge">CAMERA SHY</div>}
            </div>
            <div className="profile-name">{selected.name}</div>
            <div className="profile-role-badge">{selected.role}</div>
            <div className="profile-overall-stars"><StarRow rating={Math.round(selected.avgRating)}size={20}/><span className="big-avg">{selected.avgRating.toFixed(1)}</span><span className="review-count">({selected.reviewCount} reviews)</span></div>
          </div>
          <div className="profile-tabs">
            <button className={`profile-tab ${tab==="about"?"active":""}`}onClick={()=>setTab("about")}><BookOpen size={15}/> About</button>
            <button className={`profile-tab ${tab==="resources"?"active":""}`}onClick={()=>setTab("resources")}><Star size={15}/> Resources</button>
            <button className={`profile-tab ${tab==="reviews"?"active":""}`}onClick={()=>setTab("reviews")}><MessageCircle size={15}/> Reviews <span style={{color:"var(--lt-gray)",fontWeight:400,fontSize:12}}>({selected.reviews.length})</span></button>
          </div>
          <div className="profile-content">

            {/* ABOUT */}
            {tab==="about"&&(
              <>
                <div className="answers-section">
                  <h3>📋 About Me</h3>
                  <div className="answer-item"><div className="answer-q">💼 Skills</div><div className="answer-a">{selected.skills}</div></div>
                  <div className="answer-item"><div className="answer-q">🧭 Professional Interests</div><div className="answer-a">{selected.professionalInterests}</div></div>
                  <div className="answer-item"><div className="answer-q">🎯 Career Path</div><div className="answer-a">{selected.career}</div></div>
                  <div className="answer-item"><div className="answer-q">🎨 Hobbies</div><div className="answer-a">{selected.hobbies}</div></div>
                  <div className="answer-item"><div className="answer-q">🏆 Proudest Project</div><div className="answer-a">{selected.proudProject}</div></div>
                  <div className="answer-item"><div className="answer-q">✨ Bonus</div><div className="answer-a">{selected.bonusFact}</div></div>
                </div>
                <div className="rating-breakdown">
                  <h3>⭐ Rating Breakdown</h3>
                  {[5,4,3,2,1].map(star=>{const c=selected.reviews.filter(r=>r.rating===star).length;const p=selected.reviewCount>0?(c/selected.reviewCount)*100:0;return<div key={star}className="breakdown-row"><span className="breakdown-label">{star}★</span><div className="breakdown-bar-bg"><div className="breakdown-bar-fill"style={{width:`${p}%`}}/></div><span className="breakdown-pct">{Math.round(p)}%</span></div>;})}
                </div>
                <div className="qa-section">
                  <h3>❓ Community Q&A</h3>
                  {(QA_MAP[selected.id]||[]).map((item,i)=>(
                    <div key={i}className="qa-item">
                      <div className="qa-question"><span className="q-badge">Q</span>{item.q}</div>
                      <div className="qa-answer">{item.a}</div>
                      <div className="qa-meta">Answered by {selected.name} · Asked by {item.asker} · {item.date}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* RESOURCES */}
            {tab==="resources"&&(
              <div className="resource-card">
                <h3>📚 Suggested Reading & Resources</h3>
                <p className="resource-intro">Curated based on {selected.name}'s expertise in <strong style={{color:"var(--red)"}}>{selected.role}</strong>. These resources align with their skill set and can deepen your understanding of their domain.</p>
                {(RESOURCES_MAP[selected.role]||[]).map((res,i)=>(
                  <div key={i}className="resource-item">
                    <div className={`resource-icon ${res.icon}`}>
                      {res.type==="article"&&<BookOpen size={18}/>}
                      {res.type==="course"&&<Star size={18}/>}
                      {res.type==="tool"&&<Users size={18}/>}
                      {res.type==="tutorial"&&<BookOpen size={18}/>}
                    </div>
                    <div>
                      <div className="resource-title">{res.title}</div>
                      <div className="resource-desc">{res.desc}</div>
                      <span className={`resource-tag ${res.type}`}>{res.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REVIEWS */}
            {tab==="reviews"&&(
              <>
                <div className="insights-bar">
                  <h4>✨ Review Insights</h4>
                  <div className="insights-row">
                    {(INSIGHTS_MAP[selected.id]||[]).map((ins,i)=>(
                      <div key={i}className="insight-pill">
                        <span className="insight-label">{ins.label}</span>
                        <span className={`insight-score ${ins.level}`}>{ins.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{textAlign:"center",marginBottom:24}}>
                  <button className="submit-btn"style={{width:"auto",padding:"12px 40px",borderRadius:24}}onClick={()=>{setView("review");setForm({rating:0,hover:0,expertise:"",personality:"",contributions:"",support:"",dims:[]});}}>✏️ Leave a Review</button>
                </div>
                <div className="reviews-section">
                  <h3>💬 Reviews ({selected.reviews.length})</h3>
                  {selected.reviews.map((rev,i)=>{
                    const vk=`${selected.id}-${i}`;
                    return(
                      <div key={i}className="review-card">
                        <div className="review-header">
                          <div className="review-avatar"><span className="initials">{rev.initials}</span></div>
                          <div className="review-meta">
                            <div className="review-reviewer-name">{rev.reviewer}{rev.hasRecognition&&<span className="review-recognition-badge">⭐ Recognized</span>}</div>
                            <div className="review-date">{rev.date}</div>
                          </div>
                        </div>
                        <div className="review-stars"><StarRow rating={rev.rating}size={16}/></div>
                        <div className="review-text">{rev.text}</div>
                        <div className="review-helpful">
                          <span>Was this helpful?</span>
                          <button className={`helpful-btn ${votes[vk]===true?"active":""}`}onClick={()=>toggleVote(vk,true)}><ThumbsUp size={13}/> Yes</button>
                          <button className={`helpful-btn ${votes[vk]===false?"active":""}`}onClick={()=>toggleVote(vk,false)}><ThumbsDown size={13}/> No</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ REVIEW FORM ═══ */}
      {view==="review"&&selected&&(
        <div className="review-form-page">
          <button className="back-btn"onClick={()=>setView("profile")}><ArrowLeft size={16}/> Back to Profile</button>
          <div className="review-form-container">
            <div className="form-card">
              <h2>Leave a Review</h2>
              <p className="form-subtitle">Share your honest experience with this classmate</p>
              <div className="form-target-mini">
                <div className="mini-avatar"><span className="initials">{selected.initials}</span></div>
                <div><div className="mini-name">{selected.name}</div><div className="mini-role">{selected.role}</div></div>
              </div>
              <div className="form-group">
                <label>Overall Rating *</label>
                <div className="star-selector">
                  {[1,2,3,4,5].map(i=>(
                    <button key={i}className="star-btn"onClick={()=>setForm(f=>({...f,rating:i}))}onMouseEnter={()=>setForm(f=>({...f,hover:i}))}onMouseLeave={()=>setForm(f=>({...f,hover:0}))}>
                      <StarIcon filled={(form.hover||form.rating)>=i}size={32}/>
                    </button>
                  ))}
                  {form.rating>0&&<span style={{marginLeft:8,fontSize:13,color:"#999",fontWeight:600}}>{["","Needs Work","Developing","Good","Great","Exceptional"][form.rating]}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>What stood out? (select all that apply)</label>
                <div className="dimension-chips">
                  {["Expertise","Mentorship","Collaboration","Communication","Problem-Solving","Reliability","Leadership","Creativity"].map(d=>(
                    <button key={d}className={`dim-chip ${form.dims.includes(d)?"active":""}`}onClick={()=>toggleDim(d)}>{form.dims.includes(d)?"✓ ":""}{d}</button>
                  ))}
                </div>
              </div>
              <div className="form-group"><label>🧠 Expertise & Skills</label><textarea placeholder="How strong are their technical skills? What do they know well?"value={form.expertise}onChange={e=>setForm(f=>({...f,expertise:e.target.value}))}/></div>
              <div className="form-group"><label>😊 Personality & Vibe</label><textarea placeholder="What's it like to work with them? How do they show up?"value={form.personality}onChange={e=>setForm(f=>({...f,personality:e.target.value}))}/></div>
              <div className="form-group"><label>🚀 Contributions to the Journey</label><textarea placeholder="How have they contributed to the cohort? What did they build or create?"value={form.contributions}onChange={e=>setForm(f=>({...f,contributions:e.target.value}))}/></div>
              <div className="form-group"><label>🤝 Support Offered</label><textarea placeholder="Have they helped you or others? Describe a time they stepped up."value={form.support}onChange={e=>setForm(f=>({...f,support:e.target.value}))}/></div>
              <button className="submit-btn"disabled={!canSubmit}onClick={()=>setView("success")}>Submit Review</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUCCESS ═══ */}
      {view==="success"&&(
        <div className="review-form-page">
          <div className="review-form-container">
            <div className="form-card">
              <div className="success-overlay">
                <div className="success-icon"><Check size={36}color="white"strokeWidth={3}/></div>
                <h2>Review Submitted!</h2>
                <p>Thanks for taking the time to recognize {selected?.name}. Your feedback helps the cohort grow together.</p>
                <button className="success-btn"onClick={goHome}>Back to Browse</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
