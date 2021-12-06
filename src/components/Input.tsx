function Input({
  value,
  type,
  min,
  disabled,
  onChange,
  onKeyDown,
  className
}: {
  value: string,
  type: string,
  min: string | number | undefined,
  disabled: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined,
  className: string
}) {
  return (
    <input
      type={type}
      min={min}
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onKeyDown={onKeyDown}
      onWheel={e => (e.target as HTMLInputElement).blur()}
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
    />
  );
}

function InputAddress({
  value,
  disabled,
  onChange,
  className,
}: {
  value: string,
  disabled: boolean,
  onChange: (newValue: string) => void,
  className: string,
}) {
  return (
    <Input
      value={value}
      type="text"
      min={undefined}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      onKeyDown={undefined}
      className={className}
    />
  );
}

function InputAmount({
  value,
  decimals,
  disabled,
  onChange,
  className
}: {
  value: string,
  decimals: number | undefined,
  disabled: boolean,
  onChange: (newValue: string) => void,
  className: string,
}) {
  const format = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [beforeDot, afterDot] = e.target.value.split(".");

    if (!decimals || !afterDot) {
      onChange(beforeDot);
      return;
    }

    onChange(`${beforeDot}.${afterDot.substring(0, decimals)}`)
  }

  const stripChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return ['e', '+', '-'].includes(e.key) && e.preventDefault()
  }

  return (
    <Input
      value={value}
      type="number"
      min={0}
      disabled={disabled}
      onChange={format}
      onKeyDown={stripChars}
      className={className}
    />
  );
}

function InputNumber({
  value,
  disabled,
  onChange,
  className
}: {
  value: string,
  disabled: boolean,
  onChange: (newValue: string) => void,
  className: string
}) {
  const stripChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return ['e', '+', '-', '.'].includes(e.key) && e.preventDefault()
  }

  return (
    <Input
      value={value}
      type="number"
      min={0}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      onKeyDown={stripChars}
      className={className}
    />
  );
}

export {
  InputAddress,
  InputAmount,
  InputNumber,
};