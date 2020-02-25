/* tslint:disable no-console */

import { Schema } from './schema/schema'
import { ok, err } from './result/result'
import { primitiveError } from './errors/errors'
import str from './schema/string'
import failover from './schema/failover'
import num from './schema/number'
import object from './schema/object'
import array from './schema/array'
import isExactly from './schema/isExactly'
import { Email, UserEntity } from './value-object/value-object'

interface UserInput {
  email: string
  username: string
}

const userInputs: UserInput[] = [{
  email: 'lindellcarternyc@gmail.com',
  username: 'lindellcarter'
}, {
    email: 'not email',
  username: 'shiz'
  }]

const userResults = userInputs.map(UserEntity.create)

userResults.forEach(res => {
  if (res.isOk()) {
    console.log(res.value.toString())
  } else {
    console.log(res.error)
  }
  console.log('')
})