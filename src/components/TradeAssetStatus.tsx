function TradeAssetStatus({
  show,
  status
}: {
  show: boolean,
  status: string
}) {
  if (show) {
    return (
      <div className="flex justify-center mx-3 h-6">
        {status}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center mx-3 h-6" />
    );
  }
}

export default TradeAssetStatus;