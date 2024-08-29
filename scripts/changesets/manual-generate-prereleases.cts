import process from 'node:process'
import { manualGeneratePrereleases } from '@unconfig/changeset-config'
import { PROJECT_CHANGESETS_CONFIG_FILE } from '@nest-zero-to-hero/metas'

const cwd = process.cwd()

manualGeneratePrereleases({
  projectChangesetsPath: PROJECT_CHANGESETS_CONFIG_FILE,
  cwd,
})
