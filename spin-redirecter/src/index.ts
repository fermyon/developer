import { Config, HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  let latest_spin_version = Config.get("latest_spin_version")
  let bytes = await fsPromises.readFile("spin-redirect.json")
  let text = decoder.decode(bytes)
  let redirectList = JSON.parse(text)

  let base = request.headers["spin-base-path"]
  let route = request.headers["spin-component-route"]
  let path = request.headers["spin-path-info"]
  let reqPath = `${base}${route}${path}`.replace("//", "/")

  let routeMatch = redirectList[reqPath] as string

  if (routeMatch) {
    return {
      status: 302,
      headers: {
        location: routeMatch
      }
    }
  }

  // If none of the specified redirects matches just convert to latest version
  return {
    status: 302,
    headers: {
      location: reqPath.replace("/spin/", `/spin/${latest_spin_version}/`)
    }
  }

}
