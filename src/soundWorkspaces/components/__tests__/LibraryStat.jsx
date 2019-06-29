import AllInclusive from '@material-ui/icons/AllInclusive'
import React from 'react'

import { renderWithContainers } from '../../../mock'
import { LibraryStat } from '..'

describe('LibraryStat component', () => {
  it('renders passed number', () => {
    const comp = renderWithContainers(
      <LibraryStat
        icon={AllInclusive}
        number={42}
        title='Test library stat'
      />
    )
    expect(comp).toIncludeText('42')
  })
})
