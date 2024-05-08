import React from 'react';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { CellContainer } from '@keystone-6/core/admin-ui/components';
import LoadingButton from '@mui/lab/LoadingButton';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types';

import { css as emCss } from '@emotion/css';
import { VideoGrid } from '../video/components';
import VideoSelector, { RelatedVideo } from '../video/selector';

const styles = {
  icon: emCss`
      display: inline-block;
      margin-right: 1rem;`,
  field: emCss`
      display: flex;
      align-items: center;
      background-color: #F6A5365E;
      padding: .5rem;
    `,
};

export function Field({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) {
  const VideoGridInstance = new VideoGrid();
  return (
    <>
      <FieldContainer as="fieldset" className={styles.field}>
        <LoadingButton
          loading={VideoGridInstance._useStore().waiting}
          loadingPosition="start"
          startIcon={<VideoLibraryIcon />}
          variant="outlined"
          color="success"
          onClick={() => {
            VideoGridInstance.GetData();
          }}
        >
          Select Video
        </LoadingButton>
        {VideoGridInstance._useStore().error && (
          <p className="p-4 text-red font-bold block">Something went wrong.</p>
        )}
        {value && <span>{value.thumbUrl}</span>}
      </FieldContainer>
      <VideoSelector
        videos={VideoGridInstance.currentVideos}
        data={VideoGridInstance.data}
        open={VideoGridInstance.gridOpen}
        selectionChanged={(item: RelatedVideo) => {
          VideoGridInstance.setVideo(item);
          if (onChange)
            onChange({
              file: item.value,
              caption: '',
              thumbUrl: item.thumbSm,
            });
        }}
        done={() => VideoGridInstance.setGridOpen(false)}
      />
    </>
  );
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  return <CellContainer>{value}</CellContainer>;
};

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {/* {item[field.path]} */}
    </FieldContainer>
  );
};

export const controller = (
  config: FieldControllerConfig
): FieldController<{
  file: string;
  caption: string;
  thumbUrl: string;
}> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,

    graphqlSelection: `${config.path} {
        file
        caption
      }`,
    defaultValue: {
      file: '',
      caption: '',
      thumbUrl: '',
    },
    deserialize: (data) => {
      const value = data[config.path];
      return value;
    },
    serialize: (value) => ({ [config.path]: value }),
  };
};
