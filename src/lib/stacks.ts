export interface TechStack {
    label: string;
    value: string; // slug for simple-icons or shields.io
    color: string;
}

export const POPULAR_STACKS: TechStack[] = [
    // Languages
    { label: 'JavaScript', value: 'javascript', color: 'F7DF1E' },
    { label: 'TypeScript', value: 'typescript', color: '3178C6' },
    { label: 'Python', value: 'python', color: '3776AB' },
    { label: 'Java', value: 'java', color: '007396' },
    { label: 'C++', value: 'cplusplus', color: '00599C' },
    { label: 'C#', value: 'csharp', color: '239120' },
    { label: 'Go', value: 'go', color: '00ADD8' },
    { label: 'Rust', value: 'rust', color: '000000' },
    { label: 'Swift', value: 'swift', color: 'F05138' },
    { label: 'Kotlin', value: 'kotlin', color: '7F52FF' },
    { label: 'Dart', value: 'dart', color: '0175C2' },
    { label: 'PHP', value: 'php', color: '777BB4' },
    { label: 'Ruby', value: 'ruby', color: 'CC342D' },
    { label: 'R', value: 'r', color: '276DC3' },
    { label: 'Lua', value: 'lua', color: '2C2D72' },
    { label: 'Scala', value: 'scala', color: 'DC322F' },
    { label: 'HTML5', value: 'html5', color: 'E34F26' },
    { label: 'CSS3', value: 'css3', color: '1572B6' },

    // Frontend
    { label: 'React', value: 'react', color: '61DAFB' },
    { label: 'Vue.js', value: 'vue.js', color: '4FC08D' },
    { label: 'Angular', value: 'angular', color: 'DD0031' },
    { label: 'Svelte', value: 'svelte', color: 'FF3E00' },
    { label: 'Next.js', value: 'next.js', color: '000000' },
    { label: 'Nuxt.js', value: 'nuxt.js', color: '00C58E' },
    { label: 'Remix', value: 'remix', color: '000000' },
    { label: 'Gatsby', value: 'gatsby', color: '663399' },
    { label: 'Astro', value: 'astro', color: 'BC52EE' },
    { label: 'jQuery', value: 'jquery', color: '0769AD' },
    { label: 'Bootstrap', value: 'bootstrap', color: '7952B3' },
    { label: 'Tailwind CSS', value: 'tailwindcss', color: '06B6D4' },
    { label: 'Sass', value: 'sass', color: 'CC6699' },
    { label: 'Mui', value: 'mui', color: '007FFF' },
    { label: 'Chakra UI', value: 'chakraui', color: '319795' },
    { label: 'Ant Design', value: 'antdesign', color: '0170FE' },
    { label: 'Redux', value: 'redux', color: '764ABC' },
    { label: 'Webpack', value: 'webpack', color: '8DD6F9' },
    { label: 'Vite', value: 'vite', color: '646CFF' },
    { label: 'Babel', value: 'babel', color: 'F9DC3E' },
    { label: 'Framer', value: 'framer', color: '0055FF' },
    { label: 'Three.js', value: 'three.js', color: '000000' },

    // Backend
    { label: 'Node.js', value: 'node.js', color: '339933' },
    { label: 'Express', value: 'express', color: '000000' },
    { label: 'NestJS', value: 'nestjs', color: 'E0234E' },
    { label: 'Fastify', value: 'fastify', color: '000000' },
    { label: 'Django', value: 'django', color: '092E20' },
    { label: 'Flask', value: 'flask', color: '000000' },
    { label: 'FastAPI', value: 'fastapi', color: '009688' },
    { label: 'Spring Boot', value: 'springboot', color: '6DB33F' },
    { label: 'Laravel', value: 'laravel', color: 'FF2D20' },
    { label: 'Ruby on Rails', value: 'rubyonrails', color: 'CC0000' },
    { label: 'GraphQL', value: 'graphql', color: 'E10098' },
    { label: 'Apollo', value: 'apollographql', color: '311C87' },
    { label: 'Prisma', value: 'prisma', color: '2D3748' },
    { label: 'Socket.io', value: 'socket.io', color: '010101' },

    // Mobile
    { label: 'React Native', value: 'reactnative', color: '61DAFB' },
    { label: 'Flutter', value: 'flutter', color: '02569B' },
    { label: 'Android', value: 'android', color: '3DDC84' },
    { label: 'iOS', value: 'ios', color: '000000' },
    { label: 'Expo', value: 'expo', color: '000020' },
    { label: 'Ionic', value: 'ionic', color: '3880FF' },
    { label: 'Xamarin', value: 'xamarin', color: '3498DB' },

    // Database
    { label: 'PostgreSQL', value: 'postgresql', color: '4169E1' },
    { label: 'MySQL', value: 'mysql', color: '4479A1' },
    { label: 'MongoDB', value: 'mongodb', color: '47A248' },
    { label: 'Redis', value: 'redis', color: 'DC382D' },
    { label: 'SQLite', value: 'sqlite', color: '003B57' },
    { label: 'MariaDB', value: 'mariadb', color: '003545' },
    { label: 'Oracle', value: 'oracle', color: 'F80000' },
    { label: 'Firebase', value: 'firebase', color: 'FFCA28' },
    { label: 'Supabase', value: 'supabase', color: '3FCF8E' },
    { label: 'DynamoDB', value: 'amazondynamodb', color: '4053D6' },
    { label: 'Cassandra', value: 'apachecassandra', color: '1287B1' },
    { label: 'Elasticsearch', value: 'elasticsearch', color: '005571' },

    // DevOps & Cloud
    { label: 'AWS', value: 'amazonwebservices', color: '232F3E' },
    { label: 'Google Cloud', value: 'googlecloud', color: '4285F4' },
    { label: 'Azure', value: 'microsoftazure', color: '0078D4' },
    { label: 'Docker', value: 'docker', color: '2496ED' },
    { label: 'Kubernetes', value: 'kubernetes', color: '326CE5' },
    { label: 'Nginx', value: 'nginx', color: '009639' },
    { label: 'Apache', value: 'apache', color: 'D22128' },
    { label: 'Jenkins', value: 'jenkins', color: 'D24939' },
    { label: 'GitLab CI', value: 'gitlab', color: 'FC6D26' },
    { label: 'CircleCI', value: 'circleci', color: '343434' },
    { label: 'Travis CI', value: 'travisci', color: '3EAAAF' },
    { label: 'Terraform', value: 'terraform', color: '7B42BC' },
    { label: 'Ansible', value: 'ansible', color: 'EE0000' },
    { label: 'Vercel', value: 'vercel', color: '000000' },
    { label: 'Netlify', value: 'netlify', color: '00C7B7' },
    { label: 'Heroku', value: 'heroku', color: '430098' },
    { label: 'DigitalOcean', value: 'digitalocean', color: '0080FF' },

    // Tools & Others
    { label: 'Git', value: 'git', color: 'F05032' },
    { label: 'GitHub', value: 'github', color: '181717' },
    { label: 'Linux', value: 'linux', color: 'FCC624' },
    { label: 'Ubuntu', value: 'ubuntu', color: 'E95420' },
    { label: 'Figma', value: 'figma', color: 'F24E1E' },
    { label: 'Adobe XD', value: 'adobexd', color: 'FF61F6' },
    { label: 'Sketch', value: 'sketch', color: 'F7B500' },
    { label: 'Postman', value: 'postman', color: 'FF6C37' },
    { label: 'Jira', value: 'jira', color: '0052CC' },
    { label: 'Trello', value: 'trello', color: '0052CC' },
    { label: 'Slack', value: 'slack', color: '4A154B' },
    { label: 'Discord', value: 'discord', color: '5865F2' },
    { label: 'Notion', value: 'notion', color: '000000' },
    { label: 'Unity', value: 'unity', color: '000000' },
    { label: 'Unreal Engine', value: 'unrealengine', color: '313131' },
    { label: 'TensorFlow', value: 'tensorflow', color: 'FF6F00' },
    { label: 'PyTorch', value: 'pytorch', color: 'EE4C2C' },
    { label: 'OpenAI', value: 'openai', color: '412991' },
];

export const getStack = (value: string): TechStack => {
    const found = POPULAR_STACKS.find(s => s.value === value);
    if (found) return found;
    return {
        label: value,
        value: value,
        color: 'gray'
    };
};

export const getBadgeUrl = (stack: TechStack) => {
    // If it's a known stack with a specific color (not 'gray' default), use it
    // For custom stacks (color 'gray'), omit logo if likely invalid, or just try.
    // Shields.io handles invalid logos gracefully (just no logo).
    const color = stack.color === 'gray' ? 'inactive' : stack.color;
    return `https://img.shields.io/badge/-${encodeURIComponent(stack.label)}-${color}?style=flat-square&logo=${encodeURIComponent(stack.value)}&logoColor=white`;
};
