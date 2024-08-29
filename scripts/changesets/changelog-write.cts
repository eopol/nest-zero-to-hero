import process from 'node:process'
import { changesetsChangelogWrite } from '@unconfig/changeset-config'
import {
  PROJECT_CHANGELOG_FILE,
  PROJECT_CHANGELOG_TEMP_FILE,
  PROJECT_WEBSITE_CHANGELOG_FILE,
} from '@nest-zero-to-hero/metas'

const cwd = process.cwd()

changesetsChangelogWrite({
  projectChangelogPath: PROJECT_CHANGELOG_FILE,
  projectChangelogTempPath: PROJECT_CHANGELOG_TEMP_FILE,
  websiteChangelogPath: PROJECT_WEBSITE_CHANGELOG_FILE,
  cwd,
})
