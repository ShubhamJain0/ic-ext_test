import React from 'react';

type TProps = {
  variant: 'small' | 'medium' | 'full';
};

const Loader: React.FC<TProps> = ({ variant }) => {
  return <div>Loader in progress</div>;
};

export default Loader;
