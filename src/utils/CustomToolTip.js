const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p>{`${payload[0].payload.category}`}</p>
        <p className='custom-tooltip-threshold'>{`Threshold: ${payload[0].payload.threshold}`}</p>
        <p className='custom-tooltip-used'>{`Used: ${payload[0].payload.used}`}</p>
        <p>
          Remaining:
          <span
            className={
              payload[0].payload.remaining > 0
                ? 'custom-tooltip-green'
                : 'custom-tooltip-red'
            }
          >
            {` ${payload[0].payload.remaining} Rs`}
          </span>
        </p>
        <p>{`End Date: ${payload[0].payload.endDate.substring(0, 10)}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
