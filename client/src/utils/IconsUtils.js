export const MapMarker = () => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 24 24"
      className=" svg-icon svg-fill mr-2"
      style={{ width: '24px', height: '24px' }}
    >
      <g fill="none" fillRule="evenodd">
        <circle
          pid="0"
          cx="12"
          cy="12"
          r="12"
          fill="#000"
          fillOpacity=".2"
          fillRule="nonzero"
        ></circle>
        <path
          pid="1"
          fill="#FFF"
          d="M11.92 6c2.87 0 5.218 2.335 5.218 5.205a5.112 5.112 0 01-1.055 3.137c-.97 1.252-3.77 3.461-3.882 3.56a.43.43 0 01-.282.098.43.43 0 01-.281-.098c-.113-.099-2.912-2.308-3.883-3.546a5.182 5.182 0 01-1.055-3.15C6.7 8.335 9.05 6 11.92 6zm0 7.203a2.104 2.104 0 000-4.207 2.104 2.104 0 000 4.206z"
        ></path>
      </g>
    </svg>
  );
};

export const CalendarIcon = () => {
    return (<svg
        version="1.1"
        viewBox="0 0 24 24"
        style={{ width: '24px', height: '24px' }}
      >
        <g fill="none" fill-rule="evenodd">
          <path
            pid="0"
            fill="#F65E39"
            fill-rule="nonzero"
            d="M12 0c6.614 0 12 5.386 12 12s-5.386 12-12 12S0 18.614 0 12 5.386 0 12 0z"
          ></path>
          <path
            pid="1"
            fill="#FFF"
            d="M10 7h4a1 1 0 112 0h.5A1.5 1.5 0 0118 8.5v8a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 16.5v-8A1.5 1.5 0 017.5 7H8a1 1 0 112 0zm4 7v2h2v-2h-2zm-3 0v2h2v-2h-2zm-3 0v2h2v-2H8zm3-3v2h2v-2h-2zm3 0v2h2v-2h-2zm-6 0v2h2v-2H8z"
          ></path>
        </g>
      </svg>)
}

export const GuestIcon = () => {
    return (  <svg
        version="1.1"
        viewBox="0 0 24 24"
        style={{ width: '24px', height: '24px' }}
      >
        <g fill="none">
          <circle
            pid="0"
            cx="12"
            cy="12"
            r="12"
            fill="#F65E39"
          ></circle>
          <path
            pid="1"
            fill="#FFF"
            d="M12.007 12c.844 0 1.807-.083 2.414-.747.518-.539.681-1.396.518-2.585C14.702 6.995 13.607 6 12.007 6c-1.599 0-2.695.995-2.946 2.668-.163 1.19 0 2.046.518 2.585.607.664 1.57.747 2.428.747zm-3.67 6h7.335c.411 0 .779-.16 1.029-.442.264-.309.367-.724.264-1.126C16.436 14.408 14.408 13 12.012 13c-2.41 0-4.439 1.408-4.968 3.432-.103.402 0 .817.264 1.126.25.281.618.442 1.03.442z"
          ></path>
        </g>
      </svg>)
}