import React from 'react'
import { HighlightText } from '../HighlightText'
import { mount } from 'enzyme'

describe('HighlightText component', () => {
  it('renders just the text given search fragments are undefined', () => {
    const comp = mount(<HighlightText text='Starting Skoda 120' />)
    expect(comp).toIncludeText('Starting Skoda 120')
  })

  it('renders just the text given search fragments are empty', () => {
    const comp = mount(
      <HighlightText
        text='Starting Skoda 120'
        searchFragments={[]}
      />
    )
    expect(comp).toIncludeText('Starting Skoda 120')
  })

  it('wraps skoda in span given search fragments contain skoda', () => {
    const comp = mount(
      <HighlightText
        text='Starting Skoda 120'
        searchFragments={['Skoda']}
      />
    )
    expect(comp).toContainMatchingElement('span[children="Skoda"]')
  })

  it('wraps skoda in span given search fragments contain skoda with case mismatch', () => {
    const comp = mount(
      <HighlightText
        text='Starting Skoda 120'
        searchFragments={['skoda']}
      />
    )
    expect(comp).toContainMatchingElement('span[children="Skoda"]')
    expect(comp).toIncludeText('Starting Skoda 120')
  })

  it('wraps skoda and 120 in span given search fragments contain skoda and 120', () => {
    const comp = mount(
      <HighlightText
        text='Starting Skoda 120'
        searchFragments={['skoda', '120']}
      />
    )
    expect(comp).toContainMatchingElement('span[children="Skoda"]')
    expect(comp).toContainMatchingElement('span[children="120"]')
    expect(comp).toIncludeText('Starting Skoda 120')
  })

  it('wraps starting and skoda in span given search fragments contain skoda and starting', () => {
    const comp = mount(
      <HighlightText
        text='Starting Skoda 120'
        searchFragments={['skoda', 'starting']}
      />
    )
    expect(comp).toContainMatchingElement('span[children="Starting"]')
    expect(comp).toContainMatchingElement('span[children="Skoda"]')
    expect(comp).toIncludeText('Starting Skoda 120')
  })

  it.only('wraps all "a"s in span', () => {
    const comp = mount(
      <HighlightText
        text='Starting Skoda 120'
        searchFragments={['a']}
      />
    )
    expect(comp.find('span[children="a"]')).toHaveLength(2)
    expect(comp).toIncludeText('Starting Skoda 120')
  })
})
