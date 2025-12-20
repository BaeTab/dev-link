// GitHub API Service for fetching user repositories

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    fork: boolean;
    updated_at: string;
    topics: string[];
}

export interface LinkFromRepo {
    title: string;
    url: string;
    description: string;
    stacks: string[];
    order: number;
}

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch authenticated user's repositories from GitHub API
 */
export async function fetchUserRepos(accessToken: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${GITHUB_API_BASE}/user/repos?sort=updated&per_page=30&type=owner`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    // Filter out forks by default
    return repos.filter(repo => !repo.fork);
}

/**
 * Map GitHub language to tech stack value
 */
const LANGUAGE_TO_STACK: Record<string, string> = {
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'Python': 'python',
    'Java': 'java',
    'C++': 'cplusplus',
    'C#': 'csharp',
    'Go': 'go',
    'Rust': 'rust',
    'Swift': 'swift',
    'Kotlin': 'kotlin',
    'Dart': 'dart',
    'PHP': 'php',
    'Ruby': 'ruby',
    'Scala': 'scala',
    'HTML': 'html5',
    'CSS': 'css3',
    'Vue': 'vue.js',
    'Shell': 'linux',
    'Dockerfile': 'docker',
};

export function getStackFromLanguage(language: string | null): string | null {
    if (!language) return null;
    return LANGUAGE_TO_STACK[language] || null;
}

/**
 * Convert a GitHub repository to a Dev-Link link format
 */
export function mapRepoToLink(repo: GitHubRepo, order: number): LinkFromRepo {
    const stacks: string[] = [];

    // Add primary language as stack
    const langStack = getStackFromLanguage(repo.language);
    if (langStack) {
        stacks.push(langStack);
    }

    return {
        title: repo.name,
        url: repo.html_url,
        description: repo.description || '',
        stacks,
        order,
    };
}
