import React from 'react'
import PropTypes from 'prop-types'
import { id, noop, findIdentifierChildren } from '../../common'

export const defaultStateTypes = {
  value: PropTypes.string
}

export const getDefaultState = () => ({
  value: ''
})

export const identifiers = {
  Prefix: id(noop)
}

export const defaultListeners = {
  onChange(_, e) {
    return {
      value: e.target.value
    }
  }
}

export function render({state, listeners, children}) {
  const prefix = findIdentifierChildren(children, identifiers.Prefix)
  return (
    <div>
      {prefix}
      <input value={state.value} onChange={listeners.onChange} />
    </div>
  )
}
