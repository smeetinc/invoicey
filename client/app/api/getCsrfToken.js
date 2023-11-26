import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "http://olatidejosepha.pythonanywhere.com/",
      {
        headers: {
          "is-from-site": "x-token-value",
        },
      }
    );

    const csrfToken = response.data.csrfToken;

    response.status(200).json({ csrfToken });
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    response.status(500).send("Internal Server Error");
  }
}
