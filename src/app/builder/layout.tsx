import { ReactNode } from 'react';

const BuilderLayout = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default BuilderLayout;