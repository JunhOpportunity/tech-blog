import { Octokit } from "@octokit/rest";
import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import { TARGET_REPOS } from "./sync-config.mjs";

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN?.trim();
const USERNAME = process.env.GITHUB_USERNAME?.trim();
const DOWNLOAD_DIR = "./content/raw-github";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function fetchAllReadmes(owner, repo, treeSha, repoName) {
  const { data: tree } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: treeSha,
    recursive: true,
  });

  const readmeFiles = tree.tree.filter(
    (file) => file.path.toLowerCase().endsWith("readme.md")
  );

  for (const file of readmeFiles) {
    // 1. 해당 파일의 커밋 기록 조회 (날짜 추출용)
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      path: file.path,
      per_page: 100, // 전체를 다 가져오기보단 최근 기록 위주 (필요시 조절)
    });

    // 최초 작성일 (목록의 마지막 커밋) 및 마지막 수정일 (목록의 첫 커밋)
    const lastUpdated = commits[0]?.commit.committer.date;
    const firstCreated = commits[commits.length - 1]?.commit.committer.date;

    // 2. 파일 내용 가져오기
    const { data: blob } = await octokit.git.getBlob({
      owner,
      repo,
      file_sha: file.sha,
    });

    const content = Buffer.from(blob.content, "base64").toString("utf-8");
    
    // 3. 메타데이터 구성 (날짜 추가!)
    const safePath = file.path.replace(/\//g, "_");
    const fileName = `${repoName}_${safePath}`;
    
    const fileContent = `---
title: "${repoName} - ${file.path}"
original_repo: "https://github.com/${owner}/${repo}"
path: "${file.path}"
date: "${lastUpdated}"
created_at: "${firstCreated}"
---

${content}`;

    await fs.writeFile(path.join(DOWNLOAD_DIR, fileName), fileContent);
    console.log(`  📥 저장 완료 (날짜포함): ${fileName}`);
  }
}
async function collectSelectedReadmes() {
  try {
    await fs.ensureDir(DOWNLOAD_DIR);
    // 기존에 잘못 가져온 파일들이 있다면 한 번 비우고 시작하는 것이 깔끔합니다.
    // await fs.emptyDir(DOWNLOAD_DIR); 

    console.log(`🚀 총 ${TARGET_REPOS.length}개의 선택된 레포지토리를 탐색합니다.`);

    for (const repoName of TARGET_REPOS) {
      console.log(`📂 레포지토리 탐색 중: ${repoName}`);
      try {
        // 1. 레포지토리 기본 정보 가져오기 (기본 브랜치 확인용)
        const { data: repo } = await octokit.repos.get({
          owner: USERNAME,
          repo: repoName,
        });

        // 2. 기본 브랜치 정보 가져오기
        const { data: branch } = await octokit.repos.getBranch({
          owner: USERNAME,
          repo: repoName,
          branch: repo.default_branch,
        });

        // 3. 하위 README 탐색 실행
        await fetchAllReadmes(USERNAME, repoName, branch.commit.sha, repoName);
        
      } catch (e) {
        console.error(`  ❌ ${repoName} 처리 중 에러:`, e.message);
      }
    }
    console.log("\n✨ 선택된 레포지토리의 README 수집 완료!");
  } catch (err) {
    console.error("🔥 전체 프로세스 에러:", err.message);
  }
}

collectSelectedReadmes();