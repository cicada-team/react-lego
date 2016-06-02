import React from 'react'

function mapValues(obj, handler) {
  const result = {}
  Object.keys(obj).forEach(key=> {
    result[key] = handler(obj[key], key)
  })
  return result
}

function pick(obj, names) {
  const output = {}

  if( typeof names === 'function' ) {
    for( let name in obj ) {
      if( names(obj[name], name) ) {
        output[name] =  obj[name]
      }
    }
  }else {
    names.forEach(name=> {
      output[name] =  obj[name]
    })
  }

  return output
}


export function wrap( DeclarativeComponent ) {
  const { initialize, render } = DeclarativeComponent

  const reduceFunctions = pick( DeclarativeComponent, ( item, name)=>{
    return (typeof item === 'function') && name !== 'render'
  })

  return React.createClass({
    getInitialState() {
      return initialize(this.props)
    },
    render() {

      const reduceFunctionsAsProps =  mapValues( reduceFunctions, (fn, name)=>(...args)=>{
        const newState = fn(this.props, this.state, ...args)
        this.setState( newState )
        if( fn.expose === true && this.props[name] !== undefined ) {
          // TODO add picker
          const reduceFn = fn.reduce || (x=>x)
          this.props[name]( reduceFn(newState ))
        }

      })

      const props = {
        ...this.props,
        ...reduceFunctionsAsProps,
        children: this.props.children
      }

      return render(props, this.state)
    }
  })
}

export function expose(fn) {
  fn.expose = true
  return fn
}

export function reduce(fn, reduceFn) {
  fn.reduce = reduceFn
  return fn
}
