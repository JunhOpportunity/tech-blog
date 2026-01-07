export async function getGithubCommits() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const username = "JunhOpportunity"; 
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 } // 1시간마다 갱신
  });

  const json = await response.json();
  const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
  
  const commits: Record<string, number> = {};
  weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      if (day.contributionCount > 0) {
        commits[day.date] = day.contributionCount;
      }
    });
  });

  return commits;
}