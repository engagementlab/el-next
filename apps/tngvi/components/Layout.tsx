import React, { ReactNode } from 'react';
import { Layout as SuperLayout } from '@el-next/components';

type Props = {
  children: ReactNode;
  description?: string;
  title?: string;
  error?: any;
};

const appName = 'Transforming Narratives of Gun Violence';
const defaultDescription = `${appName} is a multi-year initiative at Emerson in collaboration with the MGH Center for Gun Violence Prevention and the Louis D. Brown Peace Institute.`;

const Layout = ({
  children,
  title,
  description,
  error,
}: Props): JSX.Element => (
  <SuperLayout
    title={title ? `${appName} - ${title}` : appName}
    description={description ? description : defaultDescription}
    error={error}
  >
    {children}
  </SuperLayout>
);

export default Layout;
