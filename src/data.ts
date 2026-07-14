import { SystemProfile, Project, Skill, LogEntry, Certification, Milestone, ContactInfo } from './types';

export const systemProfile: SystemProfile = {
  name: "POOJA_SHREE_ENGINE",
  version: "v1.0-student",
  missionStatement: "Aspiring Software Engineer and Computer Science student with a passion for building efficient, secure, and scalable software solutions. Skilled in problem-solving, teamwork, and continuous learning through technical projects, leadership experiences, and hands-on exploration of emerging technologies.",
  primaryFunctions: [
    "Software Engineering",
    "Full-stack Development",
    "UI/UX Development",
    "Blockchain Development"
  ],
  currentFocus: "Building scalable digital platforms and exploring emerging technologies while gaining industry experience.",
  technicalInterests: [
    "Web Development",
    "UI/UX Development",
    "Blockchain Development",
    "Cloud Infrastructure",
    "Problem-Solving"
  ]
};

export const projects: Project[] = [
  {
    id: "campus-cruizers",
    name: "Campus Cruizers (Executive Head)",
    overview: "Designed a scalable cycle-sharing platform concept to streamline on-campus transportation through strategically deployed rental stations.",
    problemStatement: "On-campus transportation is inefficient and lacks integrated solutions for quick, eco-friendly commuting options for students.",
    solution: "Developed a comprehensive cycle-sharing platform with QR-based access, digital payments, real-time cycle tracking, and strategically deployed rental stations.",
    technologies: ["Platform Design", "User Experience", "System Architecture", "Workflow Management"],
    responsibilities: [
      "Defined system workflows and user experience design",
      "Managed station placement strategy",
      "Designed future technology integrations"
    ],
    impact: [
      "Created scalable framework for on-campus micro-mobility",
      "Improved operational efficiency through automation"
    ],
    githubLink: "https://github.com/poojashreeravichandar",
    dependencies: [
      { id: "dep-1", name: "QR Access System", type: "core" },
      { id: "dep-2", name: "Real-time Tracking", type: "service" },
      { id: "dep-3", name: "Digital Payment Gateway", type: "module" }
    ]
  },
  {
    id: "battle-turtle",
    name: "Battle Turtle (Front-end Developer - React JS)",
    overview: "Developed a university-focused educational platform that simplifies lab sessions by automating coding assessments, validating test cases, and generating faculty-approved PDF records.",
    problemStatement: "Manual coding assessments in lab sessions are time-consuming and lack automated validation and documentation.",
    solution: "Built an educational platform with automated coding assessments, test case validation, and PDF report generation for Java, Python, and C.",
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git & GitHub"],
    responsibilities: [
      "Designed and developed user interface components",
      "Implemented test case validation system",
      "Built PDF report generation functionality"
    ],
    impact: [
      "Streamlined lab assessment process",
      "Automated coding evaluation for multiple languages",
      "Generated faculty-approved documentation"
    ],
    githubLink: "https://github.com/poojashreeravichandar",
    dependencies: [
      { id: "dep-4", name: "React Components", type: "core" },
      { id: "dep-5", name: "Code Validator", type: "service" },
      { id: "dep-6", name: "PDF Generator", type: "library" }
    ]
  },
  {
    id: "klean-waste",
    name: "Klean: Smart Waste Management Platform",
    overview: "Built a scalable digital platform that modernizes waste management by simplifying reporting, optimizing collection workflows, and providing a user-friendly interface for community-driven cleanliness initiatives.",
    problemStatement: "Traditional waste management lacks digital integration and community participation, making reporting and tracking inefficient.",
    solution: "Developed a centralized platform that streamlines waste reporting, collection, and tracking while encouraging community participation through an intuitive digital experience.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "HTML5", "CSS3", "Git and Github"],
    responsibilities: [
      "Designed and developed the application's user interface with a focus on usability and accessibility",
      "Implemented waste reporting and tracking features",
      "Integrated collection workflow management"
    ],
    impact: [
      "Improved efficiency of waste reporting and management",
      "Provided centralized platform for community participation",
      "Supported sustainable environmental practices"
    ],
    githubLink: "https://github.com/poojashreeravichandar",
    dependencies: [
      { id: "dep-7", name: "React Frontend", type: "core" },
      { id: "dep-8", name: "Node.js Backend", type: "service" },
      { id: "dep-9", name: "MongoDB Database", type: "library" }
    ]
  }
];

export const skills: Skill[] = [
  // Programming Languages
  { name: "Java", status: "Operational", category: "Languages", value: 85 },
  { name: "Python", status: "Operational", category: "Languages", value: 85 },
  { name: "C", status: "Operational", category: "Languages", value: 75 },
  { name: "JavaScript", status: "Operational", category: "Languages", value: 85 },
  { name: "Turtle Logo", status: "Active", category: "Languages", value: 70 },
  
  // Web Technologies
  { name: "ReactJS", status: "Active", category: "Web Technologies", value: 85 },
  { name: "Node.js", status: "Active", category: "Web Technologies", value: 80 },
  { name: "HTML5", status: "Active", category: "Web Technologies", value: 90 },
  { name: "CSS3", status: "Active", category: "Web Technologies", value: 90 },
  { name: "Express.js", status: "Active", category: "Web Technologies", value: 75 },

  // Development Areas
  { name: "UI/UX Development", status: "Active", category: "Development Areas", value: 85 },
  { name: "Webpage Development", status: "Active", category: "Development Areas", value: 90 },
  { name: "Blockchain Development", status: "Active", category: "Development Areas", value: 70 },
  { name: "Problem Solving", status: "Active", category: "Development Areas", value: 90 },

  // Tools & Platforms
  { name: "Git / GitHub", status: "Operational", category: "Tools & Platforms", value: 90 },
  { name: "MongoDB", status: "Active", category: "Tools & Platforms", value: 80 },
  { name: "AWS", status: "Learning", category: "Tools & Platforms", value: 75 },
  { name: "DevOps", status: "Learning", category: "Tools & Platforms", value: 70 },
  { name: "Cisco Networking", status: "Learning", category: "Tools & Platforms", value: 70 }
];

export const missionLogs: LogEntry[] = [
  {
    id: "intern-1",
    role: "Blockchain Developer",
    organization: "Bloskseblock - Blockchain Development Company",
    location: "Remote",
    timeline: "Ongoing",
    type: "Internship",
    status: "Active",
    description: [
      "Developing blockchain-based solutions and smart contracts",
      "Exploring decentralized application development",
      "Implementing secure and scalable blockchain architectures"
    ]
  },
  {
    id: "intern-2",
    role: "Full-Stack Developer",
    organization: "Dorahacks (ICP Education Platform)",
    location: "Remote",
    timeline: "Recent",
    type: "Internship",
    status: "Deployed",
    description: [
      "Engineered a decentralized e-learning platform leveraging ICP, Motoko, and ReactJS",
      "Integrated smart contract-based course management and token rewards",
      "Created transparent, scalable learning ecosystem"
    ]
  },
  {
    id: "lead-1",
    role: "Junior Coordinator IR-HR",
    organization: "IAESTE",
    location: "Karunya University",
    timeline: "Ongoing",
    type: "Leadership",
    status: "Active",
    description: [
      "Coordinated international relations and HR initiatives",
      "Facilitated student exchange and internship programs",
      "Managed professional networking and career development activities"
    ]
  },
  {
    id: "lead-2",
    role: "Senior Coordinator Admin, Outgoing",
    organization: "IAESTE",
    location: "Karunya University",
    timeline: "Current",
    type: "Leadership",
    status: "Active",
    description: [
      "Leading outgoing student coordination and administration",
      "Managing international placements and exchanges",
      "Overseeing administrative operations and documentation"
    ]
  },
  {
    id: "org-1",
    role: "Deputy Marketing and Branding Head",
    organization: "Computer and Research Association (CIRA)",
    location: "Karunya University",
    timeline: "Current",
    type: "Organization",
    status: "Active",
    description: [
      "Led marketing initiatives and branding strategies",
      "Coordinated technical events and workshops",
      "Promoted computer science research and development"
    ]
  },
  {
    id: "org-2",
    role: "Member",
    organization: "Open Source Initiative - NSS",
    location: "Karunya University",
    timeline: "Active",
    type: "Affiliation",
    status: "Active",
    description: [
      "Contributed to open-source software projects",
      "Participated in community development initiatives",
      "Explored emerging technologies and innovations"
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: "cert-infosys",
    name: "Infosys Springboard",
    issuer: "Infosys",
    date: "2024",
    status: "Verified",
    verificationId: "INFOSYS-SPRINGBOARD",
    skillsUnlocked: ["Python Programming", "Java Programming Fundamentals", "AWS Training", "DevOps"]
  },
  {
    id: "cert-cisco-net",
    name: "Cisco Networking Academy",
    issuer: "Cisco",
    date: "2024",
    status: "Verified",
    verificationId: "CISCO-NETWORKING",
    skillsUnlocked: ["C Programming", "CCNA: Introduction to Networks", "CCNA: Enterprise Networking, Security, and Automation", "CCNA: Switching, Routing, and Wireless Essentials"]
  },
  {
    id: "cert-ibm",
    name: "Introduction to DataScience in Python Programming",
    issuer: "Cognitiveclass.ai / IBM Developer Skills Network",
    date: "2024",
    status: "Verified",
    verificationId: "IBM-DATASCIENCE",
    skillsUnlocked: ["Python Programming", "Data Science Fundamentals", "Data Analysis"]
  },
  {
    id: "cert-datacamp",
    name: "Data Types in Python",
    issuer: "DataCamp",
    date: "2024",
    status: "Verified",
    verificationId: "DATACAMP-PYTHON",
    skillsUnlocked: ["Python Data Types", "Python Programming"]
  },
  {
    id: "cert-cisco-tracer",
    name: "Cisco Packet Tracer",
    issuer: "Cisco",
    date: "2024",
    status: "Verified",
    verificationId: "CISCO-TRACER",
    skillsUnlocked: ["Network Simulation", "Internet of Things", "Network Configuration"]
  }
];

export const milestones: Milestone[] = [
  {
    version: "v0.1",
    title: "School Foundation",
    date: "2013 - 2024",
    description: "Completed 12th Grade at ST. Hildas School. Developed foundational knowledge in academics and explored interests in technology and problem-solving.",
    status: "released"
  },
  {
    version: "v1.0",
    title: "University Journey Begins",
    date: "2024",
    description: "Started B.Tech in Computer Science and Engineering at Karunya University. Engaged in learning core CS concepts, algorithms, and web development.",
    status: "released"
  },
  {
    version: "v1.5",
    title: "Blockchain & Web Exploration",
    date: "2024",
    description: "Explored blockchain development with Bloskseblock internship. Built decentralized e-learning platform (Dorahacks) using ICP, Motoko, and ReactJS.",
    status: "released"
  },
  {
    version: "v2.0",
    title: "Full-Stack Developer",
    date: "Present",
    description: "Currently developing skills in full-stack development, UI/UX design, and emerging technologies. Active participant in professional organizations.",
    status: "active"
  },
  {
    version: "v3.0",
    title: "Software Engineering Career",
    date: "2028+",
    description: "Aspiring to gain industry experience, contribute to impactful projects, and grow within a dynamic software engineering environment.",
    status: "scheduled"
  }
];

export const contactInfo: ContactInfo = {
  email: "poojashree@karunya.edu.in",
  phone: "+91 9385867630",
  location: "Ooty, India",
  github: "https://github.com/poojashreeravichandar",
  linkedin: "https://www.linkedin.com/in/poojashree-5759b832b/",
  leetcode: "https://leetcode.com/u/1FIBd9L4MJ/"
};
