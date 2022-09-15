import * as Tasklist from './Tasklist'
import * as Worklist from './Worklist'
import * as User from './User'
import * as WorklistFilter from './WorklistFilter'
import * as TasklistFilter from './TasklistFilter'
import * as Login from './Login'
import * as ActivityLog from './ActivityLog'
import * as Workshop from './Workshop'

export default {
    ...Tasklist,
    ...Worklist,
    ...User,
    ...WorklistFilter,
    ...TasklistFilter,
    ...Login,
    ...ActivityLog,
    ...Workshop
}