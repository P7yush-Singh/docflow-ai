export default function DocRenderer({ doc }) {
  return (
    <article className="max-w-4xl">

      {/* Title */}

      <h1 className="text-5xl font-bold tracking-tight">
        {doc.title}
      </h1>

      {/* Description */}

      <p className="mt-4 text-lg text-zinc-600">
        {doc.description}
      </p>

      {/* Content */}

      <div className="mt-10 space-y-8">

        {doc.content.map((block, index) => {

          switch (block.type) {

            case "heading":

              return (
                <h2
                  key={index}
                  className="text-3xl font-semibold"
                >
                  {block.value}
                </h2>
              );

            case "code":

              return (
                <pre
                  key={index}
                  className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm text-white"
                >
                  <code>
                    {block.value}
                  </code>
                </pre>
              );

            default:

              return (
                <p
                  key={index}
                  className="leading-8 text-zinc-700"
                >
                  {block.value}
                </p>
              );

          }

        })}

      </div>

    </article>
  );
}