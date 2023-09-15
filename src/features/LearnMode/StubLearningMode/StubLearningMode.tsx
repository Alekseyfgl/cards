import { BasicModal } from '../../../common/components/GlobalModal/GlobalModal';
import { MSG_LEARN } from '../../../common/utils/constans/app-messages.const';
import { SkeletonElement } from '../../../common/components/Skeleton/SkeletonElement/SkeletonElement';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const StubLearningMode = () => {
    const navigate = useNavigate();
    return (
        <BasicModal
            isOpen={true}
            width={'30%'}
            commonHandleClose={() => {}}
            title={MSG_LEARN.LEARNING}
            customHandleClose={() => {
                navigate(-1);
            }}
        >
            <SkeletonElement type={'rectangular'} height={'180px'} marginBottom={'20px'} />
            <SkeletonElement type={'rectangular'} height={'30px'} />
        </BasicModal>
    );
};
