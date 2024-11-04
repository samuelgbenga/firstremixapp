import type { MetaFunction } from "@remix-run/node";
import {
  json,
  redirect,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "~/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Entered Session" },
    { name: "description", content: "You can enter your name!" },
  ];
};

// Define the loader function with proper types
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const name = session.get("name") || "";
  return json({ name });
};

// Define the action function with proper types
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");

  const session = await getSession(request.headers.get("Cookie"));
  session.set("name", name);

  return redirect("/sessionRoute", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// Default export for the Index component
export default function SessionRoute() {
  const { name } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome, {name || "Guest"}!</h1>
      <Form method="post">
        <label>
          Enter your name:
          <input type="text" name="name" defaultValue={name} />
        </label>
        <button type="submit">Save Name</button>
      </Form>
      <Link to="/">Go back to the first route</Link>
      <br />
      <br />
      <Link to="/testing">Go to Session input name</Link>
    </div>
  );
}
