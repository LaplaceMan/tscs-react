const Label = (label: string) => {
  return <div className="text-sm font-medium text-[#696969] mb-1">{label}</div>;
};

const Content = (icon: React.ReactElement, number: number) => {
  return (
    <div className="flex text-black text-lg font-semibold items-center">
      <div className="flex mx-2">{icon}</div>
      {number}
    </div>
  );
};
const ModelDataMini = (
  label: string,
  icon: React.ReactElement,
  number: number
) => {
  return (
    <div className="flex bg-gray-100 rounded-md p-2">
      <div className="flex flex-col items-center justify-center">
        {Label(label)} {Content(icon, number)}
      </div>
    </div>
  );
};
export default ModelDataMini;
