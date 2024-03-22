type Props = {
  date: string;
};

/**
 * Date formatter
 * @alpha
 *
 */
export const DateFormat = ({ date }: Props) => {
  return {
    weekday: new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
    }),
  };
};
