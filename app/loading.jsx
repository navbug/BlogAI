const Loading = () => {
  return (
    <div className='w-full flex-center'>
      <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-900"></div>
    </div>
    </div>
  );
};

export default Loading;