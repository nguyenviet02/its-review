import { FORM_FIELDS, TFormReview } from '@/types';

const formReviewDev: TFormReview = [
  // Tiêu chí 1
  {
    number: '1',
    title: 'Roles & Responsibilities',
    description: `Implementing all the processes and activities related to software development which can be deploying them to the development, client or production environment, including but not limited to following responsibilities:
- Execute a full software development life cycle (SDLC) in the software development projects.
- Make object-oriented Design and Analysis (OOA and OOD) for the software products.
- Design, code and debug applications in various software languages and relational database platforms.
- Analyze, design, and develop tests and test-automation suites in back-end code or front-end code.
- Software analysis, code analysis, requirements analysis, software review, identification of code metrics.
- Prepare and install solutions by determining and designing software specifications, standards, and programming.
- Develop flowcharts, diagrams, layouts, and documentation to identify requirements and solutions for the software products.
- Integrate software components or frameworks into a fully functional of a new or existing software system.
- Implement localization or globalization of a part or whole components of the software product.
- Troubleshoot, debug, fixing bugs, and upgrade existing components or whole systems.
- Apply an automated build process by delivering all the software products through the CI/CD pipeline as well as DevOps Tools
- Provide ongoing maintenance, support, and enhancements in existing systems and platforms.
- Provide the guidance of the policies, best practices, standards, and conventions to the team members.
- Report on the status of code, bugs, issues, deployment, and maintenance management of the software products.
- Learn more about Problems and solutions, limitations of current solutions, business perspectives for new solutions.`,
    criterions: [
      {
        number: '1.1',
        title: 'Roles & Responsibilities',
        name: 'performanceReview.rolesAndResponsibilities.rolesAndResponsibilities',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 2,
            description:
              '1 - Follow: Receives on-the-job training in a variety of new environments while working under close supervision as they gain experience, typically working on small tasks within larger projects.',
          },
          {
            score: 4,
            description:
              '2 - Assist: Performs technical tasks with limited direct supervision and solves problems based on principles of applied science technology. Also makes some decisions for which they assume responsibility.',
          },
          {
            score: 6,
            description:
              '3 - Apply: Works in a complex technological area without direct supervision (independently). Receives broad task objectives, is responsible for significant technical decisions and may train other professionals.',
          },
          {
            score: 8,
            description:
              '4 - Create: Performs a senior management role with overall responsibility for projects while supervising teams of professionals.',
          },
          {
            score: 10,
            description:
              '5 - Design: Performs a commander role with overall responsibility for projects based on multiple platforms and business domains while supervising teams of professionals and middle management.',
          },
        ],
      },
    ],
  },

  // Tiêu chí 2
  {
    number: '2',
    title: 'Experiences & Contributions',
    description: `Engineer is required to have the role and responsibility to perform one or more of the following tasks`,
    criterions: [
      {
        number: '2.1',
        title: 'Project Diversity and Complexity',
        name: 'performanceReview.experiencesAndContributions.projectDiversityAndComplexity',
        description: `Base on 4 factors (4Fs)
1. Globally advanced technology
2. Complicated contract conditions
3. Complex Project Team Structure
4. Complex Business Requirements
Normal -> Medium (1F) -> Complex (2Fs) -> Very Complex (>=3Fs)`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 2.5,
            description: '1: Normal or Common Technologies',
          },
          {
            score: 5,
            description: '2: Medium or Common Technologies',
          },
          {
            score: 7.5,
            description: '3: Complex or Emerging Technologies',
          },
          {
            score: 10,
            description: '4: Very Complex or Emerging Technologies',
          },
        ],
      },
      {
        number: '2.2',
        title: 'Software Engineering Experiences',
        name: 'performanceReview.experiencesAndContributions.softwareEngineeringExperiences',
        description: `Number of years working as Software Engineer, Software Developer, Front-end Developer, Back-end Developer, Mobile Developer, Fullstack Developer`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0: Fundamental awareness',
          },
          {
            score: 1,
            description: '1: 1-2 year experience',
          },
          {
            score: 2,
            description: '2: 3-4 years experience',
          },
          {
            score: 3,
            description: '3: 5-6 years experience',
          },
          {
            score: 4,
            description: '4: 7-8 years experience',
          },
        ],
      },
      {
        number: '2.3',
        title: 'Subordinate Development',
        name: 'performanceReview.experiencesAndContributions.subordinateDevelopment',
        description: `Number of team members or number of people trained/coached`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0: No Member/No Contribution',
          },
          {
            score: 1,
            description: '1: 1-5 Members or Coaching 1-2 Junior Dev',
          },
          {
            score: 2,
            description: '2: 5-10 Members or Coaching 3-4 Junior Dev',
          },
          {
            score: 3,
            description: '3: 10-20 Members or Coaching 1-2 Senior Dev',
          },
          {
            score: 4,
            description: '4: >20 Members or Coaching 3-4 Senior Dev',
          },
        ],
      },
      {
        number: '2.4',
        title: 'Number of Applications or Software Projects',
        name: 'performanceReview.experiencesAndContributions.numberOfApplicationsOrSoftwareProjects',
        description: `Number of applications, components, the succesful level of project that you have designed, developed, supported, migrated, deployed, managed application softwares, maintenanced systems or software modules.`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0: No Product / Component / Op / MM',
          },
          {
            score: 0.5,
            description: '1: ~01-03 Products / Components / MM / Ops',
          },
          {
            score: 1,
            description: '2: ~04-05 Products / Components / MM / Ops',
          },
          {
            score: 1.5,
            description: '3: ~06-10 Products / Components / MM / Ops',
          },
          {
            score: 2,
            description: '4: ~11-15 Products / Components /MM / Ops',
          },
        ],
      },
    ],
  },

  // Tiêu chí 3
  {
    number: '3',
    title: 'Application Software Engineering Skills',
    description: `Engineer is required to have one or more of the following professional experiences and project contributions`,
    criterions: [
      {
        number: '3.1',
        title: 'Architecture Design and Software Design',
        name: 'performanceReview.applicationSoftwareEngineeringSkills.architectureDesignAndSoftwareDesign',
        description: `For BE:
- Solutions Architecture, Database Architecture, Application Architecture
- Object Oriented Design, Structured Design, Architectural Pattern, Design Pattern, Object Oriented Analysis and Design
- UML, Application Architecture Design, External Design/High Level, Functional Design (in JP process), Detailed Design

For FE:
- Application Architecture & Code Structure, Component-Based Design
- Integration with Backend & APIs, State & Data Flow Design
- Styling Architecture, Accessibility & User Experience (UX) Design
- Performance & Optimization Strategies, Scalability & Maintainability Best Practices`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 1.3,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 2.5,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 3.8,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 5,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '3.2',
        title: 'Computer Programming Languages',
        name: 'performanceReview.applicationSoftwareEngineeringSkills.computerProgrammingLanguages',
        description: `- Java, C#, ASP.NET Framework, Spring Framework, Python, Go, PHP
- Java-based Android, Kotline, Swift, Objective-C
- React, Angular, AngularJS, VueJS, NodeJS
- Solidity, Rust, Move,…`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 5,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 10,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 15,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 20,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
          {
            score: 25,
            description:
              '5: Expert: A prolonged or intense experience through practice and consultant in a particular field.',
          },
        ],
      },
      {
        number: '3.3',
        title: 'Application Software Quality Inspection',
        name: 'performanceReview.applicationSoftwareEngineeringSkills.applicationSoftwareQualityInspection',
        description: `- Testing Techniques, Function Tests, Integration Test, Performance Tests, Security Test, Automation Test
- Code Review, Unit Test Coding, Unit Testing, Debugging Methods, Code Optimization Technique, Database Access Optimization Techniques`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 2.5,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 5,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 7.5,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 10,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '3.4',
        title: 'Storage and Data Handling',
        name: 'performanceReview.applicationSoftwareEngineeringSkills.storageAndDataHandling',
        description: `For BE: 
- Data Programming: SQL, T-SQL, PL/SQL, MSQL, Watcom-SQL, SQL-based
- Relational Database: SQL Server, Oracle, DB2, MySQL, PostgreSQL, MariaDB
- Non-Relational Database: CosmosDB, MongoDB,..

For FE:
- State Management: Redux, Vuex, Zustand, Context API,...
- Storage Management: localStorage, sessionStorage, IndexedDB`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 2,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 4,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 6,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 8,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '3.5',
        title: 'Version Control and DevOps Services',
        name: 'performanceReview.applicationSoftwareEngineeringSkills.versionControlAndDevOpsServices',
        description: `- DevOps, Jenkins, GIT, Subversion
- CI/CD Pipelines, feature toggling, gradual exposure, branch handling`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 0.5,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 1,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 1.5,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 2,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
    ],
  },

  // Tiêu chí 4
  {
    number: '4',
    title: 'Software Engineering Softskills',
    description: `Engineer is required to have one or more of the following soft skills and other skills to perform assigned tasks`,
    criterions: [
      {
        number: '4.1',
        title: 'Interpersonal Skills',
        name: 'performanceReview.softwareEngineeringSoftSkills.interpersonalSkills',
        description: `- Communication
- Networking/ Relationship Building
- Time Management 
- Teamwork 
- Presentation
- Interview
- Public Speaking`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 2.5,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 5,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 7.5,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 10,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '4.2',
        title: 'Scrum / Agile Model',
        name: 'performanceReview.softwareEngineeringSoftSkills.scrumAgileModel',
        description: `- Scrum / Agile Model`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 0.5,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 1,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 1.5,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 2,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '4.3',
        title: 'Troubleshooting',
        name: 'performanceReview.softwareEngineeringSoftSkills.troubleshooting',
        description: `- Issues and Solution, Limitation of Current Solution, Business Viewpoints for New Solution, …`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 1.3,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 2.5,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 3.8,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 5,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '4.4',
        title: 'Software Documentation and Guildelines',
        name: 'performanceReview.softwareEngineeringSoftSkills.softwareDocumentationAndGuildLines',
        description: `- Coding Standards and Conventions, Best Practices, Application Notes, Release Notes, End-to-End Guidelines`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 0.5,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 1,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 1.5,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
          {
            score: 2,
            description:
              '4-Advanced: Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice use.',
          },
        ],
      },
      {
        number: '4.5',
        title: 'Project Management',
        name: 'performanceReview.softwareEngineeringSoftSkills.projectManagement',
        description: `- Can be assessed on following knowledge items: Project Time Management, Project Quality Management, Project Risk Management`,
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0,
            description: '0-No Knowledge: Have no knowledge and experience.',
          },
          {
            score: 0.3,
            description:
              '1-Fundamental Awareness: Have a common knowledge or an understanding of basic techniques and concepts.',
          },
          {
            score: 0.7,
            description:
              '2-Limited Experience: Capable of applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.',
          },
          {
            score: 1,
            description:
              '3-Intermediate: Shares knowledge and experience of the skill with others, including tools and techniques, defining those most appropriate for the environment.',
          },
        ],
      },
    ],
  },

  // Tiêu chí 5
  {
    number: '5',
    title: 'Additional Review',
    description: 'Only for Manager. Max Point: 5',
    isForManager: true,
    criterions: [
      {
        number: '5.1',
        title: 'Internal commendation or award from customer',
        name: 'bonus.internalCommendationOrAwardFromCustomer',
        type: FORM_FIELDS.SCORE_INPUT,
        isRequired: true,
      },
      {
        number: '5.2',
        title: 'Consider able effort in the project',
        name: 'bonus.considerableEffort',
        type: FORM_FIELDS.SCORE_INPUT,
        isRequired: true,
      },
    ],
  },

  // Tiêu chí 6
  {
    number: '6',
    title: 'Nhận xét, đánh giá thêm',
    criterions: [
      {
        number: '6.1',
        title: 'Nhận xét, đánh giá thêm',
        name: 'comment',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
    ],
  },
];

export default formReviewDev;
