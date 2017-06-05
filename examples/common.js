import React from 'react'

export function noop() {
  return null
}

export function id(fn) {
  return (...args) => fn(...args)
}

export function findIdentifierChildren(children, identifier) {

  const foundIdentifier = React.Children.toArray(children).find(child => child.type === identifier)
  return foundIdentifier ? foundIdentifier.props.children : null
}