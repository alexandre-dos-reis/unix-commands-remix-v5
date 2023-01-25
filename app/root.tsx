import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async () => {
  return json({
    commands: await db.command.findMany({
      where: {
        parentId: null
      },
      select: {
        id: true,
        tab: true,
        slug: true,
      },
    }),
  });
};

export default function () {
  const { commands } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ul>
          {commands.map((c) => (
            <li key={c.id}>
              <Link to={`/${c.slug}`}>{c.tab}</Link>
            </li>
          ))}
        </ul>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
