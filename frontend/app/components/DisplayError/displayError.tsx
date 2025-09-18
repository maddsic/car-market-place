function DisplayError({ error }: { error?: string }) {
  return (
    <div className="text-red-500">
      <p className="text-xs">{error}</p>
    </div>
  );
}
export default DisplayError;
