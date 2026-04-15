import { Project } from '../types';

export async function fetchGitHubRepos(username: string): Promise<Project[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    const repos = await response.json();
    
    // Process repos to find images in READMEs or use placeholders
    // In a real app, we might use a proxy or specific logic to find images.
    // For now, we'll map them to our Project interface.
    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: repo.description || 'No description available.',
      html_url: repo.html_url,
      homepage: repo.homepage,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      created_at: repo.created_at,
      // Placeholder image logic - in reality, we'd try to fetch README content
      image_url: `https://picsum.photos/seed/${repo.name}/800/450`
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
