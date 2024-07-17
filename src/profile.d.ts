// Auto-Generated type from json
// https://nhpoj.net/api/profile?username=nhphu87

export interface TopLevel {
    error: null;
    data:  Data;
}

export interface Data {
    id:                  number;
    user:                User;
    real_name:           null;
    acm_problems_status: ACMProblemsStatus;
    oi_problems_status:  OiProblemsStatus;
    avatar:              string;
    blog:                string;
    mood:                string;
    github:              null;
    school:              string;
    major:               null;
    language:            string;
    grade:               number;
    experience:          number;
    accepted_number:     number;
    total_score:         number;
    submission_number:   number;
}

export interface ACMProblemsStatus {
    problems: { [key: string]: ACMProblemsStatusProblem };
}

export interface ACMProblemsStatusProblem {
    _id:    string;
    status: number;
}

export interface OiProblemsStatus {
    problems:         { [key: string]: ContestProblemValue };
    contest_problems: { [key: string]: ContestProblemValue };
}


export type Problems = { [key: string]: ContestProblemValue };


export interface ContestProblemValue {
    _id:    string;
    score:  number;
    status: number;
}

export interface User {
    id:                 number;
    username:           string;
    email:              string;
    admin_type:         string;
    problem_permission: string;
    create_time:        Date;
    last_login:         Date;
    two_factor_auth:    boolean;
    open_api:           boolean;
    is_disabled:        boolean;
    title:              null;
    title_color:        null;
}
