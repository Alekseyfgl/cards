import { ICard } from '../../../Cards/cards.interfaces';

export const addEndMockCard = (cards: ICard[]): ICard[] => {
    const mockCard: ICard = {
        cardsPack_id: '',
        _id: '',
        answer: '',
        question: '',
        questionImg: '',
        user_id: '',
        updated: '',
        grade: 0,
        answerImg: '',
        comments: '',
        created: '',
        more_id: '',
        rating: 0,
        shots: 0,
        type: 'card',
    };
    return [...cards, mockCard];
};
