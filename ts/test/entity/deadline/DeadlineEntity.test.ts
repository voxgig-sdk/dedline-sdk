

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DedlineSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DeadlineEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEDLINE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEDLINE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DedlineSDK.test()
    const ent = testsdk.Deadline()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEDLINE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deadline.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"general","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"primary","req":false,"type":"`$ARRAY`","index$":1}],"name":"deadline","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /upcoming.json","json":"{\"operationId\":\"getUpcomingDeadlines\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"general\":[],\"primary\":[{\"daysUntil\":8,\"deadline\":\"20260202\",\"label\":\"Texas\",\"state\":\"TX\"}]},\"schema\":{\"properties\":{\"general\":{\"items\":{\"properties\":{\"daysUntil\":{\"description\":\"Number of days until the deadline\",\"example\":8,\"type\":\"integer\"},\"deadline\":{\"description\":\"Registration deadline in YYYYMMDD format\",\"example\":\"20260202\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"label\":{\"description\":\"Full state name\",\"example\":\"Texas\",\"type\":\"string\"},\"state\":{\"description\":\"Two-letter state abbreviation\",\"example\":\"TX\",\"type\":\"string\"}},\"required\":[\"state\",\"label\",\"deadline\",\"daysUntil\"],\"type\":\"object\"},\"type\":\"array\"},\"primary\":{\"items\":{\"properties\":{\"daysUntil\":{\"description\":\"Number of days until the deadline\",\"example\":8,\"type\":\"integer\"},\"deadline\":{\"description\":\"Registration deadline in YYYYMMDD format\",\"example\":\"20260202\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"label\":{\"description\":\"Full state name\",\"example\":\"Texas\",\"type\":\"string\"},\"state\":{\"description\":\"Two-letter state abbreviation\",\"example\":\"TX\",\"type\":\"string\"}},\"required\":[\"state\",\"label\",\"deadline\",\"daysUntil\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/upcoming.json","segments":[{"lit":"upcoming.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"deadline","name__orig":"deadline","Name":"Deadline","name_":"deadline","name-":"deadline","NAME":"DEADLINE","index$":0}, {"active":true,"entity":"deadline","key$":"BasicDeadlineFlow","kind":"basic","name":"BasicDeadlineFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"deadline_ref01"}}],"index$":0}]}, 'Deadline')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deadline_ref01_data = Object.values(setup.data.existing.deadline)[0] as any

    // LIST
    const deadline_ref01_ent = client.Deadline()
    const deadline_ref01_match: any = {}

    const deadline_ref01_list = (await deadline_ref01_ent.list(deadline_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deadline/DeadlineTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DedlineSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['deadline01','deadline02','deadline03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEDLINE_TEST_DEADLINE_ENTID': idmap,
    'DEDLINE_TEST_LIVE': 'FALSE',
    'DEDLINE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEDLINE_TEST_DEADLINE_ENTID']

  const live = 'TRUE' === env.DEDLINE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEDLINE_TEST_DEADLINE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DedlineSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DEDLINE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
