function FillNowAmounts({
  fillNowTokenAmount,
  show
}: {
  fillNowTokenAmount: number,
  show: boolean,
}) {

  if (show) {
    return (
      <div className="flex mx-3">
        {fillNowTokenAmount} ETH
      </div>
    );
  } else {
    return (null);
  }

}

export default FillNowAmounts;