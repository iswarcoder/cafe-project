function Loader({ message = "Brewing your experience..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-coffee-200 border-t-coffee-700" />
      <p className="text-sm text-coffee-700">{message}</p>
    </div>
  );
}

export default Loader;
