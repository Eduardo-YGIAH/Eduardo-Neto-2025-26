# Release Process and Versioning

This document describes **how to cut a release** and **how to choose the correct version number** using Semantic Versioning (SemVer).

For daily workflow commands, see [Git Workflow Guide](./git-workflow.md).  
For branching rules, see [Branching Strategy](./branching-strategy.md).

## Index

- [When to Release](#when-to-release)
- [Version Selection](#version-selection)
- [Commit-to-Version Mapping](#commit-to-version-mapping)
- [Release Steps](#release-steps)
- [Tag Commands](#tag-commands)
- [GitHub Release (Optional)](#github-release-optional)

---

## When to Release

Consider a release when:

- [ ] `dev` has commits not yet on `main`
- [ ] CI is green on `dev`
- [ ] Features are complete (no half-finished work)
- [ ] No known blocking issues

> **Tip:** Prefer small, frequent releases over large batches. This reduces merge conflict risk and makes rollbacks easier.

---

## Version Selection

This project follows **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

| Change Type | Version Bump | When to Use | Example |
|-------------|--------------|-------------|---------|
| **MAJOR** | X.0.0 | Site redesigns, URL/route changes, breaking restructures | 1.2.3 → 2.0.0 |
| **MINOR** | x.Y.0 | New demos, case studies, blog posts, features | 1.2.3 → 1.3.0 |
| **PATCH** | x.y.Z | Bug fixes, typos, refactors, dependency updates | 1.2.3 → 1.2.4 |

### Version Selection Checklist

1. **Any breaking changes?** (URL changes, major restructures) → **MAJOR**
2. **New features or content?** (demos, case studies, blog posts) → **MINOR**
3. **Only fixes and maintenance?** → **PATCH**

---

## Commit-to-Version Mapping

Use conventional commit prefixes to determine the version bump:

| Commit Prefix | Bump Type | Example |
|---------------|-----------|---------|
| `feat:` | MINOR | New functionality |
| `fix:` | PATCH | Bug fixes |
| `chore:` | PATCH | Maintenance tasks |
| `refactor:` | PATCH | Code improvements |
| `docs:` | PATCH | Documentation updates |
| `test:` | PATCH | Test additions/fixes |
| `BREAKING CHANGE:` in body | MAJOR | Incompatible changes |
| `feat!:` or `fix!:` (with `!`) | MAJOR | Breaking change shorthand |

**Rule:** The highest-priority commit type determines the bump.
- Any `BREAKING CHANGE` or `!` → MAJOR
- Any `feat:` (without breaking) → MINOR
- Only `fix:`, `chore:`, etc. → PATCH

---

## Release Steps

### Prerequisites

- You have push access to `main` and tags
- CI is green on `dev`
- Local Git is up to date with `origin`

### Step-by-Step

1. **Merge `dev` into `main`**
   
   Follow [Releasing to Production](./git-workflow.md#releasing-to-production):
   - Open PR: `dev` → `main`
   - Ensure all checks pass
   - Merge using **Rebase and Merge**

2. **Update local `main`**

   ```sh
   git checkout main
   git pull
   git status  # Should show "nothing to commit, working tree clean"
   ```

3. **Determine version**
   
   Review commits since last tag:
   ```sh
   git log $(git describe --tags --abbrev=0)..HEAD --oneline
   ```
   
   Apply [Commit-to-Version Mapping](#commit-to-version-mapping) rules.

4. **Create and push tag**
   
   ```sh
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin vX.Y.Z
   ```

5. **(Optional) Create GitHub Release**
   
   See [GitHub Release](#github-release-optional) below.

---

## Tag Commands

### Create an Annotated Tag

```sh
git tag -a vX.Y.Z -m "Release vX.Y.Z"
```

### Push Tag to Remote

```sh
git push origin vX.Y.Z
```

### List All Tags

```sh
git tag --list 'v*'
```

### View Tag Details

```sh
git show vX.Y.Z
```

### Delete a Tag (if needed)

```sh
# Local
git tag -d vX.Y.Z

# Remote
git push origin --delete vX.Y.Z
```

---

## GitHub Release (Optional)

After tagging, you can create a GitHub Release for better visibility:

1. Go to **Releases → Draft a new release**
2. Select the existing tag (e.g., `v1.3.0`)
3. Set **Target** to `main`
4. Add release notes:
   - Summary of features
   - Notable fixes
   - Breaking changes (if any)
5. Click **Publish release**

---

## Quick Reference

**Full release sequence:**

```sh
# 1. Merge dev → main via PR (Rebase and Merge)

# 2. Update local main
git checkout main
git pull

# 3. Review commits since last release
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# 4. Tag and push
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z

# 5. (Optional) Create GitHub Release
```

