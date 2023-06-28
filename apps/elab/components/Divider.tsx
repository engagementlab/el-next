const Divider = ({ color }: { color?: string }) => {
  return (
    <>
      <hr className={`h-1 border-none w-full ${color || 'bg-red'}`} />
      <hr
        className={`h-1 my-1 border-none w-full ${color || 'bg-green-blue'}`}
      />
      <hr className={`h-1 border-none w-full ${color || 'bg-yellow'}`} />
    </>
  );
};
export default Divider;
