import * as Tasklist from './TasklistAction'
import * as Worklist from './WorklistAction'
import * as User from './UserAction'
import * as WorkListFilter from './WorklistFilterAction'
import * as TasklistFilter from './TasklistFilterAction'
import * as LoginAction from './LoginAction'
import * as UserAction from './UserAction'
import * as ActivityLogAction from './ActivityLogAction'
import * as WorkshopAction from './WorkshopAction'

export default {
    ...Tasklist,
    ...Worklist,
    ...User,
    ...WorkListFilter,
    ...TasklistFilter,
    ...LoginAction,
    ...UserAction,
    ...ActivityLogAction,
    ...WorkshopAction
}