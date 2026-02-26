export function ConnectorLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0">
      {/* Primary connections: center to nodes */}
      <line
        x1="50%"
        y1="50%"
        x2="45%"
        y2="15%"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <line
        x1="50%"
        y1="50%"
        x2="20%"
        y2="30%"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <line
        x1="50%"
        y1="50%"
        x2="80%"
        y2="25%"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <line
        x1="50%"
        y1="50%"
        x2="25%"
        y2="75%"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <line
        x1="50%"
        y1="50%"
        x2="75%"
        y2="70%"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <line
        x1="50%"
        y1="50%"
        x2="50%"
        y2="85%"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Secondary connections: node to satellites */}
      {/* <line
        x1="20%"
        y1="30%"
        x2="15%"
        y2="15%"
        stroke="var(--surface-border)"
        strokeWidth="1"
      />
      <line
        x1="20%"
        y1="30%"
        x2="30%"
        y2="15%"
        stroke="var(--surface-border)"
        strokeWidth="1"
      />
      <line
        x1="80%"
        y1="25%"
        x2="90%"
        y2="15%"
        stroke="var(--surface-border)"
        strokeWidth="1"
      /> */}
    </svg>
  );
}

