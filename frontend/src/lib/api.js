import { auth } from "../firebase";

const base = import.meta.env.VITE_API_BASE_URL;

async function authHeaders() {
  if (!auth.currentUser?.getIdToken) {
    throw new Error("Sign in first");
  }
  const token = await auth.currentUser.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      ...(await authHeaders()),
      ...(options.headers || {}),
    },
  });

  if (res.status === 502) {
    const error = new Error("Couldn't build your path, try again");
    error.status = 502;
    throw error;
  }

  if (!res.ok) {
    const error = new Error("Request failed");
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export function generatePath(intakeData) {
  return request("/api/path/generate", {
    method: "POST",
    body: JSON.stringify(intakeData),
  });
}

export function regeneratePath() {
  return request("/api/path/regenerate", {
    method: "POST",
  });
}

export function askCoach({ question, stepId }) {
  return request("/api/coach/ask", {
    method: "POST",
    body: JSON.stringify({ question, stepId }),
  });
}
