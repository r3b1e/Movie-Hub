import React from 'react';
import { useSelector } from 'react-redux';

const useRemove = (id) => {

    const data = useSelector((store) => store.detail.items);
    return data.filter((val) => val.id == id)

}

export default useRemove