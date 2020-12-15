import React from 'react'

const BibleIcon = ({ size = 28, ...props }: { size?: string | number }) => (
  <svg width={size} height={size} viewBox="0 0 28 20" {...props}>
    <g fill="currentColor" fillRule="nonzero">
      <path d="M3.8 13.9s4.4-.7 9.7 4V2.6c-.3-.2-.7-.5-1.1-.8C8.6-.5 4 .1 4 .1c-.6 0-1.1.3-1.1.8V13c0 .4 0 1 .9.9zM23.9 14.4c.9 0 .9-.2.9-.6V.9c0-.4-.5-.8-1.1-.8 0 0-4.6-.5-8.3 1.8-.3.2-.8.5-1.1.8V18c4.1-4 9.6-3.6 9.6-3.6z" />
      <path d="M27.8 15.1V1.6c0-.1 0-.2-.1-.2 0 0-.7-.5-1.7-.1v13.4c-.1.8-.5 1.1-1.6 1.1h-.3c-1.3 0-5.8.3-9.3 3.6l-.4.4v.2c.1 0 .2-.1.2-.1l1.4-.7c5.3-2.2 9.9-2 9.9-2 .8 0 1.3-.2 1.7-.5.2-.4.3-.9.2-1.6zM4.1 15.3h-.6c-.5 0-.8-.1-1.1-.4-.4-.4-.4-.9-.4-1.2V1.2C1 .7.4 1.2.3 1.2c-.1 0-.2.1-.2.2V16c0 .7.6 1.1 1.5 1.1.1 0 5.6-.2 10.7 2.3l1.1.5c.1 0 .1.1.2.1v-.1l-.4-.4c-4.1-3.8-7.7-4.2-9.1-4.2z" />
    </g>
  </svg>
)

export default BibleIcon
