import { DedlineEntityBase } from '../DedlineEntityBase';
import type { DedlineSDK } from '../DedlineSDK';
import type { Control } from '../types';
import type { Deadline, DeadlineListMatch } from '../DedlineTypes';
declare class DeadlineEntity extends DedlineEntityBase<Deadline> {
    constructor(client: DedlineSDK, entopts: any);
    make(this: DeadlineEntity): DeadlineEntity;
    list(this: any, reqmatch?: DeadlineListMatch, ctrl?: Control): Promise<DeadlineEntity[]>;
}
export { DeadlineEntity };
