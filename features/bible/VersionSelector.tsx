import { Box, Select } from '@chakra-ui/react'
import { VersionId } from '../../common/types'
import { versions } from './bible.utils'

interface VersionSelectorProps {
  onChange: (versionId: VersionId) => void
  versionId: VersionId
}

const VersionSelector = ({ versionId, onChange }: VersionSelectorProps) => {
  return (
    <Box>
      <Select
        value={versionId}
        onChange={(e) => onChange(e.target.value as VersionId)}
      >
        {versions.map((v) => (
          <option value={v.id}>{v.id}</option>
        ))}
      </Select>
    </Box>
  )
}

export default VersionSelector
