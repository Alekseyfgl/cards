import { createAppAsyncThunk, thunkTryCatch } from '../../common/utils/thunks';
import { DomainDto } from '../../common/utils/types/domain-request.types';
import { cardsApi } from '../Cards/cards.api';
import { LearnDto } from './learn.interfaces';

const sendAnswerByCard = createAppAsyncThunk<void, DomainDto<LearnDto, null, null>>('learn/answer', async (arg: DomainDto<LearnDto, null, null>, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        await cardsApi.sendAnswer(arg.dto);
    });
});
export const learnThunks = { sendAnswerByCard };
