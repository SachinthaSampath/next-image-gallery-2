import Image from 'next/image';
import React from 'react';

const Loading = () => {
    return (
        <div>
            <Image src={"/images/loading-ripple.svg"} width={200} height={200} alt='loading...'/>
        </div>
    );
};

export default Loading;