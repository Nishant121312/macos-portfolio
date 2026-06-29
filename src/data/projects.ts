import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "it-asset",
    title: "IT Asset Management System",
    description:
      "Enterprise-grade asset tracking platform with lifecycle management, automated depreciation, maintenance scheduling, and real-time inventory dashboards for IT departments.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    techStack: ["React", "Node.js", "PostgreSQL", "Express", "Docker"],
    github: "https://github.com/Nishant121312/Aacdecraft_management",
    liveDemo: "https://it-assets-demo.vercel.app",
    features: [
      "Asset lifecycle tracking",
      "Automated depreciation",
      "Maintenance scheduling",
      "Role-based access control",
      "Real-time dashboards",
    ],
    status: "Completed",
    category: "Enterprise",
  },
  {
    id: "ai-xray",
    title: "AI Chest X-ray Disease Detection",
    description:
      "Deep learning system for detecting chest diseases from X-ray images using CNN architectures with 94%+ accuracy, built for clinical decision support.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    techStack: ["Python", "TensorFlow", "FastAPI", "OpenCV", "React"],
    github: "https://github.com/Nishant121312/xray-classification-cnn-llm",
    liveDemo: "https://xray-ai-demo.vercel.app",
    features: [
      "Multi-disease classification",
      "Grad-CAM visualization",
      "REST API inference",
      "Batch processing",
      "Model versioning",
    ],
    status: "Completed",
    category: "AI/ML",
  },
  {
    id: "flipkart-analysis",
    title: "Flipkart Sales Analysis",
    description:
      "Python-based analysis of Flipkart sales data uncovering key business insights, trends, and performance metrics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["Python", "Pandas", "Jupyter", "Matplotlib", "Seaborn"],
    github: "https://github.com/Nishant121312/flipkart-sales-analysis",
    features: [
      "Sales trend analysis",
      "Category performance",
      "Data visualization",
      "Business insights",
      "Automated reporting",
    ],
    status: "Maintained",
    category: "Data Engineering",
  },
  {
    id: "powerbi",
    title: "Power BI Dashboard",
    description:
      "Interactive business intelligence dashboards with DAX measures, custom visuals, and automated data refresh for executive reporting and KPI tracking.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["Power BI", "DAX", "SQL Server", "Python", "Azure"],
    github: "https://github.com/Nishant121312/amazon-sales-dashboard",
    features: [
      "Executive KPI dashboards",
      "Custom DAX measures",
      "Automated data refresh",
      "Drill-through reports",
      "Mobile-optimized views",
    ],
    status: "Completed",
    category: "Analytics",
  },
  {
    id: "stay-adda",
    title: "The Stay Adda — PG Management",
    description:
      "Full-stack PG accommodation management platform for booking, tenant management, and property listings.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
    github: "https://github.com/Nishant121312/the-stay-adda",
    features: [
      "Tenant management",
      "Room booking system",
      "Admin dashboard",
      "Payment tracking",
      "Responsive UI",
    ],
    status: "Completed",
    category: "Full Stack",
  },
  {
    id: "amazon-dashboard",
    title: "Amazon Sales Dashboard",
    description:
      "Interactive Amazon sales analysis dashboard built with Streamlit and Plotly for real-time business insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["Python", "Streamlit", "Plotly", "Pandas"],
    github: "https://github.com/Nishant121312/amazon-sales-dashboard",
    features: [
      "Interactive charts",
      "Sales KPI tracking",
      "Category breakdown",
      "Data filtering",
      "Export reports",
    ],
    status: "Completed",
    category: "Analytics",
  },
  {
    id: "chip-analysis",
    title: "Chip Category Analysis",
    description:
      "Data-driven chip category analysis project for optimizing sales performance and inventory decisions.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    techStack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/Nishant121312/chip_analysis_project",
    features: [
      "Category performance analysis",
      "Sales optimization insights",
      "Data visualization",
      "Trend forecasting",
      "Automated reports",
    ],
    status: "Maintained",
    category: "Data Science",
  },
];
