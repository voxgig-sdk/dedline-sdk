

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


describe('RegistrationFeatureEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEDLINE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEDLINE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DedlineSDK.test()
    const ent = testsdk.RegistrationFeature()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEDLINE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'registration_feature.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"registration_feature","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /lastMinuteAccepted.json","json":"{\"operationId\":\"getSameDayRegistrationStates\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[\"CA\",\"CO\",\"CT\"],\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/lastMinuteAccepted.json","segments":[{"lit":"lastMinuteAccepted.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /onlineNotAccepted.json","json":"{\"operationId\":\"getStatesWithoutOnlineRegistration\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[\"AR\",\"ME\",\"MS\"],\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/onlineNotAccepted.json","segments":[{"lit":"onlineNotAccepted.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"registration_feature","name__orig":"registration_feature","Name":"RegistrationFeature","name_":"registration_feature","name-":"registration-feature","NAME":"REGISTRATION_FEATURE","index$":1}, {"active":true,"entity":"registration_feature","key$":"BasicRegistrationFeatureFlow","kind":"basic","name":"BasicRegistrationFeatureFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"registration_feature_ref01"}}],"index$":0}]}, 'RegistrationFeature')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let registration_feature_ref01_data = Object.values(setup.data.existing.registration_feature)[0] as any

    // LIST
    const registration_feature_ref01_ent = client.RegistrationFeature()
    const registration_feature_ref01_match: any = {}

    const registration_feature_ref01_list = (await registration_feature_ref01_ent.list(registration_feature_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/registration_feature/RegistrationFeatureTestData.json')

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
    ['registration_feature01','registration_feature02','registration_feature03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEDLINE_TEST_REGISTRATION_FEATURE_ENTID': idmap,
    'DEDLINE_TEST_LIVE': 'FALSE',
    'DEDLINE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEDLINE_TEST_REGISTRATION_FEATURE_ENTID']

  const live = 'TRUE' === env.DEDLINE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEDLINE_TEST_REGISTRATION_FEATURE_ENTID']
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
  
