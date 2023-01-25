import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    command: await db.command.findUniqueOrThrow({
      where: {
        slug: params.commandSlug,
      },
    }),
  });
};

export default function () {
  const { command } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <pre>{JSON.stringify(command, null, 4)}</pre>
    </div>
  );
}
