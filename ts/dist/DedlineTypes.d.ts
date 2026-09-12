export interface Deadline {
    general?: any[];
    primary?: any[];
}
export interface DeadlineListMatch {
    general?: any[];
    primary?: any[];
}
export interface RegistrationFeature {
}
export interface RegistrationFeatureListMatch {
}
export interface Stat {
    lastUpdated: string;
    onlineRegistrationAvailable: number;
    sameDayRegistrationAvailable: number;
    totalStates: number;
}
export interface StatLoadMatch {
    lastUpdated?: string;
    onlineRegistrationAvailable?: number;
    sameDayRegistrationAvailable?: number;
    totalStates?: number;
}
export interface State {
    deadline: string;
    emoji: string;
    generalElectionDate: string;
    label: string;
    lastMinuteAccepted: boolean;
    notes?: string;
    onlineAccepted: boolean;
    primaryDate: string;
    primaryDeadline: string;
    url: string;
    value: string;
}
export interface StateLoadMatch {
    state_abbreviation: string;
    $action?: string;
    [action: string]: any;
}
export interface StateListMatch {
    deadline?: string;
    emoji?: string;
    generalElectionDate?: string;
    label?: string;
    lastMinuteAccepted?: boolean;
    notes?: string;
    onlineAccepted?: boolean;
    primaryDate?: string;
    primaryDeadline?: string;
    url?: string;
    value?: string;
}
