import React from 'react'
import ReactDom from 'react-dom'
import { wrap } from '@cicada/react-lego'
import Case from './Case'
import Input  from './Input'

ReactDom.render((
  <div>
    <Case title="普通 input">
        <Input />
    </Case>

      <Case title="有 listener ">
          <Case title="普通">
              <Input onChange={({state}) => alert(state.value)} />
          </Case>

          <Case title="preventDefault">
              <Input onChange={[({state}) => alert(state.value), true]}/>
          </Case>

          <Case title="only preventDefault">
              <Input onChange={[undefined, true]}/>
          </Case>

          <Case title="before default">
              <Input onChange={[({state}) => alert(state.value), false, true]}/>
          </Case>

          <Case title="before default and prevent default on the fly" description="输入3就不会改变">
              <Input
                onChange={[(_, e) => {return e.target.value === '3' ? [undefined, true] : undefined}, false, true]}
              />
          </Case>
      </Case>

      <Case title="有 prefix">
          <Input>
              <Input.Prefix>
                  <span>姓名: </span>
              </Input.Prefix>
          </Input>
        </Case>

  </div>
), document.getElementById('root'))
