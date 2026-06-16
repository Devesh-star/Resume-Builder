import Resume1 from "../assets/Resume1.png"
import Resume2 from "../assets/Resume2.jpg"
import Resume3 from "../assets/Resume3.png"
import Resume4 from "../assets/Resume4.jpg"
import Resume5 from "../assets/Resume5.webp"

export const resumeTemplates = [
    {
        id: "01",
        thumbnailImg: Resume1,
        colorPaletteCode: "themeOne",
        title: "Classic"
    },
    {
        id: "02",
        thumbnailImg: Resume2,
        colorPaletteCode: "themeTwo",
        title: "Professional"
    },
    {
        id: "03",
        thumbnailImg: Resume3,
        colorPaletteCode: "themeThree",
        title: "Elegant"
    },
    {
        id: "04",
        thumbnailImg: Resume4,
        colorPaletteCode: "themeFour",
        title: "Modern Tech"
    },
    {
        id: "05",
        thumbnailImg: Resume5,
        colorPaletteCode: "themeFive",
        title: "Creative"
    },
    {
        id: "06",
        thumbnailImg: Resume3,
        colorPaletteCode: "themeSix",
        title: "Minimalist"
    },
    {
        id: "07",
        thumbnailImg: Resume5,
        colorPaletteCode: "themeSeven",
        title: "Executive"
    },
]

export const DUMMY_RESUME_DATA = {
    profileInfo: {
        previewUrl: "",
        fullName: "Alex Johnson",
        designation: "Senior Software Developer",
        summary: "Full-stack developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks. Specialized in React, Node.js, and cloud technologies with a strong focus on clean code architecture and performance optimization. Passionate about mentoring junior developers and implementing agile best practices.",
    },
    contactInfo: {
        email: "alex.johnson.dev@gmail.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/alexjohnson-dev",
        github: "https://github.com/alexjohnson-code",
        website: "https://alexjohnson.dev",
    },
    education: [
        {
            institution: "Stanford University",
            degree: "Master of Science",
            major: "Computer Science",
            minors: "Data Science",
            location: "Stanford, CA",
            graduationYear: "2018"
        },
        {
            institution: "University of California",
            degree: "Bachelor of Science",
            major: "Software Engineering",
            minors: "Mathematics",
            location: "Berkeley, CA",
            graduationYear: "2016"
        }
    ],
    workExperience: [
        {
            role: "Senior Software Engineer",
            company: "TechSolutions Inc.",
            location: "San Francisco, CA",
            startDate: "2020-06-01",
            endDate: "2023-12-31",
            description: "Led a team of 5 developers in building a SaaS platform serving 50,000+ users.\nArchitected microservices using Node.js and React that improved system performance by 40%.\nImplemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes.\nMentored junior developers through code reviews and pair programming sessions."
        },
        {
            role: "Software Developer",
            company: "InnovateSoft",
            location: "San Jose, CA",
            startDate: "2018-07-01",
            endDate: "2020-05-31",
            description: "Developed RESTful APIs handling 10,000+ requests per minute with 99.9% uptime.\nRedesigned legacy frontend using React, improving page load speed by 60%.\nCollaborated with UX team to implement responsive designs for mobile users.\nAutomated testing processes increasing test coverage from 65% to 95%."
        }
    ],
    projects: [
        {
            title: "E-commerce Analytics Dashboard",
            startDate: "2022-03-01",
            endDate: "2022-08-31",
            description: "Built a real-time analytics dashboard for e-commerce clients to track sales, inventory, and customer behavior.",
            technologies: ["React", "D3.js", "Node.js", "MongoDB"],
            github: "https://github.com/alexjohnson-code/ecommerce-analytics",
            liveDemo: "https://demo.alexjohnson.dev/analytics"
        },
        {
            title: "AI-Powered Code Review Tool",
            startDate: "2021-01-01",
            endDate: "2021-06-30",
            description: "Developed a machine learning tool that analyzes pull requests and suggests code improvements.",
            technologies: ["Python", "TensorFlow", "Flask", "GitHub API"],
            github: "https://github.com/alexjohnson-code/ai-code-review"
        }
    ],
    skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Node.js" },
        { name: "Python" },
        { name: "AWS" },
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "GraphQL" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "Git" },
        { name: "Agile" },
        { name: "Scrum" },
        { name: "JIRA" }
    ],
    certifications: [
        {
            title: "AWS Certified Solutions Architect",
            year: "2022"
        },
        {
            title: "Google Professional Cloud Architect",
            year: "2021"
        },
        {
            title: "Certified Scrum Master",
            year: "2020"
        }
    ],
    interests: [
        "Open Source Contributions",
        "Machine Learning",
        "Blockchain Technology",
        "Hiking",
        "Photography"
    ],
    customSections: [
        {
            id: "custom-awards",
            title: "Awards & Achievements",
            items: [
                {
                    title: "Employee of the Year",
                    subtitle: "TechSolutions Inc.",
                    date: "2022",
                    description: "Awarded for exceptional performance and delivering the SaaS platform ahead of schedule.",
                },
                {
                    title: "First Place - Global Hackathon",
                    subtitle: "InnovateX",
                    date: "2021",
                    description: "Led a team of 4 to build an AI-powered accessibility tool.",
                }
            ]
        }
    ]
};