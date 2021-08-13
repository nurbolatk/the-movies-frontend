/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Tooltip from '@reach/tooltip'
import { BsEye } from 'react-icons/bs'
import { useAsync } from '../hooks/useAsync'
import { ButtonIcon, Spinner } from './lib'

function TooltipButton({ label, icon, highlight, onClick, ...rest }) {
  const { error, isLoading, isError, reset, run } = useAsync()
  const theme = useTheme()

  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
  }

  return (
    <Tooltip label={label}>
      <ButtonIcon
        css={{
          ':hover, :focus': {
            color: isLoading ? theme.colors.teal : isError ? theme.colors.red : highlight,
          },
        }}
        onClick={handleClick}
        {...rest}
      >
        {isLoading ? <Spinner /> : icon}
      </ButtonIcon>
    </Tooltip>
  )
}

function StatusButtons() {
  const theme = useTheme()

  return (
    <TooltipButton
      icon={<BsEye />}
      onClick={() => console.log('error')}
      highlight={theme.colors.blue}
      label="Add to watched"
    />
  )
}

export { StatusButtons }
