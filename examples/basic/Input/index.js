import { wrap } from '@cicada/react-lego'
import * as RawInput from './Input'
import { each } from '../../common'

export const identifiers = RawInput.identifiers || {}
const Input = wrap(RawInput)

Object.assign(Input, identifiers)

export default Input
