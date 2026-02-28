export interface GithubRepo {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    updated_at: string;
}

export const fetchUserRepos = async (username: string): Promise<GithubRepo[]> => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const data: GithubRepo[] = await response.json();

        // Sort by stars and then by date
        return data.sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    } catch (error) {
        console.error('GitHub API Error:', error);
        throw error;
    }
};
