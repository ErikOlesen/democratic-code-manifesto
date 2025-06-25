// GitHub API integration
async function fetchGitHubStats() {
    try {
        // Get repository path from current URL or fallback
        const repo = 'erikolesen/democratic-code-manifesto';
        
        const [repoData, commits] = await Promise.all([
            fetch(`https://api.github.com/repos/${repo}`).then(r => r.json()),
            fetch(`https://api.github.com/repos/${repo}/commits?per_page=3`).then(r => r.json())
        ]);
        
        // Update stats
        document.getElementById('stars').textContent = `★ ${repoData.stargazers_count}`;
        document.getElementById('forks').textContent = `⑂ ${repoData.forks_count}`;
        
        // Get contributor count
        const contributors = await fetch(`https://api.github.com/repos/${repo}/contributors`).then(r => r.json());
        document.getElementById('contributors').textContent = `👥 ${contributors.length}`;
        
        // Update recent commits
        if (commits && commits.length > 0) {
            const commitsHtml = commits.map(commit => `
                <div class="commit-item">
                    <div class="commit-message">${commit.commit.message.split('\n')[0]}</div>
                    <div class="commit-meta">${commit.commit.author.name} • ${new Date(commit.commit.author.date).toLocaleDateString()}</div>
                </div>
            `).join('');
            document.getElementById('commits').innerHTML = commitsHtml;
        }
        
    } catch (error) {
        console.log('GitHub API error (likely rate limited):', error);
        // Keep placeholder content on error
        document.getElementById('stars').textContent = '★ --';
        document.getElementById('forks').textContent = '⑂ --';
        document.getElementById('contributors').textContent = '👥 --';
    }
}

// Load GitHub stats when page loads
document.addEventListener('DOMContentLoaded', fetchGitHubStats);
