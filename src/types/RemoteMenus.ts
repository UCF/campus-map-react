export interface RestMenuItem {
  id: number,
  order: number,
  parent: number,
  title: string,
  url: string,
  attr: string,
  target: string,
  classes: string[],
  xfn: string,
  description: string,
  object_id: number,
  object: string,
  type: string,
  type_label: string
}

export interface RestMenuResponse {
  ID: number,
  name: string,
  slug: string,
  description: string,
  count: number,
  items: Array<RestMenuItem>
}
