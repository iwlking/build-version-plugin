/*
 * @Description  : 基础信息
 * @Author       : wlking
 * @Date         : 2023-08-09 17:15:39
 * @LastEditTime : 2023-08-09 17:38:29
 * @LastEditors  : wlking
 * @FilePath     : \build-version-plugin\src\lib\baseInfo.js
 */

const childProcess = require('child_process')

import { dateFormat } from './utils'

let state = 'success'
// git 提交记录信息 https://git-scm.com/docs/git-show    https://git-scm.com/docs/git
let builder = ''
let commitHash = ''
let localBranchName = ''
let branchName = ''
let commitDate = new Date()
let lastCommitDateObj = new Date()

let localState = ''


try {
  builder = childProcess.execSync('git config user.name').toString().trim()
  commitHash = childProcess.execSync('git show -s --format=%H').toString().trim()
  localBranchName = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  branchName = childProcess.execSync(`git rev-parse --abbrev-ref ${localBranchName}@{upstream}`).toString().trim()
  lastCommitDateObj = new Date(childProcess.execSync('git show -s --format=%cd').toString())
  localState = childProcess.execSync('git status -s').toString().trim().replace(/\n/g, ' ---- ')

  if (localState.length > 0) {
    state = 'warning'
    builder = encodeURIComponent(builder)
  } else {
    state = 'error'
  }
} catch (error) {
  state = 'error'
}


commitDate = dateFormat('yyyy-MM-dd hh:mm:ss', lastCommitDateObj)

const buildDate = dateFormat('yyyy-MM-dd hh:mm:ss', new Date())

export default {
  state,
  builder,
  localBranchName,
  commitHash,
  branchName,
  commitDate,
  buildDate,
  localState
}
