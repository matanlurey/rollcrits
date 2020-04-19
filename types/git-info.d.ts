declare module "react-git-info/macro" {
  export default function GitInfo(): GitInfoResult;

  export interface CommitInfo {
    shortHash: string;
  }

  export interface GitInfoResult {
    commit: GitCommit;
  }
}
