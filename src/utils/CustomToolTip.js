const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p>{`${payload[0].payload.category}`}</p>
        <p>
          Used: {currency}
          <span
            className={
              payload[0].payload.remaining > 0
                ? 'custom-tooltip-green'
                : 'custom-tooltip-red'
            }
          >
            {` ${payload[0].payload.used}`}
          </span>
          /<span>{`${payload[0].payload.threshold}`}</span>
        </p>
        <p>{`End Date: ${payload[0].payload.month.substring(0, 10)}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
