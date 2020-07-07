import { launch } from "./App"
;import { AxiostHttpClientHelper } from "./utils/axios-interceptors-herlper";

(() => {
  // Setup http client for handling token authentication
  // before starting application
  AxiostHttpClientHelper.staticInitAxiosTokenHandling()
  launch() // start application
})()
