const addId = (id?: number) => id === undefined ? '' : `/${id}`;

export default function url(endpoint: string, id?: number) {
  return `http://localhost:3001/${endpoint}${addId(id)}`
}