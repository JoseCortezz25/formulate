import { ReactNode } from 'react';

const BuilderLayout = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div className="bg-gray-100 h-screen w-full">
      {children}
    </div>
  );
};

export default BuilderLayout;