function FormCard() {
  return (
    <div className="border-grey3 flex flex-col items-center justify-center gap-6 rounded-3xl border bg-white p-8">
      <Quantity />
      <div className="text-grey2">1 Coffee = 0.001ETH</div>
      <Form />
    </div>
  );
}

function Quantity() {
  return (
    <div className="flex gap-3">
      <div className="bg-grey4 text-secondary flex h-14 w-14 items-center justify-center rounded-full">
        1
      </div>
      <div className="bg-grey4 text-secondary flex h-14 w-14 items-center justify-center rounded-full">
        2
      </div>
      <div className="bg-grey4 text-secondary flex h-14 w-14 items-center justify-center rounded-full">
        3
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Anonymous"
        className="bg-grey4 text-grey2 w-[440px] rounded-xl px-4 py-3"
      ></input>
      <input
        type="text"
        placeholder="Enjoy your coffee!"
        className="bg-grey4 text-grey2 h-24 w-[440px] rounded-xl px-4 py-3"
      ></input>
      <Button />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-primary flex w-full items-center justify-center rounded-full py-3 font-semibold text-white">
      Send 1 Coffee for 0.001ETH
    </div>
  );
}

export default FormCard;
