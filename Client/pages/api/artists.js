/* This file will be responsible for handling the API calls for the artists component */

export default function artistHandler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Get the users top artists
      res.status(200).json({ artists: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"] });
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
