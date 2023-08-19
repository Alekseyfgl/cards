import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import s from './styles.module.scss';

export const Card = () => {
    const { id } = useParams<{ id: string }>();

    const packId = useAppSelector((state) => state?.packs?.packs?.cardPacks.find((p) => p._id === id));

    const checkId = () => {
        return id === packId;
    };
    console.log('id', id);
    console.log('packId', packId);
    return <h1 className={s.wr}>${id === packId && packId!._id}</h1>;
};
