import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import s from './styles.module.scss';
import { useEffect } from 'react';
import { cardThunks } from '../cards.slice';

export const Card = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (!id) {
        navigate('/404');
    }

    const [searchParams, setSearchParams] = useSearchParams({ sortCards: '0grade', page: '1', pageCount: '10', cardsPack_id: id! });
    const dispatch = useAppDispatch();
    const packId = useAppSelector((state) => state?.packs?.packs?.cardPacks.find((p) => p._id === id));

    useEffect(() => {
        dispatch(cardThunks.getAllCardsByPack(Object.fromEntries(searchParams)))
            .unwrap()
            .catch(() => {
                navigate('/404');
            });
    }, []);

    console.log('id', id);
    console.log('packId', packId);
    return <h1 className={s.wr}>${id === packId && packId!._id}</h1>;
};
