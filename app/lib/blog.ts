import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export function getBlogPosts() {
  if (!fs.existsSync(blogDirectory)) return [];

  const fileNames = fs.readdirSync(blogDirectory);
  
  return fileNames
    .filter(file => file.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const { data, content } = matter(fileContents);

      return {
        id,
        title: data.title || id,
        date: data.date || new Date().toISOString(),
        description: data.description || "", // 글 요약문
        category: data.category || "General",
        content,
      };
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
}