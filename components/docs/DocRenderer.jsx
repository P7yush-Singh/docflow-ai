export default function DocRenderer({ doc }) {
  return (
    <article className="max-w-4xl">

      <h1 className="mb-3 text-5xl font-bold">
        {doc.title}
      </h1>

      <p className="mb-10 text-lg text-zinc-600">
        {doc.description}
      </p>

      <div className="space-y-6">

        {doc.content.map((block, index) => {

          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="text-3xl font-bold"
              >
                {block.value}
              </h2>
            );
          }

          return (
            <p
              key={index}
              className="leading-8 text-zinc-700"
            >
              {block.value}
            </p>
          );

        })}

      </div>

    </article>
  );
}