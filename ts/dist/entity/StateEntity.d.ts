import { DedlineEntityBase } from '../DedlineEntityBase';
import type { DedlineSDK } from '../DedlineSDK';
import type { Control } from '../types';
import type { State, StateLoadMatch, StateListMatch } from '../DedlineTypes';
declare class StateEntity extends DedlineEntityBase<State> {
    constructor(client: DedlineSDK, entopts: any);
    make(this: StateEntity): StateEntity;
    load(this: any, reqmatch?: StateLoadMatch, ctrl?: Control): Promise<StateEntity>;
    list(this: any, reqmatch?: StateListMatch, ctrl?: Control): Promise<StateEntity[]>;
}
export { StateEntity };
