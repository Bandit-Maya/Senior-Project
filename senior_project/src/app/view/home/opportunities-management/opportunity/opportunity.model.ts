export interface Skill{
    key: number;
    value: string;
}

export interface Opportunity{
    opportunityId: string;
    title: string;
    location: string;
    date: string;
    reqSkills: Skill[];
}

export interface NewOppportunityData{
    title: string;
    location: string;
    date: string;
    reqSkills: string;
}