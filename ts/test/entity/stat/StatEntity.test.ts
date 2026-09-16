

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


describe('StatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEDLINE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEDLINE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DedlineSDK.test()
    const ent = testsdk.Stat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEDLINE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"lastUpdated","req":true,"short":"Date when the data was last updated","type":"`$STRING`","index$":0},{"active":true,"name":"onlineRegistrationAvailable","req":true,"short":"Number of states that offer online registration","type":"`$INTEGER`","index$":1},{"active":true,"name":"sameDayRegistrationAvailable","req":true,"short":"Number of states that allow same-day registration","type":"`$INTEGER`","index$":2},{"active":true,"name":"totalStates","req":true,"short":"Total number of states (including DC)","type":"`$INTEGER`","index$":3}],"name":"stat","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /stats.json","json":"{\"operationId\":\"getStatistics\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"lastUpdated\":\"2026-01-25\",\"onlineRegistrationAvailable\":41,\"sameDayRegistrationAvailable\":21,\"totalStates\":51},\"schema\":{\"properties\":{\"lastUpdated\":{\"description\":\"Date when the data was last updated\",\"example\":\"2026-01-25\",\"format\":\"date\",\"type\":\"string\"},\"onlineRegistrationAvailable\":{\"description\":\"Number of states that offer online registration\",\"example\":41,\"type\":\"integer\"},\"sameDayRegistrationAvailable\":{\"description\":\"Number of states that allow same-day registration\",\"example\":21,\"type\":\"integer\"},\"totalStates\":{\"description\":\"Total number of states (including DC)\",\"example\":51,\"type\":\"integer\"}},\"required\":[\"totalStates\",\"onlineRegistrationAvailable\",\"sameDayRegistrationAvailable\",\"lastUpdated\"],\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/stats.json","segments":[{"lit":"stats.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stat","name__orig":"stat","Name":"Stat","name_":"stat","name-":"stat","NAME":"STAT","index$":2}, {"active":true,"entity":"stat","key$":"BasicStatFlow","kind":"basic","name":"BasicStatFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"stat_ref01","srcdatavar":"stat_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stat_ref01"}}],"index$":0}]}, 'Stat')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stat_ref01_data = Object.values(setup.data.existing.stat)[0] as any

    // LOAD
    const stat_ref01_ent = client.Stat()
    const stat_ref01_match_dt0: any = {}
    const stat_ref01_data_dt0 = (await stat_ref01_ent.load(stat_ref01_match_dt0)).data()
    assert(null != stat_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stat/StatTestData.json')

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
    ['stat01','stat02','stat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEDLINE_TEST_STAT_ENTID': idmap,
    'DEDLINE_TEST_LIVE': 'FALSE',
    'DEDLINE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEDLINE_TEST_STAT_ENTID']

  const live = 'TRUE' === env.DEDLINE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEDLINE_TEST_STAT_ENTID']
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
  
