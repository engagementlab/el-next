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

import { VideoGrid } from '../video/components';
import VideoSelector, { RelatedVideo } from '../video/selector';

export function Field({
  field,
  value,

  itemValue,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) {
  const VideoGridInstance = new VideoGrid();

  return (
    <>
      <FieldContainer as="fieldset" className="flex flex-col p-2 max-w-[12rem]">
        <FieldLabel as="legend">{field.label}</FieldLabel>
        {value.file && value.file.length > 5 && value.thumbSmUrl.length > 5 && (
          <>
            <img src={value.thumbSmUrl} width={75} height={75} />
            <p>{value.label}</p>
          </>
        )}

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
          {value && value.file ? 'Change' : 'Select'} Video
        </LoadingButton>
        {VideoGridInstance._useStore().error && (
          <p className="p-4 text-red font-bold block">Something went wrong.</p>
        )}
        {VideoGridInstance._useStore().waiting && (
          <p>Vimeo data may take quite a while to load...</p>
        )}
      </FieldContainer>
      <VideoSelector
        videos={VideoGridInstance.currentVideos}
        data={VideoGridInstance.data}
        open={VideoGridInstance.gridOpen}
        selectionChanged={(item: RelatedVideo) => {
          VideoGridInstance.setVideo(item);

          if (onChange)
            onChange({
              file: item.file,
              label: item.label,
              caption: '',
              thumbUrl: item.thumb,
              thumbSmUrl: item.thumbSm,
            });
        }}
        done={() => VideoGridInstance.setGridOpen(false)}
      />
    </>
  );
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path];
  return (
    <CellContainer>
      {value.file && value.file.length > 5 && value.thumbSmUrl.length > 5 ? (
        <a
          href={value.file}
          target="_blank"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={value.thumbSmUrl} width={35} height={35} />
          <p>{value.label}</p>
        </a>
      ) : (
        <em>None</em>
      )}
    </CellContainer>
  );
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
  caption?: string;
  thumbUrl: string;
  thumbSmUrl: string;
  label: string;
}> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,

    graphqlSelection: `${config.path} {
        file
        label
        caption
        thumbUrl
        thumbSmUrl
      }`,
    defaultValue: {
      file: 'nofile',
      caption: '',
      thumbUrl: '',
      thumbSmUrl: '',
      label: '',
    },
    deserialize: (data) => {
      console.log('====', data[config.path]);
      const value = data[config.path];
      if (!value || value.file.length < 5) return { kind: 'empty' };

      return value;
    },
    serialize: (value) => {
      console.log('serialize', value);
      if (value.file && value.file.length > 10) return { [config.path]: value };
      return { file: '??' };
    },
  };
};
