import process from 'node:process'
import { changesetsGenerateReleases } from '@unconfig/changeset-config'
import {
  PKG_GROUP_NAME,
  PKG_PREFIX,
  PROJECT_CHANGELOG_FILE,
  REPO_OWNER,
} from '@nest-zero-to-hero/metas'

const cwd = process.cwd()

changesetsGenerateReleases({
  repoName: PKG_GROUP_NAME,
  repoOwner: REPO_OWNER,
  pkgPrefix: PKG_PREFIX,
  projectChangelogPath: PROJECT_CHANGELOG_FILE,
  cwd,
})
