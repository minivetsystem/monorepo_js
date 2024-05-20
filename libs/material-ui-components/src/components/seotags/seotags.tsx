import React, { FC, ReactElement } from 'react';
import Head from 'next/head';
import { ISeoTagsProps } from './seotags.interface';

export const SeoTags: FC<ISeoTagsProps> = (props): ReactElement => {
  const { title } = props;
  return (
    <Head>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta
        name="description"
        content="At FuneralRegistry.com, memorialize your loved ones by creating unique online registries. Share obituaries, funeral details, and memories, raise funds for funeral expenses, and connect with your community. Streamline your funeral planning process with us."
      />
    </Head>
  );
};
