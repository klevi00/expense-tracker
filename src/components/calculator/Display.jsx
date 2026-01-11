function Display({ valore }) {
  return (
    <div className="bg-base-200 p-6 rounded-lg mb-4">
      <div className="text-right text-4xl font-mono min-h-[3rem] justify-end text-primary overflow-x-auto">
        {valore || "0"}
      </div>
    </div>
  );
}

export default Display;
