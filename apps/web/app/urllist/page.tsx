import { listURLs } from "@project/domain";

export const dynamic = "force-dynamic";

export default async function UrlList() {
  const urls = await listURLs();

  return (
    <div>
      <h1>URL List</h1>
      <ul>
        {urls.map((url, i) => {
          return (
            <li key={i}>
              {url.normalizedURL}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
