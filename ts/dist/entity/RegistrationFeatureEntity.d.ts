import { DedlineEntityBase } from '../DedlineEntityBase';
import type { DedlineSDK } from '../DedlineSDK';
import type { Control } from '../types';
import type { RegistrationFeature, RegistrationFeatureListMatch } from '../DedlineTypes';
declare class RegistrationFeatureEntity extends DedlineEntityBase<RegistrationFeature> {
    constructor(client: DedlineSDK, entopts: any);
    make(this: RegistrationFeatureEntity): RegistrationFeatureEntity;
    list(this: any, reqmatch?: RegistrationFeatureListMatch, ctrl?: Control): Promise<RegistrationFeatureEntity[]>;
}
export { RegistrationFeatureEntity };
