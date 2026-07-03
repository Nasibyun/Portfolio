export const personal = {
  name: "Nasib Khan",
  firstName: "NASIB",
  fullName: "NASIB KHAN",
  title: "Software Developer | Competitive Programmer | AI Enthusiast",
  tagline: "Building the future, one line of code at a time.",
  location: "Haryana, India",
  email: "nasibkhan3058@gmail.com",
  phone: "+91 8572084290",
  portrait: "/main.png",
  education: {
    institution: "National Institute of Technology Kurukshetra",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Information Technology",
    graduation: "2023 - 2027",
  },
  about: `I am a B.Tech Information Technology student at NIT Kurukshetra with a strong passion for software engineering, artificial intelligence, and competitive programming. I enjoy solving challenging algorithmic problems, building scalable applications, and continuously learning modern technologies. I am particularly interested in AI-powered applications, full-stack development, and creating products that solve real-world problems.`,
  availability: "Open to internships, collaborations, and software development opportunities.",
};

export const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nasibyun/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/Nasibyun",
    icon: "github",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/naseeb_yun/",
    icon: "leetcode",
  },
];

export const skills = {
  "Programming Languages": ["C++", "Python", "JavaScript", "C"],
  Frontend: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  Backend: ["FastAPI"],
  "AI / Machine Learning": ["TensorFlow", "CNN", "Deep Learning", "Data Augmentation"],
  Databases: ["MySQL", "MongoDB"],
  Tools: ["Git", "GitHub", "VS Code", "Linux", "Vercel", "Render", "Hugging Face Spaces"],
};

export const projects = [
  {
    id: "codelens",
    title: "CodeLens",
    subtitle: "AI Code Reviewer",
    description:
      "An AI-assisted code review platform that analyzes source code and provides intelligent feedback to improve code quality and performance.",
    techStack: ["Python", "FastAPI", "AI", "Vercel", "Render"],
    features: [
      "Automated code analysis",
      "Bug and syntax detection",
      "Time complexity estimation",
      "Space complexity estimation",
      "Optimization suggestions",
      "Review summaries",
    ],
    github: "https://github.com/Nasibyun/ai-code-reviewer",
    live: "https://codelens-repo.vercel.app/",
    image: "/codelens-preview.jpg",
    color: "#7c3aed",
    accentColor: "#a855f7",
  },
  {
    id: "semantic-clone-detection",
    title: "Semantic Code Clone Detection",
    subtitle: "Deep Learning • CodeBERT • Siamese Network",
    description:
      "A research-inspired semantic code clone detection system that leverages AST preprocessing, CodeBERT embeddings, and a Siamese Neural Network to identify Type III and Type IV Java code clones with high semantic similarity.",
    techStack: [
      "Python",
      "PyTorch",
      "CodeBERT",
      "Transformers",
      "Tree-Sitter",
      "BigCloneBench",
    ],
    features: [
      "AST-based code preprocessing",
      "CodeBERT semantic embeddings",
      "Siamese Neural Network",
      "Semantic clone similarity scoring",
      "BigCloneBench evaluation",
      "Batch code clone detection",
    ],
    github: "https://github.com/Nasibyun/semantic-clone-detection",
    live: null,
    image: "/semantic-clone-preview.jpg",
    color: "#10b981",
    accentColor: "#14b8a6",
  },
  {
    id: "crop-detector",
    title: "Smart Crop Disease Detector",
    subtitle: "Deep Learning Classification",
    description:
      "A deep learning-based plant disease classification system that helps identify crop diseases through image analysis.",
    techStack: ["Python", "TensorFlow", "CNN", "Gradio", "Hugging Face"],
    features: [
      "Image preprocessing",
      "Data augmentation",
      "CNN model training",
      "Real-time predictions",
      "User-friendly interface",
    ],
    github: "https://github.com/Nasibyun/Smart_Plant_disease_detector",
    live: null,
    image: "/crop-detector-preview.jpg",
    color: "#3b82f6",
    accentColor: "#06b6d4",
  },
];

export const achievements = [
  "Active Competitive Programmer",
  "Strong DSA background — solved hundreds of problems",
  "Passionate about AI and Software Development",
  "Continuously learning and exploring new technologies",
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
