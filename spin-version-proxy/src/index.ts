import { Config, HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  var pattern = /^\/v\d+\/*/;

  let path = request.headers["spin-path-info"]

  if (pattern.test(path)) {
    // If path matches a version just swap the name from spin to _spin so that bartholomew can handle it
    let base = request.headers["spin-base-path"]
    let route = request.headers["spin-component-route"]
    let reqPath = `${base}${route}${path}`.replace("//", "/")
    reqPath = reqPath.replace("/spin/", "/_spin/")

    try {
      let resp = await fetch(reqPath)
      let htmlResponse = await resp.text()

      return {
        status: resp.status,
        headers: { "content-type": "text/html" },
        body: htmlResponse
      }

    } catch (err) {
      return {
        status: 404
      }
    }

  } else {
    // If request arrives at the root - redirect to current version
    let latestSpinVersion = Config.get("latest_spin_version")
    let fullPath = request.headers["spin-full-url"]
    fullPath = fullPath.replace("/spin/", `/spin/${latestSpinVersion}/`)
    return {
      status: 302,
      headers: {
        location: fullPath
      }
    }
  }

}
