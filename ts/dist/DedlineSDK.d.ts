import { DeadlineEntity } from './entity/DeadlineEntity';
import { RegistrationFeatureEntity } from './entity/RegistrationFeatureEntity';
import { StatEntity } from './entity/StatEntity';
import { StateEntity } from './entity/StateEntity';
export type * from './DedlineTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DedlineEntityBase } from './DedlineEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class DedlineSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Deadline(entopts?: Record<string, any>): DeadlineEntity;
    RegistrationFeature(entopts?: Record<string, any>): RegistrationFeatureEntity;
    Stat(entopts?: Record<string, any>): StatEntity;
    State(entopts?: Record<string, any>): StateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DedlineSDK;
    tester(testopts?: any, sdkopts?: any): DedlineSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DedlineSDK;
export { stdutil, config, BaseFeature, DedlineEntityBase, DedlineSDK, SDK, };
