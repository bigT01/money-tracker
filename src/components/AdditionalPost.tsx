import React, {ReactNode} from 'react';

type AdditionalPostProps = {
    children: ReactNode,
    label: string
}
const AdditionalPost = ({children, label}: AdditionalPostProps) => {
    return (
        <div className='flex flex-col gap-2 mb-4'>
            <p className='text-[#00000070] text-xs'>{label}</p>
            {children}
        </div>
    );
};

export default AdditionalPost;