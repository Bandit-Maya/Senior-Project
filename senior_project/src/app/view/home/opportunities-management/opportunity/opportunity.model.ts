export interface Skill{
    key: number;
    value: string;
}

export interface Opportunity{
    _id: string;
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