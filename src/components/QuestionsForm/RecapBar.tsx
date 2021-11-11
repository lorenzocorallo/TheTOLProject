import React from 'react'
import { answerLetter, section, QuestionsData } from '../../utils/database'
import { createStyle, theme } from '../../utils/style'
import { statePair } from '../../utils/types'
import { AnswersData } from '../App'

const defaultBorder = 'thin solid #606060'

const barStyle = createStyle({
  display: 'flex',
  fontSize: '9.5pt',
  textDecoration: 'none',
  color: theme.primary
})

interface RecapBarProps {
  active: boolean
  currentQuestionIndexState: statePair<number>
  sectionAnswers: AnswersData[section]
  sectionQuestions: QuestionsData[section]
}
export default function RecapBar(props: RecapBarProps) {
  return (
    <a style={barStyle} {...(props.active ? { href: '#' } : {})}>
      {props.sectionQuestions.map((q, i) => {
        const answer = props.sectionAnswers.find(
          (a) => a && a.id == q.id && (q.sub ? q.sub == a.sub : true)
        )
        return (
          <AnswerCell
            key={i}
            index={i}
            letter={answer?.letter}
            flagged={answer?.flagged || false}
            onClick={() => {
              if (props.active) props.currentQuestionIndexState[1](i)
            }}
            selected={props.active && props.currentQuestionIndexState[0] == i}
          />
        )
      })}
    </a>
  )
}

const cellContainerStyle = createStyle({
  display: 'flex',
  flexShrink: 1,
  flexDirection: 'column',
  alignContent: 'baseline',
  textAlign: 'center',
  width: '4em'
})

const cellSubStyle = createStyle({
  padding: '0.3em',
  height: '1.2em',
  boxShadow: theme.boxShadow
})

const selectedCell = createStyle({
  outline: `5px solid ${theme.primary}`,
  marginInline: '4px',
  color: 'black'
})

const pStyle = createStyle({
  margin: 'auto'
})

interface AnswerCellProps {
  index: number
  letter: answerLetter | undefined
  flagged: boolean
  onClick: () => void
  selected: boolean
}
function AnswerCell(props: AnswerCellProps) {
  return (
    <div
      style={{
        ...cellContainerStyle,
        backgroundColor: theme.lightBackground,
        ...(props.selected ? selectedCell : {})
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          ...cellSubStyle,
          borderBottom: defaultBorder,
          ...(props.selected ? { fontWeight: 'bold' } : {})
        }}
      >
        <p style={pStyle}>{props.index + 1}</p>
      </div>
      <div
        style={{
          ...cellSubStyle,
          backgroundColor: props.flagged
            ? theme.questionYellow
            : props.letter
            ? theme.questionGreen
            : 'white'
        }}
      >
        <p style={pStyle}>
          {props.letter?.toUpperCase() || ' '}
          {props.flagged && '?'}
        </p>
      </div>
    </div>
  )
}
