export type GradeTypes = 1 | 2 | 3 | 4 | 5;
export interface LearnDto {
    grade: GradeTypes;
    card_id: string;
}
