import "dotenv/config";
import toast from "react-hot-toast";

export async function api({ endpoint, method, body, headers = { "Content-Type": "application/json" } }) {
  const response = await fetch(`https://rideshare-server-84ng.onrender.com${endpoint}`, {
    method,
    body: JSON.stringify(body),
    headers,
    credentials: "include",
  });

  const result = await response.json();

  if (response.status === 200) {
    return result.data;
  } else if (response.status === 400) {
    toast.error(result.err);
    return null;
  } else if (response.status === 401) {
    toast.error(result.err);
    return null;
  } else {
    toast.error(result.err);
    return null;
  }
}
