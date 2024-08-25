import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tangled Circuit</title>
        <link rel="stylesheet" href="/styles.css" />
        <style>{`
          body {
            background-color: #111;
            color: #0f0;
            font-family: 'Courier New', monospace;
          }
        `}</style>
      </head>
      <body>
        <Component />
      </body>
    </>
  );
}