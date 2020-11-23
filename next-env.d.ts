/// <reference types="react" />
declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export = value
}

/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />
