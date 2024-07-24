import { UaEventOptions } from "react-ga4/types/ga4"

export interface CustomEventOptions extends UaEventOptions {
  link_url: string,
  link_text: string
}
