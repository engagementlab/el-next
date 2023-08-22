const Divider = ({
  color,
  noMarginY,
}: {
  color?: string;
  noMarginY?: boolean;
}) => {
  return (
    <div className={noMarginY ? 'my-0' : 'my-12'}>
      <hr className={`h-1 border-none w-full ${color || 'bg-red'}`} />
      <hr
        className={`h-1 my-1 border-none w-full ${color || 'bg-green-blue'}`}
      />
      <hr className={`h-1 border-none w-full ${color || 'bg-yellow'}`} />
    </div>
  );
};
export default Divider;
