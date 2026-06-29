export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics?: string[];
}

export const githubRepos: GitHubRepo[] = [
  {
    id: "xray-cnn-llm",
    name: "xray-classification-cnn-llm",
    description:
      "X-ray image classification using CNNs for medical diagnosis and LLMs for generating human-readable diagnostic reports.",
    url: "https://github.com/Nishant121312/xray-classification-cnn-llm",
    language: "Jupyter Notebook",
    stars: 4,
    forks: 2,
    topics: ["AI/ML", "CNN", "LLM", "Medical Imaging"],
  },
  {
    id: "amazon-dashboard",
    name: "amazon-sales-dashboard",
    description:
      "Amazon Sales Analysis Dashboard using Streamlit & Plotly for interactive business intelligence.",
    url: "https://github.com/Nishant121312/amazon-sales-dashboard",
    language: "Python",
    stars: 2,
    forks: 0,
    topics: ["Streamlit", "Plotly", "Analytics"],
  },
  {
    id: "aacdecraft",
    name: "Aacdecraft_management",
    description:
      "IT Asset Management system for tracking and managing organizational assets.",
    url: "https://github.com/Nishant121312/Aacdecraft_management",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    topics: ["Asset Management", "Enterprise"],
  },
  {
    id: "flipkart-analysis",
    name: "flipkart-sales-analysis",
    description:
      "Analyzes Flipkart sales data using Python, focusing on key business insights and trends.",
    url: "https://github.com/Nishant121312/flipkart-sales-analysis",
    language: "Jupyter Notebook",
    stars: 1,
    forks: 0,
    topics: ["Data Analysis", "Python"],
  },
  {
    id: "chip-analysis",
    name: "chip_analysis_project",
    description:
      "Chip Category Analysis — data-driven insights for optimizing chip sales and inventory.",
    url: "https://github.com/Nishant121312/chip_analysis_project",
    language: "Python",
    stars: 1,
    forks: 0,
    topics: ["Analytics", "Data Science"],
  },
  {
    id: "stay-adda",
    name: "the-stay-adda",
    description:
      "Full-stack PG accommodation management platform built with JavaScript.",
    url: "https://github.com/Nishant121312/the-stay-adda",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    topics: ["Full Stack", "Web App"],
  },
];
