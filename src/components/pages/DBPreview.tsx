import { useState } from 'react'
import { DATABASE_REF, sectionInfo } from '../../utils/constants'
import {
  Section,
  Question as IQuestion,
  DatabaseStore
} from '../../utils/database'
import { baseStyle, StyleSheet } from '../../utils/style'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'
import Question from '../Util/Question'
import Select from '../Util/Select'

const styles = StyleSheet.create({
  ul: {
    margin: 10,
    paddingLeft: 16
  }
})

interface DBPreviewProps {
  dbs?: DatabaseStore
}

export default function DBPreview({ dbs }: DBPreviewProps) {
  if (!dbs) return <div style={baseStyle}>Loading...</div>
  const [db, setDb] = useState(dbs.stable)

  return (
    <div>
      <Select
        label="Database"
        entries={[
          { value: DATABASE_REF.STABLE, label: 'Production' },
          { value: DATABASE_REF.MAIN, label: 'Development' }
        ]}
        defaultValue={DATABASE_REF.STABLE}
        onChange={(v) => setDb(dbs[v as DATABASE_REF])}
      />
      {(
        Object.entries(db).filter(([key]) => key != 'meta') as [
          Section,
          IQuestion[]
        ][]
      ).map(([key, questions]) => (
        <div key={key} style={baseStyle}>
          <GeneralPurposeCollapsible
            label={sectionInfo[key].name}
            startOpen={false}
          >
            <ul style={styles.ul}>
              {questions
                .filter((q) => q.text || key == 'com')
                .map((q) => (
                  <li key={key + q.id + (q.sub || '')}>
                    <Question q={q} isDebug={true} showAttachments />
                  </li>
                ))}
            </ul>
          </GeneralPurposeCollapsible>
        </div>
      ))}
    </div>
  )
}
