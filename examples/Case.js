import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  padding-left: 10px;
  border-left: 4px solid rgb(0, 196, 255);
  margin: 20px 0;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
`

const Description = styled.div`
  font-size: 12px;
  color: #999;
  margin: 5px 0;
`

export default function Case(props) {
  const { title, description='', index } = props
  const children = React.Children.map(props.children, (child, index) => {
    if (child.type !== Case) return child
    return React.cloneElement(child, {index})
  })

  return (
    <Root>
      <Title >{index!== undefined ? `${index+1} ` : ''}{title}</Title>
      <Description>{description}</Description>
      <div>
        {children}
      </div>
    </Root>
  )
}
