/* eslint-disable react/no-unescaped-entities */
function Supporters() {
  return (
    <div className="flex w-[440px] flex-col items-center justify-center gap-6">
      <Supporter />
      <Divider />
      <Supporter />
    </div>
  );
}

function Supporter() {
  return (
    <div className="flex w-full flex-col gap-3">
      <p>From: Dolly</p>
      <p className="text-grey2">"Keep it up!"</p>
    </div>
  );
}

function Divider() {
  return <div className="border-grey3 w-full border"></div>;
}

export default Supporters;
