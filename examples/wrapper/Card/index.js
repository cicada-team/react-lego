import { wrap } from '@cicada/react-lego'
import * as RawCard from './Card'
import { each } from '../../common'

export const wrappers = RawCard.defaultWrappers|| {}
const Card = wrap(RawCard)

Object.assign(Card, wrappers)

export default Card
