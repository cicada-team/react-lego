import React from 'react'

export default function Case(props) {
  const { title, description='', index } = props
  const children = React.Children.map(props.children, (child, index) => {
    if (child.type !== Case) return child
    return React.cloneElement(child, {index})
  })

  return (
    <div style={{paddingLeft: 50}}>
      <h3>{index!== undefined ? `${index+1} ` : ''}{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  )
}
