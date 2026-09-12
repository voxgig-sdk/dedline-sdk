import { DedlineEntityBase } from '../DedlineEntityBase';
import type { DedlineSDK } from '../DedlineSDK';
import type { Control } from '../types';
import type { Stat, StatLoadMatch } from '../DedlineTypes';
declare class StatEntity extends DedlineEntityBase<Stat> {
    constructor(client: DedlineSDK, entopts: any);
    make(this: StatEntity): StatEntity;
    load(this: any, reqmatch?: StatLoadMatch, ctrl?: Control): Promise<StatEntity>;
}
export { StatEntity };
